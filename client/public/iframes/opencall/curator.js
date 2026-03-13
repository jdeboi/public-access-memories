let fontMain;
let fontMono;
let fontIBM;
let fontSymtext;
let logoWhite;
let logoBlack;
let logo;
let emojis = [];
let shadow;
let fontResin;
let fontDogica;

const debug = false;

const yellowC = "#96FF00";
const cyanC = "#00ffff";
const orangeC = "#F72C25";
let bgImg;

function preload() {
  const url = "/iframes/opencall/assets/";
  fontMain = loadFont(url + "Geo-Regular.ttf");
  //   fontSymtext = loadFont(url + "Symtext.ttf");
  fontMono = loadFont(url + "manolo-mono.ttf");
  logoWhite = loadImage(url + "logo_white_sm.png");
  logoBlack = loadImage(url + "logo_black.png");
  fontIBM = loadFont(url + "IBMPlexMono-Regular.ttf");
  fontResin = loadFont(url + "resin-regular.ttf");
  fontDogica = loadFont(url + "dogica.ttf");
  shadow = loadImage(
    "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/tracklights/black_shadow.png",
  );

  emojis.push(new Emoji("🎅🏼", 100, 100, 34));
  emojis.push(new Emoji("👽", 300, 200, 34));
  emojis.push(new Emoji("🍄", 400, 400, 34));
  emojis.push(new Emoji("😬", 100, 400, 34));
  emojis.push(new Emoji("🌵", 200, 200, 34));
  emojis.push(new Emoji("🚎", 600, 600, 34));
  emojis.push(new Emoji("🐸", 600, 600, 34));
  emojis.push(new Emoji("📺", 300, 700, 34));
}

const DESIGN_SIZE = 1000;

function setup() {
  const d = 1000;
  createCanvas(windowWidth, windowWidth);
  pixelDensity(2);
  logo = logoBlack;
  //   background(0, 0, 0);
}

function draw() {
  fill(0);
  push();
  for (let e of emojis) {
    e.update();
    e.display();
  }
  pop();

  const s = width / DESIGN_SIZE;
  scale(s, s);

  noStroke();
  fill(0, 0, 0, 1);
  // rect(0, 0, width, height);

  push();
  const margin = 84;
  const innerX = margin;
  const innerY = margin;
  const innerW = DESIGN_SIZE - margin * 2;
  const innerH = DESIGN_SIZE - margin * 2;

  const spBoxes = 50;
  const dateFrameW = 150;
  const openCallH = 430;
  const subtH = 120;
  const pamW = 130;
  const totalH = spBoxes * 2 + subtH + openCallH + pamW;

  translate(innerX, (DESIGN_SIZE - totalH) / 2);

  // subtitle
  push();
  drawFrame(0, 0, innerW, subtH);
  drawSubtitle(40, 90, 50);
  pop();

  // open call frame
  translate(0, subtH + spBoxes);
  push();
  drawFrame(0, 0, innerW - spBoxes - dateFrameW, openCallH);
  drawTitle(65, 115, 75);
  pop();

  // date frame
  push();
  translate(innerW - dateFrameW, 0);
  drawFrame(0, 0, 150, openCallH);
  drawDate(20, 70, 150);
  pop();

  // website frame
  push();
  translate(pamW + spBoxes, openCallH + spBoxes);
  drawFrame(0, 0, innerW - pamW - spBoxes, 130);
  drawBottomUrl(50, 90, 30);
  pop();

  // PAM
  push();
  translate(0, openCallH + spBoxes);
  drawFrame(0, 0, pamW, pamW);
  drawPamBadge(30, 46, 70);
  pop();

  pop();
}

function drawDate(x, y, w) {
  push();
  translate(x, y);
  textFont(fontMain);

  noStroke();
  const dt = 2 * sin(frameCount / 20);
  textSize(30 + dt);
  fill(cyanC);
  text("DEADLINE\n TO APPLY", 3 - dt, 30, w - 10, 200);
  fill(255);
  textSize(60);
  text("SUN\n MAY \n17", 0, 150, w, 200);
  pop();
}

function drawTitle(x, y, ts = 120) {
  push();
  fill(0);

  const str = "OPEN CALL";
  const sp = 10;
  textSize(130); // fixed size

  textFont(fontDogica);
  // rect(x-sp, y-sp, textWidth(str), ts*.7)

  noStroke();
  textAlign(LEFT, TOP);

  noStroke();

  const dt = 2 * sin(frameCount / 20);
  fill(getYellowC(100));
  text(str, x - 0.15 * ts - 10 - dt, y - ts * 0.24 - 10, 200);
  fill(getYellowC(155));
  text(str, x - 0.15 * ts - 5 - dt, y - ts * 0.24 - 5, 200);
  fill(getYellowC(255));
  text(str, x - 0.15 * ts, y - ts * 0.24, 200);

  if (debug) {
    stroke("red");
    line(x, y, x + 400, y);
    line(x, y, x, y + 300);
    noStroke();
  }

  pop();
}

function drawSubtitle(x, y, ts = 40) {
  const framesStaysOn = 60 * 3;
  const isFirstTag = frameCount % (framesStaysOn * 2) < framesStaysOn;

  push();
  textFont(fontMain);

  textSize(ts); // fixed size
  fill(0);
  noStroke();

  let tagX = x - 0.07 * ts;

  const highlightC = cyanC;
  const otherC = cyanC; //color(0);

  fill(255);
  text("seeking: ", tagX, y);

  tagX += 184;
  if (isFirstTag) {
    const str = "group show";
    fill(highlightC);
    text(str, tagX, y);
    fill(otherC);
    text(" proposals", tagX + textWidth(str), y);
  } else {
    const str = "curator";
    fill(highlightC);
    text(str, tagX, y);
    fill(otherC);
    text("ial projects", tagX + textWidth(str), y);
  }
  pop();
}

function drawPamBadge(x, y, w) {
  push();
  image(logo, x, y, w, w);
  pop();
}

function drawBottomUrl(x, y, ts = 34) {
  push();
  fill(255);
  noStroke();
  textFont(fontIBM);
  textSize(24); // fixed size

  text("apply at:", x, y);

  fill(cyanC);
  const dx = 10 * sin(frameCount / 30);
  text("publicaccessmemories.com", x + 170 + dx, y);

  pop();
}

function drawFrame(x, y, w, h) {
  const toolbarC = color(0, 0, 90);

  const bgFrameC = color(0, 0, 50);
  const strokeC = color(0, 0, 180);
  const buttonC = strokeC; //color(255);

  push();
  translate(x, y);
  const barH = 40;
  const bRad = 12;

  push();
  fill(toolbarC);
  // noStroke();
  stroke(strokeC);
  strokeWeight(4);

  rect(2, 0, w - 4, barH, bRad, bRad, 0, 0);

  for (let i = 0; i < 3; i++) {
    stroke(buttonC);
    strokeWeight(4);
    noFill();
    const bW = barH * 0.4;
    ellipse(bW * 2 + i * bW * 1.8, barH / 2, bW);
  }
  pop();

  fill(bgFrameC);
  stroke(strokeC);
  strokeWeight(4);
  rect(2, 40, w - 4, h - 40, 0, 0, bRad, bRad);
  pop();
}

function getYellowC(opacity, rand = 1) {
  const c = color(yellowC);
  const r = red(c);
  const g = green(c);
  const b = blue(c) * rand;
  return color(r, g, b, opacity);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  clear(0, 0, 0, 0);
}

class Emoji {
  constructor(symbol, x, y, size = 30) {
    this.symbol = symbol;
    this.x = x;
    this.y = y;
    this.size = size;

    this.angleNoise = random(1000);
    this.speedNoise = random(1000);

    this.baseSpeed = random(0.6, 1.4);
    this.turnAmount = 0.8;
    this.angle = random(TWO_PI);
  }

  update(boundW = width, boundH = height) {
    const turn = map(
      noise(this.angleNoise),
      0,
      1,
      -this.turnAmount,
      this.turnAmount,
    );
    const speed = map(
      noise(this.speedNoise),
      0,
      1,
      this.baseSpeed * 0.6,
      this.baseSpeed * 1.2,
    );

    this.angle += turn * 0.03;
    this.x += cos(this.angle) * speed;
    this.y += sin(this.angle) * speed;

    this.angleNoise += 0.01;
    this.speedNoise += 0.01;

    this.wrap(boundW, boundH);
  }

  wrap(boundW = width, boundH = height) {
    const buffer = this.size;

    if (this.x > boundW + buffer) this.x = -buffer;
    if (this.x < -buffer) this.x = boundW + buffer;
    if (this.y > boundH + buffer) this.y = -buffer;
    if (this.y < -buffer) this.y = boundH + buffer;
  }

  display() {
    push();
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.symbol, this.x, this.y);
    pop();
  }
}
