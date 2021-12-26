
export function getDisToUser(user, otherUser) {
  let dx = user.x - otherUser.x;
  let dy = user.y - otherUser.y;
  let dis = Math.sqrt(dx*dx + dy*dy);
  return dis;
}

export function getOtherUserLocation(user, otherUser, avatarW) {
  const y = otherUser.y+window.innerHeight/2-user.y-avatarW/2;
  const x = otherUser.x+window.innerWidth/2-user.x-avatarW/2;
  return {x: x, y: y};
}

// export function showCheese(user) {
//   return user.hasCheese && (new Date() - user.hasCheese < 15000);
// }

// export function showCocktail(user) {
//   return user.hasCocktail && (new Date() - user.hasCocktail < 15000);
// }

// export function showWine(user) {
//   return user.hasWine && (new Date() - user.hasWine < 15000);
// }

export function initZIndicesIcons() {
  const zind = [];
  for (let i = 6; i < 6+3; i++) {
    zind[i] = i; // icons
  }
  return zind;
}

export function initZIndicesFrames() {
  const zind = [];
  for (let i = 0; i < 3; i++) {
    zind[i] = i+100; // icons
  }
  return zind;
}
