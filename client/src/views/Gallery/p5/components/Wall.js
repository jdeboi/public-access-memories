
import {boundaryLineCrossing, intersectionPoint} from './Boundaries';
import { limits } from '../../../../data/GlobalConfig';
import { displayWall } from '../functions/ground';

const wall10 =   [
  {x: 0, y: 0, dx: -1, dy: 0}, // inner gallery
  {x: 20, y: 0, dx: 0, dy: -1},
  {x: 20, y: 5, dx: 1, dy: 0},
  {x: 32-5, y: 5, dx: 0, dy: -1},
  {x:32-5, y: 15, dx: 1, dy: 0},
  // {x:27, y: 10, dx: 0, dy: 1},     // wall 10
  // {x: 27, y: 15, dx: 1, dy: 0},    // wall 10
  {x: 20, y: 15, dx: 0, dy: 1},
  {x: 20, y: 22, dx: 1, dy: 0},
  {x: 25, y: 22, dx: 0, dy: -1},
  {x: 25, y: 27, dx: 1, dy: 0},
  // {x: 20, y: 27},                  // wall 10
  {x: 5, y: 27, dx: 0, dy: 1},
  {x: 5, y: 22, dx: -1, dy: 0},
  {x: 0, y: 22, dx: 0, dy: 1},
  {x: 0, y: 17-5, dx: -1, dy: 0},
  // {x: -5, y: 17, dx: 0, dy: 1},    // wall 10
  // {x: -5, y: 12, dx: -1, dy: 1},   // wall 10
  // {x: 0, y: 12, dx: 0, dy: -1},    // wall 10
  {x: 0, y: 0, dx: -1, dy: 0},
  {x: 20, y: 0, dx: 0, dy: -1},
]

const wall13 =   [
  {x: 0, y: 0, dx: -1, dy: 0}, // inner gallery
  {x: 20, y: 0, dx: 0, dy: -1},
  {x: 20, y: 5, dx: 1, dy: 0},
  {x: 32, y: 5, dx: 0, dy: -1},
  {x:32, y: 15, dx: 1, dy: 0},
  // {x:27, y: 10, dx: 0, dy: 1},     // wall 10
  // {x: 27, y: 15, dx: 1, dy: 0},    // wall 10
  {x: 20, y: 15, dx: 0, dy: 1},
  {x: 20, y: 22, dx: 1, dy: 0},
  {x: 25, y: 22, dx: 0, dy: -1},
  {x: 25, y: 27, dx: 1, dy: 0},
  // {x: 20, y: 27},                  // wall 10
  {x: 5, y: 27, dx: 0, dy: 1},
  {x: 5, y: 22, dx: -1, dy: 0},
  {x: 0, y: 22, dx: 0, dy: 1},
  {x: 0, y: 17, dx: -1, dy: 0},
  {x: -5, y: 17, dx: 0, dy: 1},    // wall 10
  {x: -5, y: 12, dx: -1, dy: 1},   // wall 10
  
  {x: 0, y: 12, dx: 0, dy: -1},    // wall 10
  {x: 0, y: 0, dx: -1, dy: 0},
  {x: 20, y: 0, dx: 0, dy: -1},
]

const wall14 =   [
  {x: 0, y: 0, dx: -1, dy: 0}, // inner gallery
  {x: 20, y: 0, dx: 0, dy: -1},
  {x: 20, y: 5, dx: 1, dy: 0},
  {x: 32, y: 5, dx: 0, dy: -1},
  {x:32, y: 15, dx: 1, dy: 0},
  // {x:27, y: 10, dx: 0, dy: 1},     // wall 10
  // {x: 27, y: 15, dx: 1, dy: 0},    // wall 10
  {x: 20, y: 15, dx: 0, dy: 1},
  {x: 20, y: 22, dx: 1, dy: 0},
  {x: 25, y: 22, dx: 0, dy: -1},
  {x: 25, y: 27, dx: 1, dy: 0},
  // {x: 20, y: 27},                  // wall 10
  {x: 5, y: 27, dx: 0, dy: 1},
  {x: 5, y: 22, dx: -1, dy: 0},
  {x: 0, y: 22, dx: 0, dy: 1},
  {x: 0, y: 17, dx: -1, dy: 0},
  {x: -5, y: 17, dx: 0, dy: 1},    // wall 10
  {x: -5, y: 12, dx: -1, dy: 1},   // wall 10
  
  {x: 0, y: 12, dx: 0, dy: -1},    // wall 10
  {x: 0, y: 0, dx: -1, dy: 0},
  {x: 20, y: 0, dx: 0, dy: -1},
]

export default class Wall {

  constructor (p5, i, config) {
    const wallsInit = [
      wall14
    ];

    wallsInit.push(limits);
    this.p5 = p5;
    this.points = wallsInit[i];

    const sWs = [5, 2, 5];
    this.borderPoints = [
      {sW: sWs[0], points:this.initBorderPoints(sWs[0]/2, config.scaler)},
      {sW: sWs[1], points:this.initBorderPoints(sWs[1]/2, config.scaler)},
      {sw: sWs[2], points:this.initBorderPoints(sWs[0]+sWs[1]+sWs[2]/2, config.scaler)},
    ]

    this.config = config;
  }

  displayShape(p5, floorTex, scaler=this.config.scaler) {
    p5.beginShape();
    for (let i = 0; i < this.points.length; i++) {
      const uv = this.getWallUV(this.points[i]);
      p5.vertex(this.points[i].x*scaler, this.points[i].y*scaler, 0, uv.u, uv.v);
    }
    p5.endShape();
  }


  getWallUV(point) {
    const u = this.p5.map(point.x, -5, 30, 0, 6);
    const v = this.p5.map(point.y, 0, 30, 0, 6);
    return {u: u, v: v };
  }

  display(p5, scaler=this.config.scaler) {
    for (let i = 0; i < this.points.length-1; i++) {
      const p0 = {...this.points[i]};
      p0.x *= scaler;
      p0.y *= scaler;
      const p1 = {...this.points[i+1]};
      p1.x *= scaler;
      p1.y *= scaler;
      displayWall(p0, p1, p5)
      // p5.line(this.points[i].x*scaler, this.points[i].y*scaler, this.points[i+1].x*scaler, this.points[i+1].y*scaler);
    }
  }

  initBorderPoints(borderW, scaler=this.config.scaler) {
    borderW /= scaler;
    // p5.stroke(0, 255, 0);
    var borderPoints = [{x: this.points[0].x - borderW, y: this.points[0].y-borderW}];
    for (let i = 0; i < this.points.length-2; i++) {
      // const p0 = {x: this.points[i].x + this.points[i+1].dx*borderW, y: this.points[i].y + this.points[i+1].dy*borderW};

      const p0 = borderPoints[i];
      const p1 = {x: this.points[i+1].x + this.points[i+1].dx*borderW, y: this.points[i+1].y + this.points[i+1].dy*borderW};
      const pNext0 = {x: this.points[i+1].x + this.points[i+2].dx*borderW, y: this.points[i+1].y + this.points[i+2].dy*borderW};
      const pNext1 = {x: this.points[i+2].x + this.points[i+2].dx*borderW, y: this.points[i+2].y + this.points[i+2].dy*borderW};
      const pIntersect = intersectionPoint(p0.x, p0.y, p1.x, p1.y, pNext0.x, pNext0.y, pNext1.x, pNext1.y);
      borderPoints.push(pIntersect);
    }
    return borderPoints;
  }

  displayBorder(p5, i, scaler=this.config.scaler) {
    p5.stroke(255);
    p5.strokeWeight(this.borderPoints[1].sW);
    this.displayOutline(p5, this.borderPoints[1].points, scaler);

    // p5.stroke(255);
    // p5.strokeWeight(this.borderPoints[0].sW);
    // this.displayOutline(p5, this.borderPoints[0].points, scaler);
    // this.displayOutline(p5, this.borderPoints[2].points, scaler);
  }
  

  displayOutline(p5=this.p5, points=this.points, scaler=this.config.scaler) {
    for (let i = 0; i < points.length-1; i++) {
      p5.line(points[i].x*scaler, points[i].y*scaler, points[i+1].x*scaler, points[i+1].y*scaler);
    }
  }


  wallBoundaryCrossing(prevStep, userStep) {
    return boundaryLineCrossing(prevStep, userStep, this.points, this.config);
  }
}
