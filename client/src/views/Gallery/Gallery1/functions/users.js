import {
  mouseToWorld,
  domCoordsToP5World,
} from "../../../../helpers/coordinates";
import { getParsedJSONDate } from "../../../../helpers/helpers";

export const iconSize = 34;

export function checkUserClicked(userEase, users, p5, GlobalConfig) {
  for (const otherUser of users) {
    if (otherUser.roomUrl === "/") {
      let mouse = mouseToWorld(userEase, p5, GlobalConfig);
      let userWorld = domCoordsToP5World(
        otherUser.x + 17,
        otherUser.y - 14,
        GlobalConfig
      );
      let userChat = {};
      userChat.x = userWorld.x + 23;
      userChat.y = userWorld.y - 16;
      let d = p5.dist(mouse.x, mouse.y, userWorld.x, userWorld.y);
      let dChat = p5.dist(mouse.x, mouse.y, userChat.x, userChat.y);

      if (d < 20 || dChat < 20) {
        return otherUser;
      }
    }
  }
  return null;
}

export function seeUserClicked(userEase, users, p5, GlobalConfig) {
  for (const otherUser of users) {
    if (otherUser.roomUrl === "/") {
      let mouse = mouseToWorld(userEase, p5, GlobalConfig);
      let userWorld = domCoordsToP5World(
        otherUser.x + 17,
        otherUser.y - 14,
        GlobalConfig
      );
      let userChat = {};
      userChat.x = userWorld.x + 23;
      userChat.y = userWorld.y - 16;
      let d = p5.dist(mouse.x, mouse.y, userWorld.x, userWorld.y);
      let dChat = p5.dist(mouse.x, mouse.y, userChat.x, userChat.y);

      p5.fill(0, 255, 0);

      // if (otherUser.userName === "cocktailBot") console.log(d, mx, my, otherUser.x, otherUser.y)
      if (d < 20 || dChat < 20) {
        p5.fill(255, 0, 0);
      }

      p5.ellipse(userChat.x, userChat.y, 24, 24);
    }
  }
  return null;
}

export function drawUser(user, p5, imgs) {
  p5.textFont("times", iconSize);
  p5.fill(255);
  p5.noStroke();
  p5.push();
  p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
  drawHearingRadius(p5);
  p5.text(user.avatar, -17, 17);
  p5.translate(0, 16);

  if (user.isSpeaking) {
    p5.push();
    p5.translate(-17, 0);
    if (user.isMuted || user.isGlobalMuted) drawMicOff(p5, imgs[5]);
    else drawMic(p5, imgs[5]);
    p5.pop();
  }

  drawUserFoods(p5, user, imgs);

  p5.pop();
}

export function drawUsers(userEase, users, font1, p5, imgs, GlobalConfig) {
  p5.fill(255);
  p5.noStroke();
  p5.textFont("times", iconSize);
  for (const otherUser of users) {
    if (otherUser.roomUrl === "/" && otherUser.userName) {
      let coord = domCoordsToP5World(otherUser.x, otherUser.y, GlobalConfig);
      let ava = otherUser.avatar;

      p5.push();
      p5.translate(coord.x, coord.y);
      drawHearingRadius(p5);
      p5.text(ava, 0, 0);

      if (otherUser.hasCheese || otherUser.hasWine || otherUser.hasCocktail) {
        p5.push();
        p5.translate(0, 24);
        if (font1) drawLabel(p5, otherUser.userName, font1);
        p5.pop();
      } else if (font1) drawLabel(p5, otherUser.userName, font1);

      p5.textFont("times", iconSize);
      // p5.textSize(34);

      if (p5.dist(otherUser.x, otherUser.y, userEase.x, userEase.y) < 200) {
        drawChat(p5, imgs[4]);
      }

      if (otherUser.isSpeaking) {
        if (!otherUser.isMuted && !otherUser.isGlobalMuted)
          drawMic(p5, imgs[5]);
      }

      if (GlobalConfig.isResidency) drawUserFoods(p5, otherUser, imgs, true);
      else drawUserFoods(p5, otherUser, imgs);

      p5.pop();
    }
  }
}

function drawHearingRadius(p5) {
  p5.push();
  // p5.fill(255, 140);
  // for (let i = 0; i < 5; i++) {
  //     p5.fill(0, 20);
  //     p5.ellipse(0, 0, 200-i*30);
  // }
  // p5.fill(0, 40);
  // p5.ellipse(0, 0, 300);
  p5.pop();
}

export const drawUserFoods = (p5, user, imgs) => {
  const foodTime = 75 * 1000;
  let cheeseDate = getParsedJSONDate(user.cheeseTime);
  let wineDate = getParsedJSONDate(user.wineTime);
  let cocktailDate = getParsedJSONDate(user.cocktailTime);

  if (cheeseDate && new Date() - cheeseDate < foodTime) {
    drawCheese(p5, imgs[0], imgs[1]);
  }

  if (wineDate && new Date() - wineDate < foodTime) {
    drawWine(p5, imgs[2]);
  }

  if (cocktailDate && new Date() - cocktailDate < foodTime) {
    drawCocktail(p5, imgs[3]);
  }
};

export const drawLabel = (p5, name, font) => {
  p5.textFont(font);
  p5.textSize(10);
  p5.noStroke();
  p5.fill(255);
  p5.rect(0, 0, p5.textWidth(name) + 6, 12, 3, 3);
  p5.fill(0);
  p5.text(name, 3, 10);
};

export const drawChat = (p5, chat) => {
  // p5.text("💬", 22, -14);
  if (chat) p5.image(chat, 22, -54, iconSize, iconSize);
};

function drawCocktail(p5, cocktail) {
  // p5.text("🍸", 20, 20);
  if (cocktail) p5.image(cocktail, 20, 0, iconSize, iconSize);
}

function drawCheese(p5, cheese, bread) {
  // p5.text("🧀", -10, 24);
  // p5.text("🥖", 10, 24);
  if (cheese && bread) {
    p5.image(cheese, -10, 0, iconSize, iconSize);
    p5.image(bread, 10, 0, iconSize, iconSize);
  }
}

function drawWine(p5, wine) {
  // p5.text("🍷", -20, 20);
  if (wine) p5.image(wine, -20, 0, iconSize, iconSize);
}

export const drawMic = (p5, mic) => {
  if (mic) p5.image(mic, -5, 10, iconSize / 1.5, iconSize / 1.5);
};

export const drawMicOff = (p5, mic) => {
  drawMic(p5, mic);
  p5.stroke("red");
  p5.strokeWeight(5);
  p5.line(0, 0, 10, 10);
};
