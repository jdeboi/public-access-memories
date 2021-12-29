import { getNewUser } from "../helpers/helpers"
import { IUser, IBar } from "../interfaces"
import { p5ToDomCoords } from "../helpers/coordinates";
import { GlobalConfig } from "./GlobalConfig";
import { roomConfig } from "./RoomConfig";

//// dance dance dance
//// dance dance dance
const danceFloorP5 = {
    x: 24 - 3,
    y: -1,
    w: 10,
    h: 5
};

// const danceFloorP5 = {
//     x: 1 * roomConfig.w,
//     y: -3 * roomConfig.w,
//     w: 3 * roomConfig.w,
//     h: 2 * roomConfig.w
// };
export const danceFloor = {
    x: GlobalConfig.scaler * danceFloorP5.x,
    y: GlobalConfig.scaler * danceFloorP5.y,
    w: GlobalConfig.scaler * danceFloorP5.w,
    h: GlobalConfig.scaler * danceFloorP5.h
};

const DJBotCoords = {
    x: danceFloorP5.x + 3.5,
    y: danceFloorP5.y - 1
}

export const DJBotDomCoords = p5ToDomCoords(DJBotCoords.x, DJBotCoords.y);

//// wine
const cheeseBotCoords = {
    x: -8,
    y: 5
}; // cheese
const wineBotCoords = {
    x: 30,
    y: 19
}
const cocktailBotCoords = {
    x: 32,
    y: 0
}
const hostBotCoords = {
    x: 10,
    y: 30
}



//// bar tenders
// const cheeseBotCoords = {
//     x: 1 * roomConfig.w,
//     y: 8 * roomConfig.w
// };
// const wineBotCoords = {
//     x: 4 * roomConfig.w,
//     y: 0 * roomConfig.w
// };
// const cocktailBotCoords = {
//     x: 7.5 * roomConfig.w, 
//     y: 7.25 * roomConfig.w
// };
// const hostBotCoords = { x: 1 * roomConfig.w, y: 8 * roomConfig.w };

export const numBarItems = 4;
const barW = 87;
const barH = 175;// + 80;
const botDX = 1.5;
const botDY = 2;
const barUsers: IUser[] = [
    getNewUser("wineBot", "🤖", "/", "1", wineBotCoords.x + botDX, wineBotCoords.y + botDY),
    getNewUser("cocktailBot", "🤖", "/", "2", cocktailBotCoords.x + botDX, cocktailBotCoords.y + botDY),
    getNewUser("cheeseBot", "🤖", "/", "3", cheeseBotCoords.x - 1, cheeseBotCoords.y + botDY),
    getNewUser("DJBot", "🤖", "/", "4", DJBotCoords.x+botDX, DJBotCoords.y-.1),
    getNewUser("hostBot", "🤖", "/", "5", hostBotCoords.x + botDX, hostBotCoords.y)
]

export const barTenders: IUser[] = barUsers.map(user => {
    const usr = { ...user };
    let pt = p5ToDomCoords(usr.x, usr.y);
    usr.x = pt.x;
    usr.y = pt.y;
    return usr;
})



export const bars: IBar[] = [
    {
        type: "wine",
        x: wineBotCoords.x,
        y: wineBotCoords.y,
        w: barW,
        h: barH,
        tender: barTenders[0],
        isFlipped: false
    },
    {
        type: "cocktail",
        x: cocktailBotCoords.x,
        y: cocktailBotCoords.y,
        w: barW,
        h: barH,
        tender: barTenders[1],
        isFlipped: false
    },
    {
        type: "cheese",
        x: cheeseBotCoords.x,
        y: cheeseBotCoords.y,
        w: barW,
        h: barH, // + 80
        tender: barTenders[2],
        isFlipped: false
    },
    {
        type: "DJ",
        x: DJBotCoords.x,
        y: DJBotCoords.y,
        w: 210,
        h: 45,
        tender: barTenders[3],
        isFlipped: false
    },
    {
        type: "host",
        x: hostBotCoords.x,
        y: hostBotCoords.y,
        w: barW,
        h: barH,
        tender: barTenders[4],
        isFlipped: false
    }
]

export const getBar = (type: string): IBar => {
    let b = bars.filter((bar) => bar.type === type)[0];
    if (b) {
        return b;
    }
    return bars[0];
}

export const getBarTender = (type: string): IUser => {
    let u = bars.filter((bar) => bar.type === type)[0].tender;
    if (u) {
        return u;
    }
    return barTenders[0];
}



