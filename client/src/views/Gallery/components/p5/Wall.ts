
import { boundaryLineCrossing, intersectionPoint } from './Boundaries';
// import { GlobalConfig, limits } from '../../../../../data/HomeBody/GlobalConfig';
import { displayWall } from '../../Gallery1/functions/ground';
import p5Types from 'p5';


export default class Wall {

  p5: p5Types;
  points: any;
  borderPoints: { sW: number, points: any }[];
  config: any;

  constructor(p5: p5Types, points: any, config: any) {
    this.p5 = p5;
    this.points = points;
    this.config = config;

    const sWs = [5, 2, 5];
    this.borderPoints = [
      { sW: sWs[0], points: this.initBorderPoints(sWs[0] / 2, config.scaler) },
      { sW: sWs[1], points: this.initBorderPoints(sWs[1] / 2, config.scaler) },
      { sW: sWs[2], points: this.initBorderPoints(sWs[0] + sWs[1] + sWs[2] / 2, config.scaler) },
    ]
  }

  displayShape(p5: p5Types, scaler = this.config.scaler) {
    p5.beginShape();
    for (let i = 0; i < this.points.length; i++) {
      const uv = this.getWallUV(this.points[i]);
      p5.vertex(this.points[i].x * scaler, this.points[i].y * scaler, 0, uv.u, uv.v);
    }
    p5.endShape();
  }



  getWallUV(point: { x: number, y: number }) {
    const u = this.p5.map(point.x, -5, 30, 0, 6);
    const v = this.p5.map(point.y, 0, 30, 0, 6);
    return { u: u, v: v };
  }

  display(p5: p5Types, scaler = this.config.scaler) {
    for (let i = 0; i < this.points.length - 1; i++) {
      const p0 = { ...this.points[i] };
      p0.x *= scaler;
      p0.y *= scaler;
      const p1 = { ...this.points[i + 1] };
      p1.x *= scaler;
      p1.y *= scaler;
      displayWall(p0, p1, p5);
      // p5.line(this.points[i].x*scaler, this.points[i].y*scaler, this.points[i+1].x*scaler, this.points[i+1].y*scaler);
    }
  }

  initBorderPoints(borderW: number, scaler = this.config.scaler) {
    borderW /= scaler;
    // p5.stroke(0, 255, 0);
    var borderPoints = [{ x: this.points[0].x - borderW, y: this.points[0].y - borderW }];
    for (let i = 0; i < this.points.length - 2; i++) {
      // const p0 = {x: this.points[i].x + this.points[i+1].dx*borderW, y: this.points[i].y + this.points[i+1].dy*borderW};

      const p0 = borderPoints[i];
      const p1 = { x: this.points[i + 1].x + this.points[i + 1].dx * borderW, y: this.points[i + 1].y + this.points[i + 1].dy * borderW };
      const pNext0 = { x: this.points[i + 1].x + this.points[i + 2].dx * borderW, y: this.points[i + 1].y + this.points[i + 2].dy * borderW };
      const pNext1 = { x: this.points[i + 2].x + this.points[i + 2].dx * borderW, y: this.points[i + 2].y + this.points[i + 2].dy * borderW };
      const pIntersect = intersectionPoint(p0.x, p0.y, p1.x, p1.y, pNext0.x, pNext0.y, pNext1.x, pNext1.y);
      if (pIntersect)
        borderPoints.push(pIntersect);
    }
    return borderPoints;
  }

  displayBorder(p5: p5Types, i: number, scaler = this.config.scaler) {
    p5.stroke(255);
    p5.strokeWeight(this.borderPoints[1].sW);
    this.displayOutline(p5, this.borderPoints[1].points, scaler);
  }


  displayOutline(p5 = this.p5, points = this.points, scaler = this.config.scaler) {
    for (let i = 0; i < points.length - 1; i++) {
      p5.line(points[i].x * scaler, points[i].y * scaler, points[i + 1].x * scaler, points[i + 1].y * scaler);
    }
  }


  wallBoundaryCrossing(prevStep: {x: number, y: number}, userStep: {x: number, y: number}) {
    return boundaryLineCrossing(prevStep, userStep, this.points, this.config);
  }
}
