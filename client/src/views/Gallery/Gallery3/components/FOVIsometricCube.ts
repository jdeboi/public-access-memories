import p5Type from 'p5';
const SIDE_LEN = 64 / 2;
const GRID_X = 500;
const GRID_Y = 500;


export default class FOVIsometricCube {

    c: number;
    r: number;
    z: number;
    isTop: boolean;
    img: p5Type.Image;
    p5: p5Type;

    // https://happycoding.io/examples/p5js/creating-classes/isometric-cubes
    constructor(r: number, c: number, z: number, isTop: boolean, img: p5Type.Image, p5: p5Type) {
        this.c = c;
        this.r = r;
        this.z = z;
        this.isTop = isTop;
        this.img = img;
        this.p5 = p5;

        // this.red = map(z, 0, 10, 0, 255);
        // this.green = map(r, 0, 10, 0, 255);
        // this.blue = map(c, 0, 10, 0, 255);
    }

    display() {


        
        this.p5.image(this.img, this.getX() - SIDE_LEN, this.getY() - SIDE_LEN)

        if (!this.isTop) {
            this.drawBox();
        }

    }

  
    drawBox() {
        const x = this.getX();
        const y = this.getY();
        const opac = 40;

        const points = [];
        for (let angle = this.p5.PI / 6; angle < this.p5.PI * 2; angle += this.p5.PI / 3) {
            points.push(
                this.p5.createVector(x + this.p5.cos(angle) * SIDE_LEN,
                    y + this.p5.sin(angle) * SIDE_LEN));
        }
        this.p5.noStroke();
       
        // this.p5.fill(this.red * .75, this.green * .75, this.blue * .75, opac);
        this.p5.quad(x, y,
            points[5].x, points[5].y,
            points[0].x, points[0].y,
            points[1].x, points[1].y);

        // left
        // fill(this.red * .9, this.green * .9, this.blue * .9, opac);
        this.p5.quad(x, y,
            points[1].x, points[1].y,
            points[2].x, points[2].y,
            points[3].x, points[3].y);

            // this.p5.fill(this.red, this.green, this.blue, opac);
            this.p5.quad(x, y,
            points[3].x, points[3].y,
            points[4].x, points[4].y,
            points[5].x, points[5].y);
    }

    getX() {
        return GRID_X + (this.c - this.r) * SIDE_LEN * this.p5.sqrt(3) / 2;
    }

    getY() {
        return GRID_Y + (this.c + this.r) * SIDE_LEN / 2 - (SIDE_LEN * this.z);
    }



}