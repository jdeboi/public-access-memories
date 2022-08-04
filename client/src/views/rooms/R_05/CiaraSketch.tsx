import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { connect } from "react-redux";
import { RootState } from '../../../store/store';
import { Dispatch } from "@reduxjs/toolkit";
import RoomDraggable from '../../Gallery/Gallery1/p5/components/Draggable/RoomDraggable';
import { time } from "console";

//////////////// 
// PROPS
interface ComponentProps {
    hasStarted: boolean;
    isMobile: boolean;
    loadingDone: () => void;
}
interface StateProps { } // redux props
interface DispatchProps { } // dispatch props = functions to execute
interface Props extends ComponentProps, StateProps, DispatchProps { }
////////////////

let photoButton: p5Types.Image;
let shadow: p5Types.Image;
let frame: any;

let vid: any;
let vidDim = { x: 100, y: 100, w: 1920 / 2, h: 1080 / 2 };
let isPlaying = false;

let currentStamp = -1;
let timeStamps = [[0, 3.5], [14.5, 18], [22, 25.5], [29, 32.5], [36, 39.8], [43.5, 47], [51, 54.5], [58, 61], [65, 68.2], [72, 75.2], [79, 82.5], [86.5, 90], [94, 97.5]];
let firstStarted = false;
let firstClip = false;

class CiaraSketch extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    preload = (p5: p5Types) => {
        vid = p5.createVideo(['https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/ciara.mp4']);
        vid.hide(); // by default video shows up in separate dom  
        vid.noLoop();

        photoButton = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/photobooth.png");
        shadow = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/tracklights/black_shadow.png");
    }

    setup = (p5: p5Types, canvasParentRef: Element) => {
        const { loadingDone } = this.props;
        const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        cnv.parent(canvasParentRef);
        cnv.mousePressed(() => this.clickedCanvas(p5));

        this.setVidDim(p5);
        frame = new RoomDraggable(0, vidDim.x, vidDim.y, vidDim.w, vidDim.h, p5, null);
        loadingDone();

    };


    draw = (p5: p5Types) => {

        this.getFirstClip();

        p5.clear();


        if (this.props.hasStarted) {
            frame.display();
            // frame.displaySolidBack(p5.color(0));
            if (!frame.minimized && !frame.closed) {
                p5.image(vid, frame.x, frame.y + 26, vidDim.w, vidDim.h);
                this.displayPhotoButton(p5);
            }
            frame.displayToolBar(0, 0);
            frame.update();
    
            this.checkVidPlay();
            this.manualResize(p5);    
        }
      

    };

    displayPhotoButton = (p5: p5Types) => {
        if (this.props.hasStarted && vid.time() == 0 && !isPlaying) {
            const { r, x, y } = this.getPhotoDim(p5);
            let w = r * 1.3;
            let h = w * .8;
            p5.stroke(255);
            p5.fill('red');
            p5.ellipse(x, y, r * 2);
            p5.image(photoButton, x - w / 2, y - h / 2, w, h);
        }

    }

    getFirstClip = () => {
        if (!firstStarted && this.props.hasStarted) {
            vid.play();
            firstStarted = true;
        }
        else if (firstStarted && !firstClip) {
            firstClip = true;
            vid.time(0);
            vid.pause();
        }
    }

    setVidDim = (p5: p5Types) => {
        vidDim.w = Math.min(p5.width, 1920/2);
        vidDim.h = vidDim.w / 1920 * 1080;
        vidDim.x = (p5.width - vidDim.w) / 2;
        vidDim.y = (p5.height - vidDim.h) / 2;
    }

    keyPressed = (p5: p5Types) => {
        // TODO - why running twice??
        if (p5.frameCount > 0) {

        }

    }

    checkPhotoPressed = (p5: p5Types) => {
        if (frame.minimized || frame.closed)
            return;
        if (!isPlaying) {
            const { r, x, y } = this.getPhotoDim(p5);

            // p5.ellipse(x, y, r*2);
            let d = p5.dist(p5.mouseX, p5.mouseY, x, y);
            if (d < r) {
                this.photoPressed();
            }
        }
    }

    getPhotoDim = (p5: p5Types) => {
        let r = vidDim.w * .0145;
        let x = vidDim.x + vidDim.w * .5805;
        let y = vidDim.y + 26 + vidDim.h * .968;
        return { r, x, y };
    }

    photoPressed = () => {
        isPlaying = true;

        currentStamp++;
        if (currentStamp >= timeStamps.length) {
            currentStamp = 0;
            vid.time(0);
        }

        vid.play();
        vid.time(timeStamps[currentStamp][0]);
        console.log("started", timeStamps[currentStamp][0])

    }

    checkVidPlay = () => {
        if (isPlaying) {
            if (vid.time() >= timeStamps[currentStamp][1]) {
                vid.pause();
                isPlaying = false;
            }
        }
    }



    mouseReleased = (p5: p5Types) => {
        frame.endDrag();
    }

    clickedCanvas = (p5: p5Types) => {
        this.checkPhotoPressed(p5);

        if (!this.props.isMobile) {
            this.checkDiv();
        }
    }

    checkDiv = () => {

        if (frame.checkButtons(0, 0)) {
            return true;
        }
        else if (frame.checkDragging(0, 0)) {
            return true;
        }
        return false;
    }


    touchStarted = (p5: p5Types) => {
        this.checkDiv();
        return;
    }

    touchEnded = (p5: p5Types) => {
        if (frame) frame.endDrag();
        return;
    }

    manualResize = (p5: p5Types) => {
        if (p5.windowWidth !== window.innerWidth || p5.windowHeight !== window.innerHeight) {
            p5.windowWidth = window.innerWidth;
            p5.windowHeight = window.innerHeight;
            this.windowResized(p5);
        }
    }

    windowResized = (p5: p5Types) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    doubleClicked = (p5: p5Types) => {
    }

    render() {
        return (
            <Sketch
                preload={this.preload}
                setup={this.setup}
                draw={this.draw}
                windowResized={this.windowResized}
                keyPressed={this.keyPressed}
                mouseReleased={this.mouseReleased}
                doubleClicked={this.doubleClicked}
            />
        );
    }
};


const mapStateToProps = (state: RootState) => ({
    user: state.user,
});


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
    }
}

export default connect<StateProps, DispatchProps, ComponentProps, RootState>(mapStateToProps, mapDispatchToProps)(CiaraSketch);


