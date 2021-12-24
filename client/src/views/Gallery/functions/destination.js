import { GlobalConfig } from "../../../data/GlobalConfig";
import { roundToMult2 } from "../../../helpers/helpers";


export const reachedDestination = (stepTo, destination) => {
    // if (user.x === destination.x && user.y === destination.y)
    // console.log(destination, stepTo)
    return (stepTo.x === destination.x && stepTo.y === destination.y);
}

// TODO - probably a smarter way to determine best step...
export const getNextStep = (stepTo, destination) => {
    let steps = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let min = 1000000;
    let index = 0;
    let i = 0;
    for (const step of steps) {
        let stepDis = getStepDist(stepTo, destination, step);
        if (stepDis < min) {
            min = stepDis;
            index = i;
        }
        i++;
    }
    return steps[index];
}

const getStepDist = (stepTo, destination, step) => {
    const space = GlobalConfig.scaler;
    // const dx = destination.x - (user.x + step[0] * space);
    // const dy = destination.y - (user.y + step[1] * space);
    const dx = destination.x - (stepTo.x + step[0] * space);
    const dy = destination.y - (stepTo.y + step[1] * space);
    return Math.sqrt(dx * dx + dy * dy);
}


export const drawTextLoc = (p5) => {
    p5.noStroke();
    p5.fill(255, 0, 255);
    p5.textSize(50);
    const dx2 = p5.mouseX > window.innerWidth / 2 ? 50 : -50;
    const dy2 = p5.mouseY > window.innerHeight / 2 ? 50 : -50;
    const mx = roundToMult2((p5.mouseX - window.innerWidth / 2) + dx2, GlobalConfig.scaler);
    const my = roundToMult2((p5.mouseY - window.innerHeight / 2) + dy2, GlobalConfig.scaler);
    p5.text(mx + " " + my, p5.mouseX, p5.mouseY);
}


var lastMouseMove = 0;

export const mouseDidMove = (p5) => {
    return p5.pmouseX !== p5.mouseX || p5.pmouseY !== p5.mouseY;
}



export const showMouseLoc = (isMobile, lastMouseMove, p5) => {
    if (!isMobile && new Date() - lastMouseMove < 800) {
        if (!p5.mouseIsPressed) { //!isWalking&& 
            let sc = GlobalConfig.scaler;
            let sw = 10;
            const dx2 = p5.mouseX > p5.windowWidth / 2 ? 50 : -50;
            const dy2 = p5.mouseY > p5.windowHeight / 2 ? 50 : -50;
            const mx = roundToMult2((p5.mouseX - p5.windowWidth / 2) + dx2, sc);
            const my = roundToMult2((p5.mouseY - p5.windowHeight / 2) + dy2, sc);
            p5.noStroke();
            p5.noFill();
            p5.strokeWeight(sw / 2);
            p5.stroke(20, 0, 50, 25);
            // p5.rect(mx+window.innerWidth/2-50+sw, my+window.innerHeight/2-50+sw, sc-sw*2, sc-sw*2, 10);
            p5.ellipse(mx + p5.windowWidth / 2, my + p5.windowHeight / 2, sc - sw * 4);
            p5.ellipse(mx + p5.windowWidth / 2, my + p5.windowHeight / 2, sc - sw * 6);
            p5.ellipse(mx + p5.windowWidth / 2, my + p5.windowHeight / 2, sc - sw * 8);
        }
    }
}

export const showUserEllipses = (userEase, destination, isWalking, p5) => {
    // let sc = GlobalConfig.scaler;
    let sw = 10;
    p5.noStroke();
    p5.noFill();
    p5.strokeWeight(sw / 2);
    p5.stroke(20, 0, 50, 55);
    // p5.rect(mx+window.innerWidth/2-50+sw, my+window.innerHeight/2-50+sw, sc-sw*2, sc-sw*2, 10);
    // p5.ellipse(window.innerWidth/2, window.innerHeight/2, sc-sw*2);
    // p5.ellipse(window.innerWidth/2, window.innerHeight/2, sc-sw*4);
    // p5.ellipse(window.innerWidth/2, window.innerHeight/2, sc-sw*6);

    // const x = destination.x + p5.windowWidth / 2 - user.x;
    // const y = destination.y + p5.windowHeight / 2 - user.y;
    const x = destination.x + p5.windowWidth / 2 - userEase.x;
    const y = destination.y + p5.windowHeight / 2 - userEase.y;
    const lineL = 20;


    if (isWalking) {
        p5.line(x - lineL / 2, y - lineL / 2, x + lineL / 2, y + lineL / 2);
        p5.line(x + lineL / 2, y - lineL / 2, x - lineL / 2, y + lineL / 2);
    }
}

export const showDestination = (userEase, destination, isWalking, p5) => {
    if (isWalking) {
        // lastMouseMove = new Date();
        const sc = GlobalConfig.scaler;
        p5.noStroke();
        p5.noFill();
        let sw = 10;
        p5.noStroke();
        p5.noFill();
        p5.strokeWeight(5);
        p5.stroke(20, 0, 50, 55);
        // const x = destination.x + p5.windowWidth / 2 - user.x;
        // const y = destination.y + p5.windowHeight / 2 - user.y;
        const x = destination.x + p5.windowWidth / 2 - userEase.x;
        const y = destination.y + p5.windowHeight / 2 - userEase.y;
        const lineL = 20;
        if (destination.x) {
            p5.line(x - lineL / 2, y - lineL / 2, x + lineL / 2, y + lineL / 2);
            p5.line(x + lineL / 2, y - lineL / 2, x - lineL / 2, y + lineL / 2);

        }
        // p5.rect(destination.x+window.innerWidth/2-user.x-50+sw, destination.y+window.innerHeight/2-user.y-50+sw,  sc-sw*2, sc-sw*2, 10);
        // p5.ellipse(destination.x+window.innerWidth/2-user.x, destination.y+window.innerHeight/2-user.y,  sc-sw*2);
        // p5.ellipse(destination.x+window.innerWidth/2-user.x, destination.y+window.innerHeight/2-user.y,  sc-sw*4);
        // p5.ellipse(destination.x+window.innerWidth/2-user.x, destination.y+window.innerHeight/2-user.y,  sc-sw*6);
    }
}

