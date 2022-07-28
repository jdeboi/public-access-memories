import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { connect } from "react-redux";
import { RootState } from '../../../store/store';
import { Dispatch } from "@reduxjs/toolkit";

interface ComponentProps {
    loadingDone: () => void;
}
interface StateProps { } // redux props
interface DispatchProps { } // dispatch props = functions to execute
interface Props extends ComponentProps, StateProps, DispatchProps { }


let bgGif: p5Types.Image;


class AllisonSketch extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    preload = (p5: p5Types) => {
        bgGif = p5.loadImage("/online_assets/1.gif")
    }

    setup = (p5: p5Types, canvasParentRef: Element) => {
        const { loadingDone } = this.props;
        const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        cnv.parent(canvasParentRef);
        // cnv.mousePressed(() => this.triggerMove(p5));

        loadingDone();
    };


    draw = (p5: p5Types) => {
        p5.image(bgGif, p5.mouseX, p5.mouseY);

        if (p5.windowWidth !== window.innerWidth || p5.windowHeight !== window.innerHeight)
            this.manualResize(p5);
    };


    keyPressed = (p5: p5Types) => {
        // TODO - why running twice??
        if (p5.frameCount > 0) {

        }

    }

    mouseReleased = (p5: p5Types) => {
    }

    manualResize = (p5: p5Types) => {
        p5.windowWidth = window.innerWidth;
        p5.windowHeight = window.innerHeight;
        this.windowResized(p5);
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

export default connect<StateProps, DispatchProps, ComponentProps, RootState>(mapStateToProps, mapDispatchToProps)(AllisonSketch);


