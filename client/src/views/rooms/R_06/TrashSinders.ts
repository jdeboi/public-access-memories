import TrashFolder from "../../Gallery/components/p5/TrashFolder";

export default class TrashFolderSinders extends TrashFolder {
  displayLabels() {
    this.p5.fill(0);
    this.p5.noStroke();
    this.p5.push();

    this.p5.pop();
  }
}
