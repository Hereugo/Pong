function ball(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();

    this.lastHitten = 0;

    this.radius = 8;

    this.run = function() {
        if (RESTART) {
            this.pos.set(x, y);
            this.vel = p5.Vector.random2D();
            this.acc.mult(0);
            RESTART = false;
        }
        this.update();
        this.draw();
    }

    this.draw = function() {
        stroke("white");
        strokeWeight(this.radius);
        point(this.pos.x, this.pos.y);
    }

    this.update = function() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);

        //Check if the ball hits a wall
        if ((this.pos.y - this.radius < 0) || (this.pos.y + this.radius > height)) 
            this.hitWall(HORIZONTAL_WALL);


        this.checkIfHitten(player1);//Check if the ball hits player 1
        this.checkIfHitten(player2);//Check if the ball hits player 2

        //Check who wins( 1 player, 2 or none)
        if (this.pos.x + this.radius <= 0 || this.pos.x - this.radius >= width) 
            RESTART = true;
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.checkIfHitten = function(player, loss = 1) {
        if (Math.abs(this.pos.x + this.radius - player.pos.x) <= loss) {
            //LEFT
            if (player.pos.y - loss <= this.pos.y && this.pos.y <= player.pos.y + player.h + loss) {
                this.hitPlayer(VERTICAL_WALL, player.name);
            }
        } else if (Math.abs(this.pos.x - this.radius - (player.pos.x + player.w)) <= loss) {
            //RIGHT
            if (player.pos.y - loss <= this.pos.y && this.pos.y <= player.pos.y + player.h + loss) {
                this.hitPlayer(VERTICAL_WALL, player.name);
            }
        } else if (Math.abs(this.pos.y + this.radius - player.pos.y) <= loss) {
            //TOP
            if (player.pos.x - loss <= this.pos.x && this.pos.x <= player.pos.x + player.w + loss) {
                this.hitPlayer(HORIZONTAL_WALL, player.name);
            }
        } else if (Math.abs(this.pos.y - this.radius - (player.pos.y + player.h)) <= loss) {
            //BOTTOM
            if (player.pos.x - loss <= this.pos.x && this.pos.x <= player.pos.x + player.w + loss) {
                this.hitPlayer(HORIZONTAL_WALL, player.name);
            }
        }
    }

    this.hitWall = function(v) {
        this.vel.reflect(v);
    }

    this.hitPlayer = function(g, who) {

        this.hitWall(g);
        let v = this.vel.copy().setMag(1);
        this.applyForce(v);

        this.lastHitten = who;
    }
}