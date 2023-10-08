import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { IUser, IUsers } from "../../interfaces";
import { connect } from "react-redux";
import { RootState } from '../../store/store';

interface ComponentProps {
  users: IUsers;
  isClosed: boolean;
  userMove: (x: number, y: number) => void;
  userNewRoom: (room: string) => void;
  loadingDone: () => void;
  toggleOutside: () => void;
  isMobile: boolean;
  setUserActive: (user: IUser) => void;
  clickedUserChat: (user: IUser) => void;
}

// redux props
interface StateProps {
  user: IUser;
}
// dispatch props = functions to execute
interface DispatchProps {
  setFollowingHost: (isFollowing: boolean) => void;
}

interface Props extends ComponentProps, StateProps, DispatchProps { }


class GallerySketch extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  preload = (p5: p5Types) => {
    const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";

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
    const { user, users } = this.props;
    p5.clear(255, 255, 255, 255);


  };


  clickedCanvas = (p5: p5Types) => {

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


export default connect<StateProps, DispatchProps, ComponentProps, RootState>(mapStateToProps, )(GallerySketch);

