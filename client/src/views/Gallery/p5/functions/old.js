
  const userTakeStepOG = (x, y) => {
    var t = new Date();
    let space = GlobalConfig.scaler;
    const prevStep = { x: user.x, y: user.y }
    const userStep = { x: user.x + x * space, y: user.y + y * space };
    const outsideDoor = doorCrossing(prevStep, userStep);
    const roomDoorEntry = roomDoorEntryCrossing(prevStep, userStep);
    const roomDoor = roomDoorCrossing(prevStep, userStep);
    const roomDoorB = roomDoorBoundary(prevStep, userStep);
    // check if entering a room door
    // check if crossing into outside
    // check crossed an inside boundary
    // check if crossed a room boundary

    if (roomDoor) {
      if (window.confirm('Leave the main gallery?')) {
        props.userNewRoom(roomDoor);
      }
      isWalking = false;
      // console.log("entering room", roomDoor);
    }
    else if (outsideDoor) {
      // props.userMove(userStep.x, userStep.y);
      stepTo = { x: userStep.x, y: userStep.y };
      // console.log("outside door")
      props.toggleOutside();
    }
    else if (roomDoorEntry) {
      // props.userMove(userStep.x, userStep.y);
      stepTo = { x: userStep.x, y: userStep.y };
      // console.log("enter/exit room")
    }
    else if (roomBoundary(prevStep, userStep)) {
      isWalking = false;
      // console.log("room boundary")
    }
    else if (roomDoorB) {
      isWalking = false;
      // console.log("room door boundary")
    }
    else if (wallBoundary(prevStep, userStep)) {
      isWalking = false;
      // console.log("wall boundary")
    }
    else {
      // props.userMove(userStep.x, userStep.y);
      stepTo = { x: userStep.x, y: userStep.y };
    }
    // console.log(new Date() - t);
  }
