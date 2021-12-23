import { globalConfig } from '../../constants';

// takes 4 points
export function intersectionPoint(x1, y1, x2, y2, x3, y3, x4, y4) {
  var ua, ub, denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom == 0) {
    return null;
  }
  ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
  return {
    x: x1 + ua * (x2 - x1),
    y: y1 + ua * (y2 - y1),
    seg1: ua >= 0 && ua <= 1,
    seg2: ub >= 0 && ub <= 1
  };
}

export function doorCrossing(nextPos, door, config = { x: 0, y: 0, scaler: 1 }) {
  if (!nextPos || !door) return null;
  var door = { ...door };
  door.x0 = (door.x0 + config.x) * config.scaler;
  door.y0 = (door.y0 + config.y) * config.scaler;
  door.x1 = (door.x1 + config.x) * config.scaler;
  door.y1 = (door.y1 + config.y) * config.scaler;
  // if (intersects(pos.x,pos.y,nextPos.x,nextPos.y,points[p].x,points[p].y,points[p+1].x,points[p+1].y)) {
  if (intersects(nextPos.x, nextPos.y, door.x0, door.y0, door.x1, door.y1, globalConfig.stepS / 2)) {
    return door.to;
  }
  return null;
}

export function doorLineCrossing(pos, nextPos, door, config = { x: 0, y: 0, scaler: 1 }) {
  if (!pos || !nextPos || !door) return null;
  var door = { ...door };
  door.x0 = (door.x0 + config.x) * config.scaler;
  door.y0 = (door.y0 + config.y) * config.scaler;
  door.x1 = (door.x1 + config.x) * config.scaler;
  door.y1 = (door.y1 + config.y) * config.scaler;
  
  if (intersectsOG(pos.x, pos.y, nextPos.x, nextPos.y, door.x0, door.y0, door.x1, door.y1)) {
    // if (intersects(nextPos.x,nextPos.y,door.x0,door.y0,door.x1,door.y1, globalConfig.stepS/2)) {
    return door.to;
  }
  return null;
}

export function boundaryCrossing(nextPos, boundary, config = { x: 0, y: 0, scaler: 1 }) {
  if (!nextPos || !boundary) return false;
  for (let p = 0; p < boundary.length - 1; p++) {
    const point0 = { ...boundary[p] };
    const point1 = { ...boundary[p + 1] };
    point0.x = (point0.x + config.x) * config.scaler;
    point0.y = (point0.y + config.y) * config.scaler;
    point1.x = (point1.x + config.x) * config.scaler;
    point1.y = (point1.y + config.y) * config.scaler;


    // if (intersects(pos.x,pos.y,nextPos.x,nextPos.y,points[p].x,points[p].y,points[p+1].x,points[p+1].y)) {
    if (intersects(nextPos.x, nextPos.y, point0.x, point0.y, point1.x, point1.y, globalConfig.stepS / 2)) {
      // console.log("boundc", nextPos.x, nextPos.y, point0.x, point0.y, point1.x, point1.y)
      return true;
    }
  }

  return false;
}

export function boundaryLineCrossing(pos, nextPos, boundary, config = { x: 0, y: 0, scaler: 1 }) {
  if (!pos || !nextPos || !boundary) return false;
  for (let p = 0; p < boundary.length - 1; p++) {
    const point0 = { ...boundary[p] };
    const point1 = { ...boundary[p + 1] };
    point0.x = (point0.x + config.x) * config.scaler;
    point0.y = (point0.y + config.y) * config.scaler;
    point1.x = (point1.x + config.x) * config.scaler;
    point1.y = (point1.y + config.y) * config.scaler;
    // if (title == "wet-streams") console.log("boundlinec", pos.x, pos.y, nextPos.x, nextPos.y, point0, point1);
    // console.log(point0.x, point0.y, point1.x, point1.y, nextPos.x, nextPos.y)

    if (intersectsOG(pos.x, pos.y, nextPos.x, nextPos.y, point0.x, point0.y, point1.x, point1.y)) {
      // if (title == "wet-streams") console.log("woo", id, pos.x, pos.y, nextPos.x, nextPos.y, point0, point1);
      // if (intersects(nextPos.x,nextPos.y,point0.x,point0.y,point1.x,point1.y, globalConfig.stepS/2)) {

      return true;
    }
  }

  return false;
}

//https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
// function intersectsOG(a,b,c,d,p,q,r,s) {
//   var det, gamma, lambda;
//   det = (c - a) * (s - q) - (r - p) * (d - b);
//   if (det === 0) {
//     return false;
//   } else {
//     lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
//     gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
//     return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
//   }
// };

//https://gist.github.com/lengstrom/8499382
function intersectsOG(x1, y1, x2, y2, x3, y3, x4, y4) {

  var a1, a2, b1, b2, c1, c2;
  var r1, r2, r3, r4;
  var denom, offset, num;

  // Compute a1, b1, c1, where line joining points 1 and 2
  // is "a1 x + b1 y + c1 = 0".
  a1 = y2 - y1;
  b1 = x1 - x2;
  c1 = (x2 * y1) - (x1 * y2);

  // Compute r3 and r4.
  r3 = ((a1 * x3) + (b1 * y3) + c1);
  r4 = ((a1 * x4) + (b1 * y4) + c1);

  // Check signs of r3 and r4. If both point 3 and point 4 lie on
  // same side of line 1, the line segments do not intersect.
  if ((r3 !== 0) && (r4 !== 0) && sameSign(r3, r4)) {
    return 0; //return that they do not intersect
  }

  // Compute a2, b2, c2
  a2 = y4 - y3;
  b2 = x3 - x4;
  c2 = (x4 * y3) - (x3 * y4);

  // Compute r1 and r2
  r1 = (a2 * x1) + (b2 * y1) + c2;
  r2 = (a2 * x2) + (b2 * y2) + c2;

  // Check signs of r1 and r2. If both point 1 and point 2 lie
  // on same side of second line segment, the line segments do
  // not intersect.
  if ((r1 !== 0) && (r2 !== 0) && (sameSign(r1, r2))) {
    return 0; //return that they do not intersect
  }

  //Line segments intersect: compute intersection point.
  denom = (a1 * b2) - (a2 * b1);

  //collinear
  if (denom === 0) {
    const xBet = (x1 >= x3 && x1 <= x4 || x2 >= x3 && x2 <= x4 || x3 <= x1 && x3>=x2 );
    const yBet = (y1 >= y3 && y1 <= y4 || y2 >= y3 && y2 <= y4 || y3 <= y1 && y3>=y2 );
    if (xBet && yBet ) {
      return 1;
    }
    // console.log("denom0, nope")
    return 0; 
  }

  // lines_intersect
  return 1; //lines intersect, return true
}

function sameSign(a, b) {
  return Math.sign(a) == Math.sign(b);
}

// point p intersects with a line defined between two points, l0 and l1
function intersects(px, py, l0x, l0y, l1x, l1y, w) {
  return distToSegment({ x: px, y: py }, { x: l0x, y: l0y }, { x: l1x, y: l1y }) < w;
}

function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, {
    x: v.x + t * (w.x - v.x),
    y: v.y + t * (w.y - v.y)
  });
}
function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }
