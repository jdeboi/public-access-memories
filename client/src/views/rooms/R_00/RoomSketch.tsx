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

let imgs : any[] = [];
let dx  = 0;

class RoomSketch extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  preload = (p5: p5Types) => {
    const url = "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Craft/"

    for (let i = 1; i < 5; i++) {
      imgs[i-1] = p5.loadImage(url + i + ".png");
    }
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

    loadingDone();
  };

  ////////////////////////////////////////////////////////////////////////
  // DRAW
  ////////////////////////////////////////////////////////////////////////
  draw = (p5: p5Types) => {
    p5.clear();

    this.setDx(p5);
    this.drawBg(p5);
  };

  drawBg = (p5: p5Types) => {
    const w = this.getW(p5);
    p5.push();
    p5.translate(-dx, 0);
    const order = [1, 0, 2, 3];
    for (let i = 0; i < imgs.length; i++) {
      const x = -w + i * w;
      p5.image(imgs[order[i]], x, 0, w, p5.height);
    }
   
    p5.pop();
  }

  getW = (p5: p5Types): number => {
    return p5.height/imgs[0].height * imgs[0].width;
  }

  setDx = (p5: p5Types) => {
    if (p5.mouseX > p5.width/2 + 200) {
      dx += 10;
    }
    else if (p5.mouseX < p5.width/2 - 200){
      dx -= 10;
    }
    dx = p5.constrain(dx, -this.getW(p5), this.getW(p5)*(imgs.length-2)- (p5.width-this.getW(p5)));
  }
  
  clickedCanvas = (p5: p5Types) => {
   

  }



  checkDiv() {
   
  }

  keyPressed = (p5: p5Types) => {
    if (p5.keyCode === p5.DOWN_ARROW) {

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


export default connect<StateProps, DispatchProps, ComponentProps, RootState>(mapStateToProps, {})(RoomSketch);

