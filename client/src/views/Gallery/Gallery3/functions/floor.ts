import p5Types from 'p5';   
import {drawSpaceFloor} from '../../Gallery1/functions/floor';

export const drawAllFloors = (p5: p5Types) => {
    
    drawSpaceFloor(-3, -3, 10, 15, p5);
}