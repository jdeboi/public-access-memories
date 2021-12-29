import Draggable from './Draggable/Draggable';
import { mouseToWorld, p5ToWorldCoords } from '../../../../helpers/coordinates';

import ButtonLab from './Draggable/ButtonLab';

export default class Swing extends Draggable {

    constructor(id, x, y, w, h, p5, baby, chain) {
        super(id, x, y, w, h, p5, baby);

        let pt = p5ToWorldCoords(x, y);
        this.x = pt.x;
        this.y = pt.y;

        this.origin = p5.createVector(this.x + this.w / 2, this.y);
        this.armLength = this.h - 46;
        this.position = p5.createVector(0, 0);

        this.angle = .2;
        this.aAcceleration = 0;
        this.aVelocity = 0;


        this.button = new ButtonLab(this.w/2-25, this.h-4, 50, 20, "push", p5);
        this.chain = chain;
    }

    displayContent(userX, userY) {
        this.updateSwing();
        this.p5.push();
        // this.p5.translate(this.origin.x, this.origin.y);
        this.p5.translate(this.w / 2, this.barH);


        // this.p5.image(this.content, 0, 0, this.w, this.h);
        // this.p5.push();
        // this.p5.image(this.chain, 0, 0, this.w, this.h);
        // this.p5.pop();

        this.displaySimple();


        this.p5.pop();
        this.displayFrame();
        this.displayButton(userX, userY);
    }

    displaySimple() {
        this.p5.stroke(0, 0, 0);
        this.p5.fill(175, 175, 175);
        
        this.p5.push();
        this.p5.rotate(-this.angle);
        this.displayChain();
        
        this.p5.image(this.content, -16,  this.armLength-23, 30, 30);
        this.displaySeat();

        this.p5.pop();
    }

    displayChain() {
        this.p5.strokeWeight(2);
        this.p5.stroke(0);
        this.p5.line(0, 0, 0, this.armLength-20);
    }

    displaySeat() {
        let seatW = 30;
        let seatH = 20;
        let de = 3;

        // connector triangle
        this.p5.strokeWeight(2);
        this.p5.line(0, this.armLength-seatH, -seatW/2+de, this.armLength+8);
        this.p5.line(0, this.armLength-seatH, seatW/2-de, this.armLength+8);

        // seat
        this.p5.strokeWeight(4);
        this.p5.line(-seatW/2, this.armLength+8, seatW/2, this.armLength+8);
    }

    updateSwing() {
        //https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/trig-and-forces-the-pendulum

        // Arbitrary constant
        var gravity = 0.06;
        let damping = .95;
        // Calculate acceleration
        this.aAcceleration = -1 * gravity * Math.sin(this.angle);
        // Increment velocity
        this.aVelocity += this.aAcceleration;
        this.aVelocity *= damping;
        // Increment angle
        this.angle += this.aVelocity;

        this.position.x = this.armLength * Math.sin(this.angle);
        this.position.y = this.armLength * Math.cos(this.angle);

        // this.position.add(this.origin);
    }

    swingPushed() {
        this.aVelocity -= .1;
    }



    checkButtons(userX, userY) {
        if (super.checkButtons(userX, userY))
            return true;
        else if (this.checkButton(userX, userY))
            return true;
        return false;
    }

    checkButton(userX, userY) {
        let mouse = mouseToWorld({ x: userX, y: userY }, this.p5);
        mouse.x -= this.x;
        mouse.y -= this.y;
        if (this.button.mouseOver(mouse.x, mouse.y)) {

            this.swingPushed();
            return true;
        }
        return false;
    }

    displayButton(userX, userY) {
        let mouse = mouseToWorld({ x: userX, y: userY }, this.p5);
        mouse.x -= this.x;
        mouse.y -= this.y;
        this.button.display(mouse.x, mouse.y);
    }

}
