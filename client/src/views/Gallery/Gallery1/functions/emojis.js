export function displayDancers(dancers, danceFloor, p5) {
  p5.push();
  p5.translate(danceFloor.x, danceFloor.y);
  for (const dancer of dancers) {
    dancer.display();
  }
  p5.pop();
}

export function updateDucks(hasCheese, userX, userY, ducks) {
  for (const duck of ducks) {
    // Path following and separation are worked on in this function
    duck.applyBehaviors(hasCheese, userX, userY, ducks);
    // Call the generic run method (update, borders, display, etc.)
    duck.update();
    duck.display();
  }
}
