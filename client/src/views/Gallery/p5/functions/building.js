


import { GlobalConfig } from '../../../../data/GlobalConfig';


// const outlineRooms = (p5, rooms, scaler=wallConfig.scaler) => {
//     for (let i = 0; i < rooms.length; i++) {
//       var w = 5*scaler;
//       var h = 5*scaler;
//       // if (rooms[i].id === "B") h = 7*scaler;
//       p5.push();
//       p5.translate(rooms[i].x*scaler, rooms[i].y*scaler);
//       p5.rect(0, 0, w, h);
  
//       // label
//       // p5.strokeWeight(1);
//       // p5.fill(255, 0, 255);
//       // p5.text(rooms[i].id, 10, 0)
//       p5.pop();
//     }
//   }
  
  
//   const drawRoomDoors = (p5, rooms, scaler=wallConfig.scaler) => {
//     for (let i = 0; i < rooms.length; i++) {
//       var w = 5*scaler;
//       var h = 5*scaler;
//       // if (rooms[i].id === "B") h = 7*scaler;
//       p5.push();
//       p5.translate(rooms[i].x*scaler, rooms[i].y*scaler);
//       p5.translate(w/2, h/2);
//       p5.rotate(rooms[i].rot/180*Math.PI);
//       // p5.translate(-w/2, -h/2);
//       // if (rooms[i].id ==="B") p5.line(-h*.25, w/2, h*.25, w/2);
//       // else
//       p5.line(-w*.25, h/2, w*.25, h/2);
//       p5.pop();
//     }
//   }
  
export const drawWalls = (walls, p5) => {
    p5.stroke(255);
    p5.strokeWeight(2);
    if (walls) {
        let i = 0;
        for (const wall of walls) {
            if (i == 0) {
                wall.display(p5, GlobalConfig.scaler);
                i++;
            }
            // p5.noFill();
            // p5.strokeWeight(10);
            // p5.stroke(0);
            // wall.displayOutline();
        }
    }
}


export const drawDoors = (doors, p5) => {
    p5.strokeWeight(4);
    p5.fill(0);
    p5.stroke(80);
    if (doors) {
        for (const door of doors) {
            door.display(p5);
        }
    }
}

export const drawRooms = (rooms, roomTextures, eyeIcon, roomCount, p5) => {
    if (rooms) {
        for (const room of rooms) {
            room.display(roomTextures, eyeIcon, roomCount);
            // var w = roomConfig.w*wallConfig.scaler;
            // var h = w;
            // // if (room.id === "B") w = 7*wallConfig.scaler;
            // drawRoom(p5, room.x*wallConfig.scaler, room.y*wallConfig.scaler, w, h, room.rot, room.title);
        }
    }

}

