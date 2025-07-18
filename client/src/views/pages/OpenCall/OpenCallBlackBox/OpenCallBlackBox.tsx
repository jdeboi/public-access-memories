"use client";

import React, { useState } from "react";
import { openCallVersions } from "./versions";

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
  version: { content: React.ReactNode; prompt?: React.ReactNode },
  percent: number
): { content: React.ReactNode; prompt?: React.ReactNode } {
  const totalWords =
    countWordsInNode(version.content) +
    (version.prompt ? countWordsInNode(version.prompt) : 0);
  const wordsToShow = Math.floor(totalWords * percent);

  const contentRef = { count: 0 };
  const partialContent = revealByWords(
    version.content,
    wordsToShow,
    contentRef
  );

  const promptRef = { count: contentRef.count };
  const partialPrompt = version.prompt
    ? revealByWords(version.prompt, wordsToShow, promptRef)
    : undefined;

  return {
    content: partialContent,
    prompt: partialPrompt,
  };
}

export default function OpenCallBlackBox() {
  const [sliderPercent, setSliderPercent] = useState(1); // 0 to 1

  const maxIndex = openCallVersions.length - 1;
  const virtualIndex = sliderPercent * maxIndex;
  const baseIndex = Math.floor(virtualIndex);
  const versionProgress = virtualIndex - baseIndex;

  const version = openCallVersions[baseIndex];
  const { content: partialContent, prompt: partialPrompt } =
    getPartialVersionNode(version, versionProgress || 1);

  return (
    <div className="bg-black mx-auto px-6 py-12 flex flex-1 flex-col items-start">
      <div className="w-[800px] max-w-[calc(100vw_-_100px)]">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-400 mb-6">Open Call</h1>
          <h3 className="text-xl font-semibold text-gray-100">
            Black Box // White Cube
          </h3>
          <p className="text-gray-600 mb-6">
            a{" "}
            <a href="" target="_blank" className="text-blue-600">
              Wrong Biennale
            </a>{" "}
            pavilion and Public Access Memories exhibition
          </p>
        </div>
        {/* Slider */}
        <div className="mb-6">
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
        <div className="bg-gray-100 border-l-4 border-black p-4 mb-4 rounded text-gray-800">
          {partialContent}
          <p className="text-sm text-gray-500 mt-2">
            🕒 {version.timestamp.toLocaleString()}
          </p>
        </div>

        {/* Prompt */}
        {partialPrompt && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h2 className="text-lg font-medium text-yellow-800 mb-2">
              🧠 Prompt Behind This Version
            </h2>
            <div className="italic text-yellow-900">{partialPrompt}</div>
          </div>
        )}
      </div>
    </div>
  );
}
