import Folder from './Folder';
import {  mouseToWorld } from '../../../helpers/coordinates';

export default class Trash extends Folder {

    constructor(p5, id, x, y, label, img, folder) {
        super(p5, id, x, y, label, "", img);

        this.x = x;
        this.y = y;

        this.folder = folder;
        this.folder.closeWindow();
    }

    checkDoubleClicked = (userX, userY) => {
        let mouse = mouseToWorld({ x: userX, y: userY }, this.p5);
        // console.log(mx, my, userX, userY, this.x, this.y);
        if (this.checkOver(mouse.x, mouse.y)) {
            // alert("Don't dig through the trash. You're in a gallery. Geez.")
            this.folder.openWindow();
        }
    }

}
