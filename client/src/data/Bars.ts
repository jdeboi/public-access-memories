import { getNewUser } from "../helpers/helpers"
import { IUser, IBar } from "../interfaces"

export const barTenders: IUser[] = [
    getNewUser("wineBot", "🤖", "/", "1", 10, 10),
    getNewUser("cocktailBot", "🤖", "/", "2", 10, 10),
    getNewUser("cheeseBot", "🤖", "/", "3", 10, 10),
    getNewUser("DJBot", "🤖", "/", "4", 10, 10),
    getNewUser("hostBot", "🤖", "/", "5", 10, 10)
]

export const bars: IBar[] = [
    { type: "wine", x: 0, y: 0, w: 10, h: 90, tender: barTenders[0] },
    { type: "cocktail", x: 100, y: 0, w: 10, h: 90, tender: barTenders[1] },
    { type: "cheese", x: 200, y: 0, w: 10, h: 90, tender: barTenders[2] },
    { type: "DJ", x: 100, y: 100, w: 100, h: 90, tender: barTenders[3] },
    { type: "host", x: 100, y: 100, w: 100, h: 90, tender: barTenders[4] },
]

export const getBar = (type: string) : IBar => {
    let b = bars.filter((bar) => bar.type === type)[0];
    if (b) {
        return b;
    }
    return bars[0];
}

export const getBarTender = (type: string) : IUser => {
    let u = bars.filter((bar) => bar.type === type)[0].tender;
    if (u) {
        return u;
    }
    return barTenders[0];
}

