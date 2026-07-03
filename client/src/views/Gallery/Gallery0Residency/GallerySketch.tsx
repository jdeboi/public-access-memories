import p5Types from "p5";
import {
  GallerySketchTemplate1,
  GallerySketch1Props,
} from "../Gallery1/GallerySketchTemplate1";

// Gallery1 shared helpers
import {
  doorCrossing,
  roomDoorCrossing,
  roomDoorEntryCrossing,
  roomDoorBoundary,
  roomBoundary,
  wallBoundary,
} from "../Gallery1/functions/crossing";
import { drawWalls } from "../Gallery1/functions/building";

// Gallery0-local
import {
  drawGalleryGround,
  drawRooms as drawResidencyRooms,
  initOuterWalls,
} from "./functions/building";
import {
  addTrashDivs,
  addDoorDivs,
  addLightDivs,
  addColumnDivs,
  addBarDivs,
  addFolderDivs,
  addRoomLabelDivs,
  displayAllDivs,
} from "./functions/divs";

// Config
import { GlobalConfig } from "../../../data/Shows/Residency/GlobalConfig";
import { rooms as globalRooms } from "../../../data/Shows/Residency/RoomConfig";
import { danceFloor, barTenders } from "../../../data/Shows/Residency/BotConfig";
import { RESIDENCY_ID } from "../../../data/CurrentShow/GalleryConfig";

// Components
import ResidencyRoom from "./components/ResidencyRoom";

// URLs
import { LMD_URL, PAM_URL } from "../functions/loadImages";

export default class GallerySketch extends GallerySketchTemplate1 {
  roomTextures: p5Types.Image[] = [];
  otherImgs: p5Types.Image[] = [];
  watercoolerImg: p5Types.Image | null = null;

  constructor(props: GallerySketch1Props) {
    super(props);
    this.GlobalConfig = GlobalConfig;
    this.barTenders = barTenders;
    this.danceFloor = danceFloor;
    this.globalRooms = globalRooms;
    this.galleryId = RESIDENCY_ID;
  }

  preloadRoomTextures = (p5: p5Types) => {
    this.doorImgs[0] = p5.loadImage(LMD_URL + "door/frame2.png");
    this.doorImgs[1] = p5.loadImage(LMD_URL + "door/leftdoor2.png");
    this.roomTextures[0] = p5.loadImage(PAM_URL + "residency/assets/openLightStudioDoor.jpg");
    this.roomTextures[1] = p5.loadImage(PAM_URL + "residency/assets/closedLightStudioDoor.jpg");
    this.roomTextures[2] = p5.loadImage(PAM_URL + "residency/assets/lightsOffDoorOpen.jpg");
    this.roomTextures[3] = p5.loadImage(PAM_URL + "residency/assets/lightsOffDoorClosed.jpg");
    this.roomTextures[4] = p5.loadImage(PAM_URL + "residency/assets/lounge.jpg");
    this.roomTextures[5] = p5.loadImage(PAM_URL + "residency/emrys/openLightStudioDoorLeaves.jpeg");
    this.roomTextures[6] = p5.loadImage(PAM_URL + "residency/emrys/closedLightStudioDoorLeaves.jpeg");
    this.roomTextures[7] = p5.loadImage(PAM_URL + "residency/chelsea/openLightStudioDoor_CT.jpg");
    this.roomTextures[8] = p5.loadImage(PAM_URL + "residency/chelsea/closedLightStudioDoor_CT.jpg");
    this.roomTextures[9] = p5.loadImage(PAM_URL + "residency/chelsea/lightsOffDoorOpen_CT.jpg");
    this.roomTextures[10] = p5.loadImage(PAM_URL + "residency/chelsea/lightsOffDoorClosed_CT.jpg");
    this.eyeIcon = p5.loadImage(LMD_URL + "eye.png");
    this.floorTex = p5.loadImage(LMD_URL + "concrete-512.jpg");
  };

  preloadBarEmojis = (p5: p5Types) => {
    this.barEmojis[0] = p5.loadImage(LMD_URL + "emojis/popcorn.png");
    this.barEmojis[1] = p5.loadImage(LMD_URL + "emojis/beer.png");
    this.barEmojis[2] = p5.loadImage(LMD_URL + "emojis/coffee.png");
  };

  preloadContent = (p5: p5Types) => {
    this.otherImgs[0] = p5.loadImage(PAM_URL + "residency/assets/redCircle.png");
    this.otherImgs[1] = p5.loadImage(PAM_URL + "residency/assets/greenCircle.png");
    this.watercoolerImg = p5.loadImage(PAM_URL + "residency/assets/watercooler.png");
  };

  setupContent = (p5: p5Types) => {
    p5.pixelDensity(2);
    p5.frameRate(20);
  };

  initBuilding = (p5: p5Types) => {
    initOuterWalls(p5, this.walls);
    for (let i = 0; i < this.globalRooms.length; i++) {
      this.rooms.push(new ResidencyRoom(p5, this.doorImgs[0], i));
    }
  };

  initDivs = (p5: p5Types) => {
    addDoorDivs(this.divs, this.doors, this.doorImgs, p5);
    addLightDivs(this.divs, this.lightImgs, p5);
    if (this.columnGif) addColumnDivs(this.divs, this.columnGif, p5);
    addBarDivs(this.divs, this.lightImgs[3], p5);
    addTrashDivs(this.divs, this.trashFiles, p5);
    if (this.instaImg && this.txtFile)
      addFolderDivs(this.divs, this.instaImg, this.txtFile, p5);
    if (this.eyeIcon && this.font)
      addRoomLabelDivs(this.divs, this.eyeIcon, this.font, p5);
  };

  displayBackground = (p5: p5Types) => {
    p5.background(0);
  };

  displayBuilding = (p5: p5Types) => {
    if (this.floorTex) drawGalleryGround(this.floorTex, p5);
    if (this.font) p5.textFont(this.font, 12);
    drawResidencyRooms(
      this.rooms,
      this.roomTextures,
      this.otherImgs,
      this.props.users,
      this.props.user,
      p5
    );
    drawWalls(this.walls, p5);
  };

  displayDivs = (_p5: p5Types) => {
    displayAllDivs(this.userEase.x, this.userEase.y, this.divs);
  };

  userTakeStep = (x: number, y: number) => {
    const { isMobile, userNewRoom, toggleOutside } = this.props;
    const space = this.GlobalConfig?.scaler ?? 50;
    const prevStep = { x: this.stepTo.x, y: this.stepTo.y };
    const userStep = {
      x: this.stepTo.x + x * space,
      y: this.stepTo.y + y * space,
    };

    const outsideDoor = doorCrossing(this.doors, prevStep, userStep);
    const roomDoorEntry = roomDoorEntryCrossing(this.rooms, prevStep, userStep);
    const roomDoor = roomDoorCrossing(this.rooms, prevStep, userStep);
    const roomDoorB = roomDoorBoundary(this.rooms, prevStep, userStep);

    if (roomDoor) {
      if (!isMobile) {
        if (window.confirm("Enter this artist studio?")) userNewRoom(roomDoor);
      } else {
        userNewRoom(roomDoor);
      }
      this.stopWalking();
    } else if (outsideDoor) {
      this.stepTo.x = userStep.x;
      this.stepTo.y = userStep.y;
      toggleOutside();
    } else if (roomDoorEntry) {
      this.stepTo.x = userStep.x;
      this.stepTo.y = userStep.y;
    } else if (roomBoundary(this.rooms, prevStep, userStep)) {
      this.stopWalking();
    } else if (roomDoorB) {
      this.stopWalking();
    } else if (wallBoundary(this.walls, prevStep, userStep)) {
      this.stopWalking();
    } else {
      this.stepTo.x = userStep.x;
      this.stepTo.y = userStep.y;
    }
  };
}
