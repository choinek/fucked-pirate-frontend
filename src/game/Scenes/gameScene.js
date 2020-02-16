import Phaser from 'phaser';
import 'phaser';
import { getGame } from "../game";

let player;
let cursors;
let keys;
let konamiCodeText;

export default class GameScene extends Phaser.Scene {

    serverTick = 0;
    /**
     *
     * @type {Map<string, ArcadeImage>}
     */
    players = new Map();

    objectsLayer;

    constructor() {
        super('GameScene');
        this.reactApp = window.App;
        window.currentScene = this;
    }

    preload() {
        this.load.spritesheet('pirate-johntardo',
            'assets/player/pirateWalkSprite40px.png',
            { frameWidth: 44, frameHeight: 40 }
        );
        this.load.spritesheet('pirate-johntardo-cut',
            'assets/player/pirateCutSprite40px.png',
            { frameWidth: 44, frameHeight: 40 }
        );
        this.load.spritesheet('pirate-johntardo-shoot',
            'assets/player/pirateShootSprite40px.png',
            { frameWidth: 48, frameHeight: 40 }
        );
        this.load.image('tiles', 'assets/tilesets/deep-forest-tileset-32.png');
        this.load.image('multiplayer-pirate-johntardo', 'assets/pirate-johntardo.png');
        this.load.image('background-forest', 'assets/backgrounds/forest.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/deep-forest.json');

        this.load.audio('cut', ['assets/sounds/slash.wav']);
        this.load.audio('shoot', ['assets/sounds/shoot.wav']);
    }

    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('DeepForestTileset32', 'tiles');
        this.background = this.add.tileSprite(0, 0, 2552, 1200, "background-forest");
        this.background.setScrollFactor(0.2);
        this.background.setOrigin(0, 0);

        // const deepBackgroundLayer = map.createStaticLayer("Deep Background", tileset, 0, 0);

        const treesLayer = map.createStaticLayer("Trees", tileset, 0, 0);
        const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
        this.objectsLayer = map.createStaticLayer("Objects", tileset, 0, 0);
        this.objectsLayer.setCollisionByProperty({ Collide: true });


        player = this.physics.add.sprite(50, 50, 'pirate-johntardo');
        // player.setBounce(0.2);
        player.body.setGravityY(1000);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('pirate-johntardo', { start: 1, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'pirate-johntardo', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('pirate-johntardo', { start: 1, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'cut',
            frames: this.anims.generateFrameNumbers('pirate-johntardo-cut', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('pirate-johntardo-shoot', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        });

        const cutSound = this.sound.add('cut', { volume: 0.2, loop: false });
        const shootSound = this.sound.add('shoot', { volume: 0.2, loop: false });
        player.on('animationrepeat-cut', function () {
            cutSound.play();
        });
        player.on('animationrepeat-shoot', function () {
            shootSound.play();
        });

        this.physics.add.collider(player, this.objectsLayer);

        const konamiCodeTextStyle = {
            font: "32px Arial",
            fill: "#ff0044",
            wordWrap: true,
            wordWrapWidth: player.width * 4, align: "center", backgroundColor: "#000"
        };
        konamiCodeText = this.add.text(-1000, -1000, "You cheater!", konamiCodeTextStyle);

        // set the boundaries of our game world
        this.physics.world.bounds.width = this.objectsLayer.width;
        // this.physics.world.bounds.height = this.objectsLayer.height;

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(player);

        // set background color, so the sky is not black
        // this.cameras.main.setBackgroundColor('#ccccff');

        keys = this.input.keyboard.addKeys('Z,X,T');
        this.input.keyboard.createCombo([38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13], { resetOnMatch: true }); // KONAMI code
    }

    update(time, delta) {
        let that = this;
        cursors = that.input.keyboard.createCursorKeys();

        function createNewPlayer(mpPlayer) {
            const playerImageObject = that.physics.add.image(
                mpPlayer.p.x,
                mpPlayer.p.y,
                'multiplayer-pirate-johntardo'
            );

            playerImageObject.body.setAllowGravity(false);

            that.players.set(mpPlayer.name, mpPlayer);
            that.players.set(mpPlayer.name + '__imageObject', playerImageObject);
            that.players.set(mpPlayer.name + '__vectorObject', new Phaser.Math.Vector2());

            const textStyle = {
                font: "16px Arial",
                fill: "#ffffff",
                stroke: "#000000",
                wordWrap: true
            };
            that.players.set(mpPlayer.name + '__nameTextObject',
                that.add.text(
                    mpPlayer.p.x - playerImageObject.width,
                    mpPlayer.p.y - playerImageObject.height,
                    mpPlayer.name,
                    textStyle)
            );
        }

        function handlePlayers(delta) {
            // foreach players table
            // console.log(that.reactApp.state.players);
            that.reactApp.state.players.map(function (mpPlayer) {
                if (that.players.has(mpPlayer.name)) {
                    that.players.set(mpPlayer.name, mpPlayer);
                    /**
                     * @type {ArcadeImage}
                     */
                    const mpPlayerImageObject = that.players.get(mpPlayer.name + '__imageObject');
                    const mpPlayerVectorObject = that.players.get(mpPlayer.name + '__vectorObject');
                    const mpPlayerTextObject = that.players.get(mpPlayer.name + '__nameTextObject');

                    mpPlayerVectorObject.x = mpPlayer.p.x;
                    mpPlayerVectorObject.y = mpPlayer.p.y;

                    const distance = Phaser.Math.Distance.Between(
                        mpPlayerImageObject.x,
                        mpPlayerImageObject.y,
                        mpPlayerVectorObject.x,
                        mpPlayerVectorObject.y
                    );

                    if (distance > 4 && mpPlayerImageObject.body.speed == 0) {
                        that.physics.moveToObject(mpPlayerImageObject, mpPlayerVectorObject, 520);
                    } else if (mpPlayerImageObject.body.speed > 0) {
                        mpPlayerImageObject.body.reset(mpPlayerVectorObject.x, mpPlayerVectorObject.y);
                    }

                    mpPlayerTextObject.x = mpPlayerImageObject.x - mpPlayerImageObject.width;
                    mpPlayerTextObject.y = mpPlayerImageObject.y - mpPlayerImageObject.height;

                } else if (mpPlayer.name != that.reactApp.state.player.login) {
                    createNewPlayer(mpPlayer);
                }
            });
        }

        function handleMovements(that) {

            if (cursors.left.isDown) {
                player.setVelocityX(-520);
                player.anims.play('left', true);
                player.flipX = true;
            } else if (cursors.right.isDown) {
                player.setVelocityX(520);
                player.anims.play('right', true);
                player.flipX = false;
            } else if (keys.Z.isDown) {
                player.anims.play('cut', true);
            } else if (keys.X.isDown) {
                player.anims.play('shoot', true);
            } else if (keys.T.isDown) {
                that.input.keyboard.disableGlobalCapture();
                that.reactApp.focusOnChat();
            } else {
                player.setVelocityX(0);
                player.anims.play('turn');
            }

            if ((cursors.up.isDown || cursors.space.isDown) && player.body.onFloor()) {
                player.setVelocityY(-500);
            }

            that.input.keyboard.on('keycombomatch', function (event) {
                konamiCodeText.x = player.x;
                konamiCodeText.y = player.y - 100;
            });
        }

        function handleGui() {
            // if (cursors.shift.isDown) {
            //     that.scene.start('Title');
            // }
        }

        function handleServerTick() {
            if (that.serverTick > 3) {
                let playerData = that.reactApp.state.player;
                playerData.server.x = Math.round(player.x);
                playerData.server.y = Math.round(player.y);
                that.reactApp.updatePlayerHandler(playerData);
                that.serverTick = 0;
            } else {
                that.serverTick++;
            }
        }

        handleMovements(that);
        handlePlayers(delta);
        handleGui();
        handleServerTick();
    }
};
