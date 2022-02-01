import React from "react";
import Sketch from "react-p5";
import { addDesktopDivs, addMobilePortraitDivs,addMobileLandscapeDivs, displayDivs, updateDivs, drawDivSquares, checkDivPress, endDivDrag, addMobilePortrait } from './components/divs';

var divs = { windows: [] };
let blinds;
let coverImg;
let isDragging = false;
let wallTexture;
// let bkImg;
let shadow;

let ui;
//////////////
// PROPS


export default (props) => {
    //   user = props.user;
    ui = props.ui;

    const preload = (p5) => {
        const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";
        blinds = p5.loadImage(url + "/blinds/blinds_sm.png");
        wallTexture = p5.loadImage(url + "/blinds/wallpaper/stuccoblk.jpg");
        shadow = p5.loadImage(url + "/gallery/tracklights/black_shadow.png");
    }

    ////////////////////////////////////////////////////////////////////////
    // INITIALIZE
    ////////////////////////////////////////////////////////////////////////
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)

        const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        cnv.parent(canvasParentRef);
        cnv.mousePressed(() => canvasPressed(p5));

        // let dim = getCenterCoverDim(p5, wallTexture.width, wallTexture.height);
        // wallTexture.resize(dim.w, dim.h)
        wallTexture.resize(wallTexture.width*.4, wallTexture.height*.4 )

        if (ui.hasFooter && ui.orientation === "portrait")
            addMobilePortraitDivs(ui, divs, blinds, shadow, p5)
        else if (ui.hasFooter && ui.orientation === "landscape")
            addMobileLandscapeDivs(ui, divs, blinds, shadow, p5)
        else
            addDesktopDivs(ui, divs, blinds, shadow, p5);
        initGraphics(p5);

        // p5.textFont(dogica, 14);
        // p5.frameRate(20);

        props.loadingDone();

        // wallTexture.resize(p5.windowWidth, p5.windowHeight);

    };

    ////////////////////////////////////////////////////////////////////////
    // DRAW
    ////////////////////////////////////////////////////////////////////////
    const draw = (p5) => {
        p5.clear();
        // let bkDim = getCenterCoverDim(p5, bkImg.width, bkImg.height);
        // p5.image(bkImg, bkDim.x, bkDim.y, bkDim.w, bkDim.h);


        p5.image(coverImg, 0, 0, p5.windowWidth, p5.windowHeight);
        //    purple
        // let col = p5.color(10, 0, 20, 250)
        // let col2 = p5.color(255, 0, 255, 150);
        // displayDivs(divs, col, col2, col2);

        // white
        // let col = p5.color(220, 255)
        // let col2 = p5.color(255, 0);
        // displayDivs(divs, col, col2, p5.color(100));

        let buttoncol = p5.color(255);
        let framecol = p5.color(255, 0)
        // let toolcol = p5.color(150, 150, 100, 100);
        let toolcol = p5.color(110, 119, 54, 180);
        displayDivs(divs, toolcol, framecol, buttoncol);
        updateDivs(divs);

    }

    const updateGraphics = (p5) => {
        if (coverImg) {
            coverImg.push();
            coverImg.clear();
            // coverImg.background(10, 0, 20);
            coverImg.background(0)

            // let dim = getCenterCoverDim(p5, wallTexture.width, wallTexture.height);
            // coverImg.image(wallTexture, dim.x, dim.y, dim.w, dim.h);

            for (let x = 0; x < coverImg.width + wallTexture.width; x += wallTexture.width) {
                for (let y = 0; y < coverImg.height + wallTexture.height; y += wallTexture.height) {
                    coverImg.image(wallTexture, x, y);
                }
            }


            coverImg.blendMode(p5.REMOVE);
            drawDivSquares(divs, coverImg, p5.color(255));
            coverImg.pop();
        }

    }



    const initGraphics = (p5) => {
        coverImg = p5.createGraphics(p5.windowWidth, p5.windowHeight);
        updateGraphics(p5);
    }


    const mouseDragged = (p5) => {
        updateGraphics(p5);

    }

    const keyPressed = (p5) => {

    }

    const canvasPressed = (p5) => {
        isDragging = true;
        updateGraphics(p5);
        checkDivPress(divs);
    }


    const mouseReleased = (p5) => {
        endDivDrag(divs);
        updateGraphics(p5);
        isDragging = false;
    }

    const windowResized = (p5) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        initGraphics(p5);

    }

    const doubleClicked = (p5) => {

    }

    // const maskGraphics = (pg, inputMask, p5) => {

    //         if (inputMask === undefined) {
    //           inputMask = this;
    //         }
    //         const currBlend = this.drawingContext.globalCompositeOperation;

    //         let scaleFactor = 1;
    //         if (inputMask instanceof p5.Renderer) {
    //           scaleFactor = inputMask._pInst._pixelDensity;
    //         }

    //         const copyArgs = [
    //           inputMask,
    //           0,
    //           0,
    //           scaleFactor * inputMask.width,
    //           scaleFactor * inputMask.height,
    //           0,
    //           0,
    //           this.width,
    //           this.height
    //         ];

    //         this.drawingContext.globalCompositeOperation = 'destination-in';
    //         p5.Renderer2D.prototype.copy.apply(this, copyArgs);
    //         this.drawingContext.globalCompositeOperation = currBlend;

    //       }
    // }

    return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed} mouseReleased={mouseReleased} mouseDragged={mouseDragged} doubleClicked={doubleClicked} />;
};

function getCenterCoverDim(p5, imgW, imgH) {
    let imgRatio = imgW / imgH;
    let containerHeight = p5.windowHeight;
    let containerWidth = p5.windowWidth;
    let containerRatio = containerWidth / containerHeight;
    if (containerRatio < imgRatio) {
        var finalHeight = containerHeight
        var finalWidth = (containerHeight * imgRatio)
    }
    else {
        var finalWidth = containerWidth
        var finalHeight = (containerWidth * imgRatio)
    }
    // center it
    let dx = (containerWidth - finalWidth) / 2;
    let dy = (containerHeight - finalHeight) / 2;
    return { w: finalWidth, h: finalHeight, x: dx, y: dy };
}