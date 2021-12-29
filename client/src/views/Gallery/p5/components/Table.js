import Draggable from './Draggable/Draggable';
import { mouseToWorld, p5ToWorldCoords } from '../../../../helpers/coordinates';

import ButtonTog from './Draggable/ButtonTog';

export default class Table extends Draggable {

    constructor(id, x, y, w, h, p5, open, closed) {
        super(id, x, y, w, h, p5, open);

        let pt = p5ToWorldCoords(x, y);
        this.x = pt.x;
        this.y = pt.y;


        this.button = new ButtonTog(this.w - 40, this.h , 30, 15, p5);
        this.closedImg = closed;

        this.isUmbrellaOpen = false;
    }

    displayContent(userX, userY) {
        this.p5.push();
        // this.p5.translate(this.origin.x, this.origin.y);
        this.p5.translate(0, this.barH);

        if (this.isUmbrellaOpen)
            this.p5.image(this.content, 0, 0, this.w, this.h);
        else
            this.p5.image(this.closedImg, 0, 0, this.w, this.h);


        this.p5.pop();
        this.displayFrame();
        this.displayButton(userX, userY);
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
            this.toggleButton();
            return true;
        }
        return false;
    }

    displayButton(userX, userY) {
        let mouse = mouseToWorld({ x: userX, y: userY }, this.p5);
        mouse.x -= this.x;
        mouse.y -= this.y;
        this.button.display(this.isUmbrellaOpen, mouse.x, mouse.y);
    }

    toggleButton() {
        this.isUmbrellaOpen = !this.isUmbrellaOpen;
    }

}
