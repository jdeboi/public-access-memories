import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import HitBox from "./HitBox";
import { IUser, IUsers, IWindowUI } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { setFollowingHost } from "../../../store/user";

//////////////
// CONFIG
import { Dispatch } from "@reduxjs/toolkit";
import { GlobalConfig } from "../../../data/Shows/HomeOffices/GlobalConfig";

import { filterGalleryUsers } from "../../../helpers/helpers";

import {
  showMouseLoc,
  mouseDidMove,
} from "../../Gallery/Gallery1/functions/destination";

import {
  reachedDestination,
  getNextStep,
} from "../../Gallery/Gallery4HomeOffices/functions/destination";

import {
  checkUserClicked,
  drawUser,
  drawUsers,
} from "../../Gallery/Gallery4HomeOffices/functions/users";

import {
  endDivDrag,
  updateDivs,
  checkDivPress,
} from "../../Gallery/Gallery4HomeOffices/functions/divs";

import { PAM_URL } from "../../Gallery/functions/loadImages";
import {
  checkUserClickedNormalRoom,
  drawUsersRoomCoords,
} from "../../Gallery/Gallery1/functions/users";

const S3_URL =
  "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/residency/emrys/";
//////////////

let font;

//////////////
// DRAGGABLE DIVS
var divs = {};

// MOVEMENT
const movement = {
  isWalking: false,
  stepTo: { x: 0, y: 0 },
  userEase: { x: 0, y: 0 },
  destination: { x: 0, y: 0, time: new Date() },
  lastMouseMove: new Date(),
  lastStepTime: 0,
};

let textVisible = false;
let qtextVisible = false;

const images = {};

const txtBoundary = 315;
const txtIconPos = { x: 0, y: 0 };
const qIconPos = { x: 0, y: 0 };

const hitBoxes = [];

class GallerySketchEmrys extends React.Component {
  constructor(props) {
    super(props);
  }

  preload = (p5) => {
    images.branch1 = p5.loadImage(S3_URL + "branch1.png");
    images.branch2 = p5.loadImage(S3_URL + "branch2.png");
    images.goldenrod = p5.loadImage(S3_URL + "goldenrod.png");
    images.bush2 = p5.loadImage(S3_URL + "bush2.png");
    images.bush3 = p5.loadImage(S3_URL + "bush3.png");
    images.txticon = p5.loadImage(S3_URL + "txticon_sm.png");
    images.qicon = p5.loadImage(S3_URL + "qicon_sm.png");
    images.txt1 = p5.loadImage(S3_URL + "textTest0.png");
    images.txt2 = p5.loadImage(S3_URL + "textTest4.png");
    images.txt3 = p5.loadImage(S3_URL + "textTest5.png");
    images.bench = p5.loadImage(S3_URL + "bench.png");
    images.stick1 = p5.loadImage(S3_URL + "stick1.png");
    images.stick2 = p5.loadImage(S3_URL + "stick2.png");
    font = p5.loadFont(PAM_URL + "fonts/sysfont.woff");

    hitBoxes.push(new HitBox(p5.windowWidth / 4, 100, 175, 175, images.txt2));
    hitBoxes.push(new HitBox(200, p5.windowHeight / 2, 175, 175, images.txt1));
    hitBoxes.push(
      new HitBox(
        p5.windowWidth / 2,
        p5.windowHeight - 300,
        215,
        215,
        images.txt3
      )
    );
  };

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////

  setup = (p5, canvasParentRef) => {
    const { user, loadingDone, windowUI, userMove } = this.props;

    p5.textFont(font, 14);
    const cnv = p5.createCanvas(windowUI.contentW, windowUI.contentH);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));
    p5.pixelDensity(2);
    this.initDivs(p5);

    txtIconPos.x = p5.windowWidth / 12;
    txtIconPos.y = p5.windowHeight / 12;
    qIconPos.x = p5.windowWidth - txtIconPos.x - 50;
    qIconPos.y = p5.windowHeight / 2;

    loadingDone();
    this.setUserInitialPosition(p5);
  };

  initDivs = (p5) => {};

  setUserInitialPosition = (p5) => {
    let dx = Math.floor(p5.random(-20, 20));
    let dy = Math.floor(p5.random(-20, 20));
    let x = Math.floor(p5.width / 2 + dx);
    let y = Math.floor(p5.height / 2 + dy);
    this.setUserPositionImmediate(x, y);
  };

  draw = (p5) => {
    const { user, users } = this.props;

    p5.clear(0, 0, 0, 0);

    this.drawScene(p5);

    if (users) {
      p5.textFont(font, 34);
      drawUsersRoomCoords(
        user,
        filterGalleryUsers(user, users),
        "/emrys",
        font,
        p5,
        []
      );
    }

    p5.image(images.txticon, txtIconPos.x, txtIconPos.y);

    if (textVisible) this.showText(p5);
    if (qtextVisible) this.showQText(p5);

    p5.push();
    p5.translate(movement.userEase.x, movement.userEase.y);
    drawUser(user, p5, []);
    p5.pop();

    //////////////
    // step visualization
    this.mouseStep(p5);
    this.showTarget(p5);

    this.drawOverTarget(p5);
    this.drawOverUser(p5);

    p5.noStroke();
    p5.fill(255);
    // p5.textFont(font, 30);

    this.updateUserEase(p5);
    if (
      p5.width !== this.props.windowUI.contentW ||
      p5.height !== this.props.windowUI.contentH
    )
      this.manualResize(p5);

    // this.displayFrameRate(p5);
  };

  ////////////////////////////////////////////////////////////////////////
  // EMRYS

  drawScene = (p5) => {
    p5.image(images.bench, p5.windowWidth / 2, p5.windowHeight / 2, 200, 120);

    p5.image(images.bush3, images.bush3.width / 2, -100);
    p5.image(
      images.bush2,
      p5.windowWidth - images.bush2.width * 0.9,
      p5.windowHeight - images.bush2.height * 0.75
    );
    p5.image(images.goldenrod, 0, p5.windowHeight - images.goldenrod.height);
    p5.image(
      images.goldenrod,
      p5.windowWidth / 2,
      p5.windowHeight - images.goldenrod.width,
      images.goldenrod.height / 2
    );
    p5.image(
      images.branch2,
      -50,
      p5.windowHeight - images.branch2.height * 1.5
    );

    p5.noFill();
    p5.stroke(255);
    p5.textSize(18);

    this.displayHitBoxes(p5);

    // in front of text:
    p5.image(images.branch1, p5.windowWidth - images.branch1.width, 0);
    p5.image(images.branch1, p5.windowWidth - images.branch1.width / 2, 100);
    p5.image(
      images.stick1,
      p5.windowWidth / 2 + 100,
      p5.windowHeight - images.stick1.height * 0.75,
      images.stick1.width * 0.75,
      images.stick1.height * 0.75
    );
    p5.image(
      images.stick2,
      p5.windowWidth / 3,
      p5.windowHeight - 100,
      200,
      200
    );
    p5.image(images.branch2, -210, p5.windowHeight / 3 - 20);
  };

  displayHitBoxes = (p5) => {
    const { user } = this.props;
    for (const hitBox of hitBoxes) {
      hitBox.draw(p5, user.roomX, user.roomY);
    }
  };

  showText = (p5) => {
    // p5.filter(p5.BLUR, 2);
    const tx = images.txticonX * 2;
    const ty = images.txticonY;

    const texts = [
      "Imagine a forest. Is it thick? Are you warm? Do you feel the humidity of late summer, the trees and plants pressing into you (and the noise)?",
      "Or is it early spring - the new shots, green and fragile, pushing through last season's death?",
      "What do you hear? Do you hear the bird song, along the top of the trees? Sounds of cars passing in the distance, insulated in the thick grove?",
      "And the bugs?",
      "Maybe if you are lucky you can hear soft whispers, footsteps.",
      "If you turn a corner will you see them? The glint of a ringed finger, well worn jeans against a tree, the shape of a knee on flattened grass.",
      "Ghosts of those who have come to the forest before – leaning against a sappy tree, settled into the soft earth, still, alert, and waiting.",
    ];

    const positions = [
      [tx, ty],
      [tx, ty * 3],
      [tx, ty * 5],
      [tx, ty * 7],
      [tx * 3, ty * 7],
      [tx * 3, p5.windowHeight * 0.75],
      [p5.windowWidth * 0.75, p5.windowHeight * 0.75],
    ];

    p5.noFill();
    p5.stroke(255);
    p5.strokeWeight(1);
    p5.textSize(18);
    texts.forEach((text, i) => {
      const [x, y] = positions[i];
      p5.text(text, x, y, txtBoundary);
    });

    if (textVisible) p5.image(images.qicon, qIconPos.x, qIconPos.y);
  };

  showQText = (p5) => {
    // p5.filter(p5.BLUR, 2);
    p5.noFill();
    p5.stroke(255);
    p5.strokeWeight(1);
    p5.textSize(18);
    const text =
      "Desiring community, connection, sex, or some combination, public parks emerged as centers for cruising folk. A frenzy of moral panic, which gained momentum during the AIDS epidemic, allowed for heightened scrutiny and policing of public zones. Often trees were knocked down, stalls cleared. Open park plans no longer offered crevices to hold these clandestine acts. And alongside this disaster, the Internet began to grow.";
    p5.text(text, p5.windowWidth / 1.5, txtIconPos.y, txtBoundary);
  };

  emrysMousePressed = (p5) => {
    if (this.overImage(p5, txtIconPos, images.txticon)) {
      textVisible = !textVisible;
      qtextVisible = false;

      return true;
    }
    if (textVisible && this.overImage(p5, qIconPos, images.qicon)) {
      qtextVisible = !qtextVisible;
      return true;
    }
    return false;
  };

  overImage = (p, iconPos, icon) => {
    return (
      p.mouseX >= iconPos.x &&
      p.mouseX <= iconPos.x + icon.width &&
      p.mouseY >= iconPos.y &&
      p.mouseY <= iconPos.y + icon.height
    );
  };

  ///////////////////////////////////////////////////////////////////////

  displayFrameRate = (p5) => {
    p5.fill(0);
    p5.noStroke();
    // p5.textFont(font, 12);
    p5.text(p5.round(p5.frameRate()), 30, 30);
  };

  drawOverTarget = (p5) => {
    const { user, users } = this.props;
    p5.push();

    if (users) {
      // p5.textFont(font, 34);
      drawUsersRoomCoords(
        user,
        filterGalleryUsers(user, users),
        "/emrys",
        font,
        p5,
        []
      );
    }

    p5.pop();
  };

  drawOverUser = (p5) => {
    const { user } = this.props;
    p5.push();

    const userEase = { x: 0, y: 0 };

    // p5.textFont(font, 12);
    // displayFolderDivs(room, divs);

    p5.pop();
  };

  manualResize = (p5) => {
    this.windowResized(p5);

    txtIconPos.x = p5.windowWidth / 12;
    txtIconPos.y = p5.windowHeight / 12;
    qIconPos.x = p5.windowWidth - txtIconPos.x - 50;
    qIconPos.y = p5.windowHeight / 2;
  };
  ////////////////////////////////////////////////////////////////////////
  // MOVEMENT
  ////////////////////////////////////////////////////////////////////////
  showTarget = (p5) => {
    const { windowUI } = this.props;
    const { userEase, destination, isWalking } = movement;

    if (mouseDidMove(p5)) {
      movement.lastMouseMove = new Date();
    }
    showMouseLoc(windowUI.isMobile, movement.lastMouseMove, p5);
  };

  userTakeStep = (p5, x, y) => {
    const { stepTo } = movement;
    movement.lastStepTime = p5.millis();

    let space = GlobalConfig.scaler; //40;
    const userStep = { x: stepTo.x + x * space, y: stepTo.y + y * space };

    if (userStep.x > p5.width) {
      this.stopWalking();
    } else if (userStep.y > p5.height) {
      this.stopWalking();
    } else if (userStep.x < 0) {
      this.stopWalking();
    } else if (userStep.y < 0) {
      this.stopWalking();
    } else {
      stepTo.x = userStep.x;
      stepTo.y = userStep.y;
    }
  };

  stopWalking = () => {
    movement.isWalking = false;
  };

  setUserPosition = (x, y) => {
    this.stopWalking();
    movement.stepTo.x = x;
    movement.stepTo.y = y;
    movement.destination.x = x;
    movement.destination.y = y;
    this.props.userMove(x, y);
  };

  setUserPositionImmediate = (x, y) => {
    this.stopWalking();
    movement.userEase.x = x;
    movement.userEase.y = y;
    movement.stepTo.x = x;
    movement.stepTo.y = y;
    movement.destination.x = x;
    movement.destination.y = y;
    this.props.userMove(x, y);
  };

  updateUserEase = (p5) => {
    const { userMove } = this.props;
    const { userEase, stepTo } = movement;
    if (!reachedDestination(userEase, stepTo)) {
      let amt = 0.7;
      userEase.x = userEase.x * amt + stepTo.x * (1 - amt);
      userEase.y = userEase.y * amt + stepTo.y * (1 - amt);
      let d = p5.dist(userEase.x, userEase.y, stepTo.x, stepTo.y);
      if (d < 15) {
        movement.userEase.x = stepTo.x;
        movement.userEase.y = stepTo.y;
        userMove(userEase.x, userEase.y);
      }
    }
  };

  triggerMove = (p5) => {
    if (this.emrysMousePressed(p5)) {
      return;
    }
    const { user, users, setUserActive } = this.props;
    let userClicked = null;

    if (users)
      userClicked = checkUserClickedNormalRoom(user, users, p5, "/emrys");
    if (userClicked) {
      setUserActive(userClicked);
      return;
    } else if (checkDivPress(0, divs)) {
      return;
    } else {
      let steps = GlobalConfig.scaler - 20;
      const dx = p5.mouseX > user.roomX ? steps : -steps;
      const dy = p5.mouseY > user.roomY ? steps : -steps;
      const mx = p5.mouseX;
      const my = p5.mouseY;

      if (!(mx === 0 && my === 0)) {
        const x = mx;
        const y = my;
        movement.destination.x = x;
        movement.destination.y = y;
        movement.destination.time = new Date();
        movement.isWalking = true;
      }
    }
  };

  mouseStep = (p5) => {
    const t = new Date().getTime() - movement.destination.time.getTime();
    const { user } = this.props;
    if (movement.isWalking) {
      if (reachedDestination(movement.stepTo, movement.destination)) {
        this.setUserPositionImmediate(
          movement.destination.x,
          movement.destination.y
        );
        movement.isWalking = false;
      } else if (t > 150) {
        let step = getNextStep(movement.stepTo, movement.destination, true);
        this.userTakeStep(p5, step[0], step[1]);
        movement.destination.time = new Date();
      }
    }
  };

  keyPressed = (p5) => {
    if (p5.frameCount > 0) {
      if (p5.keyCode === p5.UP_ARROW) {
        this.userTakeStep(p5, 0, -1);
      } else if (p5.keyCode === p5.RIGHT_ARROW) {
        this.userTakeStep(p5, 1, 0);
      } else if (p5.keyCode === p5.LEFT_ARROW) {
        this.userTakeStep(p5, -1, 0);
      } else if (p5.keyCode === p5.DOWN_ARROW) {
        this.userTakeStep(p5, 0, 1);
      }
    }
    return;
  };

  mouseReleased = (p5) => {
    if (p5.frameCount > 0) {
      endDivDrag(divs);
    }
  };

  mouseMoved = (p5) => {};

  windowResized = (p5) => {
    const { windowUI } = this.props;
    p5.resizeCanvas(windowUI.contentW, windowUI.contentH);
    this.setUserBoundaries(p5);
  };

  setUserBoundaries = (p5) => {
    const { user } = this.props;
    let x = user.roomX;
    let y = user.roomY;
    if (x > p5.width - 50) {
      x = p5.width - 50;
    }
    if (y > p5.height - 50) {
      y = p5.height - 50;
    }
    this.setUserPositionImmediate(x, y);
  };

  doubleClicked = (p5) => {
    if (p5.frameCount > 0) {
      // checkFolderDivsDouble(this.getRoomLayoutNum(), divs);
      // checkTrashDivsDouble(this.getRoomLayoutNum(), divs);
    }
    return;
  };

  render() {
    // TODO - key & mouse listeners called twice (like 2 instances... one always at frame count 0)
    return (
      <>
        <Sketch
          preload={this.preload}
          setup={this.setup}
          draw={this.draw}
          windowResized={this.windowResized}
          mouseMoved={this.mouseMoved}
          keyPressed={this.keyPressed}
          mouseReleased={this.mouseReleased}
          doubleClicked={this.doubleClicked}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GallerySketchEmrys);
