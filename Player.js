function player(x, y, name, controls) {
    this.pos = createVector(x, y);
    this.speed = 5;
    this.name = name;
    
    this.w = 10;
    this.h = 30;

    this.run = function() {
        this.WASDcontrols();
        this.ARROWcontrols();
        this.draw();
    }
    this.draw = function() {
        noStroke();
        fill("white");
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }

    this.update = function(temp) {
        let val = this.pos.y + temp * this.speed;
        if (val >= 0 && val + this.h <= height)
            this.pos.y += temp * this.speed;
    }

    this.WASDcontrols = function() {
        if (controls != 1) return;
        if (keyIsDown(87)) this.update(-1);
        else if (keyIsDown(83)) this.update(1);
    }

    this.ARROWcontrols = function() {
        if (controls != 2) return;
        if (keyIsDown(UP_ARROW)) this.update(-1);
        else if (keyIsDown(DOWN_ARROW)) this.update(1);
    }
}