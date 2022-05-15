import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { IUser } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from '../../../store/store';

interface ComponentProps {
  loadingDone: () => void;
  isMobile: boolean;
  hasStarted: boolean;
}

// redux props
interface StateProps {
  user: IUser;
}
// dispatch props = functions to execute
interface DispatchProps {
}

interface Props extends ComponentProps, StateProps, DispatchProps { }

let vid : any;
let vidDim = {x: 0, y: 0, w: 1920, h: 1080};
let isPlaying = false;

class RoomSketch extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  preload = (p5: p5Types) => {

    vid = p5.createVideo(['https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/sidney/sidney.mp4']);
    vid.hide(); // by default video shows up in separate dom
    // element. hide it and draw it to the canvas
    // instead
  }

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////
  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { user, loadingDone } = this.props;

    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.clickedCanvas(p5));
   
    loadingDone();
  };

  ////////////////////////////////////////////////////////////////////////
  // DRAW
  ////////////////////////////////////////////////////////////////////////
  draw = (p5: p5Types) => {
    if (!isPlaying && this.props.hasStarted) {
      isPlaying = true;
      vid.play();
    }

    // p5.clear();
    // p5.background(255, 0, 0);

    // this.manualResize(p5);
    this.flicker(p5);
    this.displayVid(p5);

  };

  flicker = (p5: p5Types) => {

    if (p5.frameCount % 80 === 0) {
      vidDim.w = Math.min(p5.width, 800) + Math.floor(p5.random(-200, 200));
      vidDim.h = vidDim.w/1920 * 1080;
      
      vidDim.x = p5.random(0, p5.width - vidDim.w);
      vidDim.y = p5.random(0, p5.height - vidDim.h);
    }
    
  }

  displayVid = (p5: p5Types) => {
    p5.image(vid, vidDim.x, vidDim.y, vidDim.w, vidDim.h);
  }

  clickedCanvas = (p5: p5Types) => {


  }


  keyPressed = (p5: p5Types) => {
    if (p5.keyCode === p5.DOWN_ARROW) {

    }
  }

  mouseDragged = (p5: p5Types) => {

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
        mouseDragged={this.mouseDragged}
      />
    );
  }
};


const mapStateToProps = (state: RootState) => ({
  user: state.user,
});


export default connect<StateProps, DispatchProps, ComponentProps, RootState>(mapStateToProps, {})(RoomSketch);

