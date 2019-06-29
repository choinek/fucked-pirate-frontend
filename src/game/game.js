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
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

export class Game extends Phaser.Game {


}

function preload()
{
    this.load.image('pirate-johntardo', 'assets/pirate-johntardo.png');
}

function create()
{
    this.add.image(32, 59, 'pirate-johntardo');
}

export function createGame() {
    return new Game(config);
}

export function getGame() {
    return window.Game;
}
