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


}

function preload()
{
    this.load.image('pirate-johntardo', 'assets/pirate-johntardo.png');

    this.load.image('tiles', 'assets/tilesets/deep-forest-tileset-32.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/deep-forest.json');
}

function create()
{
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('DeepForestTileset32', 'tiles');

    const deepBackgroundLayer = map.createStaticLayer("Deep Background", tileset, 0, 0);
    const treesLayer = map.createStaticLayer("Trees", tileset, 0, 0);
    const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
    const objectsLayer = map.createStaticLayer("Objects", tileset, 0, 0);

    objectsLayer.setCollisionByProperty({ Collide: true });

    player = this.physics.add.image(32, 59, 'pirate-johntardo');

    player.setBounce(0.2);
    player.body.setGravityY(300);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, objectsLayer);
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
