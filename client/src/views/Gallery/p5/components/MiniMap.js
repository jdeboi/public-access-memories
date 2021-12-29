

/////////////////////////////////////////////////////
// use this to generate the image of the mini map
/////////////////////////////////////////////////////


// export default class MiniMap {

//   constructor(p5, x, y, w, h) {
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h = h;

//     this.scaler = 4;

//     this.p5 = p5;
//     this.miniMap = this.p5.createGraphics(w, h);
//   }

//   displayMapUsers(users, wallConfig) {
//     if (users) {
//       for (const otherUser of users) {
//         const x = (otherUser.x/wallConfig.scaler-wallConfig.x)*this.scaler;
//         const y = (otherUser.y/wallConfig.scaler-wallConfig.y)*this.scaler;
//         this.miniMap.ellipse(x, y, 10);
//       }
//     }
//   }

//   displayMapUser(user, wallConfig) {
//     const ux = (user.x/wallConfig.scaler-wallConfig.x)*this.scaler;
//     const uy = (user.y/wallConfig.scaler-wallConfig.y)*this.scaler;
//     this.miniMap.ellipse(ux, uy, 10);
//   }

//   update(user, users, walls, doors, rooms, wallConfig) {
//     this.miniMap.push();
//     this.miniMap.background(0);
//     this.miniMap.translate(0, 0); //-user.x/wallConfig.scaler*miniMapScaler, -user.y/wallConfig.scaler*miniMapScaler);
//     this.miniMap.translate(0, 0); //wallConfig.x*miniMapScaler, wallConfig.y*miniMapScaler)

//     // outline rooms
//     this.miniMap.stroke(255);
//     this.miniMap.strokeWeight(2);
//     this.miniMap.fill(100);
//     this.outlineRooms(rooms);

//     // draw walls
//     this.outlineWalls(walls);

//     // draw wall doors
//     this.miniMap.stroke(255, 0, 0);
//     this.drawDoors(doors);

//     // draw room doors
//     this.miniMap.stroke(0, 0, 255);
//     this.drawRoomDoors(rooms);

//     // draw user ellipses
//     this.miniMap.noStroke();
//     this.miniMap.fill(255, 0, 0);
//     this.displayMapUser(user, wallConfig);
//     this.miniMap.fill(0, 0, 255);
//     this.displayMapUsers(users, wallConfig);

//     this.miniMap.pop();
//   }

//   display() {
//     this.p5.push();
//     this.p5.translate(this.x, this.y);
//     this.p5.image(this.miniMap, 0, 0);
//     this.p5.strokeWeight(3);
//     this.p5.stroke(255, 0, 0);
//     this.p5.noStroke();
//     this.p5.noFill();
//     this.p5.rect(0, 0, this.w, this.h);
//     this.p5.pop();
//   }

//   outlineWalls(walls) {
//     for (const wall of walls)  {
//       wall.displayOutline(this.miniMap, wall.points, this.scaler);
//     }
//   }

//   outlineRooms(rooms) {
//     for (const room of rooms) {
//       room.displayOutline(this.miniMap, this.scaler);
//     }
//   }

//   drawDoors(doors) {
//     for (const door of doors) {
//       door.displayLine(this.miniMap, this.scaler);
//     }
//   }

//   drawRoomDoors(rooms) {
//     for (const room of rooms) {
//       var w = room.w*this.scaler;
//       var h = room.h*this.scaler;
//       // if (rooms[i].id === "B") h = 7*scaler;
//       this.miniMap.push();
//       this.miniMap.translate(room.x*this.scaler, room.y*this.scaler);
//       this.miniMap.translate(w/2, h/2);
//       this.miniMap.rotate(room.rot/180*Math.PI);
//       // p5.translate(-w/2, -h/2);
//       // if (rooms[i].id ==="B") p5.line(-h*.25, w/2, h*.25, w/2);
//       // else
//       this.miniMap.line(-w*.25, h/2, w*.25, h/2);
//       this.miniMap.pop();
//     }

//   }
// }
