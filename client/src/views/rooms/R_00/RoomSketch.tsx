import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { IUser } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from '../../../store/store';
import Fly from '../R_06/p5/Fly';
import { text } from "@fortawesome/fontawesome-svg-core";
import RoomDraggable from '../../Gallery/p5/components/Draggable/RoomDraggable';

interface ComponentProps {
  setSketchVol: (vol: number) => void;
  loadingDone: () => void;
  isMobile: boolean;
}

// redux props
interface StateProps {
  user: IUser;
}
// dispatch props = functions to execute
interface DispatchProps {
}

interface Props extends ComponentProps, StateProps, DispatchProps { }

let lightImgs: p5Types.Image[] = [];
let flies: any = [];
let banana: p5Types.Image;
let spoiledWindow: any;

class RoomSketch extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  preload = (p5: p5Types) => {
    const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";
    // const url = "http://localhost:3000/online_assets/banana.jpeg";
    banana = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/deBoisblanc/rotten4.jpeg");

    lightImgs[0] = p5.loadImage(url + "tracklights/tracklights_vert.jpg");
    lightImgs[1] = p5.loadImage(url + "tracklights/light_shadow.png");
    lightImgs[2] = p5.loadImage(url + "tracklights/tracklights_dark_vert.jpg");
    lightImgs[3] = p5.loadImage(url + "tracklights/black_shadow.png");

  }

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////
  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { user, loadingDone } = this.props;
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)

    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.clickedCanvas(p5));

    for (let i = 0; i < 10; i++) {
      flies.push(new Fly(p5));
    }

    const w = 500;
    const h = 333;
    spoiledWindow = new RoomDraggable(0, (p5.width - w) / 2, (p5.height - h) / 2, w, h, p5, banana, lightImgs[3])
    loadingDone();
  };

  ////////////////////////////////////////////////////////////////////////
  // DRAW
  ////////////////////////////////////////////////////////////////////////
  draw = (p5: p5Types) => {
    p5.clear();

    // p5.background(255);
    // let w = banana.width*.3;
    // let h = banana.height*.3;
    // p5.image(banana, (p5.width-w)/2, (p5.height-h)/2, w, h);

    spoiledWindow.display();
    spoiledWindow.displayToolBar();
    spoiledWindow.update();

    for (const fly of flies) {
      fly.setTarget(spoiledWindow.x + spoiledWindow.w / 2, spoiledWindow.y + spoiledWindow.h / 2);
      fly.move();
      fly.display();
    }



    // p5.fill(0);
    // p5.text(p5.frameRate(), 10, 10);
    if (p5.frameCount % 20 === 0)
      this.setVolume(p5);
  };

  getNumFlying() {
    let n = 0;
    for (const fly of flies) {
      if (fly.isFlying) {
        n++;
      }
    }
    return n;
  }

  setVolume(p5: p5Types) {
    const { setSketchVol } = this.props;
    let v = p5.map(this.getNumFlying(), 0, flies.length, 0, 1);
    setSketchVol(v);
  }

  clickedCanvas = (p5: p5Types) => {
    for (const fly of flies) {
      fly.clicked();
    }
    this.checkDiv();

  }



  checkDiv() {
    if (spoiledWindow.checkButtons(0, 0)) {
      return true;
    }
    else if (spoiledWindow.checkDragging(0, 0)) {
      return true;
    }
    return false;
  }

  keyPressed = (p5: p5Types) => {
    if (p5.keyCode === p5.DOWN_ARROW) {

    }
  }

  mouseReleased = (p5: p5Types) => {
    if (spoiledWindow) spoiledWindow.endDrag();
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


export default connect<StateProps, DispatchProps, ComponentProps, RootState>(mapStateToProps, {})(RoomSketch);

