import { getBar } from "../../../../data/BotConfig";
import CheeseBar from "../../Gallery1/p5/components/Bars/CheeseBar";
import CocktailBar from "../../Gallery1/p5/components/Bars/CocktailBar";
import DJBar from "../../Gallery1/p5/components/Bars/DJBar";
import WineBar from "../../Gallery1/p5/components/Bars/WineBar";
import p5Types from 'p5';

export const addBarDivs = (bars: [any], lightImg: p5Types.Image, p5: p5Types) => {
    const barTypes = ["wine", "cocktail", "DJ", "cheese"];

    let i = 0;
    for (const barType of barTypes) {
        const bar = getBar(barType);
        switch (barType) {
            case "wine":
                bars.push(new WineBar(i, { ...bar }, lightImg, p5));
                break;
            case "cocktail":
                bars.push(new CocktailBar(i, { ...bar }, lightImg, p5));
                break;
            case "DJ":
                bars.push(new DJBar(i, { ...bar }, lightImg, p5));
                break;
            case "cheese":
                bars.push(new CheeseBar(i, { ...bar }, lightImg, p5));
                break;
        }
        i++;
    }
}

export const displayBarDivs = (userX: number, userY: number, bars: any) => {
    for (const bar of bars) {
        bar.display(userX, userY);
        bar.displayToolBar(userX, userY);
    }
}

export const updateBarDivs = (bars: any) => {
    for (const bar of bars) {
        bar.update();
    }
}

export const endBarDivDrag = (bars: any) => {
    for (const bar of bars) {
        bar.endDrag();
    }
}
// TODO 
// I could definitely reuse all of the div functions...
export const checkBarDivs = (userX: number, userY: number, bars: any) => {
    for (const bar of bars) {
        if (bar.checkButtons(userX, userY)) {
            return true;
        }
        if (bar.checkDragging(userX, userY)) {
            return true;
        }
    }
    return false;
}