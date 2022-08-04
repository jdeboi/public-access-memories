import Draggable from './Draggable/Draggable';
// import ShadowDraggable from './Draggable/ShadowDraggable'
import { GlobalConfig } from '../../../../../data/GlobalConfig';
import { ShowConfig } from '../../../../../data/ShowConfig';
import { p5ToWorldCoords } from '../../../../../helpers/coordinates';
import { artists, rooms, roomConfig } from '../../../../../data/RoomConfig';
import p5Types from 'p5';

export default class RoomLabel extends Draggable {

    title: string;
    artist: string;
    link: string;
    eyeIcon: p5Types.Image;
    font: p5Types.Font;

    constructor(p5: p5Types, id: number, eyeIcon: p5Types.Image, font: p5Types.Font) {
        super(id, 0, 0, 160, 80, p5, null);
        // super(id, 0, 0, 160, 80, p5, null, shadow);

        this.eyeIcon = eyeIcon;
        this.font = font;

        const room = rooms[id];
        const artist = artists[room.artistID];

        const point = p5ToWorldCoords(room.x, room.y);
        this.x = point.x - this.w / 2 + roomConfig.w * GlobalConfig.scaler / 2;
        this.y = point.y - this.h / 2 + roomConfig.w * GlobalConfig.scaler / 2;
        this.title = artist.title;
        this.artist = artist.name;
        this.link = room.link;
    }
    

    display() { }


    displayWithCount(roomCount: any) {
        let rc = roomCount[this.link];
        this.p5.push();
        this.p5.translate(this.x, this.y);
        if (!this.closed) {
            if (!this.minimized) this.displayContent(rc);
        }
        this.p5.pop();
    }

    displayFloppy(x: number, y: number, roomCount: any) {
        let rc = roomCount[this.link];
        this.p5.push();
        this.p5.translate(x, y);
        if (!this.closed) {
            if (!this.minimized)
                this.displayFloppyContent(rc);
        }
        this.p5.pop();
    }

    displayFloppyContent(count: number) {
        const factor = GlobalConfig.scaler/40;
        this.p5.push();


        // TODO - guesswork on max number of letters in label
        const w = roomConfig.w * GlobalConfig.scaler * .75;
        const maxL = Math.floor(w / (factor*11*.7));

        if (ShowConfig.isClosed || ShowConfig.underConstruction) {
            this.displayLabel(`Room ${this.id}`, "artist TBA", factor, maxL);
        }
        else
            this.displayLabel(this.title, this.artist, factor, maxL);

        this.p5.translate(0, 20);


        // eye
        this.displayEye(count, factor);
        this.p5.pop();

    }

    displayContent(count: number) {
        this.p5.push();


        // shadow / glow
        // this.displayShadow();

        this.displaySolidBack(this.p5.color(255, 50));
        this.displayFrame();

        this.p5.translate(0, this.barH);
        this.p5.push();

        this.p5.textFont(this.font, 11);

        this.p5.translate(15, 25);

        if (ShowConfig.isClosed || ShowConfig.underConstruction) {
            this.displayLabel(`Room ${this.id}`, "artist TBA", 1);
        }
        else
            this.displayLabel(this.title, this.artist, 1);

        // if (this.title.length > 12) this.p5.translate(0, 35);
        // else 
        this.p5.translate(0, 20);


        // eye
        this.displayEye(count, 1);

        this.p5.pop();
        this.p5.pop();

    }

    displayOpenContent() {

    }



    displayEye(rc: number, factor: number) {
        var count = 0;
        if (rc)
            count = rc;

        this.p5.push();
        this.p5.fill(255, 100);
        this.p5.stroke(255);
        this.p5.strokeWeight(2);
        this.p5.image(this.eyeIcon, 0, 5*factor, 20*factor, 20*factor);

        /// eye count
        this.p5.fill(0);
        this.p5.noStroke();
        this.p5.textSize(11*factor);
        this.p5.text(count, 25*factor, 20*factor);



        this.p5.pop();
    }

    displayLabel(title: string, artist: string, factor: number, maxL=16) {

        // draw title

        this.p5.noStroke();
        let t = title;
        // let maxL = 16*factor;
        if (t.length > maxL) {
            t = t.substring(0, maxL) + "...";
        }
        this.p5.fill(0, 0, 255);
        this.p5.textSize(14*factor);
        this.p5.text(t, 0, 0);

        this.p5.textSize(11*factor);
        this.p5.fill(0);

        t = artist;
        if (t.length > maxL) {
            t = t.substring(0, maxL+2) + "...";
        }
        this.p5.text(t, 0, 17*factor);

    }
}
