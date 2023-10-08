import { getNewUser } from "../../helpers/helpers"
import { IUser, IBar } from "../../interfaces"
import { p5ToDomCoords, p5ToUserCoords } from "../../helpers/coordinates";
import { GlobalConfig } from "./GlobalConfig";



export const danceFloor = {
    x: 1300,
    y: 1800,
    w: 600,
    h: 750/2
};

const DJBotCoords = {
    x: danceFloor.x/GlobalConfig.scaler+3,
    y: danceFloor.y/GlobalConfig.scaler
}

export const DJBotDomCoords = p5ToDomCoords(DJBotCoords.x, DJBotCoords.y, GlobalConfig);
export const DJBotUserCoords = p5ToUserCoords(DJBotCoords.x, DJBotCoords.y, GlobalConfig);


const cheeseBotCoords = {
    x: 40,
    y: 12
}; // cheese
const wineBotCoords = {
    x: 40,
    y: 20
}
const cocktailBotCoords = {
    x: 40,
    y: 39.5
}
const hostBotCoords = {
    x: 18,
    y: 16.5
}


export const numBarItems = 4;
const barW = 87;
const barH = 175;// + 80;
const botDX = 2.5;
const botDY = 2;
const barUsers: IUser[] = [
    getNewUser("wineBot", "🤖", "/", "1", wineBotCoords.x + botDX, wineBotCoords.y + botDY),
    getNewUser("cocktailBot", "🤖", "/", "2", cocktailBotCoords.x + botDX, cocktailBotCoords.y + botDY),
    // getNewUser("cheeseBot", "🤖", "/", "3", cheeseBotCoords.x - botDX*.6, cheeseBotCoords.y + botDY),
    getNewUser("cheeseBot", "🤖", "/", "3", cheeseBotCoords.x + botDX, cheeseBotCoords.y + botDY),

    getNewUser("DJBot", "🤖", "/", "4", DJBotCoords.x+botDX, DJBotCoords.y-botDX*.2),
    getNewUser("hostBot", "🤖", "/", "5", hostBotCoords.x + botDX, hostBotCoords.y)
]

export const barTenders: IUser[] = barUsers.map(user => {
    const usr = { ...user };
    let pt = p5ToDomCoords(usr.x, usr.y, GlobalConfig);
    usr.x = pt.x;
    usr.y = pt.y;
    return usr;
})


// TODO - my system of units is bonkers
// I mix and match pixels, world coords, dom coords ...
export const bars: IBar[] = [
    {
        type: "wine",
        x: wineBotCoords.x,
        y: wineBotCoords.y,
        w: barW, // stupid to use pixels here but "whatever" units for x & y
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



