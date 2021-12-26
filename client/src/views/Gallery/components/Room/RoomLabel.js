import Draggable from '../Draggable/Draggable';
// import ShadowDraggable from './Draggable/ShadowDraggable'
import { GlobalConfig } from '../../../../data/GlobalConfig';
import { p5ToWorldCoords } from '../../../../helpers/coordinates';
import { rooms, roomConfig } from '../../../../data/RoomConfig';

export default class RoomLabel extends Draggable {

    constructor(p5, id, eyeIcon) {
        super(id, 0, 0, 160, 80, p5, null);
        // super(id, 0, 0, 160, 80, p5, null, shadow);

        this.eyeIcon = eyeIcon;
        const room = rooms[id];
        
        const point = p5ToWorldCoords(room.x, room.y);
        this.x = point.x - this.w / 2 + roomConfig.w * GlobalConfig.scaler / 2;
        this.y = point.y - this.h / 2 + roomConfig.w * GlobalConfig.scaler / 2;
        this.title = room.title;
        this.link = room.link;
    }

    display(font, roomCount) {
        let rc = roomCount[this.link];
        this.p5.push();
        this.p5.translate(this.x, this.y);
        if (!this.closed) {
            if (!this.minimized) this.displayContent(font, rc);
        }
        this.p5.pop();
    }

    displayContent(font, count) {
        this.p5.push();


        // shadow / glow
        // this.displayShadow();

        this.displaySolidBack(this.p5.color(255, 50));
        this.p5.translate(0, this.barH);
        this.p5.push();

        this.p5.textFont(font, 11);

        this.p5.translate(15, 25);
        this.displayLabel();




        // if (this.title.length > 12) this.p5.translate(0, 35);
        // else 
        this.p5.translate(0, 20);

        // hr
        // this.p5.stroke(0, 70);
        // this.p5.strokeWeight(1);
        // this.p5.line(0, -5, this.w - 40, -5);

        // eye
        this.displayEye(count);

        this.p5.pop();
        this.p5.pop();

        this.displayFrame();
    }



    displayEye(rc) {
        var count = 0;
        if (rc)
            count = rc;

        this.p5.push();
        // this.p5.translate(-w / 2, -h / 2);
        this.p5.fill(255, 100);
        this.p5.stroke(255);
        this.p5.strokeWeight(2);
        // this.p5.rect(0, 0, w, h, 10, 10);

        this.p5.image(this.eyeIcon, 0, 5, 20, 20);

        /// eye count
        this.p5.fill(0);
        this.p5.noStroke();
        this.p5.textSize(11);
        this.p5.text(count, 25, 20);



        this.p5.pop();
    }

    displayLabel() {

        // draw title
        this.p5.fill(0);
        this.p5.noStroke();
        if (this.title.length > 12) {
            let br = this.title.indexOf(" ");
            let t1 = this.title.substring(0, br);
            let t2 = this.title.substring(br + 1, this.title.length);
            this.p5.text(t1, 0, 0);
            this.p5.text(t2, 0, 17);
        }
        else
            this.p5.text(this.title, 0, 0);

    }
}
