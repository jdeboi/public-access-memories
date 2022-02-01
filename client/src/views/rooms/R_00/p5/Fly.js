class Fly {


    constructor(p5) {
        this.p5 = p5;
        this.x = p5.random(p5.width);
        this.y = p5.random(p5.height);
        this.minScale = 0.7;
        this.maxScale = 1.2;
        this.z = this.p5.random(this.minScale, this.maxScale);

        this.h = 12;
        this.stemH = this.h * .6;
        this.w = 12;
        this.flyTime = p5.random(5000);
        this.isFlying = true;

        this.isLanding = false;

        this.crawlTime = p5.random(1000);
        this.isCrawling = false;
        this.crawlAngle = p5.random(2 * p5.PI);

        this.randN = p5.random(10);

        this.targetOffset = {x: p5.random(30), y: p5.random(100)}
        this.target = { x: p5.width / 2, y: p5.height / 2 }
        this.prevTarget = { ...this.target };
        //p5.random([{ x: 150, y: 200 }, { x: 300, y: 200 }, { x: 150, y: 500 }]);

    }

    onBanana() {
        return true;
    }

    setTarget(targetX, targetY) {
        this.target.x = targetX + this.targetOffset.x;
        this.target.y = targetY + this.targetOffset.y;
    }

    display() {
        this.p5.push();
        this.p5.translate(this.x, this.y);
        // this.p5.translate(100, 100);
        this.p5.scale(this.z);
        // this.p5.scale(5);
        this.p5.fill(0);
        this.p5.strokeWeight(1);
        this.p5.stroke(255);
        this.p5.beginShape();
        this.p5.vertex(0, 0);
        this.p5.vertex(this.w, this.h);

        // stem
        this.p5.vertex(this.w * .56, this.h * .99);
        this.p5.vertex(this.w * .83, this.h + this.stemH);
        this.p5.vertex(this.w * .55, this.h + this.stemH * 1.25);
        this.p5.vertex(this.w * .3, this.h * 1.1);

        this.p5.vertex(0, this.h*1.4);
        this.p5.vertex(0, 0);
        this.p5.endShape();
        this.p5.pop();
    }

    move() {
        if (this.fruitMoved(1)) {
            this.prevTarget = {...this.target}
            this.clicked();
        }

        if (this.isLanding) {
            // this.p5.fill(0, 0, 255);
            this.land();
        } else if (this.isFlying) {
            // this.p5.fill(255, 0, 0);
            this.fly();
        } else {
            // this.p5.fill(0, 255, 0);
            this.crawl();
        }

        this.cycleFlight();
    }

    land() {

        let ang = this.p5.atan2(this.y - this.target.y, this.x - this.target.x);
        let speed = 5;
        this.x -= speed * this.p5.cos(ang);
        this.y -= speed * this.p5.sin(ang);

        // if (this.z > 1) this.z -= 0.1;
        // if (this.z < 1) this.z += 0.1;

        this.mouseRepel();

        if (this.p5.abs(this.x - this.target.x) < 5 && this.p5.abs(this.y - this.target.y) < 5) {
            this.isLanding = false;
        }

    }

    cycleFlight() {
        if (this.isLanding) return;
        if (this.p5.millis() - this.flyTime > 3000) {
            this.isFlying = !this.isFlying;
            if (!this.isFlying) this.isLanding = true;
            this.flyTime = this.p5.millis();
        }
        // if (this.isFlying) {
        //     if (this.p5.millis() - this.flyTime > 4000) {
        //         this.isFlying = false;
        //         this.isLanding = true;
        //         this.flyTime = this.p5.millis();
        //     }
        // } else {
        //     if (this.p5.millis() - this.flyTime > 4000) {
        //         this.isFlying = true;
        //         this.flyTime = this.p5.millis();
        //     }
        // }
    }

    crawl() {
        if (this.isCrawling) {
            let step = 4;
            this.x += step * this.p5.cos(this.crawlAngle) + this.p5.random();
            this.y += step * this.p5.sin(this.crawlAngle) + this.p5.random();
        }
        this.cycleCrawl();
    }

    setFruitAngle() {
        this.crawlAngle = this.p5.atan2(this.target.y - this.y, this.target.x - this.x);
        this.prevTarget = { ...this.target };
    }

    fruitMoved(amt) {
        let d = this.p5.dist(this.prevTarget.x, this.prevTarget.y, this.target.x, this.target.y);
        return d > amt;
    }

    cycleCrawl() {
        if (this.isCrawling) {
            if (this.p5.millis() - this.crawlTime > 200) {
                this.isCrawling = false;
                this.crawlTime = this.p5.millis();
            }
        } else {
            if (this.p5.millis() - this.crawlTime > 800) {
                this.isCrawling = true;
                this.crawlAngle = this.p5.random(2 * this.p5.PI);
                this.crawlTime = this.p5.millis();
            }
        }
    }

    fly() {
        let speed = 15;
        let dN = 15;
        //     this.x = noise(frameCount / speed, this.randN) * width;
        //     this.y =
        //       noise((frameCount + 100) / (speed + 10), this.randN) * height;

        let nx = this.p5.noise((this.p5.frameCount + this.randN) / dN, this.randN);
        this.x += this.p5.map(nx, 0, 1, -speed, speed);

        let ny = this.p5.noise(
            (this.p5.frameCount + this.randN + 100) / (dN + 10),
            this.randN + 10
        );
        this.y += this.p5.map(ny, 0, 1, -speed, speed);

        let nz = this.p5.noise(
            (this.p5.frameCount + this.randN * 2 + 200) / (dN + 20),
            this.randN + 20
        );
        this.z += this.p5.map(nz, 0, 1, -0.2, 0.2);

        this.mouseRepel();
        this.checkBoundaries();
    }

    mouseRepel() {
        let d = this.p5.dist(this.x, this.y, this.p5.mouseX, this.p5.mouseY);

        // if (this.isFlying === false) {
        //     if (d < 150) {
        //         this.clicked();
        //     }
        // }

        if (d < 150) {
            let ang = this.p5.atan2(this.p5.mouseY - this.y, this.p5.mouseX - this.x);
            this.x -= 10 * this.p5.cos(ang);
            this.y -= 10 * this.p5.sin(ang);
        }
    }

    clicked() {
        this.isFlying = true;
        this.isLanding = false;
        this.flyTime = this.p5.millis() - this.p5.random(5000);
    }

    checkBoundaries() {
        if (this.x < 0) {
            this.x += this.p5.width;
        }
        this.x %= this.p5.width;
        if (this.y < 0) {
            this.y += this.p5.height;
        }
        this.y %= this.p5.height;

        if (this.z < this.minScale) this.z = this.minScale;
        if (this.z > this.maxScale) this.z = this.maxScale;
    }
}
export default Fly;