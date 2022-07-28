import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { connect } from "react-redux";
import { RootState } from '../../../../store/store';

import { Dispatch } from "@reduxjs/toolkit";


let font: p5Types.Font;
let div: any;

interface ComponentProps {
  isMobile: boolean;
  loadingDone: () => void;
}

// redux props
interface StateProps {
}
// dispatch props = functions to execute
interface DispatchProps {
}

interface Props extends ComponentProps, StateProps, DispatchProps { }


class P5Sketch extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  preload = (p5: p5Types) => {
    const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";
    // font
    font = p5.loadFont("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fonts/sysfont.woff");

  }

  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { loadingDone } = this.props;
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.clickedCanvas(p5));

    loadingDone();
  };


  draw = (p5: p5Types) => {


    // div.display();
    // div.displayToolBar();
    // div.update();

    if (p5.windowWidth !== window.innerWidth || p5.windowHeight !== window.innerHeight)
      this.manualResize(p5);
  };


  keyPressed = (p5: p5Types) => {
    // TODO - why running twice??
    if (p5.frameCount > 0) {

    }

  }

  clickedCanvas = (p5: p5Types) => {
    // if (!this.props.isMobile) {
    //   this.checkDiv();
    // }
  }

  checkDiv = () => {
    // if (div.checkButtons(0, 0)) {
    //   return true;
    // }
    // else if (div.checkDragging(0, 0)) {
    //   return true;
    // }
    // return false;
  }

  mouseReleased = (p5: p5Types) => {
    // if (div) div.endDrag();
  }

  touchStarted = (p5: p5Types) => {
    this.checkDiv();
    return;
  }

  touchEnded = (p5: p5Types) => {
    // if (div) div.endDrag();
    return;
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
        touchStarted={this.touchStarted}
        touchEnded={this.touchEnded}
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

export default connect<StateProps, DispatchProps, ComponentProps, RootState>(mapStateToProps, mapDispatchToProps)(P5Sketch);


