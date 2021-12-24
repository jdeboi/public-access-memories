import Draggable from '../Draggable/Draggable';

export default class Bar extends Draggable {

    constructor(id, {x, y, w, h, type}, shadow, p5) {
        super(id, x, y, w, h, p5, null);
        this.shadow = shadow;
        this.type = type;
        this.sz = 34;
    }

    // setWineCheeseCocktail = () => {
    //     var bar = wineLocation[id];
    //     var point = domCoordsToP5World(bar.x, bar.y);
    //     this.x = point.x;
    //     this.y = point.y;
    //     this.w = 86;
    //     this.h = bar.h;
    //     this.isFlipped = false; 
    // ??
    // this.h += 25;
    // }

    // setDJ() {
    //     var bar = djLocation;
    //     var point = domCoordsToP5World(bar.x, bar.y);

    //     // var point = domCoordsToP5World(0, 0);
    //     this.x = point.x;
    //     this.y = point.y;
    //     this.w = 210;
    //     this.h = 52;
    //     this.isFlipped = true;
    // }


    displayContent(userX, userY) {
        this.p5.push();


        // shadow / glow
        this.displayShadow();

        this.displaySolidBack(this.p5.color(255));
        this.p5.translate(0, this.barH);

        this.p5.push();
        // this.p5.scale(-1, 1);
        this.p5.translate(5, 40);
        this.displayBarContents();

        this.p5.pop();


        this.p5.pop();

        this.displayFrame();
    }

    displayShadow() {

        var backW = this.w * 1.25;
        var backH = this.h * 1.2;
        if (this.isFlipped) {
            backW = this.w * 1.17;
            backH = this.h * 1.25;
        }
        var backY = 0;

        this.p5.push();
        this.p5.translate(0, this.barH);
        this.p5.image(this.shadow, 0, backY, backW, backH);
        this.p5.pop();
    }

    displayBarContents() {
        this.p5.textFont('times');
        this.p5.textSize(34);
        this.displaySpecificBar();
    }

    // OVERRIDE
    displaySpecificBar(){}
}
