import { GlobalConfig } from "../../../../data/GlobalConfig";
import ShadowDraggable from "../../Gallery1/p5/components/Draggable/ShadowDraggable";
import p5Types from 'p5';

export const addColumnDivs = (divs: any, columnGif: p5Types.Image, p5: p5Types, factor=1) => {
    divs.columns = [];
    let sc = GlobalConfig.scaler;
    const w = 80*factor;
    const h = 280*factor;
    
    divs.columns.push(new ShadowDraggable(0, 7.65*sc, 22*sc, w, h, p5, columnGif))
    divs.columns.push(new ShadowDraggable(0, 9.65*sc, 22*sc, w, h, p5, columnGif))

    divs.columns.push(new ShadowDraggable(0, 4*sc, 31.5*sc, w, h, p5, columnGif))
    divs.columns.push(new ShadowDraggable(0, 6*sc, 31.5*sc, w, h, p5, columnGif))

    divs.columns.push(new ShadowDraggable(0, 30.7*sc, 16.5*sc, w, h, p5, columnGif))
    divs.columns.push(new ShadowDraggable(0, 32.7*sc, 16.5*sc, w, h, p5, columnGif))
    
}
