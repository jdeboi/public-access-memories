class Field {

    constructor() {
        this.x0 = random(width);
        this.y0 = random(height);
        this.x = this.x0;
        this.y = this.y0;
        this.rot0 = random(2 * PI);
        this.rot = this.rot0;
        this.rad0 = random(300, width / 2);
        this.rad = this.rad0;
        this.ang0 = random(PI / 5, 2 / 3 * PI);
        this.ang = this.ang0;

        this.sW = random(.5, 2);
        this.sp = random(this.sW + 2, 12);
        this.r = random();

        this.col = random(["blue", "darkblue", "lavender"])
    }

    update() {
        this.x += -.5 + 1 * noise(millis() / 100000, this.x0);
        this.y += -.5 + 1 * noise(millis() / 10000, this.y0);

        let d = dist(this.x, this.y, mouseX, mouseY);
        // this.x += 

        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;

        this.ang = PI + PI / 2 * sin(millis() / 2000 + this.r);
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.rot);
        noFill();
        // stroke(this.col);
        stroke(100);
        strokeWeight(this.sW);
        for (let i = 0; i < this.rad; i += this.sp) {
            arc(0, 0, i, i, 0, this.ang);
        }
        pop();
    }
}