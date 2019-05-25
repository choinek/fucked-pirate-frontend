import Phaser from 'phaser';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 400,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            },
            debug: false
        }
    }
};

export class Game extends Phaser.Game {
    constructor(config) {
        super(config);
    }

    

}

export function createGame() {
    return new Game(config);
}

export function getGame() {
    return window.Game;
}
