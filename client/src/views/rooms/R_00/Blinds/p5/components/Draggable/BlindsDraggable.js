import Draggable from './Draggable';
import {mapVal, constrain} from '../../../../../shared/Helpers/Helpers';

export default class BlindsDraggable extends Draggable {

    constructor(id, x, y, w, h, blinds, shadow, p5) {
        super(id, x, y, w, h, p5, null);
        // super(id, x, y, w, h, p5, null, shadow);

        this.isClosed = true;
        this.closeAmt = 0;
        this.blinds = blinds;
    }

    displayMask(pg, color) {
        if (!this.closed && !this.minimized) {
            pg.fill(color);
            pg.noStroke();
            pg.rect(this.x, this.y, this.w, this.h+this.barH, this.bRad);
            
            // pg.rect(this.x, this.y+this.barH, this.w, this.h, this.bRad);
            // pg.rect(this.x, this.y+this.barH, this.w, this.barH);
        }
      
    }


    displayContent(col) {
  
        const dx = this.p5.mouseX - this.x;
        // if (this.props.id == 0) console.log(pos, ogPos);
        const dy = this.p5.mouseY - this.y;
        const dis = Math.sqrt(dx* dx + dy*dy);
        let maxDis = mapVal(window.innerWidth, 400, 2560, 240, 500);
        maxDis = constrain(maxDis, 240, 500);
        this.isClosed = dis < maxDis?true: false;
    
        let closeSpeed = .03;
        if (this.isClosed) {
            this.closeAmt += closeSpeed;
            if (this.closeAmt > 1) 
                this.closeAmt = 1;
        }
        else {
            this.closeAmt -= closeSpeed;
            if (this.closeAmt < 0.0001)
             this.closeAmt = 0.0001;
        }

        if (this.blinds) 
            this.p5.image(this.blinds, 0, 24, this.w, this.h * this.closeAmt*.97); //1.11//1.14
        // super.displayContent(col);
    }

    // displayShadow() {

    //     var backW = this.w * 1.25;
    //     var backH = this.h * 1.2;

    //     var backY = 0;

    //     this.p5.push();
    //     this.p5.translate(0, this.barH);
    //     this.p5.image(this.shadow, 0, backY, backW, backH);
    //     this.p5.pop();
    // }

}
