import Draggable from "../../../components/p5/Draggable/Draggable";
import { GlobalConfig } from "../../../../../data/Shows/HomeOffices/GlobalConfig";

export default class ChairDraggable extends Draggable {
  static chairImg;

  constructor(id, x, y, w, h, p5) {
    super(id, p5.random(300), p5.random(300), w, h, p5, null, GlobalConfig);
    if (!ChairDraggable.chairImg) {
      ChairDraggable.chairImg = p5.loadImage(
        "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/gifs/chair.png"
      );
    }
    this.content = ChairDraggable.chairImg;
    this.velocityX = p5.random(-1, 1); // Initial horizontal speed
    this.velocityY = p5.random(-1, 1); // Initial vertical speed
  }

  checkDraggingNormal(room = -1) {
    return false;
  }

  updateInRoom(room) {
    if (room === this.roomToDisplay) {
      this.x += this.velocityX;
      this.y += this.velocityY;

      // Check for collision with the edges of the canvas and reverse direction if needed
      if (this.x <= 0 || this.x + this.w >= this.p5.width) {
        this.velocityX *= -1;
        // Adjust position to prevent getting stuck
        this.x = this.x <= 0 ? 1 : this.p5.width - this.w - 1;
      }
      if (this.y <= 0 || this.y + this.h >= this.p5.height) {
        this.velocityY *= -1;
        // Adjust position to prevent getting stuck
        this.y = this.y <= 0 ? 1 : this.p5.height - this.h - 1;
      }
    }
  }
}
