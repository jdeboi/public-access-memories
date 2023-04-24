
import {domCoordsToP5World } from "../../../../helpers/coordinates";
// import { limits,GlobalConfig } from '../../../../../data/HomeBody/GlobalConfig';

//  thanks to Daniel Shiffman for seek/separate code

export default class Duck {
    // The Nature of Code
    // Daniel Shiffman
    // http://natureofcode.com

    constructor(p5, x, y, duck, limits, GlobalConfig) {
        this.position = p5.createVector(x, y);
        this.velocity = p5.createVector(0, 0);
        this.acceleration = p5.createVector(0, 0);
        this.r = 52;
        this.maxforce = 2;
        this.maxspeed = 10;
        this.p5 = p5;
        this.duck = duck;
        this.isFlipped = false;

        this.GlobalConfig = GlobalConfig;
        this.limits = limits;
    }


    applyForce(force) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(force);
    }

    applyBehaviors(hasBread, userX, userY, vehicles) {
        if (hasBread) {
            let userWorld = domCoordsToP5World(userX, userY, this.GlobalConfig);
            var separateForce = this.separate(vehicles);
            var seekForce = this.seek(this.p5.createVector(userWorld.x, userWorld.y));
            separateForce.mult(2);
            seekForce.mult(1);

            var mx = userWorld.x;
        }
        else {
            const startX = this.GlobalConfig.scaler* (this.limits[0].x + 10);
            const startY = this.GlobalConfig.scaler*(this.limits[2].y - 10);
            var mx = startX + 500*Math.sin(this.p5.millis()/22000) 
            var my = startY + 300*Math.sin(this.p5.millis()/24000) 
            var separateForce = this.separate(vehicles);
            var seekForce = this.seek(this.p5.createVector(mx, my));
            separateForce.mult(2);
            seekForce.mult(.2);
        }

        this.applyForce(separateForce);
        this.applyForce(seekForce);

        this.setFlip(mx);
    }

    setFlip(mx) {
        if (mx > this.position.x) {
            this.isFlipped = true;
        }
        else
            this.isFlipped = false;
    }

    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) {
        var desired = this.subtractVec(target, this.position);  // A vector pointing from the position to the target

        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired minus velocity
        var steer = this.subtractVec(desired, this.velocity);
        steer.limit(this.maxforce);  // Limit to maximum steering force

        return steer;
    }

    subtractVec(b, a) {
        var c = this.p5.createVector(b.x - a.x, b.y - a.y, b.z - a.z);
        return c;
    }

    dist(a, b) {
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let dz = b.z - a.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    // Separation
    // Method checks for nearby vehicles and steers away
    separate(vehicles) {
        var desiredseparation = this.r * 2;
        var sum = this.p5.createVector(0)
        var count = 0;
        // For every boid in the system, check if it's too close

        for (const other of vehicles) {
            var d = this.dist(this.position, other.position);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                var diff = this.subtractVec(this.position, other.position);
                diff.normalize();
                diff.div(d);        // Weight by distance
                sum.add(diff);
                count++;            // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            sum.div(count);
            // Our desired vector is the average scaled to maximum speed
            sum.normalize();
            sum.mult(this.maxspeed);
            // Implement Reynolds: Steering = Desired - Velocity
            sum.sub(this.velocity);
            sum.limit(this.maxforce);
        }
        return sum;
    }


    // Method to update position
    update() {
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset accelertion to 0 each cycle
        this.acceleration.mult(0);

        this.checkBoundaries();
    }

    checkBoundaries() {
        let sc = this.GlobalConfig.scaler
        let minX = this.limits[0].x * sc;
        let maxY = this.limits[2].y * sc;

        if (this.position.x < minX + 150) {
            this.position.x = minX + 150;
        }
        if (this.position.y > maxY - 150) {
            this.position.y = maxY - 150;
        }
        // set x of stairs
        if (this.position.y > maxY - 15 * sc) {
            if (this.position.x > 20 * sc + minX) {
                this.position.x = 20 * sc + minX;
            }
        }
        else if (this.position.y > maxY - 20 * sc) {
            if (this.position.x > 15 * sc + minX) {
                this.position.x = 15 * sc + minX;
            }
        }
        else if (this.position.y > maxY - 25 * sc) {
            if (this.position.x > 10 * sc + minX) {
                this.position.x = 10 * sc + minX;
            }
        }
        else if (this.position.y > maxY - 30 * sc) {
            if (this.position.x > 5 * sc + minX) {
                this.position.x = 5 * sc + minX;
            }
        }
        else {
            if (this.position.x > 10 * sc + minX) {
                this.position.x = 10 * sc + minX;
            }
        }
    }

    display() {
        this.p5.fill(175);
        this.p5.stroke(0);
        this.p5.push();
        this.p5.translate(this.position.x, this.position.y);
        // this.p5.ellipse(0, 0, this.r, this.r);
        if (this.isFlipped) {
            this.p5.scale(-1, 1);
            this.p5.image(this.duck, -this.r, 0, this.r, this.r);
        }
        else
            this.p5.image(this.duck, 0, 0, this.r, this.r);
        this.p5.pop();
    }

}