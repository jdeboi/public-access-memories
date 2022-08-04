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
let bgGif1: p5Types.Image;
let bgGif2: p5Types.Image;


class AllisonSketch extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    preload = (p5: p5Types) => {
        bgGif = p5.loadImage("/online_assets/1.gif")
        bgGif1 = p5.loadImage("/online_assets/2.gif")
        bgGif2 = p5.loadImage("/online_assets/3.gif")
    }

    setup = (p5: p5Types, canvasParentRef: Element) => {
        const { loadingDone } = this.props;
        const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        cnv.parent(canvasParentRef);
        // cnv.mousePressed(() => this.triggerMove(p5));

        // loadingDone();
        // this.glitch1(bgGif, p5);

        // p5.translate(bgGif.width, 0);
        // this.glitch1(bgGif, p5);
    };


    draw = (p5: p5Types) => {
        // p5.imageMode(p5.CENTER);
        // p5.image(bgGif1, p5.mouseX-bgGif1.width/2, p5.mouseY-bgGif1.height/2);
        // p5.image(bgGif1, p5.mouseX+100, p5.mouseY);
        // p5.image(bgGif2, p5.mouseX+200, p5.mouseY);

        // if (p5.frameCount % 360 == 1)
        //     this.glitch1(bgGif2, p5);
        // else if (p5.frameCount % 60 == 20)
        //     this.glitch1(bgGif1, p5);
        // else if (p5.frameCount % 30 == 40)
        //     this.glitch1(bgGif, p5);

        if (p5.windowWidth !== window.innerWidth || p5.windowHeight !== window.innerHeight)
            this.manualResize(p5);
    };

    glitch1 = (img: p5Types.Image, p5: p5Types) => {
        let c, j;
        p5.translate(p5.mouseX-img.width/2, p5.mouseY-img.height/2)
        for (let i = 0; i < img.width; i += 5) {
            for (j = 0; j < img.height; j += 5) {
                c = img.get(i, j);

                p5.fill(p5.color(c));
                p5.noStroke();
                p5.ellipse(i, j, 10, 2);
                let changeColor = p5.lerpColor(p5.color(50, p5.random(100), 50), p5.color(p5.random(59), 100, 50), 0.33);
                p5.push();
                // p5.translate(p5.random(-30,30), p5.random(-30, 30))
                p5.arc(i / 5, j / 5, 10, p5.random(50), 0, p5.PI + p5.QUARTER_PI, p5.PIE);
                p5.arc(i / 3, j / 2, 10, p5.random(50), 0, p5.PI + p5.QUARTER_PI, p5.PIE);
                p5.pop();

                p5.push();
                // p5.translate(p5.random(-30,30), p5.random(-30,30))
                p5.fill(changeColor);
                // p5.arc(8 * i, 500 * i, 10, p5.random(50), 0, p5.PI + p5.QUARTER_PI, p5.PIE);
                // p5.square(10 * i, 3 * j, 30);

                p5.fill(p5.hue(c) / 2);
                // p5.square(5 * i, 50 * j, 30);
                p5.ellipse(j, i, 5, 9);
                p5.pop();
            }

        }
    }


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


