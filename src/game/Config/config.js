import Phaser from 'phaser';

export default {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'gameContainer',
    width: 800, //window.innerWidth * window.devicePixelRatio,
    height: 600, //window.innerHeight * window.devicePixelRatio,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 500
            },
            debug: true
        }
    }
};
