import { GlobalConfig } from "../../../../../data/Shows/HomeOffices/GlobalConfig";
import Folder from "../../../components/p5/Folder";
import p5Types from "p5";

export default class ChatBubble extends Folder {
  private txtMessage: string;
  private lastUpdate: number;

  constructor(
    p5: p5Types,
    id: number,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    super(p5, id, x, y, w, h, "", "", null, GlobalConfig);
    this.txtMessage = this.getNewMessage();
    this.lastUpdate = this.p5.random(5000);
  }

  getNewMessage() {
    const alienConversations = [
      "Did you see the sky taste like vanilla?",
      "I hear the leaves whispered secrets.",
      "Butterflies are reading silent books, weren't they?",
      "Time will skip on rainy days, wouldn't it?",
      "You know, cats sing in moonlight sometimes.",
      "My pine trees dreamed of oceans yesterday.",
      "Our morning coffee speaks softly to us.",
      "Stars dances in quiet fields, don't they?",
      "The river hums lullabies to me.",
      "Chairs remember old stories, did it?",
      "Clouds are writing letters to mountains, isn't it?",
      "Sunshine whispered through windows yesterday.",
      "Pebbles keeping ancient memories, haven't they?",
      "Your wind will carries forgotten songs.",
      "Bookshelves laughs in the night, didn't it?",
      "Their birds are painting the dawn sky.",
      "Flowers listened to footsteps, won't it?",
      "Raindrops played tiny drums, didn't they?",
    ];
    return alienConversations[
      Math.floor(Math.random() * alienConversations.length)
    ];
  }

  display() {
    if (this.p5.millis() - this.lastUpdate > 5000) {
      this.lastUpdate = this.p5.millis();
      this.txtMessage = this.getNewMessage();
    }

    this.p5.push();
    this.p5.translate(this.x, this.y);
    this.p5.stroke(0);
    this.p5.strokeWeight(2);
    this.p5.fill(0, 120);
    this.p5.rect(0, 0, this.w, this.h, 10);

    this.p5.noStroke();
    this.p5.fill(255);
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.textSize(12);
    this.p5.text(this.txtMessage, 5, 0, this.w - 10, this.h);
    this.p5.textAlign(this.p5.LEFT, this.p5.TOP);

    this.p5.pop();
  }

  checkDoubleClickedNormal = (room: number = -1) => {
    return false;
  };
}
