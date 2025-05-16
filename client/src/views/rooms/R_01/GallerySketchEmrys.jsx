import HitBox from "./HitBox";

//////////////
// CONFIG
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

export const GallerySketchEmrys = (p5) => {
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

  let props = {}; // Accessible everywhere inside your sketch

  p5.updateWithProps = (newProps) => {
    props = newProps;
  };

  p5.preload = () => {
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

  p5.setup = () => {
    const { user, loadingDone, windowUI, userMove } = props || {};

    // p5.textFont(font, 14);

    const cnv = p5.createCanvas(window.innerWidth, window.innerHeight);
    cnv.mousePressed(() => triggerMove(p5));

    //p5.frameRate(20);
    p5.pixelDensity(2);

    initDivs(p5);

    txtIconPos.x = p5.windowWidth / 12;
    txtIconPos.y = p5.windowHeight / 12;
    images.qiconX = p5.windowWidth - txtIconPos.x - 50;
    images.qiconY = p5.windowHeight / 2;

    loadingDone();
    setUserInitialPosition(p5);
  };

  const initDivs = (p5) => {};

  const setUserInitialPosition = (p5) => {
    let dx = Math.floor(p5.random(-20, 20));
    let dy = Math.floor(p5.random(-20, 20));
    let x = Math.floor(p5.width / 2 + dx);
    let y = Math.floor(p5.height / 2 + dy);
    setUserPositionImmediate(x, y);
  };

  p5.draw = () => {
    const { user, users } = props;

    p5.clear(0, 0, 0, 0);

    drawScene(p5);

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

    if (textVisible) showText(p5);
    if (qtextVisible) showQText(p5);

    p5.push();
    p5.translate(movement.userEase.x, movement.userEase.y);
    drawUser(user, p5, []);
    p5.pop();

    //////////////
    // step visualization
    mouseStep(p5);
    showTarget(p5);

    //////////////
    // drawing

    // drawOverTarget(p5);
    // drawOverUser(p5);

    updateUserEase(p5);
    if (
      p5.width !== props.windowUI.contentW ||
      p5.height !== props.windowUI.contentH
    )
      manualResize(p5);

    // displayFrameRate(p5);
  };

  ////////////////////////////////////////////////////////////////////////
  // EMRYS

  const drawScene = (p) => {
    p.image(images.bench, p.windowWidth / 2, p.windowHeight / 2, 200, 120);

    p.image(images.bush3, images.bush3.width / 2, -100);
    p.image(
      images.bush2,
      p.windowWidth - images.bush2.width * 0.9,
      p.windowHeight - images.bush2.height * 0.75
    );
    p.image(images.goldenrod, 0, p.windowHeight - images.goldenrod.height);
    p.image(
      images.goldenrod,
      p.windowWidth / 2,
      p.windowHeight - images.goldenrod.width,
      images.goldenrod.height / 2
    );
    p.image(images.branch2, -50, p.windowHeight - images.branch2.height * 1.5);

    p.noFill();
    p.stroke(255);
    p.textSize(18);

    displayHitBoxes(p);

    // in front of text:
    p.image(images.branch1, p.windowWidth - images.branch1.width, 0);
    p.image(images.branch1, p.windowWidth - images.branch1.width / 2, 100);
    p.image(
      images.stick1,
      p.windowWidth / 2 + 100,
      p.windowHeight - images.stick1.height * 0.75,
      images.stick1.width * 0.75,
      images.stick1.height * 0.75
    );
    p.image(images.stick2, p.windowWidth / 3, p.windowHeight - 100, 200, 200);
    p.image(images.branch2, -210, p.windowHeight / 3 - 20);
  };

  const displayHitBoxes = (p) => {
    for (const hitBox of hitBoxes) {
      hitBox.draw(p, props.user.roomX, props.user.roomY);
    }
  };

  const showText = (p) => {
    p.filter(p.BLUR, 2);
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
      [tx * 3, p.windowHeight * 0.75],
      [p.windowWidth * 0.75, p.windowHeight * 0.75],
    ];

    p.noFill();
    p.stroke(255);
    p.strokeWeight(1);
    p.textSize(18);
    texts.forEach((text, i) => {
      const [x, y] = positions[i];
      p.text(text, x, y, txtBoundary);
    });

    if (textVisible) p.image(images.qicon, images.qiconX, images.qiconY);
  };

  const showQText = (p) => {
    p.filter(p.BLUR, 2);
    p.noFill();
    p.stroke(255);
    p.strokeWeight(1);
    p.textSize(18);
    const text =
      "Desiring community, connection, sex, or some combination, public parks emerged as centers for cruising folk. A frenzy of moral panic, which gained momentum during the AIDS epidemic, allowed for heightened scrutiny and policing of public zones. Often trees were knocked down, stalls cleared. Open park plans no longer offered crevices to hold these clandestine acts. And alongside this disaster, the Internet began to grow.";
    p.text(text, p.windowWidth / 1.5, images.txticonY, txtBoundary);
  };

  const emrysMousePressed = (p5) => {
    if (overImage(p5, txtIconPos, images.txticon)) {
      textVisible = !textVisible;
      qtextVisible = false;

      return true;
    }
    if (textVisible && overImage(p5, qIconPos, images.qicon)) {
      qtextVisible = !qtextVisible;

      return true;
    }
    return false;
  };

  const overImage = (p, iconPos, icon) => {
    return (
      p.mouseX >= iconPos.x &&
      p.mouseX <= iconPos.x + icon.width &&
      p.mouseY >= iconPos.y &&
      p.mouseY <= iconPos.y + icon.height
    );
  };

  ///////////////////////////////////////////////////////////////////////

  const displayFrameRate = (p5) => {
    p5.fill(0);
    p5.noStroke();
    // p5.textFont(font, 12);
    p5.text(p5.round(p5.frameRate()), 30, 30);
  };

  const drawOverTarget = (p5) => {
    const { user, users } = props;
    p5.push();

    if (users) {
      // p5.textFont(font, 34);
      drawUsers(user, filterGalleryUsers(user, users), "/emrys", font, p5, []);
    }

    p5.pop();
  };

  const drawOverUser = (p5) => {
    const { user } = props;
    p5.push();

    const userEase = { x: 0, y: 0 };

    // p5.textFont(font, 12);
    // displayFolderDivs(room, divs);

    p5.pop();
  };

  const manualResize = (p5) => {
    const { windowUI } = props;
    p5.resizeCanvas(windowUI.contentW, windowUI.contentH);
    setUserBoundaries(p5);
  };
  ////////////////////////////////////////////////////////////////////////
  // MOVEMENT
  ////////////////////////////////////////////////////////////////////////
  const showTarget = (p5) => {
    const { windowUI } = props;
    const { userEase, destination, isWalking } = movement;

    if (mouseDidMove(p5)) {
      movement.lastMouseMove = new Date();
    }
    showMouseLoc(windowUI.isMobile, movement.lastMouseMove, p5);
  };

  const userTakeStep = (p5, x, y) => {
    const { stepTo } = movement;
    movement.lastStepTime = p5.millis();

    let space = GlobalConfig.scaler; //40;
    const userStep = { x: stepTo.x + x * space, y: stepTo.y + y * space };

    if (userStep.x > p5.width) {
      stopWalking();
    } else if (userStep.y > p5.height) {
      stopWalking();
    } else if (userStep.x < 0) {
      stopWalking();
    } else if (userStep.y < 0) {
      stopWalking();
    } else {
      stepTo.x = userStep.x;
      stepTo.y = userStep.y;
    }
  };

  const stopWalking = () => {
    movement.isWalking = false;
  };

  const setUserPosition = (x, y) => {
    stopWalking();
    movement.stepTo.x = x;
    movement.stepTo.y = y;
    movement.destination.x = x;
    movement.destination.y = y;
    props.userMove(x, y);
  };

  const setUserPositionImmediate = (x, y) => {
    stopWalking();
    movement.userEase.x = x;
    movement.userEase.y = y;
    movement.stepTo.x = x;
    movement.stepTo.y = y;
    movement.destination.x = x;
    movement.destination.y = y;
    props.userMove(x, y);
  };

  const updateUserEase = (p5) => {
    const { userMove } = props;
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

  const triggerMove = (p5) => {
    if (emrysMousePressed(p5)) {
      return;
    }
    const { user, users, setUserActive } = props;
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

  const mouseStep = (p5) => {
    const t = new Date().getTime() - movement.destination.time.getTime();
    const { user } = props;
    if (movement.isWalking) {
      if (reachedDestination(movement.stepTo, movement.destination)) {
        setUserPositionImmediate(
          movement.destination.x,
          movement.destination.y
        );
        movement.isWalking = false;
      } else if (t > 150) {
        let step = getNextStep(movement.stepTo, movement.destination, true);
        userTakeStep(p5, step[0], step[1]);
        movement.destination.time = new Date();
      }
    }
  };

  p5.keyPressed = () => {
    if (p5.frameCount > 0) {
      if (p5.keyCode === p5.UP_ARROW) {
        userTakeStep(p5, 0, -1);
      } else if (p5.keyCode === p5.RIGHT_ARROW) {
        userTakeStep(p5, 1, 0);
      } else if (p5.keyCode === p5.LEFT_ARROW) {
        userTakeStep(p5, -1, 0);
      } else if (p5.keyCode === p5.DOWN_ARROW) {
        userTakeStep(p5, 0, 1);
      }
    }
    return;
  };

  p5.mouseReleased = () => {
    if (p5.frameCount > 0) {
      endDivDrag(divs);
    }
  };

  p5.mouseMoved = () => {};

  const setUserBoundaries = (p5) => {
    const { user } = props;
    let x = user.roomX;
    let y = user.roomY;
    if (x > p5.width - 50) {
      x = p5.width - 50;
    }
    if (y > p5.height - 50) {
      y = p5.height - 50;
    }
    setUserPositionImmediate(x, y);
  };

  p5.doubleClicked = () => {
    if (p5.frameCount > 0) {
      // checkFolderDivsDouble(getRoomLayoutNum(), divs);
      // checkTrashDivsDouble(getRoomLayoutNum(), divs);
    }
    return;
  };
};

export default GallerySketchEmrys;
