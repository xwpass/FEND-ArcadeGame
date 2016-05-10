// Enemies our player must avoid
var Enemy=function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.setProperties(true);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};
// Update the enemy's position, required method for game
//random generator
Enemy.prototype.ranGen=function(low, high) {
    return low + Math.floor(Math.random() * (high - low + 1));
}; 



Enemy.prototype.setProperties = function(init) {


    var speed = this.ranGen(1, 5) * 100;
    if (init) {
        this.x = this.ranGen(-404, 404);
        this.speed = speed;
    } else {
        this.x = this.ranGen(-404, -101);
        this.speed = speed;
    };
    // collision detection with enemy
    this.row = this.ranGen(1, 3);
    this.y = this.row * 83 - 12;
};
//update the enemy's position.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (!game.pause) {
        if (this.x > 505) {
            this.setProperties(false)
        } else {
            this.x += this.speed * dt
        };
        //Collision detection.
        if (this.row === game.player.row) {
            if (this.x > game.player.x - 73 && this.x < game.player.x + 73) {
                game.player.reset();
            }
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(col, row) {

    this.col = col;
    this.row = row;

    this.sprite = "images/char-horn-girl.png";

};
//draw the player on the screen.
Player.prototype.render = function() {
    this.x = this.col * 101;
    this.y = this.row * 83 - 10;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//reset player.
Player.prototype.reset = function() {
    game.pause = false;
    this.rol = 2;
    this.row = 5;
};

//score and reset the game.
Player.prototype.goal = function() {
    this.row = 1;

    game.allEnemies.forEach(function(elem, index) {
        elem.setProperties(true);
    });
    game.player.reset();
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
Player.prototype.handleInput = function(key) {
    if (!game.pause) {
        switch (key) {
            case 'right':
                this.col != 4 ? this.col += 1 : this.col = 4;
                break;
            case 'left':
                this.col !== 0 ? this.col -= 1 : this.col = 0;
                break;
            case 'up':
                this.row != 1 ? this.row -= 1 : this.goal();
                break;
            case 'down':
                this.row != 5 ? this.row += 1 : this.row = 5;
                break;
        }
    }
};

var Game = function(enemies, first) {
    //Pause the game when it initials.
    this.pause = true;
    //initialize the game.
    this.first = first;
    //Set all enemies
    this.allEnemies = [];
    //update all enemies
    for (var i = 0; i < enemies; i++) {
        this.allEnemies.push(new Enemy());
    }
    //initialize the player.
    this.player = new Player(2, 5);
};
//set keyboard input.
Game.prototype.handleInput = function(key) {
    switch (key) {
        //hit space tp pause or start the game.
        case 'space':

            this.pause = !this.pause;
            //start the game.
            if (this.first) {
                this.first = false;
            }
            break;
    }
};

//set the number of enemies.
var numEnemies = 4;
//initialize the first game.
var game = new Game(numEnemies, true);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var gameStart = {
        32: 'space'
    };
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    e.keyCode > 32 ? game.player.handleInput(allowedKeys[e.keyCode]) : game.handleInput(gameStart[e.keyCode]);
});