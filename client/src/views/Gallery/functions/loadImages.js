export const LMD_BASE_URL = "https://lmd-bucket.s3.us-east-2.amazonaws.com/";
export const LMD_URL = LMD_BASE_URL + "sketches/gallery/";
export const PAM_URL =
  "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/";

export const loadEmojis = (
  p5,
  lightImgs,
  dancerImgs,
  barEmojis,
  trashFiles,
  loadBarEmojis = true
) => {
  //////////////
  // lights
  lightImgs[0] = p5.loadImage(LMD_URL + "tracklights/tracklights_vert.jpg");
  lightImgs[1] = p5.loadImage(LMD_URL + "tracklights/light_shadow.png");
  lightImgs[2] = p5.loadImage(
    LMD_URL + "tracklights/tracklights_dark_vert.jpg"
  );
  lightImgs[3] = p5.loadImage(LMD_URL + "tracklights/black_shadow.png");

  // emojis
  dancerImgs[0] = p5.loadImage(LMD_URL + "dancers/dancer0.png");
  dancerImgs[1] = p5.loadImage(LMD_URL + "dancers/dancer1.png");
  dancerImgs[2] = p5.loadImage(LMD_URL + "dancers/dancer2.png");

  if (loadBarEmojis) {
    barEmojis[0] = p5.loadImage(LMD_URL + "emojis/bread.png");
    barEmojis[1] = p5.loadImage(LMD_URL + "emojis/cheese.png");
    barEmojis[2] = p5.loadImage(LMD_URL + "emojis/wine.png");
    barEmojis[3] = p5.loadImage(LMD_URL + "emojis/cocktail.png");
    barEmojis[4] = p5.loadImage(LMD_URL + "emojis/chat.png");
    barEmojis[5] = p5.loadImage(LMD_URL + "emojis/mic.png");
  }

  trashFiles[0] = p5.loadImage(LMD_URL + "trash/fullrec.png");
  trashFiles[3] = p5.loadImage(LMD_URL + "trash/trash0.png");
  trashFiles[2] = p5.loadImage(LMD_URL + "trash/trash1.png");
  trashFiles[1] = p5.loadImage(LMD_URL + "trash/trash2.png");
};
