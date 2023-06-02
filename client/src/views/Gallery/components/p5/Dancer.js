


class Dancer {

    constructor(p5, img, x, y, isFlipped, danceFloor) {
        this.x = x;
        this.y = y;
        this.p5 = p5;
        this.isFlipped = isFlipped;
        this.img = img;
        this.lastStep = 0;
        this.danceFloor = danceFloor;
    }



    update = () => {
        if (this.p5.millis() - this.lastStep > 300 ) {
            this.x += (Math.random() * 2 - 1) * 50;
            this.y += (Math.random() * 2 - 1) * 50;
            
            var minX = 0;
            var maxX = this.danceFloor.w;
            var minY = 0;
            var maxY = this.danceFloor.h;

            if (this.x < minX) {
                this.x = minX;
            }
                
            else if (this.x > maxX)
                this.x = maxX;
            if (this.y < minY)
                this.y = minY;
            else if (this.y > maxY)
                this.y = maxY;

            this.lastStep = this.p5.millis();
        }
       
    }

    display() {

        this.update();
        this.p5.push();
        this.p5.translate(this.danceFloor.x, this.danceFloor.y);
        this.p5.translate(this.x, this.y);
        this.p5.textSize(40);
        if (this.isFlipped) {
            this.p5.scale(-1, 1);
            this.p5.image(this.img, -40, 0, 40, 40);
        }
        else
            this.p5.image(this.img, 0, 0, 40, 40);
        this.p5.pop();
    }

}

export default Dancer;
