class Creature {

    constructor({ name, x, y, text }, img, p5) {
        this.name = name;

        this.txt = text;
        this.x = x;
        this.y = y;
        this.img = img;
        this.timer = this.getRandomT(p5);

        this.worldFactor = 1;
        this.currentFactor = 1;
    }

    display(p5, WORLD_LEN) {
        
        let imgW = this.currentFactor * this.img.width;
        let imgH = this.currentFactor * this.img.height;
        
        p5.imageMode(p5.CENTER);
        p5.image(this.img, this.x*this.worldFactor, this.y*this.worldFactor, imgW, imgH);

        p5.textSize(20);
        p5.fill(255);
        p5.noStroke();
        p5.push();
        p5.translate(-imgW / 2, -imgH / 2);
        p5.text(this.txt, this.x*this.worldFactor, this.y*this.worldFactor + 20 + imgH, imgW, 1000);
        p5.pop();


    }

    setCurrentFactor(p5, pagePos) {
        if (!p5.mouseIsPressed) {

            if (p5.width < 800) {
                let imgW = p5.width - 40;
                this.currentFactor = imgW/ 800;

                this.worldFactor = p5.map(p5.width, 400, 1200, .6, 1);
                this.worldFactor = p5.constrain(this.worldFactor, .6, 1);
            }
            else {
                const d = this.getMouseDist(p5, pagePos);
                const df = .0015;
                if (d < 300) {
                    this.currentFactor -= df;
                }
                else {
                    this.currentFactor += df;
                }
                this.currentFactor = p5.constrain(this.currentFactor, .1, 1);
            }
    
        }


    }

    move(p5, WORLD_LEN, creatures) {

        if (p5.millis() - this.timer > 0) {
            let spot = this.getNewSpot(p5, this.worldFactor*WORLD_LEN, creatures);
            this.x = spot.x;
            this.y = spot.y;
            this.timer = p5.millis() + this.getRandomT(p5);

        }

    }

    getNewSpot(p5, WORLD_LEN, creatures) {
        const imgW = 800;
        let attempt = 10;
        let x = 0;
        let y = 0;
        let wLen = this.worldFactor*WORLD_LEN;
        while (attempt > 0) {
            x = p5.random(-wLen / 2, wLen / 2 - imgW);
            y = p5.random(-wLen / 2, wLen / 2 - imgW);
            let goodSpot = true;
            // console.log(attempt, x, y);
            let totalD = 0;
            if (!creatures || creatures.length < 1) {
                return {x, y};
            }
            for (const creature of creatures) {
                if (creature.x !== this.x && creature.y !== this.y) {
                    let d = p5.dist(creature.x, creature.y, x, y);
                    // totalD += p5.abs(d);
                    if (d < 800) {
                        goodSpot = false;
                    }
                }
            }
            
            // if (totalD / (creatures.length-1) > 1600) {
            if (goodSpot){
                return { x, y };
            }
            attempt--;
            if (attempt == 0) {
            }
        }
        return { x: x + 500, y: y - 400 }
    }

    getMouseDist(p5, pagePos) {
        const d = p5.dist(this.x, this.y,  p5.mouseX-p5.width/2+pagePos.x, p5.mouseY-p5.height/2+pagePos.y);
        return d;
    }

    getRandomT(p5) {
        return p5.random(18000, 27000);
    }
}

export default Creature;