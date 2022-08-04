


import { GlobalConfig, limits } from '../../../../../data/GlobalConfig';
import Wall from '../components/Wall';
import p5Types from 'p5';
import { wall14 } from '../../../../../data/HomeBody/WallConfig';
import Room from '../components/Room';
import Door from '../components/Door';

export const initHomeBodyWalls = (p5: p5Types, walls: Wall[]) => {
    walls.push(new Wall(p5, wall14, GlobalConfig));
}

export const initOuterWalls = (p5: p5Types, walls: Wall[]) => {
    walls.push(new Wall(p5, limits, GlobalConfig));
}

///////////////////////////////////////////////////
// need to be cleaned up... ?
const outlineRooms = (p5: p5Types, rooms: any, scaler = GlobalConfig.scaler) => {
    for (let i = 0; i < rooms.length; i++) {
        var w = 5 * scaler;
        var h = 5 * scaler;
        // if (rooms[i].id === "B") h = 7*scaler;
        p5.push();
        p5.translate(rooms[i].x * scaler, rooms[i].y * scaler);
        p5.rect(0, 0, w, h);

        // label
        // p5.strokeWeight(1);
        // p5.fill(255, 0, 255);
        // p5.text(rooms[i].id, 10, 0)
        p5.pop();
    }
}


const drawRoomDoors = (p5: p5Types, rooms: any, scaler = GlobalConfig.scaler) => {
    for (let i = 0; i < rooms.length; i++) {
        var w = 5 * scaler;
        var h = 5 * scaler;
        // if (rooms[i].id === "B") h = 7*scaler;
        p5.push();
        p5.translate(rooms[i].x * scaler, rooms[i].y * scaler);
        p5.translate(w / 2, h / 2);
        p5.rotate(rooms[i].rot / 180 * Math.PI);
        // p5.translate(-w/2, -h/2);
        // if (rooms[i].id ==="B") p5.line(-h*.25, w/2, h*.25, w/2);
        // else
        p5.line(-w * .25, h / 2, w * .25, h / 2);
        p5.pop();
    }
}


export const drawWalls = (walls: Wall[], p5: p5Types) => {
    for (const wall of walls) {
        wall.display(p5);
    }
}

export const drawWallsOG = (walls: Wall[], p5: p5Types) => {
    p5.stroke(255);
    p5.strokeWeight(2);
    if (walls) {
        let i = 0;
        for (const wall of walls) {
            if (i == 0) {
                wall.display(p5);
                i++;
            }
            // p5.noFill();
            // p5.strokeWeight(10);
            // p5.stroke(0);
            // wall.displayOutline();
        }
    }
}


export const drawDoors = (doors: Door[], p5: p5Types) => {
    p5.strokeWeight(4);
    p5.fill(0);
    p5.stroke(80);
    if (doors) {
        for (const door of doors) {
            door.display(p5);
        }
    }
}

export const drawRooms = (rooms: Room[], roomTextures: p5Types.Image[]) => {
    if (rooms) {
        for (const room of rooms) {
            room.display(roomTextures);
            // var w = roomConfig.w*wallConfig.scaler;
            // var h = w;
            // // if (room.id === "B") w = 7*wallConfig.scaler;
            // drawRoom(p5, room.x*wallConfig.scaler, room.y*wallConfig.scaler, w, h, room.rot, room.title);
        }
    }

}

