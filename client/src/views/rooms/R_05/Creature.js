class Creature {

    constructor({name, x, y, text}, img, p5) {
        this.name = name;

        this.txt = text;
        this.x = x;
        this.y = y;
        this.img = img;
        this.timer = this.getRandomT(p5);

        
    }

    display(p5, pagePos) {
        const d = this.getMouseDist(p5, pagePos);
        const f = p5.constrain(p5.map(d, 0, 500, .1, 1), .1, 1);
        const imgW =  f *this.img.width;
        const imgH = f*this.img.height;
        p5.imageMode(p5.CENTER);
        p5.image(this.img, this.x, this.y,imgW, imgH);
    
        p5.textSize(20);
        p5.fill(255);
        p5.noStroke();
        p5.push();
        p5.translate(-imgW/2, -imgH/2);
        p5.text(this.txt, this.x, this.y+20+imgH, imgW, 1000);
        p5.pop();

        this.move(p5);
    }

    move(p5) {
        if (p5.millis()- this.timer > 0) {
            this.timer = p5.millis() +  this.getRandomT(p5);
            this.x = p5.random(-1400, 1400);
            this.y = p5.random(-1400, 1400);
        }

    }

    getMouseDist(p5, pagePos) {
        const d = p5.dist(this.x, this.y, p5.mouseX+pagePos.x, p5.mouseY+pagePos.y);
        return d;
    }

    getRandomT(p5) {
        return p5.random(4000,12000);
    }
}

export default Creature;