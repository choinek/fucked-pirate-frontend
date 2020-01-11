import Phaser from 'phaser';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;

export class Game extends Phaser.Game {


}

function preload()
{
    this.load.image('pirate-johntardo', 'assets/pirate-johntardo.png');
}

function create()
{
    player = this.physics.add.image(32, 59, 'pirate-johntardo');

    player.setBounce(0.2);
    player.body.setGravityY(300);
    player.setCollideWorldBounds(true);
}

function update ()
{
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
    }

    // if (cursors.up.isDown && player.body.touching.down)
    if (cursors.up.isDown)
    {
        player.setVelocityY(-330);
    }
}

export function createGame() {
    return new Game(config);
}

export function getGame() {
    return window.Game;
}
