import Player from "./player.js";
import Enemy from "./enemy.js";
import Coin from "./coins.js";

export default class GreenMapScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'GreenMapScene',
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
            this.mapa = "verde";
            this.maxLife = data.maxLife;
        }
    }
    preload() { }
    create() {
        this.carga = this.scene.get("Preloads");
        this.bonusFin = false;
        this.contadorAyuda = 0;
        const map = this.make.tilemap({ key: "map1" });
        let tileset = map.addTilesetImage('genaric-cartoon-charactor-sprite-png-15-original', 'mapaverde');
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
        this.audio = this.sound.add("audio_mapaverde", config);
        this.audio.play();
        //Capas
        const cielo = map.createStaticLayer("Cielo", tileset, 0, 0);
        const agua = map.createStaticLayer("Agua", tileset, 0, 0);
        const puentes = map.createStaticLayer("Puentes", tileset, 0, 0);
        const tierra = map.createStaticLayer("Tierra", tileset, 0, 0);
        this.ciclopsGroup = this.physics.add.group();
        this.lifeGroup = this.physics.add.group();
        this.coinsGroup = this.physics.add.group();
        for (let i = 1; i <= 20; i++) {
            let coin = new Coin(this, Phaser.Math.RND.integerInRange(475 * (i - 1), 475 * i), 100);
            coin.body.bounce.x = 1;
            this.coinsGroup.add(coin);
        }
        for (const objeto of map.getObjectLayer('Objects').objects) {
            if (objeto.type.localeCompare("ciclope") !== 0) {
                if (objeto.name.localeCompare("escaleras1") === 0) {
                    this.escaleras1 = this.add.image(objeto.x, objeto.y, objeto.name);
                }
                else if (objeto.name.localeCompare("escaleras2") === 0) {
                    this.escaleras2 = this.add.image(objeto.x, objeto.y, objeto.name);
                }
                else if (objeto.name.localeCompare("escaleras3") === 0) {
                    this.escaleras3 = this.add.image(objeto.x, objeto.y, objeto.name);
                }
            }
        }

        for (const objeto of map.getObjectLayer('Objects').objects) {
            if (objeto.type.localeCompare("ciclope") === 0) {
                let enemigo = new Enemy(this, objeto.x, objeto.y, "verde", objeto.type);
                enemigo.body.bounce.x = 1;
                this.ciclopsGroup.add(enemigo);
            }
        }

        tierra.setCollisionByExclusion([-1]);
        puentes.setCollisionByExclusion([-1]);

        this.player = new Player(this, 10, 540, this.buffsPlayer, this.mapa, this.lifesPlayer, this.coinsPlayer, this.maxLife);
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

        this.text = this.carga.dibujaMonedas(this);
        this.physics.add.collider(this.player, tierra);
        this.physics.add.collider(this.ciclopsGroup, tierra);
        this.physics.add.collider(this.ciclopsGroup, this.ciclopsGroup);
        this.physics.add.collider(this.coinsGroup, tierra);
        this.physics.add.overlap(this.coinsGroup, agua, this.carga.coinsDestruct, null, this);
        this.physics.add.collider(this.player, puentes);
        this.physics.add.collider(this.armasEnemigos, tierra, this.carga.colisiona, null, this);
        this.physics.add.collider(this.escudo, this.armasEnemigos, this.carga.defiende, null, this);
        this.physics.add.overlap(this.player, this.ciclopsGroup, this.carga.onTouchEnemy, null, this);
        this.physics.add.overlap(this.player, this.coinsGroup, this.carga.getCoin, null, this);
        this.physics.add.overlap(this.fregona, this.ciclopsGroup, this.carga.attackEnemy, null, this);
        this.physics.add.overlap(this.armasEnemigos, this.player, this.carga.attackPlayer, null, this);
        this.physics.add.overlap(this.player, agua, this.carga.gameOverPorAgua, null, this);
        const camera = this.cameras.main;
        this.ayuda = this.add.text(3, 150, 'Usa las Flechas para moverte\ny saltar, si tienes\narmas usa "A" para\natacar y "S" para protegerte\n Cuidao el agua mata', {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
        });
        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.player);
    }

    update() {
        this.player = this.carga.gameOverPorAgua(this.player);
        if (this.player.life > 0) {
            if (this.player.x >= this.escaleras1.x - 25 && this.player.x <= this.escaleras1.x + 25 && this.player.y > this.escaleras1.y / 2)
                this.carga.onTouchEscalera(this.player, this.escaleras1);
            else if (this.player.x >= this.escaleras2.x - 16 && this.player.x <= this.escaleras2.x + 16 && this.player.y > this.escaleras2.y / 2)
                this.carga.onTouchEscalera(this.player, this.escaleras2);
            else if (this.player.x >= this.escaleras3.x - 16 && this.player.x <= this.escaleras3.x + 16 && this.player.y > this.escaleras3.y / 2)
                this.carga.onTouchEscalera(this.player, this.escaleras3);
            else this.player.escaleras = false;
            if (this.player.x <= 9) {
                const cam = this.cameras.main;
                cam.fade(250, 0, 0, 0);
                cam.once("camerafadeoutcomplete", () => {
                    this.scene.start("DungeonScene", { vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs, maxLife: this.player.maxLife });
                    this.sound.removeByKey("audio_mapaverde");
                    this.audio = null;
                    this.scene.stop();
                });
            }
            else if (this.player.x >= 9523) {
                if (!this.bonusFin) {
                    this.bonusFin = true;
                    this.player.coins += 50;
                }
                const cam = this.cameras.main;
                cam.fade(250, 0, 0, 0);
                cam.once("camerafadeoutcomplete", () => {
                    this.scene.start("DungeonScene", { vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs, maxLife: this.player.maxLife });
                    this.sound.removeByKey("audio_mapaverde");
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
        if (this.contadorAyuda > 300)
            this.ayuda.destroy();
        else this.contadorAyuda++;
    }


}