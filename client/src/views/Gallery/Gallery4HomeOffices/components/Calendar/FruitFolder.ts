import { GlobalConfig } from "../../../../../data/Shows/HomeOffices/GlobalConfig";
import Folder from "../../../components/p5/Folder";
import p5Types from "p5";

export default class FruitFolder extends Folder {

  constructor(
    p5: p5Types,
    id: number,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    link: string
  ) {
    super(p5, id, x, y, w, h, label, link, null, GlobalConfig);
    const url = "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/gifs/fruit/";
    
    this.img = this.p5.loadImage(url + this.id + ".webp");
  }

}
