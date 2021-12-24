
 
 export const doorCrossing = (doors, prevStop, userStep) => {
    for (const door of doors) {
      const cross = door.doorCrossing(prevStop, userStep);
      if (cross) return cross;
    }
    return null;
  }


  export const roomDoorCrossing = (rooms, prevStep, userStep) => {
    for (const room of rooms) {
      const cross = room.roomDoorCrossing(prevStep, userStep, 1);
      if (cross) return cross;
    }
    return null;
  }

  export const roomDoorEntryCrossing = (rooms, prevStep, userStep) => {
    for (const room of rooms) {
      const cross = room.roomDoorEntryCrossing(prevStep, userStep);
      if (cross) return cross;
    }
    return null;
  }

  export const roomDoorBoundary = (rooms, prevStep, userStep) => {
    for (const room of rooms) {
      const cross = room.roomDoorBoundary(prevStep, userStep);
      if (cross) return cross;
    }
    return null;
  }

  export const roomBoundary = (rooms, prevStep, userStep) => {

    for (const room of rooms) {
      var cross = room.roomBoundaryCrossing(prevStep, userStep);
      if (cross) return true;
    }
    return false;
  }

  export const wallBoundary = (walls, prevStep, userStep) => {
    for (const wall of walls) {
      var cross = wall.wallBoundaryCrossing(prevStep, userStep);
      if (cross) return true;
    }
    return false;
  }