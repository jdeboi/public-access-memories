import Draggable from './Draggable/Draggable';
// import { lightsOG, GlobalConfig, mouseToWorld } from '../../constants';
import { GlobalConfig, lightsP5 } from "../../../data/GlobalConfig";
import { mouseToWorld } from '../../../helpers/coordinates';
import ButtonSq from './Draggable/ButtonSq';

export default class Light extends Draggable {

    constructor(p5, id, imgs) {
        super(id, 0, 0, 80, 300, p5, null);

        this.scaler = GlobalConfig.scaler / 100;

        if (this.scaler < .84)
            this.scaler = .84;
        this.w *= this.scaler;
        this.h *= this.scaler;

        this.isFlipped = this.id !== 0;

        const point = lightsP5[id];
        this.x = point.x * GlobalConfig.scaler;
        this.y = point.y * GlobalConfig.scaler;

        this.imgs = imgs;

        this.isOn = true;

        let wb = 15;
        this.button = new ButtonSq((this.w - wb) / 2, this.h - 15 * this.scaler, wb, p5);
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
            this.toggleLights();
            return true;
        }
        return false;
    }

    displayButton(userX, userY) {
        let mouse = mouseToWorld({ x: userX, y: userY }, this.p5);
        mouse.x -= this.x;
        mouse.y -= this.y;
        this.button.display(this.isOn, mouse.x, mouse.y);
    }

    toggleLights() {
        this.isOn = !this.isOn;
    }

    displayContent(userX, userY) {
        this.p5.push();

        var img, imgBack, backW, backH, backY;
        if (this.isOn) {
            img = this.imgs[0];
            imgBack = this.imgs[1];

            backW = imgBack.width * .8;
            backH = imgBack.height * 1.3;
            backY = 0;
        }

        else {
            img = this.imgs[2];
            imgBack = this.imgs[3];

            backW = imgBack.width * .8;
            backH = imgBack.height * 1.5;
            backY = -30;
        }

        backW *= this.scaler;
        backH *= this.scaler;

        let x = 10 * this.scaler;
        let dy = 90 * this.scaler;
        let w = 50 * this.scaler;
        let h = 150 * this.scaler;



        if (this.isFlipped) {
            // shadow / glow
            this.p5.push();
            this.p5.translate(0, this.barH);
            this.p5.image(imgBack, 0, backY, backW, backH);
            this.p5.pop();

            this.displaySolidBack(this.p5.color(255));
            this.p5.translate(0, this.barH);

            this.p5.push();
            this.p5.translate(x, 0);
            this.p5.scale(-1, 1);
            this.p5.image(img, -w, 0, w, h);
            this.p5.translate(0, dy);
            this.p5.image(img, -w, 0, w, h);
            this.p5.pop();
        }
        else {

            // shadow / glow
            this.p5.push();
            this.p5.translate(0, this.barH);
            this.p5.scale(-1, 1);
            this.p5.image(imgBack, -backW + 20, backY, backW, backH);
            this.p5.pop();

            this.displaySolidBack(this.p5.color(255));
            this.p5.translate(0, this.barH);

            this.p5.push();
            this.p5.translate(x, 0);
            this.p5.image(img, 0, 0, w, h);
            this.p5.translate(0, dy);
            this.p5.image(img, 0, 0, w, h);
            this.p5.pop();
        }



        this.p5.pop();
        this.displayFrame();
        this.displayButton(userX, userY);
    }




}
