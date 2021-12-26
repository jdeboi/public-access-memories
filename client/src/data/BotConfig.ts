import { getNewUser } from "../helpers/helpers"
import { IUser, IBar } from "../interfaces"
import { p5ToDomCoords } from "../helpers/coordinates";
import { GlobalConfig } from "./GlobalConfig";

//// dance dance dance
const danceFloorP5 = { x: 12, y: -12, w: 10, h: 5 };
export const danceFloor = { x: GlobalConfig.scaler * danceFloorP5.x, y: GlobalConfig.scaler * danceFloorP5.y, w: GlobalConfig.scaler * danceFloorP5.w, h: GlobalConfig.scaler * danceFloorP5.h };
export const DJBotCoords = p5ToDomCoords(danceFloorP5.x + 3.5, danceFloorP5.y - 1);

//// bar tenders
const cheeseBotCoords = p5ToDomCoords(-8, 5); // cheese
const wineBotCoords = p5ToDomCoords(-4, 4);
const cocktailBotCoords = p5ToDomCoords(8, 9);
const hostBotCoords = p5ToDomCoords(1, 1);

const barW = 87;
const barH = 175;
const botDX = -50;
const botDY = barH/2;
export const barTenders: IUser[] = [
    getNewUser("wineBot", "🤖", "/", "1", wineBotCoords.x+botDX, wineBotCoords.y+botDY),
    getNewUser("cocktailBot", "🤖", "/", "2", cocktailBotCoords.x+botDX, cocktailBotCoords.y+botDY),
    getNewUser("cheeseBot", "🤖", "/", "3", cheeseBotCoords.x+botDX, cheeseBotCoords.y+botDY),
    getNewUser("DJBot", "🤖", "/", "4", DJBotCoords.x, DJBotCoords.y),
    getNewUser("hostBot", "🤖", "/", "5", hostBotCoords.x+botDX, hostBotCoords.y)
]



export const bars: IBar[] = [
    {
        type: "wine",
        x: wineBotCoords.x,
        y: wineBotCoords.y,
        w: barW,
        h: barH,
        tender: barTenders[0]
    },
    {
        type: "cocktail",
        x: cocktailBotCoords.x,
        y: cocktailBotCoords.y,
        w: barW,
        h: barH,
        tender: barTenders[1]
    },
    {
        type: "cheese",
        x: cheeseBotCoords.x,
        y: cheeseBotCoords.y,
        w: barW,
        h: barH+80,
        tender: barTenders[2]
    },
    {
        type: "DJ",
        x: DJBotCoords.x,
        y: DJBotCoords.y,
        w: 210,
        h: 45,
        tender: barTenders[3]
    },
    {
        type: "host",
        x: hostBotCoords.x,
        y: hostBotCoords.y,
        w: barW,
        h: barH,
        tender: barTenders[4]
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



