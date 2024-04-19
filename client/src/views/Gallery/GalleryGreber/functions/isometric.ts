
import p5Type from 'p5';
import Cube from '../components/FOVIsometricCube';

const SPRITE_ROWS = 50;
const SPRITE_COLS = 50;
const BLOCK_DIM = 64;
const SIDE_LEN = 64 / 2;

const trees = [
    //1 0 0 'tree'
    // 2 0 0 'blue tree'
    // bush tree 2 1 0 
    // spike tree 2 11 4
    // 2 9 3 big tree palm
    // red spikey 0 5 1

    // cone pine 1 10 7
    // 0 6 6 cone pine 
    // grass and tree 0 0 2
    // birch 0 7 4
    // tree bush 0 3 0
    // wreath tree 2 10 3
    // 2 10 7 blossom tree
    // 0 5 4 serious douglas fir
    // 0 1 4 tall narrow fir

    // 1 6 4 ice tower


    // 0 7 3 hedge arch

    // awesome tall hedge 1 1 2
    // 1 3 0 'mushroom'
    // gloud tree 1 0 1
    // snow tree 0 9 2

    // 1 8 5 // tall corner hedge
    // 0 0 3  blue tree bush
    // 0 8 7 small tree
]

const bushes = [
    // 1 6 0  blueish ground shrub
    // 2 5 7 white ground shrub 
    // 0 11 0 hedge
    // 2 11 5 big bush
    // kinda water 1 7 7
    // yellow bush grass 2 5 6
    // blue shrub 1 6 0 
    // 2 8 3  whtie shurbbery
]
const grasses = [
    { img: 0, r: 10, c: 6 },
    { img: 2, r: 8, c: 5 }
];
const bricks = [
    { img: 2, r: 2, c: 0 },
    // { img: 2, r: 11, c: 0 },
    { img: 2, r: 2, c: 7 }, // party block
    // { img: 1, r: 7, c: 4 }, // brown block  
    // { img: 2, r: 10, c: 6 }, // brown, chip
    { img: 2, r: 9, c: 2 }     // hole side
]



export const initBlockImgs = (assets: p5Type.Image[], p5: p5Type) => {
    let imgs : p5Type.Image[][] = [[],[]];
    for (let i = 0; i < bricks.length; i++) {
        let bi = p5.createImage(64, 64);
        let { spImg, spX, spY } = getSpriteImg(assets, bricks, i);
        bi.copy(spImg, spX, spY, BLOCK_DIM, BLOCK_DIM, 0, 0, BLOCK_DIM, BLOCK_DIM);
        imgs[0].push(bi);
    }
    for (let i = 0; i < grasses.length; i++) {
        let bi = p5.createImage(64, 64);
        let { spImg, spX, spY } = getSpriteImg(assets, grasses, i);
        bi.copy(spImg, spX, spY, BLOCK_DIM, BLOCK_DIM, 0, 0, BLOCK_DIM, BLOCK_DIM);
        imgs[1].push(bi);
    }
    return imgs;
}
export const initCubes = (assets: p5Type.Image[], p5: p5Type) => {
    let imgs = initBlockImgs(assets, p5);
    let cubes = [];
    p5.noiseSeed(5);
    let terrain = getTerrain(p5);
   
    for (let r = 0; r < SPRITE_ROWS; r++) {
        for (let c = 0; c < SPRITE_COLS; c++) {
            for (let z = 0; z < terrain[r][c]; z++) {
                let isTop = false;
                if (z + 1 >= terrain[r][c]) {
                    isTop = true;
                }
                if (isTop) {
                    cubes.push(new Cube(r, c, z, isTop, p5.random(imgs[0]), p5));
                }
                else {
                    cubes.push(new Cube(r, c, z, isTop, p5.random(imgs[1]), p5));
                }
            }
        }
    }
    return cubes;
}

function getSpriteImg(assets: p5Type.Image[], arr: any, num: number) {
    const { x, y } = getPixelPos(arr[num].r, arr[num].c);
    return { spImg: assets[arr[num].img], spX: x, spY: y };
}

function getPixelPos(r: number, c: number) {
    return { x: c * BLOCK_DIM, y: r * BLOCK_DIM };
}

function getTerrain(p5: p5Type) {
    let flyingOff = 0;
    let terrain: number[][] = [];
    let plantTerrain: number[][] = [];

    let inc = .1;

    let roff = 0;
    let proff = 0;
 
    for (let r = 0; r < SPRITE_ROWS; r++) {
        terrain[r] = [];
        plantTerrain[r] = [];
        let coff = 0;
        let pcoff = 0;
        for (let c = 0; c < SPRITE_COLS; c++) {
            terrain[r][c] = p5.constrain(p5.map(p5.noise(roff + flyingOff, coff + flyingOff), 0, 1, -12, 12), 0, 12);
            plantTerrain[r][c] = p5.floor(p5.constrain(p5.map(p5.noise(proff + flyingOff +50, pcoff + flyingOff+50), 0, 1, 0, 8*12*4), 0, 8*12*4));
            coff += inc;
            pcoff += .001;
        }
        roff += inc;
        pcoff += .001;
    }
    flyingOff += .001;
    return terrain;
}

export const displayIsometricGrid = (x: number, y: number, w: number, h: number, p5: p5Type) =>  {
    displayIsometricGround(x, y, w, h, p5, p5.color(0), p5.color(0, 0));
}

export const displayIsometricGround = (x: number, y: number, w: number, h: number, p5: p5Type, stCol: p5Type.Color, flCol: p5Type.Color) =>  {
    let GRID_X = x;
    let GRID_Y = y;
    let GRID_W = w;
    let GRID_H = h;
    for (let r = 0; r < GRID_W/BLOCK_DIM; r++) {
        for (let c = 0; c < GRID_H/BLOCK_DIM; c++) {
            const x = GRID_X + (c - r) * SIDE_LEN * p5.sqrt(3) / 2;
            const y = GRID_Y + (c + r) * SIDE_LEN / 2 - (SIDE_LEN * 0);
            const opac = 80;

            const points = [];
            for (let angle = p5.PI / 6; angle < p5.PI * 2; angle += p5.PI / 3) {
                points.push(
                    p5.createVector(x + p5.cos(angle) * SIDE_LEN,
                        y + p5.sin(angle) * SIDE_LEN));
            }

            p5.fill(flCol);
            p5.stroke(stCol);
            p5.strokeWeight(2);
            p5.quad(x, y,
                points[3].x, points[3].y,
                points[4].x, points[4].y,
                points[5].x, points[5].y);
        }
    }
      

}