import Player from "./player.js";
import Viking from "./Viking.js";
import Mago from "./Mago.js"
import Coin from "./coins.js";
const stepLimit = 15;

export default class LavaMapScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'LavaMapScene',
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
        const map2 = this.make.tilemap({ key: "map2" });
        let tileset = map2.addTilesetImage('Spritesheet_tileset', 'mapalava');
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
        this.audio = this.sound.add("audio_mapalava", config);
        this.audio.play();
        //Capas
        this.add.image(8000, 300, "lavabackground");
        const cielo = map2.createStaticLayer("cielo", tileset, 0, 0);
        const lava = map2.createStaticLayer("lava", tileset, 0, 0);
        const tierra = map2.createStaticLayer("Tierra", tileset, 0, 0);
        this.vikingsGroup = this.physics.add.group();
        this.magosGroup = this.physics.add.group();
        this.lifeGroup = this.physics.add.group();
        this.coinsGroup = this.physics.add.group();
        for (let i = 1; i <= 20; i++) {
            let coin = new Coin(this, Phaser.Math.RND.integerInRange(475 * (i - 1), 475 * i), 100);
            coin.body.bounce.x = 1;
            this.coinsGroup.add(coin);
        }
        for (const objeto2 of map2.getObjectLayer('Enemigos').objects) {
            if (objeto2.type.localeCompare("mago") === 0) {
                let enemy = new Mago(this, objeto2.x, objeto2.y, "verde", "mago");
                enemy.body.bounce.x = 1;
                this.magosGroup.add(enemy);
            }
            else {
                let enemigo = new Viking(this, objeto2.x, objeto2.y, "verde", "vikingo");
                enemigo.body.bounce.x = 1;
                this.vikingsGroup.add(enemigo);
            }
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
        this.physics.add.collider(this.vikingsGroup, tierra);
        this.physics.add.collider(this.vikingsGroup, this.magossGroup);
        this.physics.add.collider(this.magosGroup, tierra);
        this.physics.add.collider(this.magosGroup, this.magosGroup);
        this.physics.add.collider(this.coinsGroup, tierra);
        this.physics.add.overlap(this.coinsGroup, lava, this.carga.coinsDestruct, null, this);
        this.physics.add.collider(this.armasEnemigos, tierra, this.carga.colisiona, null, this);
        this.physics.add.collider(this.escudo, this.armasEnemigos, this.carga.defiende2, null, this);
        this.physics.add.overlap(this.player, this.vikingsGroup, this.carga.onTouchEnemy, null, this);
        this.physics.add.overlap(this.player, this.magosGroup, this.carga.onTouchEnemy, null, this);
        this.physics.add.overlap(this.player, this.coinsGroup, this.carga.getCoin, null, this);
        this.physics.add.overlap(this.fregona, this.vikingsGroup, this.carga.attackEnemy, null, this);
        this.physics.add.overlap(this.fregona, this.magosGroup, this.carga.attackEnemy, null, this);
        this.physics.add.overlap(this.armasEnemigos, this.player, this.carga.attackPlayer, null, this);
        this.physics.add.overlap(this.player, lava, this.carga.gameOverPorAgua, null, this);
        const camera = this.cameras.main;

        this.ayuda = this.add.text(3, 150, 'Usa las Flechas para moverte\ny saltar, si tienes\narmas usa "A" para\natacar y "S" para protegerte', {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
        });
        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels);
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
                    this.sound.removeByKey("audio_mapalava");
                    this.audio = null;
                    this.scene.stop();
                });
            }
            else if (this.player.x >= 15990) {
                if (!this.bonusFin) {
                    this.bonusFin = true;
                    this.player.coins += 100;
                }
                const cam = this.cameras.main;
                cam.fade(250, 0, 0, 0);
                cam.once("camerafadeoutcomplete", () => {
                    this.scene.start("DungeonScene", { vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs, maxLife: this.player.maxLife });
                    this.sound.removeByKey("audio_mapalava");
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

