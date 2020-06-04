import Player from "./player.js";
import Masked from "./Masked.js";
import Coin from "./coins.js";

export default class MoonMapScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'MoonMapScene',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 500 }
                }
            }
        });
    }

    init(data) {
        if (data !== null) {
            this.lifesPlayer = data.vidas;
            this.coinsPlayer = data.monedas;
            this.buffsPlayer = data.buffs;
            this.maxLife = data.maxLife;
            this.mapa = "verde";
        }
    }
    preload() { }
    create() {
        this.carga = this.scene.get("Preloads");
        this.bonusFin = false;
        this.contadorAyuda = 0;
        const map3 = this.make.tilemap({ key: "map3" });
        let tileset = map3.addTilesetImage('platformertiles', 'mapaluna');
        //Audio
        const config = {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
        this.audio = this.sound.add("audio_mapaluna", config);
        this.audio.play();
        //Capas
        const cielo = map3.createStaticLayer("Cielo", tileset, 0, 0);
        const estrellas = map3.createStaticLayer("Estrellas", tileset, 0, 0);
        const luna = map3.createStaticLayer("Luna", tileset, 0, 0);
        const tierra = map3.createStaticLayer("Tierra", tileset, 0, 0);
        const esquinas = map3.createStaticLayer("Esquinas", tileset, 0, 0);
        this.maskedGroup = this.physics.add.group();
        this.lifeGroup = this.physics.add.group();
        this.coinsGroup = this.physics.add.group();
        for (let i = 1; i <= 20; i++) {
            let coin = new Coin(this, Phaser.Math.RND.integerInRange(475 * (i - 1), 475 * i), 100);
            coin.body.bounce.x = 1;
            this.coinsGroup.add(coin);
        }
        for (const masked of map3.getObjectLayer('Enmascarados').objects) {
            let enemy = new Masked(this, masked.x, masked.y, "verde", "masked");
            enemy.body.bounce.x = 1;
            this.maskedGroup.add(enemy);
        }

        tierra.setCollisionByExclusion([-1]);

        this.player = new Player(this, 10, 200, this.buffsPlayer, this.mapa, this.lifesPlayer, this.coinsPlayer, this.maxLife);
        this.fregona = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.escudo = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.armasEnemigos = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.vidas = this.carga.dibujaVidas(this, this.player.life);

        this.monedas = this.add.sprite(650, 20, "coin").setOrigin(0).setScrollFactor(0).setScale(1.5);
        this.text = this.add.text(690, 27, "X " + this.player.coins, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "30px" }).setOrigin(0).setScrollFactor(0);
        this.physics.add.collider(this.player, tierra);
        this.physics.add.collider(this.maskedGroup, tierra);
        this.physics.add.collider(this.coinsGroup, tierra);
        this.physics.add.overlap(this.player, this.maskedGroup, this.carga.onTouchEnemy, null, this);
        this.physics.add.overlap(this.player, this.coinsGroup, this.carga.getCoin, null, this);
        this.physics.add.overlap(this.fregona, this.maskedGroup, this.carga.attackEnemy, null, this);
        const camera = this.cameras.main;

        this.ayuda = this.add.text(3, 150, 'Usa las Flechas para moverte\ny saltar, si tienes\narmas usa "A" para\natacar y "S" para protegerte', {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
        });
        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map3.widthInPixels, map3.heightInPixels);
        camera.startFollow(this.player);
    }

    update() {
        this.player = this.carga.gameOverPorAgua(this.player);
        if (this.player.life > 0) {
            if (this.player.x <= 9) {
                const cam = this.cameras.main;
                cam.fade(250, 0, 0, 0);
                cam.once("camerafadeoutcomplete", () => {
                    this.scene.start("DungeonScene", { vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs, maxLife: this.player.maxLife });
                    this.sound.removeByKey("audio_mapaluna");
                    this.audio = null;
                    this.scene.stop();
                });
            }
            else if (this.player.x >= 9570) {
                if (!this.bonusFin) {
                    this.bonusFin = true;
                    this.player.coins += 20;
                }
                const cam = this.cameras.main;
                cam.fade(250, 0, 0, 0);
                cam.once("camerafadeoutcomplete", () => {
                    this.scene.start("DungeonScene", { vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs, maxLife: this.player.maxLife });
                    this.sound.removeByKey("audio_mapaluna");
                    this.audio = null;
                    this.scene.stop();
                });
            }
            else this.player.update();
            this.carga.updateLife(this.vidas, this.player.life);
        }
        else {
            this.carga.updateLife(this.vidas, this.player.life);
            this.audio.stop();
            this.scene.launch('GameOver', { escena: this });
            this.scene.pause(this);
            let audio = this.sound.add("fin", {
                volume: 0.2,
            });
            audio.play();
            let audiofin = this.sound.add("menufin", {
                volume: 0.2,
                delay: 3000
            });
            audiofin.play();
        }
        if (this.contadorAyuda > 200)
            this.ayuda.destroy();
        else this.contadorAyuda++;
    }


}

