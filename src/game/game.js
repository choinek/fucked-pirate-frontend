import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/gameScene';
import BootScene from './Scenes/bootScene';
import PreloaderScene from './Scenes/preloaderScene';
import TitleScene from './Scenes/titleScene';
import OptionsScene from './Scenes/optionsScene';
import CreditsScene from './Scenes/creditsScene';

const levelJson = {
    assets: {
        tileset: {
            key: 'tiles',
            path: 'assets/tilesets/deep-forest-tileset-32.png'
        },
        tilemap: {
            json: {
                key: 'map',
                path: 'assets/tilemaps/deep-forest.json'
            },
            layers: [
                {
                    name: 'deepBackgroundLayer',
                    layerName: 'Deep Background',
                    tileSet: 'tileset',
                    x: 0,
                    y: 0
                }
            ]
        },
        images: [
            {
                key: 'pirate-johntardo',
                path: 'assets/pirate-johntardo.png',
            }
        ]
    },

};

export class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('Boot', BootScene);
        this.scene.add('Preloader', PreloaderScene);
        this.scene.add('Title', TitleScene);
        this.scene.add('Options', OptionsScene);
        this.scene.add('Credits', CreditsScene);
        this.scene.add('GameScene', GameScene);
        this.scene.start('Boot');
    }
}

export function createGame() {
    return new Game(config);
}

export function getGame() {
    return window.Game;
}
