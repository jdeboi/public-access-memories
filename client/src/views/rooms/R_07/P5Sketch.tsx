import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { connect } from "react-redux";
import { RootState } from '../../../store/store';
import { Dispatch } from "@reduxjs/toolkit";
import Wasp from "./Wasp";
import Light from "./Light";
import Tree from "./Tree";
interface ComponentProps {
  hasStarted: boolean;
  isMobile: boolean;
  sceneNum: number;
  loadingDone: () => void;

}
interface StateProps { } // redux props
interface DispatchProps { } // dispatch props = functions to execute
interface Props extends ComponentProps, StateProps, DispatchProps { }



let font: p5Types.Font;
let div: any;
let waterVid: any;
let img: p5Types.Image;
let headBg: p5Types.Image;
let headImg: p5Types.Image;
let firstStarted = false;
let headX = 0;
let t = 0;

let waspBg: p5Types.Image;
const wasps: Wasp[] = [];
let wasp1Img: p5Types.Image;
let wasp2Img: p5Types.Image;
let wasp3Img: p5Types.Image;

let nycBg: p5Types.Image;
const nycLights: Light[] = [];

let tree: Tree;
let treeBg: p5Types.Image;

class P5Sketch extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }


  preload = (p5: p5Types) => {
    // waterVid = p5.createVideo(['https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/water.mp4']);
    // waterVid.hide(); // by default video shows up in separate dom  
    // waterVid.noLoop();

    headBg = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/headbg.jpg");
    headImg = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/head.png");

    wasp1Img = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/wasps/wasp1.png");
    wasp2Img = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/wasps/wasp2.png");
    wasp3Img = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/wasps/wasp3.png");


    waspBg = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/wasps/Background.jpg");
    for (let i = 0; i < 12; i += 3) {
      wasps[i] = new Wasp(wasp1Img, p5);
      wasps[i + 1] = new Wasp(wasp2Img, p5);
      wasps[i + 2] = new Wasp(wasp3Img, p5);
    }

    nycBg =  p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/nyc/bg2.jpg");
    let light1 = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/nyc/lightbot.png");
    let light2 = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/nyc/lightmid.png");
    let light3 = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/nyc/lighttp.png");
   
   
    nycLights[0] = new Light(1316, 267, light3, p5); //1320, 260 //-480
    nycLights[1] = new Light(1380, 308, light2, p5); // 1410, 340
    nycLights[2] = new Light(1460, 1290, light1, p5); // 1460, 1290 - 460

    tree = new Tree(825, 530, p5);
    treeBg = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/treebg.jpg");
   
    // img = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/lizz/without_water.png");
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
    const { sceneNum } = this.props;

    // this.getFirstClip();

    switch (sceneNum % 4) {
      case 0:
        // this.display0(p5);
        this.displayTree(p5);
        break;
      case 1:
        this.displayHead(p5);
        break;
      case 2:
        this.displayWasps(p5);
        break;
      case 3:
        this.displayNYCLights(p5);
        break;
      default:
        this.displayHead(p5);

    }

    // div.display();
    // div.displayToolBar();
    // div.update();

    // p5.fill(255);
    // p5.noStroke();
    // p5.textSize(50);
    // p5.text(p5.round(p5.frameRate()), 140, 140);

    if (p5.windowWidth !== window.innerWidth || p5.windowHeight !== window.innerHeight)
      this.manualResize(p5);
  };

  display0 = (p5: p5Types) => {
    if (waterVid) {
      const { x, y, w, h } = this.getCoverImgCenterDim(waterVid, p5);
      p5.background('blue');
      p5.image(waterVid, x, y, w, h);
    }

    if (img) {
      p5.clear();
      let imgDim = this.getCoverImgCenterDim(img, p5, img.width, img.height);
      p5.image(img, imgDim.x, imgDim.y, imgDim.w, imgDim.h);
    }

  }

  displayTree = (p5: p5Types) => {
    const { x, y, w, h } = this.getCoverImgCenterDim(treeBg, p5, treeBg.width, treeBg.height);
    p5.image(treeBg, x, y, w, h);
    p5.push();
    p5.translate(x, y);
    let factor = w/treeBg.width;
    tree.display(factor);
    p5.pop();
  }

  displayHead = (p5: p5Types) => {
    p5.clear();
    const { x, y, w, h } = this.getCoverImgCenterDim(headBg, p5);
    p5.image(headBg, x, y, w, h);


    const factor = p5.min((p5.height * .7) / headImg.height, 1);
    const dy = p5.height * .1 * p5.sin(p5.millis() / 1000);
    const hHead = headImg.height * factor;
    const wHead = headImg.width * factor;
    p5.image(headImg, headX, p5.height / 2 + dy - hHead / 2, wHead, hHead);

    headX++;
    if (headX > p5.width) {
      headX = -wHead;
    }

  }

  displayNYCLights = (p5: p5Types) => {
    p5.clear();
    const { x, y, w, h } = this.getCoverImgCenterDim(waspBg, p5, nycBg.width, nycBg.height);
    p5.image(nycBg, x, y, w, h);
 
    p5.push();
    p5.translate(x, y);
    const factor = w/nycBg.width;
    for (const light of nycLights) {
      light.display(factor);
    }
    p5.pop();
  }

  displayWasps = (p5: p5Types) => {
    p5.clear();
    const { x, y, w, h } = this.getCoverImgCenterDim(waspBg, p5, waspBg.width, waspBg.height);
    p5.image(waspBg, x, y, w, h);

    for (const wasp of wasps) {
      wasp.display();
    }

  }


  getFirstClip = () => {
    if (waterVid) {
      if (!firstStarted && this.props.hasStarted) {
        waterVid.play();
        waterVid.loop();
        firstStarted = true;
      }
    }
  }

  displayWater = (p5: p5Types) => {
    //https://www.dwitter.net/d/10765
    p5.noStroke();
    // p5.pixelDensity(1 / 7) //important

    p5.fill('teal');
    p5.rect(0, 0, p5.width, p5.height);

    p5.push();
    p5.scale(12)
    p5.fill(0, 0, 255, 50);
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 50; j++) {
        p5.ellipse(i, j, (p5.sin(j * j + i / j - t * 7) + p5.cos(j ** 5 - i / j * 6 + t) ** 3) * j / 50, 1);
      }
    }
    p5.pop();

    t += .01;
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

  keyPressed = (p5: p5Types) => {
    // TODO - why run twice?
    // ah, because of strict mode?
    // causes component to render twice...
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
    if (p5.frameCount > 0) {

    }
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


