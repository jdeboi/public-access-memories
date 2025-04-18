import { roundToMult } from "./round";
import {
  GlobalConfig,
  limits,
} from "../../../../data/Shows/HomeBody/GlobalConfig";
import { danceFloor } from "../../../../data/Shows/HomeBody/BotConfig";

export const drawAllFloors = (floorTex, p5) => {
  // big floor
  p5.strokeWeight(2);
  p5.stroke(255, 200);
  drawFloor(
    limits[0].x,
    limits[0].y,
    limits[2].x - limits[0].x,
    limits[2].y - limits[0].y,
    false,
    false,
    GlobalConfig.scaler * 5,
    p5
  ); // big floor
  drawDanceFloor(p5);

  ////// not these
  // drawSpaceFloor(20, 12, 12, 10, p5); // left
  // drawSpaceFloor(5, 27, 20, 8, p5); // bottom
  // drawSpaceFloor(24, 22, 4, 8, p5); // bottom to left
  ////////

  // top row
  p5.strokeWeight(2);
  p5.stroke(255, 200);
  drawFloor(
    limits[0].x + 10,
    limits[0].y,
    20,
    3,
    false,
    false,
    GlobalConfig.scaler,
    p5
  );
  // right alley
  drawFloor(32, 5, 3, 14, false, false, GlobalConfig.scaler, p5);

  // stairsOG
  drawFloor(-10, 12, 5, 10, false, false, GlobalConfig.scaler, p5);
  drawFloor(-5, 17, 5, 10, false, false, GlobalConfig.scaler, p5); // left column
  drawFloor(0, 22, 5, 10, false, false, GlobalConfig.scaler, p5);
  drawFloor(5, 27, 5, 10, false, false, GlobalConfig.scaler, p5);

  // stairsBig
  // drawFloor(pools[0].x, pools[0].y, 5, 5, false, false, GlobalConfig.scaler * 5, p5);
  // drawFloor(pools[1].x, pools[1].y, 5, 5, false, false, GlobalConfig.scaler * 5, p5);
  // drawFloor(pools[2].x, pools[2].y, 5, 5, false, false, GlobalConfig.scaler * 5, p5);
  // drawFloor(pools[2].x+5, pools[2].y+5, 5, 5, false, false, GlobalConfig.scaler * 5, p5);
  p5.noStroke();

  // top left
  p5.noStroke();
  drawSpaceFloor(limits[0].x, -3, 10, 15, p5);
  // behind dance
  drawSpaceFloor(20, limits[0].y, 15, 8, p5);

  // drawFloor(0, 22, 28, 18, false, false, GlobalConfig.scaler, p5);

  // drawFloor(0, 0, 30, 30, false, false, p5);
  // drawSpaceFloorTriangle(5 - 15, 27 - 15, 5 + 9, 27 + 9, p5);
  // drawSpaceFloorTriangle(15, 27 + 9, 15 + 9, 27, p5);
  let startX = 10;
  let startY = 39;
  let dx = 21;
  let h = 14;
  let w = 15;
  drawSpaceFloorLine(startX, startY, startX + dx, startY - dx, h, p5);
  // drawSpaceFloor(20, 15, 1, 1, p5);

  // drawPlants(p5);

  drawGalleryGround(floorTex, p5);
  // drawGalleryGrid(p5);
  drawGalleryRects(p5);
  // drawBorderPlants(p5);
};

export const drawGrid = (p5) => {
  let spacing = GlobalConfig.scaler;
  p5.stroke(255, 100);
  p5.strokeWeight(2);
  let sc = GlobalConfig.scaler;
  for (let x = limits[0].x * sc; x <= limits[1].x * sc; x += spacing) {
    p5.line(x, limits[0].y * sc, x, limits[2].y * sc);
  }

  for (let y = limits[0].y * sc; y <= limits[2].y * sc; y += spacing) {
    p5.line(limits[0].x * sc, y, limits[1].x * sc, y);
  }
};

export const drawSpaceFloorTriangle = (x0, y0, x1, y1, p5) => {
  let sc = GlobalConfig.scaler;
  let spacing = GlobalConfig.scaler;
  x0 = roundToMult(x0 * sc, spacing);
  y0 = roundToMult(y0 * sc, spacing);
  x1 = roundToMult(x1 * sc, spacing);
  y1 = roundToMult(y1 * sc, spacing);

  let yOffset = new Date() / 2000;

  let slope = (y1 - y0) / (x1 - x0);
  let b = y0 - slope * x0;

  p5.stroke(255, 150);
  p5.noStroke();
  p5.strokeWeight(2);
  if (slope >= 0) {
    for (let x = x0; x <= x1; x += spacing) {
      let yVal = slope * x + b;
      let yValRounded = roundToMult(yVal, spacing);
      for (let y = y0; y <= yValRounded; y += spacing) {
        let n = p5.noise(x * 0.005, y * 0.005 + yOffset);
        let alpha = p5.map(n, 0, 1, 0, 150);
        p5.fill(255, alpha);
        p5.rect(x, y, spacing, spacing);
      }
    }
  } else {
    let index = 0;
    // let yVal = y0;
    // let yValRounded = roundToMult(yVal, spacing);
    for (let x = x0; x <= x1; x += spacing) {
      let yVal = slope * x + b;
      let yValRounded = roundToMult(yVal, spacing);
      for (let y = y1; y <= yValRounded; y += spacing) {
        let n = p5.noise(x * 0.005, y * 0.005 + yOffset);
        let alpha = p5.map(n, 0, 1, 0, 150);
        p5.fill(255, alpha);
        p5.rect(x, y, spacing, spacing);
      }
      // console.log(index++, yVal/spacing, yValRounded/spacing);
    }
  }
};

export const drawSpaceFloorLine = (x0, y0, x1, y1, w, p5) => {
  let sc = GlobalConfig.scaler;
  let spacing = GlobalConfig.scaler;
  x0 = roundToMult(x0 * sc, spacing);
  y0 = roundToMult(y0 * sc, spacing);
  x1 = roundToMult(x1 * sc, spacing);
  y1 = roundToMult(y1 * sc, spacing);
  w = roundToMult(w * sc, spacing);
  let yOffset = new Date() / 2000;

  let slope = (y1 - y0) / (x1 - x0);
  let b = y0 - slope * x0;

  p5.stroke(0, 150);
  p5.noStroke();
  p5.strokeWeight(2);
  if (slope >= 0) {
    for (let x = x0; x <= x1; x += spacing) {
      let yVal = slope * x + b;
      let yValRounded = roundToMult(yVal, spacing);
      let yValStart = yValRounded - w;
      for (let y = yValStart; y <= yValRounded; y += spacing) {
        let n = p5.noise(x * 0.005, y * 0.005 + yOffset);
        let alpha = p5.map(n, 0, 1, 0, 150);
        p5.fill(255, alpha);
        p5.rect(x, y, spacing, spacing);
      }
    }
  } else {
    let index = 0;
    // let yVal = y0;
    // let yValRounded = roundToMult(yVal, spacing);
    for (let x = x0; x <= x1; x += spacing) {
      let yVal = slope * x + b;
      let yValRounded = roundToMult(yVal, spacing);
      let yValStart = yValRounded - w;
      for (let y = yValStart; y <= yValRounded; y += spacing) {
        let n = p5.noise(x * 0.005, y * 0.005 + yOffset);
        let alpha = p5.map(n, 0, 1, 0, 150);
        p5.fill(255, alpha);
        p5.rect(x, y, spacing, spacing);
      }
      // console.log(index++, yVal/spacing, yValRounded/spacing);
    }
  }
};

// p5.fill(255, 50);
// p5.rect(-12*sc, -10*sc, (38+12)*sc, (40+10)*sc);

export const drawSpaceFloor = (x0, y0, w, h, p5) => {
  let spacing = GlobalConfig.scaler;
  let yOffset = new Date() / 2000;
  // let bound = 5000;

  let sc = GlobalConfig.scaler;
  for (let x = x0 * sc; x < (x0 + w) * sc; x += spacing) {
    for (let y = y0 * sc; y < (y0 + h) * sc; y += spacing) {
      let n = p5.noise(x * 0.005, y * 0.005 + yOffset);
      let alpha = p5.map(n, 0, 1, 0, 150);
      p5.fill(255, alpha);
      p5.rect(x, y, spacing, spacing);
    }
  }

  // p5.fill(255, 50);
  // p5.rect(-12*sc, -10*sc, (38+12)*sc, (40+10)*sc);
};

const drawFloor = (x0, y0, w, h, isDark, isFilled, spacing, p5) => {
  // let spacing = GlobalConfig.scaler;
  let yOffset = new Date() / 2000;
  // let bound = 5000;
  if (isFilled) p5.fill(255, 150);
  else p5.fill(0, 100);
  // p5.stroke(255, 200);
  // if (isDark) p5.stroke(0, 255);
  if (isDark) p5.fill(255, 30);
  let sc = GlobalConfig.scaler;
  let xInd = 0;
  let yInd = 0;
  for (let x = x0 * sc; x < (x0 + w) * sc; x += spacing) {
    for (let y = y0 * sc; y < (y0 + h) * sc; y += spacing) {
      let alpha = 255;
      if (isFilled) {
        // if (isCheckered) alpha = ((xInd + yInd) % 2 == 0) ? 200 : 50;
        alpha = p5.map(
          Math.sin(new Date() / 1000 + x / 100 + y / 200),
          -1,
          1,
          0,
          110
        );
        p5.fill(255, alpha);
      } else {
        // alpha = p5.map(Math.sin(new Date()/1000 + x/100 + y/200), -1, 1, 0, 180);
        // p5.stroke(255, alpha);
      }
      // if (isDark) {
      //   p5.fill(0, 150);
      // }
      p5.rect(x, y, spacing, spacing);
      yInd++;
    }
    xInd++;
  }

  // p5.fill(255, 50);
  // p5.rect(-12*sc, -10*sc, (38+12)*sc, (40+10)*sc);
};

const drawDanceFloor = (p5) => {
  let sc = GlobalConfig.scaler;
  let spacing = 60;
  let w = 10 * 70;
  let h = 5 * 70;

  p5.noStroke();
  let alpha = p5.map(Math.sin(new Date() / 500), -1, 1, 150, 255);
  p5.fill(255, alpha);
  for (let x = danceFloor.x; x < danceFloor.x + w; x += spacing) {
    for (let y = danceFloor.y; y < danceFloor.y + h; y += spacing) {
      // p5.line(, y, bound, y);
      p5.rect(x, y, 50, 50);
    }
  }
};

const drawGalleryGround = (floorTex, p5) => {
  if (floorTex) {
    // 1st
    const w = 5 * GlobalConfig.scaler;
    const h = 5 * GlobalConfig.scaler;
    // for (let x = 0; x < 15; x += 5) {

    //     const ix = x * GlobalConfig.scaler;
    //     const iy = 2 * GlobalConfig.scaler;
    //     p5.image(floorTex, 20 * GlobalConfig.scaler, 2 * GlobalConfig.scaler, w, h);
    // }

    // extra 14th
    // {
    //     const ix = -5 * GlobalConfig.scaler;
    //     const iy = 2* GlobalConfig.scaler
    //     p5.image(floorTex, ix, iy, w, h);
    // }

    // 2nd
    for (let x = 0; x < 25; x += 5) {
      const ix = x * GlobalConfig.scaler;
      const iy = 5 * GlobalConfig.scaler;
      p5.image(floorTex, ix, iy, w, h);
    }

    /////////////
    // added when deleted rooms
    let ix = 22 * GlobalConfig.scaler;
    let iy = 5 * GlobalConfig.scaler;
    p5.image(floorTex, ix, iy, w, h);
    iy = 10 * GlobalConfig.scaler;
    p5.image(floorTex, ix, iy, w, h);
    /////////////

    // 3rd
    for (let x = 0; x < 25; x += 5) {
      const ix = x * GlobalConfig.scaler;
      const iy = 10 * GlobalConfig.scaler;
      p5.image(floorTex, ix, iy, w, h);
    }
    // 4th row
    for (let x = 0; x < 15; x += 5) {
      const ix = x * GlobalConfig.scaler;
      const iy = 12 * GlobalConfig.scaler;
      p5.image(floorTex, ix, iy, w, h);
    }
    ix = 15 * GlobalConfig.scaler;
    iy = 12 * GlobalConfig.scaler;
    p5.image(floorTex, ix, iy, w, h);

    // 4th row
    for (let x = 5; x < 20; x += 5) {
      const ix = x * GlobalConfig.scaler;
      const iy = 17 * GlobalConfig.scaler;
      p5.image(floorTex, ix, iy, w, h);
    }
    for (let x = 10; x < 20; x += 5) {
      const ix = x * GlobalConfig.scaler;
      const iy = 22 * GlobalConfig.scaler;
      p5.image(floorTex, ix, iy, w, h);
    }
  }
};

const drawGalleryGrid = (p5) => {
  // 1st
  p5.stroke(255, 100);
  p5.strokeWeight(2);
  let sc = GlobalConfig.scaler;
  let step = 1;

  for (let x = 0; x < 27; x += step) {
    const y0 = 5;
    const y1 = 15;
    p5.line(x * sc, y0 * sc, x * sc, y1 * sc);
  }
  for (let y = 5; y < 15; y += step) {
    const x0 = 0;
    const x1 = 27;
    p5.line(x0 * sc, y * sc, x1 * sc, y * sc);
  }
  // 2nd
  for (let x = 0; x < 20; x += step) {
    const y0 = 15;
    const y1 = 22;
    p5.line(x * sc, y0 * sc, x * sc, y1 * sc);
  }
  for (let y = 15; y < 22; y += step) {
    const x0 = 0;
    const x1 = 20;
    p5.line(x0 * sc, y * sc, x1 * sc, y * sc);
  }

  // 3rd
  for (let x = 10; x < 20; x += step) {
    const y0 = 22;
    const y1 = 27;
    p5.line(x * sc, y0 * sc, x * sc, y1 * sc);
  }
  for (let y = 22; y < 27; y += step) {
    const x0 = 10;
    const x1 = 20;
    p5.line(x0 * sc, y * sc, x1 * sc, y * sc);
  }
};

const drawGalleryRects = (p5) => {
  let yind = 0;
  let xind = 0;
  let cFilled = p5.color(255, 200);
  let cDark = p5.color(255, 50);

  p5.strokeWeight(2);
  p5.stroke(255, 150);
  let sc = GlobalConfig.scaler;
  let step = 1;


  for (let x = 0; x < 27; x += step) {
    for (let y = 5; y < 15; y += step) {
      if ((yind + xind) % 2 == 0) p5.fill(cDark);
      else p5.fill(cFilled);
      p5.rect(x * sc, y * sc, sc, sc);
      yind++;
    }
    xind++;
  }

  // 2nd
  for (let x = 0; x < 20; x += step) {
    for (let y = 15; y < 22; y += step) {
      if ((x + y + 1) % 2 == 0) p5.fill(cDark);
      else p5.fill(cFilled);
      p5.rect(x * sc, y * sc, sc, sc);
    }
  }

  // 3rd
  yind = 0;
  xind = 0;
  for (let x = 10; x < 20; x += step) {
    for (let y = 22; y < 27; y += step) {
      if ((x + y + 1) % 2 == 0) p5.fill(cDark);
      else p5.fill(cFilled);
      p5.rect(x * sc, y * sc, sc, sc);
    }
  }
};
