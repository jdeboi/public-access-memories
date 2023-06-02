import p5Types from 'p5';
import { drawSpaceFloor } from '../../Gallery1/functions/floor';
import { displayIsometricGround } from './isometric';

export const drawAllFloors = (p5: p5Types) => {

    drawSpaceFloor(-3, -3, 10, 15, p5);
}

export const displayDanceFloor= (x: number, y: number, w: number, h: number, p5: p5Types) => {
    let alpha = 50+50*p5.sin(p5.millis()/500);
    // p5.fill(255, 0, 0, 50)
    // p5.rect(x, y, w, h);
    displayIsometricGround(x+400, y-50, w*2, h*2, p5, p5.color(0), p5.color(0,alpha));
}