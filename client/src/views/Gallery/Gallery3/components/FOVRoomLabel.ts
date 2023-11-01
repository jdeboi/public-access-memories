import RoomLabel from '../../components/p5/RoomLabel';
import { GlobalConfig } from '../../../../data/FieldsOfView/GlobalConfig';
import { rooms, artists, roomConfig } from '../../../../data/FieldsOfView/RoomConfig';
import { ShowConfig } from '../../../../data/CurrentShow/ShowConfig';
import p5Types from 'p5';
import ButtonTog from '../../components/p5/Draggable/ButtonTog';

export default class FOVRoomLabel extends RoomLabel {


    constructor(p5: p5Types, id: number, eyeIcon: p5Types.Image, font: p5Types.Font) {
        super(p5, id, eyeIcon, font, GlobalConfig, artists, rooms, roomConfig);
        this.y -= 119;
        this.w = roomConfig.w * GlobalConfig.scaler+16;
        this.x -= 53.5;
        this.minButton = new ButtonTog(this.closeButton.x-8, this.closeButton.y-6, 30, 15, p5);
        this.minButton.toggle();
    }

    displayContent(count: number) {
      
        if (this.minButton.isOn) {
            this.displayContents(count);
        }
    }


    checkDragging(userX: number, userY: number) {
        return false;
    }

    checkButtons(userX: number, userY: number) {
        let mouse = this.getMouseButtons(userX, userY);
        if (this.minButton.mouseOver(mouse.x, mouse.y)) {
            // this.toggleMinimze();
            this.minButton.toggle();
            return true;
        }
        return false;
    }

    mouseOver() {
        let r = this.p5.dist(this.p5.mouseX, this.p5.mouseY, this.x, this.y);
        
        return r < 220;
    }

    displayToolBar(userX: number, userY: number) {
        this.p5.push();
        this.p5.translate(this.x, this.y);


        // if (!this.closed) {
        this.p5.fill(0);
        this.p5.noStroke();
        //     if (!this.minimized) 
        this.p5.rect(0, 10, this.w, (this.barH - 10));
        this.p5.rect(0, 0, this.w, this.barH, this.bRad);

        const { x, y } = this.getMouseCoords(userX, userY);
        this.minButton.display(x, y);
        this.p5.pop();
    }


    

    displayContents(count: number) {
        this.p5.push();


        this.displaySolidBack(this.p5.color(255));
        this.displayFrame();

        this.p5.translate(0, this.barH);
        this.p5.push();

        this.p5.textFont(this.font, 11);

        this.p5.translate(15, 25);

        if (ShowConfig.isClosed || ShowConfig.underConstruction) {
            this.displayLabel(`Room ${this.id}`, "artist TBA", 1, 33);
        }
        else
            this.displayLabel(this.title, this.artist, 1, 33);


        this.p5.translate(0, 20);


        // eye
        this.displayEye(count, 1);

        this.p5.pop();
        this.p5.pop();

    }

}
