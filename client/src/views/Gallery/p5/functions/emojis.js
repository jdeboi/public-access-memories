
 
 export function displayDancers(dancers) {
    for (const dancer of dancers) {
      dancer.display();
    }
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