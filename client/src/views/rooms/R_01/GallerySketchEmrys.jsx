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

let branch1,
  branch2,
  goldenrod,
  bush2,
  bush3,
  bush4,
  goldenrod2,
  bush5,
  honey,
  bush6;
let bench, stick1, stick2, ivy;

let textBoxes = [];
let frontPlants = [];
let backPlants = [];

let textBox;
let plantImage;

class GallerySketchEmrys extends React.Component {
  constructor(props) {
    super(props);
  }

  preload = (p5) => {
    branch1 = p5.loadImage(S3_URL + "branch1.png");
    branch2 = p5.loadImage(S3_URL + "branch2.png");
    goldenrod = p5.loadImage(S3_URL + "goldenrod.png");
    bush2 = p5.loadImage(S3_URL + "bush2.png");
    bush3 = p5.loadImage(S3_URL + "bush3.png");

    bench = p5.loadImage(S3_URL + "bench.png");
    stick1 = p5.loadImage(S3_URL + "stick1.png");
    stick2 = p5.loadImage(S3_URL + "stick2.png");
    ivy = p5.loadImage(S3_URL + "ivy.png");
    bush4 = p5.loadImage(S3_URL + "bush4.png");
    goldenrod2 = p5.loadImage(S3_URL + "goldenrod2.png");
    bush5 = p5.loadImage(S3_URL + "bush5.png");
    honey = p5.loadImage(S3_URL + "honeysuckle.png");
    bush6 = p5.loadImage(S3_URL + "bush6.png");
    font = p5.loadFont(PAM_URL + "fonts/sysfont.woff");
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

    this.createPlants(p5);
    this.createTextBoxes(p5);

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

    this.drawSceneBack(p5);

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

    this.updateTextBoxes(p5);
    this.updatePlantImgs(p5);

    p5.push();
    p5.translate(movement.userEase.x, movement.userEase.y);
    drawUser(user, p5, []);
    p5.pop();

    this.drawSceneFront(p5);

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

  drawSceneBack(p) {
    p.textFont("Courier New");
    p.clear(0, 0, 0, 0);

    p.image(bench, p.width / 2, p.height / 2, 200, 120);

    p.noFill();
    p.stroke(255);
    p.textSize(18);
    this.displayBackPlantImgs(p);
    this.displayTextBoxes(p);
  }

  drawSceneFront(p) {
    this.displayFrontPlantImgs(p);
  }

  displayTextBoxes(p) {
    for (const textBox of textBoxes) {
      textBox.draw(p);
    }
  }

  displayBackPlantImgs(p) {
    for (const plantImg of backPlants) {
      plantImg.draw(p);
    }
  }

  displayFrontPlantImgs(p) {
    for (const plantImg of frontPlants) {
      plantImg.draw(p);
    }
  }

  // HERE U CAN PUT USER X, Y
  updateTextBoxes(p) {
    for (const textBox of textBoxes) {
      textBox.update(movement.userEase.x, movement.userEase.y, p);
    }
  }

  updatePlantImgs(p) {
    const { x, y } = movement.userEase;
    for (const plantImg of backPlants) {
      plantImg.update(x, y, p);
    }
    for (const plantImg of frontPlants) {
      plantImg.update(x, y, p);
    }
  }

  createPlants(p) {
    backPlants = [];
    frontPlants = [];
    backPlants.push(
      new PlantImg(
        p.width / 3,
        0,
        bush5,
        bush5.width * 0.75,
        bush5.height * 0.75,
        0,
        0.5,
        0.05,
        30
      )
    );

    backPlants.push(
      new PlantImg(
        p.width / 2,
        0,
        bush3,
        646 * 0.75,
        412 * 0.75,
        0,
        0.5,
        0.05,
        30
      )
    );

    backPlants.push(
      new PlantImg(
        p.width - p.width / 3,
        50,
        goldenrod2,
        goldenrod2.width * 0.75,
        goldenrod2.height * 0.75,
        0,
        0.5,
        0.05,
        30
      )
    );

    backPlants.push(
      new PlantImg(
        50,
        p.height,
        bush4,
        646 * 0.75,
        412 * 0.75,
        0,
        0.5,
        0.05,
        30
      )
    );

    backPlants.push(
      new PlantImg(
        p.width / 2,
        p.height - 50,
        bush4,
        646 * 0.75,
        412 * 0.75,
        0,
        0.5,
        0.05,
        30
      )
    );

    backPlants.push(
      new PlantImg(
        p.width - 200,
        p.height - 70,
        bush2,
        752,
        336,
        30,
        0.5,
        0.05,
        30
      )
    );

    backPlants.push(
      new PlantImg(0, p.height - 600 / 2, goldenrod, 406, 614, 0, 0.5, 0.05, 30)
    );

    backPlants.push(
      new PlantImg(
        p.width / 3,
        p.height - 600 / 4,
        goldenrod,
        406,
        614,
        30,
        0.5,
        0.05,
        30
      )
    );

    backPlants.push(
      new PlantImg(
        506 / 3,
        p.height - 300,
        branch2,
        506,
        360,
        50,
        0.5,
        0.05,
        30
      )
    );

    frontPlants.push(
      new PlantImg(
        p.width - 200,
        50,
        bush5,
        646 * 0.75,
        412 * 0.75,
        0,
        0.5,
        0.05,
        30
      )
    );

    //FRONT

    frontPlants.push(
      new PlantImg(
        p.width + 30,
        p.height / 2,
        bush6,
        bush6.width * 0.75,
        bush6.height * 0.75
      )
    );

    frontPlants.push(
      new PlantImg(p.width - 50, 50, branch1, 450, 450, 30, 0.5, 0.05, 30)
    );

    frontPlants.push(
      new PlantImg(p.width - 100, 200, branch1, 400, 400, 100, 0.5, 0.05, 30)
    );

    frontPlants.push(
      new PlantImg(
        p.width / 2 - 100,
        p.height - 100,
        stick1,
        stick1.width * 0.75,
        stick1.height * 0.75,
        50,
        0.5,
        0.05,
        30
      )
    );

    frontPlants.push(
      new PlantImg(
        250,
        p.height - 100,
        stick2,
        stick2.width * 0.5,
        stick2.height * 0.5,
        50,
        0.5,
        0.05,
        30
      )
    );

    frontPlants.push(
      new PlantImg(
        0,
        p.height / 3 - 20,
        branch2,
        branch2.width,
        branch2.height,
        100,
        0.5,
        0.05,
        30
      )
    );

    frontPlants.push(
      new PlantImg(
        p.width / 2 + 200,
        100,
        ivy,
        394 * 0.75,
        634 * 0.75,
        100,
        0.5,
        0.05,
        30
      )
    );

    frontPlants.push(
      new PlantImg(
        p.width - 50,
        p.height - 200,
        stick1,
        stick1.width / 2,
        stick1.height / 2,
        30,
        0.5,
        0.05,
        30
      )
    );

    frontPlants.push(
      new PlantImg(
        p.width - 100,
        p.height - 100,
        honey,
        honey.width / 2,
        honey.height / 2,
        50,
        0.5,
        0.05,
        30
      )
    );
  }

  createTextBoxes(p) {
    // TEXT BOXES

    textBoxes.push(
      new TextBox(
        p.width / 2 + 200,
        50,
        350,
        "I love to put on trashy or innocent lingerie and fantasize about being with another crossdresser. I'd love to rub my lace and garters against another wearing the same!!",
        p
      )
    );

    textBoxes.push(
      new TextBox(
        p.width / 2,
        p.height - 200,
        300,
        "I, too, am a TV and I am dressed in some sexy lingerie as I write this to you.  What city and area are you from. Please write and tell me about yourself and matbe we can meet.",
        p
      )
    );

    textBoxes.push(
      new TextBox(
        200,
        p.height / 2,
        300,
        "If you would like to meet and do the kinds of things we men are known to do behind closed doors, f-me a message, and then come over and F-me!  P.S.  Or I can F-you, or we can F-each other.",
        p
      )
    );

    textBoxes.push(
      new TextBox(
        p.width - 200,
        p.height / 3,
        300,
        "Local and State Police Vice Squads are beginning to harass Bulletin Boards in some states. The definition of pornographic material is very vague and probably will take some court cases to fully define. The definition of reasonable proof of age is also vague. This situation may force some changes on BBS's including this one… ",
        p
      )
    );

    textBoxes.push(
      new TextBox(
        250,
        75,
        450,
        "The gardens have been reduced to a manicured, undulating public green. It’s pleasant enough. There’s a basketball court. Joggers circulate. At lunchtime, office workers stroll the paths. A man might hold my eye contact briefly—very different from the carnivorous stares inside the club.",
        p
      )
    );

    textBoxes.push(
      new TextBox(
        p.width / 2 + 300,
        p.height / 2 + 100,
        150,
        "Come one, come all.  I'll be waiting.",
        p
      )
    );

    textBoxes.push(
      new TextBox(
        200,
        p.height - 100,
        300,
        "Verbal abuse and public and private humiliation readily accepted and beg for more.",
        p
      )
    );

    textBoxes.push(
      new TextBox(
        p.width - 250,
        p.height - 100,
        500,
        "be careful in that area.  There were many bashings along that stretch of beach last year.  Also the cops generally roust out everybody around 10 so go early.",
        p
      )
    );

    textBoxes.push(
      new TextBox(
        p.width - 300,
        100,
        330,
        "and I'll remember him for a long long time.....oh, and as I drive past/thru the forest preserves, I'll look for his pickup truck again!",
        p
      )
    );

    textBoxes.push(
      new TextBox(
        p.width / 3,
        p.height - 150,
        350,
        "let me know you need your meat serviced.  That's all it takes - we'll go into a booth and you can push me to my knees and take advantage of me",
        p
      )
    );

    textBoxes.push(
      new TextBox(p.width - 200, p.height - 150, 300, "from midnight on", p)
    );
  }
  ////////////////////////////////////////////////////////////////////

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
    this.createPlants(p5);
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

class TextBox {
  constructor(x, y, w, txt, p) {
    this.pos = p.createVector(x, y);
    this.width = w;
    this.text = txt;
    this.opacity = 0;
    this.textSize = 18;
  }

  update(x, y, p) {
    const mousePos = p.createVector(x, y);
    const distance = mousePos.dist(this.pos);
    const distThreshold = 200;
    if (distance < distThreshold) {
      this.opacity = p.map(distance, distThreshold, 40, 0, 255, true);
    }
  }

  draw(p) {
    p.textSize(this.textSize);
    p.rectMode(p.CENTER);
    p.fill(255, this.opacity);
    //p.strokeWeight(2)
    p.noStroke();
    p.text(this.text, this.pos.x, this.pos.y, this.width);
    //p.rect(this.pos.x, this.pos.y, this.width, this.height, 10)
  }
}

class PlantImg {
  constructor(
    x,
    y,
    img,
    imgW,
    imgH,
    avoidDist,
    avoidSpeed,
    returnSpeed,
    maxAway
  ) {
    this.x = x;
    this.y = y;
    this.image = img;
    this.imageWidth = imgW;
    this.imageHeight = imgH;
    this.avoidDistance = avoidDist;
    this.avoidSpeed = avoidSpeed;
    this.returnSpeed = returnSpeed;
    this.maxAway = maxAway;

    this.startX = this.x;
    this.startY = this.y;
  }

  update(x, y, p) {
    // Calculate distance from mouse
    let d = p.dist(x, y, this.x, this.y);

    if (d < this.avoidDistance) {
      // Move away from mouse
      let angle = p.atan2(this.y - y, this.x - x);
      this.x += p.cos(angle) * this.avoidSpeed;
      this.y += p.sin(angle) * this.avoidSpeed;
    }
    if (d > this.avoidDistance + this.maxAway) {
      // Return to starting position smoothly (easing)
      this.x += (this.startX - this.x) * this.returnSpeed;
      this.y += (this.startY - this.y) * this.returnSpeed;
    }
  }

  draw(p) {
    p.push();
    p.imageMode(p.CENTER);
    p.image(this.image, this.x, this.y, this.imageWidth, this.imageHeight);
    p.pop();
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GallerySketchEmrys);
