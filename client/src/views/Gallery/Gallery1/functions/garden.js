import {
  GlobalConfig,
  limits,
  pools,
} from "../../../../data/Shows/HomeBody/GlobalConfig";
import { p5ToWorldCoords } from "../../../../helpers/coordinates";

export function drawPlantRow(x, y, w, h, img, p5) {
  let sc = GlobalConfig.scaler;
  let pt = p5ToWorldCoords(x, y, GlobalConfig);

  for (let i = 0; i < w; i++) {
    p5.image(img, pt.x + sc * 5 * i, pt.y, 5 * sc, sc);
  }
  p5.noFill();
  p5.stroke(255);
  p5.strokeWeight(2);
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w * 5; c++) {
      p5.rect(pt.x + c * sc, pt.y + r * sc, sc, sc);
    }
  }
}

export function drawPools(poolImg, p5) {
  let sc = GlobalConfig.scaler;
  const w = 5 * sc;
  const h = 5 * sc;
  for (let i = 0; i < 3; i++) {
    const x = pools[i].x * sc;
    const y = pools[i].y * sc;
    p5.image(poolImg, x, y, w, h);
  }
}

export function drawGrassPatch(grass0, grass1, p5) {
  let sc = GlobalConfig.scaler;
  const w = 5 * sc;
  const h = 5 * sc;
  p5.fill(0, 150);
  p5.stroke(255);
  p5.strokeWeight(2);
  for (let i = 0; i < 3; i++) {
    const x = pools[i].x * sc;
    const y1 = (pools[i].y + 5) * sc;
    const y = pools[i].y * sc;
    p5.rect(x, y, w, h);
    p5.rect(x, y1, w, h);
    p5.image(grass1, x, y, w, h);
    p5.image(grass0, x, y1, w, h);
  }

  const xx = pools[2].x * sc + sc * 5;
  const yy = (pools[2].y + 5) * sc;
  p5.rect(xx, yy, w, h);
  p5.image(grass1, xx, yy, w, h);

  drawShrubPatch(grass0, p5);
}

// export function drawShrubPatch(ivies, p5) {

// }

export function drawShrubPatch(shrub, p5) {
  let sc = GlobalConfig.scaler;
  const w = 5 * sc;
  const h = 5 * sc;

  p5.fill(0, 150);
  p5.stroke(255);
  p5.strokeWeight(2);

  var xx = limits[0].x * sc;
  var yy = (limits[2].y - 5) * sc;
  p5.rect(xx, yy, w, h);
  p5.image(shrub, xx, yy, w, h);

  xx = limits[0].x * sc;
  yy = (limits[2].y - 10) * sc;
  p5.rect(xx, yy, w, h);
  p5.image(shrub, xx, yy, w, h);

  xx = (limits[0].x + 5) * sc;
  yy = (limits[2].y - 5) * sc;
  p5.rect(xx, yy, w, h);
  p5.image(shrub, xx, yy, w, h);

  // added to replace 3 rooms
  p5.rect(27 * sc, 5 * sc, w, h);
  p5.rect(27 * sc, 10 * sc, w, h);
  p5.rect(-5 * sc, 12 * sc, w, h);

  p5.image(shrub, 27 * sc, 5 * sc, w, h);
  p5.image(shrub, 27 * sc, 10 * sc, w, h);
  p5.image(shrub, -5 * sc, 12 * sc, w, h);
}

export function poolBoundaryCrossing(userX, userY) {
  // let sc = GlobalConfig.scaler;

  // const w = 5*sc;
  // const h = 5*sc;
  // for (let i = 0; i < pools.length; i++) {
  //     const x = pools[i].x * sc + sc;
  //     const y = pools[i].y * sc + sc;
  //     if (userX > x && userX < x + w && userY > y && userY < y+ h)
  //         return true;
  // }
  return false;
}
