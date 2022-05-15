import Draggable from './Draggable/Draggable';
// import ShadowDraggable from './Draggable/ShadowDraggable'
import { GlobalConfig } from '../../../../data/GlobalConfig';
import { ShowConfig } from '../../../../data/ShowConfig';
import { p5ToWorldCoords } from '../../../../helpers/coordinates';
import { artists, rooms, roomConfig } from '../../../../data/RoomConfig';

export default class RoomLabel extends Draggable {

    constructor(p5, id, eyeIcon) {
        super(id, 0, 0, 160, 80, p5, null);
        // super(id, 0, 0, 160, 80, p5, null, shadow);

        this.eyeIcon = eyeIcon;
        const room = rooms[id];
        const artist = artists[room.artistID];

        const point = p5ToWorldCoords(room.x, room.y);
        this.x = point.x - this.w / 2 + roomConfig.w * GlobalConfig.scaler / 2;
        this.y = point.y - this.h / 2 + roomConfig.w * GlobalConfig.scaler / 2;
        this.title = artist.title;
        this.artist = artist.name;
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
        this.displayFrame();

        this.p5.translate(0, this.barH);
        this.p5.push();

        this.p5.textFont(font, 11);

        this.p5.translate(15, 25);

        if (ShowConfig.isClosed || ShowConfig.underConstruction) {
            this.displayLabel(`Room ${this.id}`, "artist TBA");
        }
        else
            this.displayLabel(this.title, this.artist);

        // if (this.title.length > 12) this.p5.translate(0, 35);
        // else 
        this.p5.translate(0, 20);


        // eye
        this.displayEye(count);

        this.p5.pop();
        this.p5.pop();

    }

    displayOpenContent() {

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

    displayLabel(title, artist) {

        // draw title

        this.p5.noStroke();
        let t = title;
        let maxL = 16;
        if (t.length > maxL) {
            t = t.substring(0, maxL) + "...";
        }
        this.p5.fill(0, 0, 255);
        this.p5.textSize(14);
        this.p5.text(t, 0, 0);

        this.p5.textSize(11);
        this.p5.fill(0);
        this.p5.text(artist, 0, 17);


    }
}
