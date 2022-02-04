import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { IUser } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from '../../../store/store';
import { text } from "@fortawesome/fontawesome-svg-core";
import RoomDraggable from '../../Gallery/p5/components/Draggable/RoomDraggable';
import Creature from './Creature.js';

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

let lightImgs: p5Types.Image[] = [];

const creaturesJSON = [
  {
    name: "менкв",
    imgs: [0, 6],
    x: 0,
    y: 200,
    text: "Menquah-keeper of the Polum-Torum-Oyka River, Pelym (Ivdel district, Sverdlovsk region). \nThe Mēӈkv is a relict forest giant. According to folklore stories, the Menquas can be hostile to humans, but they can also but they can also be helpful. The Menquas are subdivided into several species: warriors, sanctuary guards, and cannibals.They live in their own time dimension. They have one more sense than a man. Therefore, a man does not meet with them, and if he encroaches on their territory, the Menquas will get their revenge in their own way: a man gets tension and fear (from the collection of Vogul (Mansi) sacred poetry collected by Arturi Cannisto, translated by E.I. Rombandeeva)"
  },
  {
    name: "лосиное",
    imgs: [1, 2],
    x: -300,
    y: -1200,
    text: "The horn of the Celestial Elk, encrusted with the skin of the Sosyls, sacred reptiles guarding sacred territories."
  },
  {
    name: "филин",
    imgs: [13, 14],
    x: 600,
    y: 0,
    text: "The two-faced god-owl Yipyg-oika, the old god who remembers humans"
  },
  {
    name: "проект1111",
    imgs: [15, 16], //  16 has extra 1
    x: 900,
    y: -800,
    text: "Heart-Flower, left over from a Menquah who has fallen in love with a human being"
  },
  {
    name: "тут_тыт_най",
    imgs: [3, 10],
    x: 1400,
    y: -500,
    text: "the patron saint of the mouth (river) Tukh and nearby water bodies; Tӯh Tyt (lit.: mouth of the river Tӯh) - on modern maps of the Tukhta River, a tributary of the Lozva). Tӯh Tyt Nāy's song (the patterns on the water translated into words):\nA round lake like a band of a wand, \nLike a ring, the swirling lake carries \nThe unborn birds at its bottom. \nThe cold wind from there will not touch, \nMy lakelike gold deep thought. \n"
  },
  // "самсай-ойки_2": {
  //   imgs: [4]
  // },
  {
    name: "гусеница",
    imgs: [5],
    x: 0,
    y: -500,
    text: "Lӯpta ӯtay is a beautiful green caterpillar on the leaves\nFleeing clouds, rolling clouds slashing in their township\nFor running daughters of the future, eternal, eternal days"
  },
  {
    name: "malachite",
    imgs: [7, 11], // 11 is screenshot
    x: -1200,
    y: -900,
    text: "Malachite Flower"
  },
  {
    name: "камни3",
    imgs: [8, 12],
    x: 800,
    y: 1000,
    text: "In the domains of the Mistress of the Denezhkin Stone Mountain. Legends speak of this mountain as a petrified magpie, whose eyes and white feathers turned into gems and whose black feathers turned into slate."
  },
  {
    name: "самсай-ойки",
    imgs: [4, 9],
    x: -800,
    y: 400,
    text: "Samsai-oyka near the Yalpyng-nir Mountain (Molybnyi Kamen, Aly-Yalpyng-nir, Ivdel district, Sverdlovsk region). \nSamsai-oyka used to be an evil spirit, one of the Kul-otyr descendants, invoking illnesses. With time his functions have changed, and he became a house spirit-keeper. Later he left for one of the tops of Yalpyng-nir."
  },
  // "речная": {
  //   imgs: [10]
  // },
  // "камни4":  {
  //   imgs: [12]
  // }
]

const pagePos = { x: 0, y: 0 };

const creatures: any[] = [];

let imgTest: any;

class RoomSketch extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  preload = (p5: p5Types) => {

    for (const creature of creaturesJSON) {
      const index = creature.imgs[0];
      creatures.push(new Creature(creature, p5));
    }

    imgTest = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Ivans/5.png");
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

    p5.push();
    p5.translate(-pagePos.x, -pagePos.y);
    for (const creature of creatures) {
      creature.display(p5, pagePos);
    }
    p5.pop();

    this.setPagePos(p5);
    p5.image(imgTest, 0, 0);
  };

  setPagePos = (p5: p5Types) => {
    let dFromMid = p5.dist(p5.mouseX, p5.mouseY, p5.width / 2, p5.height / 2);
    
    if (dFromMid > 200) {
      const speed = 5;
      const ang = p5.atan2(p5.mouseY - p5.height / 2, p5.mouseX - p5.width / 2);
      pagePos.x += speed * p5.cos(ang);
      pagePos.x = p5.constrain(pagePos.x, -1840, 1400/2);
      pagePos.y += speed * p5.sin(ang);
      pagePos.y = p5.constrain(pagePos.y, -1840, 1400/2);
    }
    

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

