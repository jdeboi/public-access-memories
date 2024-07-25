import { IUser, IUsers } from "../../../../interfaces";
import p5Types from "p5";
import {
  iconSize,
  drawLabel,
  drawChat,
  drawMic,
  drawMicOff,
  drawUserFoods,
} from "../../Gallery1/functions/users";
import { AnyAaaaRecord } from "dns";

export function drawUser(user: IUser, p5: p5Types, imgs: p5Types.Image[]) {
  p5.textFont("times", iconSize);
  p5.fill(255);
  p5.noStroke();
  p5.push();
  //   p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
  // drawHearingRadius(p5);
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

export function checkUserClicked(user: IUser, users: IUsers, p5: p5Types) {
  for (const otherUser of users) {
    if (otherUser.roomUrl === "/") {
      if (otherUser.roomPage != user.roomPage) continue;
      // let mouse = mouseToWorld(userEase, p5, GlobalConfig);
      let mouse = { x: p5.mouseX, y: p5.mouseY };

      let d = p5.dist(mouse.x, mouse.y, otherUser.x, otherUser.y);
      let dChat = p5.dist(mouse.x, mouse.y, otherUser.x + 23, otherUser.y - 16);

      if (d < 20 || dChat < 20) {
        return otherUser;
      }
    }
  }
  return null;
}

const isOnGalleryPage = (otherUser: IUser) => {
  return otherUser.roomUrl === "/";
};

export function drawUsers(
  user: IUser,
  users: IUsers,
  font1: p5Types.Font,
  p5: p5Types,
  imgs: any
) {
  p5.fill(255);
  p5.noStroke();
  p5.textFont("times", iconSize);
  for (const otherUser of users) {
    if (
      isOnGalleryPage(otherUser) &&
      otherUser.roomPage === user.roomPage &&
      otherUser.userName
    ) {
      //let coord = domCoordsToP5World(otherUser.x, otherUser.y, GlobalConfig);
      let ava = otherUser.avatar;

      p5.push();
      //   p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
      p5.translate(otherUser.x, otherUser.y);
      p5.text(ava, 0, 0);

      // if (otherUser.hasCheese || otherUser.hasWine || otherUser.hasCocktail) {
      //     p5.push();
      //     p5.translate(0, 24);
      //     if (font1)
      //         drawLabel(p5, otherUser.userName, font1);
      //     p5.pop();
      // }
      // else
      if (font1) drawLabel(p5, otherUser.userName, font1);

      p5.textFont("times", iconSize);
      // p5.textSize(34);

      if (p5.dist(otherUser.x, otherUser.y, user.x, user.y) < 200) {
        drawChat(p5, imgs[4]);
      }

      if (otherUser.isSpeaking) {
        if (!otherUser.isMuted && !otherUser.isGlobalMuted)
          drawMic(p5, imgs[5]);
      }

      drawUserFoods(p5, otherUser, imgs);

      p5.pop();
    }
  }
}
