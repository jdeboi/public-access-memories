import p5Types from "p5";

export const CORNER_DIM = 70;

export const isPageForwardCorner = (
  nextStep: { x: number; y: number },
  p5: p5Types
) => {
  const { x, y } = nextStep;
  return x > p5.width - CORNER_DIM && y > p5.height - CORNER_DIM;
};

export const isPageBackwardCorner = (
  nextStep: { x: number; y: number },
  p5: p5Types
) => {
  const { x, y } = nextStep;
  return x < CORNER_DIM && y > p5.height - CORNER_DIM;
};

export const displayPageFlips = (
  img: p5Types.Image,
  currentPage: number,
  numLayouts: number,
  p5: p5Types
) => {
  if (currentPage == 0) {
    displayRightPageFlip(img, p5);
  } else if (currentPage == (numLayouts - 1) * 2) {
    displayLeftPageFlip(img, p5);
  } else {
    displayLeftPageFlip(img, p5);
    displayRightPageFlip(img, p5);
  }
};

export const displayLeftPageFlip = (img: p5Types.Image, p5: p5Types) => {
  return;
  //   p5.fill(0, 100);
  //   p5.noStroke();
  //   p5.push();
  //   p5.translate(0, p5.height - CORNER_DIM);
  //   p5.image(img, 0, 0, CORNER_DIM, CORNER_DIM);
  //   p5.triangle(0, 0, 0, CORNER_DIM, CORNER_DIM, CORNER_DIM);
  //   p5.pop();

  // let dimX = CORNER_DIM * 1.3;
  // let dimY = CORNER_DIM * 1.3;
  // p5.push();
  // p5.scale(-1, 1);
  // p5.translate(0, p5.height - dimY);
  // p5.image(img, -dimX, 0, dimX, dimY);
  // p5.pop();

  let dimX = 40;
  let dimY = 35;

  let space = 20;
  p5.push();
  p5.translate(space, p5.height - dimY - space);

  p5.noStroke();
  p5.strokeWeight(2);
  p5.fill("#f0f0f0");

  p5.rect(0, 0, dimX, dimY);
  p5.noStroke();
  p5.fill("#333");
  p5.textAlign(p5.CENTER);

  p5.stroke("#333");
  p5.strokeWeight(2);
  let lineDX = 15;
  let lineDY = 10;
  p5.line(lineDX, dimY / 2, dimX - lineDX, lineDY);
  p5.line(lineDX, dimY / 2, dimX - lineDX, dimY - lineDY);
  // p5.text("back", 0, 20, dimX, dimY);
  // p5.image(img, -dimX, 0, dimX, dimY);
  p5.pop();
};

export const displayRightPageFlip = (img: p5Types.Image, p5: p5Types) => {
  let dimX = CORNER_DIM * 1.3;
  let dimY = CORNER_DIM * 1.3;
  p5.push();
  p5.translate(p5.width - dimX, p5.height - dimY);
  p5.image(img, 0, 0, dimX, dimY);
  p5.pop();
};
export const pageIsTurning = (pageTurnTime: number, p5: p5Types) => {
  return p5.millis() - pageTurnTime < 500;
};

// export const isPageForwardCorner = (
//   nextStep: { x: number; y: number },
//   pageSetup: { x: number; y: number; w: number; h: number },
//   p5: p5Types
// ) => {
//   const { x, y } = nextStep;
//   let startCornerX = pageSetup.x + pageSetup.w;
//   let startCornerY = pageSetup.y + pageSetup.h - CORNER_DIM;
//   return (
//     x > startCornerX &&
//     x < startCornerX + CORNER_DIM &&
//     y > startCornerY &&
//     y < startCornerY + CORNER_DIM
//   );
// };

// export const isPageBackwardCorner = (
//   nextStep: { x: number; y: number },
//   pageSetup: { x: number; y: number; w: number; h: number },
//   p5: p5Types
// ) => {
//   const { x, y } = nextStep;
//   let startCornerX = pageSetup.x;
//   let startCornerY = pageSetup.y + pageSetup.h - CORNER_DIM;
//   return (
//     x > startCornerX &&
//     x < startCornerX + CORNER_DIM &&
//     y > startCornerY &&
//     y < startCornerY + CORNER_DIM
//   );
// };

// export const displayPageFlips = (
//   img: p5Types.Image,
//   currentPage: number,
//   numLayouts: number,
//   pageSetup: { x: number; y: number; w: number; h: number },
//   p5: p5Types
// ) => {
//   if (currentPage == 0) {
//     displayRightPageFlip(img, pageSetup, p5);
//   } else if (currentPage == (numLayouts - 1) * 2) {
//     displayLeftPageFlip(img, pageSetup, p5);
//   } else {
//     displayLeftPageFlip(img, pageSetup, p5);
//     displayRightPageFlip(img, pageSetup, p5);
//   }
// };

// export const displayLeftPageFlip = (
//   img: p5Types.Image,
//   pageSetup: { x: number; y: number; w: number; h: number },
//   p5: p5Types
// ) => {
//   //   p5.fill(0, 100);
//   //   p5.noStroke();
//   //   p5.push();
//   //   p5.translate(0, p5.height - CORNER_DIM);
//   //   p5.image(img, 0, 0, CORNER_DIM, CORNER_DIM);
//   //   p5.triangle(0, 0, 0, CORNER_DIM, CORNER_DIM, CORNER_DIM);
//   //   p5.pop();
//   let dimX = CORNER_DIM * 1.3;
//   let dimY = CORNER_DIM * 1.3;
//   let startX = pageSetup.x;
//   let startY = pageSetup.y + pageSetup.h - dimY;
//   p5.push();
//   p5.scale(-1, 1);
//   p5.translate(startX, startY);
//   p5.image(img, -dimX, 0, dimX, dimY);
//   p5.pop();
// };

// export const displayRightPageFlip = (
//   img: p5Types.Image,
//   pageSetup: { x: number; y: number; w: number; h: number },
//   p5: p5Types
// ) => {
//   let dimX = CORNER_DIM * 1.3;
//   let dimY = CORNER_DIM * 1.3;
//   let startX = pageSetup.x + pageSetup.w - dimX;
//   let startY = pageSetup.y + pageSetup.h - dimY;
//   p5.push();
//   p5.translate(startX, startY);
//   p5.image(img, 0, 0, dimX, dimY);
//   p5.pop();
// };
// export const pageIsTurning = (pageTurnTime: number, p5: p5Types) => {
//   return p5.millis() - pageTurnTime < 500;
// };
