"use client";

import React, { useState } from "react";
import { openCallVersions } from "./versions";

const SHOW_TITLE = "Debox";

/**
 * Recursively extracts word-wrapped JSX fragments up to a target word count.
 */
function revealByWords(
  node: React.ReactNode,
  wordsToShow: number,
  wordCountRef: { count: number }
): React.ReactNode {
  if (typeof node === "string" || typeof node === "number") {
    const words = node.toString().split(" ");
    const remaining = wordsToShow - wordCountRef.count;
    const slice = words.slice(0, remaining);
    wordCountRef.count += slice.length;

    return slice.join(" ") + (slice.length < words.length ? "…" : "");
  }

  if (Array.isArray(node)) {
    return node.map((child, index) =>
      revealByWords(child, wordsToShow, wordCountRef)
    );
  }

  if (React.isValidElement(node)) {
    const children = node.props.children;
    const revealedChildren = revealByWords(children, wordsToShow, wordCountRef);

    return React.cloneElement(node, {
      ...node.props,
      children: revealedChildren,
      key: node.key || undefined,
    });
  }

  return null;
}

/**
 * Counts the total number of words in a ReactNode tree.
 */
function countWordsInNode(node: React.ReactNode): number {
  if (typeof node === "string" || typeof node === "number") {
    return node.toString().split(/\s+/).filter(Boolean).length;
  }

  if (Array.isArray(node)) {
    return node.reduce((sum, child) => sum + countWordsInNode(child), 0);
  }

  if (React.isValidElement(node)) {
    return countWordsInNode(node.props.children);
  }

  return 0;
}

/**
 * Main function: Given an OpenCallVersion and a percentage (0–1),
 * returns a partially revealed ReactNode of the version's content and prompt.
 */
function getPartialVersionNode(
  version: { newContent: React.ReactNode },
  percent: number
): { newContent: React.ReactNode } {
  const totalWords = countWordsInNode(version.newContent);
  const wordsToShow = Math.floor(totalWords * percent);

  const contentRef = { count: 0 };
  const partialContent = revealByWords(
    version.newContent,
    wordsToShow,
    contentRef
  );

  return {
    newContent: partialContent,
  };
}

export default function OpenCallBlackBox() {
  const [sliderPercent, setSliderPercent] = useState(1); // 0 to 1

  const totalVersions = openCallVersions.length;
  const blockSize = 1 / totalVersions;
  const clampedSlider = Math.min(sliderPercent, 0.999999); // prevent out of bounds
  const activeIndex = Math.floor(clampedSlider / blockSize);
  const version = openCallVersions[activeIndex];

  // Progress *within* this block (0 to 1)
  const localStart = activeIndex * blockSize;
  const localPercent = (clampedSlider - localStart) / blockSize;
  const easedPercent = Math.min(localPercent * 1.2, 1); // finishes slightly early

  const { newContent: partialContent } = getPartialVersionNode(
    version,
    localPercent || 0
  );

  return (
    // add iframe as background
    <>
      <iframe
        src="/iframes/opencall/openCallBg.html"
        className="absolute inset-0 w-full h-full z-0 pointer-none"
      />
      <div
        className="w-full h-full flex flex-col z-1 items-center bg-transparent overflow-y-auto"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className=" mx-auto px-6 py-12  flex flex-1 flex-col items-start">
          <div className="w-[800px] max-w-[calc(100vw_-_100px)]">
            {/* Header */}
            <div className="p-6 windowsBlack  mb-8 bg-black">
              <div className="font-['geoFont'] text-7xl font-bold text-gray-100 mb-6">
                OPEN CALL
              </div>

              {/* <div className="text-gray-500 mb-4">
                a{" "}
                <a
                  href=""
                  style={{ textDecoration: "underline", color: "blue" }}
                  target="_blank"
                  className="text-blue-600"
                >
                  Wrong Biennale
                </a>{" "}
                pavilion and Public Access Memories exhibition
              </div> */}
              <div className="text-white text-xl mb-8">
                DEADLINE: August 20, 2025
              </div>
              <div className="">
                <a
                  href="https://forms.gle/Zx8gsSxT5Ynf5dmS7"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "black" }}
                  className="windowsBlackNoPadding font-['geoFont'] p-4 text-2xl inline-block min-w-[200px] text-center bg-white font-semibold shadow-md hover:shadow-lg hover:bg-gray-100 transition"
                >
                  APPLY
                </a>
              </div>
            </div>
            {/* Slider */}
            <div className="mb-6 ">
              <input
                type="range"
                min={0}
                max={1}
                step={0.001}
                value={sliderPercent}
                onChange={(e) => setSliderPercent(parseFloat(e.target.value))}
                className="w-full accent-white"
              />
            </div>

            {/* Statement */}
            <div className="bg-black w-full min-h-[800px] windowsBlack p-4 mb-4 text-gray-200">
              <div className="mb-6">
                <div className="text-4xl font-semibold text-gray-100 mb-4">
                  {SHOW_TITLE}
                </div>
                <div className="text-gray-500 mb-6">
                  a{" "}
                  <a
                    href=""
                    style={{ textDecoration: "underline" }}
                    target="_blank"
                  >
                    Wrong Biennale
                  </a>{" "}
                  pavilion and Public Access Memories exhibition
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="rounded-md bg-slate-100 w-25 text-center py-0.5 px-2.5 border border-transparent text-sm text-slate-600 transition-all shadow-sm">
                    Version {version.id}
                  </div>
                  <div className="text-sm w-44 text-gray-500">
                    🕒{" "}
                    {version.timestamp.toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}{" "}
                    {version.timestamp.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      hour12: true,
                      minute: "2-digit",
                      second: undefined,
                    })}
                  </div>
                  {version.user && (
                    <div className="t`ext-sm w-37 text-gray-500">
                      👤 {version.user}
                    </div>
                  )}
                </div>
              </div>
              {version.staticContent && version.addPosition === "bottom"
                ? version.staticContent
                : null}
              {partialContent}
              {version.staticContent && version.addPosition === "top"
                ? version.staticContent
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
