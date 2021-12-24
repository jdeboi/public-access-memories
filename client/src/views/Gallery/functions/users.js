

import { mouseToWorld, domCoordsToP5World } from "../../../helpers/coordinates";

export function checkUserClicked(userEase, users, p5) {

    for (const otherUser of users) {
        if (otherUser.roomUrl === "/") {

            let mouse = mouseToWorld(userEase, p5)
            let userWorld = domCoordsToP5World(otherUser.x + 17, otherUser.y - 14)
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

export function seeUserClicked(userEase, users, p5) {


    for (const otherUser of users) {
        if (otherUser.roomUrl === "/") {

            let mouse = mouseToWorld(userEase, p5)
            let userWorld = domCoordsToP5World(otherUser.x + 17, otherUser.y - 14)
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
    const foodTime = 75 * 1000;

    p5.fill(255);
    p5.noStroke();
    p5.push();
    p5.textFont('times', 34);
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.text(user.avatar, -17, 17);

    p5.translate(0, 16);
    if (user.hasCheese && new Date() - user.hasCheese < foodTime) {
        drawCheese(p5, imgs[0], imgs[1]);
    }

    if (user.hasWine && new Date() - user.hasWine < foodTime) {
        drawWine(p5, imgs[2]);
    }

    if (user.hasCocktail && new Date() - user.hasCocktail < foodTime) {
        drawCocktail(p5, imgs[3]);
    }

    p5.pop();
}

export function drawUsers(userEase, users, font, p5, imgs) {
    p5.fill(255);
    p5.noStroke();
    p5.textFont('times', 34);

    for (const otherUser of users) {
        if (otherUser.roomUrl === "/") {
            let coord = domCoordsToP5World(otherUser.x, otherUser.y);
            let ava = otherUser.avatar;


            p5.push();
            p5.translate(coord.x, coord.y);
            p5.text(ava, 0, 0);

            if (otherUser.hasCheese || otherUser.hasWine || otherUser.hasCocktail) {
                p5.push();
                p5.translate(0, 24);
                if (font)
                    drawLabel(p5, otherUser.userName, font);
                p5.pop();
            }
            else if (font)
                drawLabel(p5, otherUser.userName, font);

            p5.textFont('times');
            p5.textSize(34);

            if (p5.dist(otherUser.x, otherUser.y, userEase.x, userEase.y) < 150) {
                drawChat(p5, imgs[4]);
            }


            if (otherUser.hasCheese) {
                drawCheese(p5, imgs[0], imgs[1]);
            }

            if (otherUser.hasWine) {
                drawWine(p5, imgs[2]);
            }

            if (otherUser.hasCocktail) {
                drawCocktail(p5, imgs[3]);
            }

            p5.pop()
        }

    }
}

function drawLabel(p5, name, font) {
    p5.textFont(font);
    p5.textSize(10);
    p5.noStroke();
    p5.fill(255);
    p5.rect(0, 0, p5.textWidth(name) + 6, 12, 3, 3);
    p5.fill(0);
    p5.text(name, 3, 10);
}

function drawChat(p5, chat) {
    // p5.text("💬", 22, -14);
    if (chat)
        p5.image(chat, 22, -54, 34, 34);
}

function drawCocktail(p5, cocktail) {
    // p5.text("🍸", 20, 20);
    if (cocktail)
        p5.image(cocktail, 20, 0, 34, 34);
}

function drawCheese(p5, cheese, bread) {
    // p5.text("🧀", -10, 24);
    // p5.text("🥖", 10, 24);
    if (cheese && bread) {
        p5.image(cheese, -10, 0, 34, 34);
        p5.image(bread, 10, 0, 34, 34);
    }
}

function drawWine(p5, wine) {
    // p5.text("🍷", -20, 20);
    if (wine)
        p5.image(wine, -20, 0, 34, 34);
}