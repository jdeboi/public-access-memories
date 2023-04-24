// import { GlobalConfig } from '../../constants';

// const squares = [
//     [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
//     [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
//     [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0],
//     [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
//     [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//     [1, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 1],
//     [1, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 1],
//     [1, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 1],
//     [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//     [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
//     [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0],
//     [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
//     [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
// ]
const squares = [
    [0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 2, 2, 3, 2, 1, 0, 0, 0, 1],
    [0, 1, 2, 3, 2, 2, 1, 1, 0, 0, 1, 1],
    [1, 2, 3, 2, 1, 1, 0, 1, 0, 1, 2, 1],
    [1, 1, 2, 1, 1, 0, 0, 1, 0, 2, 3, 3],
    [0, 0, 1, 0, 1, 0, 0, 1, 1, 2, 3, 3],

]
export default class Garden {

    constructor(p5, GlobalConfig) {
        const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";
        this.grasses = [];
        this.grasses[0] = p5.loadImage(url + "grass/200.png");
        this.grasses[1] = p5.loadImage(url + "grass/400.png");
        this.grasses[2] = p5.loadImage(url + "grass/1000.png");

        this.GlobalConfig = GlobalConfig;
    }

    display(p5) {
        p5.push();
        let sc = this.GlobalConfig.scaler
        p5.translate(sc*23, sc*28);
        for (let r = 0; r < squares.length; r++) {
            for (let c = 0; c < squares[r].length; c++) {
                p5.push();
                p5.translate(sc * c, sc * r);
                this.getGrassImage(p5, squares[r][c]);
                p5.pop();
            }
        }
        p5.pop();
    }

    getGrassImage(p5, val) {
        let sc = this.GlobalConfig.scaler;
        if (val == 1) {
            p5.image(this.grasses[0], -2, 2, sc+4, sc+4);
            p5.stroke(255);
            p5.noFill();
            // p5.rect(0, 0, sc, sc)
        }
        else if (val == 2)  {
            // p5.stroke(255);
            // p5.fill(0, 100);
            // p5.rect(0, 0, sc, sc)'
            p5.image(this.grasses[1], -2, 2, sc+4, sc+4);
        }
        else if (val == 3) {
            p5.image(this.grasses[2], -2, 2, sc+4, sc+4);
        }
    }
}