import Phaser from 'phaser';
import 'phaser';

let player;
let cursors;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    preload () {
        this.load.image('pirate-johntardo', 'assets/pirate-johntardo.png');
        this.load.image('tiles', 'assets/tilesets/deep-forest-tileset-32.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/deep-forest.json');
    }

    create () {
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('DeepForestTileset32', 'tiles');

        const deepBackgroundLayer = map.createStaticLayer("Deep Background", tileset, 0, 0);
        const treesLayer = map.createStaticLayer("Trees", tileset, 0, 0);
        const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
        const objectsLayer = map.createStaticLayer("Objects", tileset, 0, 0);

        objectsLayer.setCollisionByProperty({Collide: true});

        player = this.physics.add.image(32, 59, 'pirate-johntardo');
        player.body.setGravityY(1000);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, objectsLayer);
    }

    update() {
        let that = this;
        cursors = that.input.keyboard.createCursorKeys();

        function createNewPlayer() {
            let player2 = that.physics.add.image(32, 59, 'pirate-johntardo');
            // player2.body.setGravityY(300);
            // player2.setCollideWorldBounds(true);
            // this.physics.add.collider(player2, objectsLayer);
        }

        function handlePlayers() {
            // foreach players table
            // console.log(window.App.state.players);
            window.App.state.players.forEach(function(player) {
                // console.log(player);
            });
        }

        function handleMovements() {
            if (cursors.left.isDown) {
                player.setVelocityX(-520);
            } else if (cursors.right.isDown) {
                player.setVelocityX(520);
            } else {
                player.setVelocityX(0);
            }

            if (cursors.up.isDown
                && (player.body.newVelocity.y < 0.40 && player.body.newVelocity.y > 0.18)) {
                player.setVelocityY(-500);
            }
        }

        function handleGui() {
            if (cursors.shift.isDown) {
                that.scene.start('Title');
            }
        }

        handleMovements();
        handlePlayers();
        handleGui();
    }
};
