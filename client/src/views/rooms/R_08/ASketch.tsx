import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { connect } from "react-redux";
import { RootState } from '../../../store/store';
import { Dispatch } from "@reduxjs/toolkit";

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


let vid: any;
let vidDim = { x: 100, y: 100, w: 1920 / 2, h: 1080 / 2 };
let isPlaying = false;
let firstStarted = false;
let firstClip = false;
let aposImg: p5Types.Image;

class CiaraSketch extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    preload = (p5: p5Types) => {
        vid = p5.createVideo(['https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/clipped_apos.mp4']);
        vid.hide(); // by default video shows up in separate dom  
   
        aposImg = p5.loadImage('https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/apos_bg.jpeg');
    }

    setup = (p5: p5Types, canvasParentRef: Element) => {
        const { loadingDone } = this.props;
        const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        cnv.parent(canvasParentRef);
        cnv.mousePressed(() => this.clickedCanvas(p5));

        this.setVidDim(p5);
        loadingDone();

    };


    draw = (p5: p5Types) => {

        this.getFirstClip(p5);
        // 
        p5.clear();

        p5.blendMode(p5.HARD_LIGHT)
        const { x, y, w, h } = this.getCoverImgCenterDim(aposImg, p5);
        // p5.image(aposImg, x, y, w, h);
        if (this.props.hasStarted) {
            const { x, y, w, h } = this.getCoverImgCenterDim(vid, p5);
            p5.image(vid, x, y, w, h);
            // p5.image(vid, 0, 0, vidDim.w, vidDim.h);
        }
        // const { x, y, w, h } = this.getCoverImgCenterDim(aposImg, p5);
        p5.image(aposImg, x, y, w, h);
        
        p5.erase();
        const sz = 400;
        // p5.rect(0, 0, sz, p5.height);
        // p5.rect(0, 0, p5.width-sz, p5.height);
        p5.noErase();
        this.manualResize(p5);

    };

    getClip = (p5: p5Types) => {
        let clip = p5.map(p5.mouseX, 0, p5.width, 0, vid.duration());
        clip = p5.constrain(clip, 0, vid.duration());
        vid.time(clip);
        vid.pause();
    }

    getFirstClip = (p5: p5Types) => {
        if (!firstStarted && this.props.hasStarted) {
            vid.play();
            vid.loop();
            firstStarted = true;
        }
        // else if (firstStarted && !firstClip) {
        //     firstClip = true;
        //     vid.time(0);
        //     vid.pause();
        // }
        // else if (firstStarted) {
        //     // this.getClip(p5);
        // }
    }

    setVidDim = (p5: p5Types) => {
        vidDim.w = Math.min(p5.width, 1920 / 2);
        vidDim.h = vidDim.w / 1920 * 1080;
        vidDim.x = (p5.width - vidDim.w) / 2;
        vidDim.y = (p5.height - vidDim.h) / 2;
    }

    keyPressed = (p5: p5Types) => {
        // TODO - why running twice??
        if (p5.frameCount > 0) {

        }

    }


    getPhotoDim = (p5: p5Types) => {
        let r = vidDim.w * .0145;
        let x = vidDim.x + vidDim.w * .5805;
        let y = vidDim.y + 26 + vidDim.h * .968;
        return { r, x, y };
    }




    mouseReleased = (p5: p5Types) => {
    }

    clickedCanvas = (p5: p5Types) => {
    }


    touchStarted = (p5: p5Types) => {
        return;
    }

    touchEnded = (p5: p5Types) => {
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


  getCoverImgCenterDim = (img: p5Types.Image, p5: p5Types, wConstrain = 10000, hConstrain = 10000) => {
    let h = 0;
    let w = 0;
    let { width, height } = img;
    let imgR = width / height;
    let bgR = p5.width / p5.height;
    if (imgR > bgR) {
      // set height to window height
      h = p5.min(hConstrain, p5.height);
      w = h / height * width;
    }
    else {
      // set width to window width
      w = p5.min(wConstrain, p5.width);
      h = w / width * height;
    }
    let x = (p5.width - w) / 2;
    let y = (p5.height - h) / 2;
    return { x, y, w, h };
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


