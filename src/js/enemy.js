import Piedra from "./piedra.js";
import Coin from "./coins.js";

const stepLimit = 200;
export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, mapa, tipo) {
        super(scene, x, y, tipo);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.life = 3;
        this.speed = 15;
        this.firstInstance = true;
        this.atacado = false;
        this.puedeAtacar = true;
        this.tiempoEntreAtaques = 100;
        this.tiempo = 100;
        this.piedra = false;
        this.mapa = mapa;
        this.maxLife = 3;
        this.bonus = 0;
        this.tipo = tipo;
        this.lastPosition = null;
        this.body.setVelocityX(this.speed);
        const anims = this.scene.anims;
        if (this.tipo.localeCompare("ciclope") === 0) {
            //Muere
            anims.create({
                key: "muerec",
                frames: anims.generateFrameNumbers('ciclope', { start: 241, end: 248 }),
                frameRate: 8,
                repeat: -1
            });
            //Mueve derecha
            anims.create({
                key: "movderc",
                frames: anims.generateFrameNumbers('ciclope', { start: 15, end: 26 }),
                frameRate: 12,
                repeat: -1
            });
            //Mueve izquierda
            anims.create({
                key: "movizqc",
                frames: anims.generateFrameNumbers('ciclope', { start: 165, end: 176 }),
                frameRate: 12,
                repeat: -1
            });

            //Ataca derecha
            anims.create({
                key: "atcderc",
                frames: anims.generateFrameNumbers('ciclope', { start: 46, end: 57 }),
                frameRate: 12,
                repeat: 0
            });
            //Ataca izquierda
            anims.create({
                key: "atcizqc",
                frames: anims.generateFrameNumbers('ciclope', { start: 196, end: 207 }),
                frameRate: 12,
                repeat: 0
            });
            anims.create({
                key: "standc",
                frames: anims.generateFrameNumbers('ciclope', { start: 150, end: 150 }),
                frameRate: 1,
                repeat: 0
            });
        }

        this.body.setSize(32, 43).setOffset(20, 21);
        this.stepCount = Phaser.Math.Between(0, stepLimit);
        if (this.mapa.localeCompare("verde") === 0)
            this.body.setGravity(0, 200);
    }

    freeze() {
        this.body.moves = false;
    }
    preUpdate(d, t) {
        super.preUpdate(d, t);
        if (this.life > 0) {
            if (this.firstInstance) {
                this.body.velocity.x = this.speed;
                this.anims.play("movizqc", true);
                this.lastPosition = "movizqc";
                this.firstInstance = false;
            }
            let p = this.body.x - this.scene.player.body.x;
            if (Math.sign(p) === -1) {
                p = -p;
            }

            if (this.scene.player.body.bottom == this.body.bottom && p < 200) {
                // if player to left of enemy AND enemy moving to right
                if (this.scene.player.body.x < this.body.x && this.body.velocity.x > 0) {
                    // move enemy to left            
                    this.body.velocity.x *= -1; // reverse direction
                    cambiaSprite(this);
                }
                // if player to right of enemy AND enemy moving to left
                else if (this.scene.player.body.x > this.body.x && this.body.velocity.x < 0) {
                    // move enemy to right
                    this.body.velocity.x *= -1; // reverse direction
                    cambiaSprite(this);
                }
            }
            else {
                //increase enemy's step counter
                this.stepCount++;

                //check if enemy's step counter has reach limit
                if (this.stepCount > stepLimit) {
                    // reverse enemy direction
                    this.body.velocity.x *= -1;
                    // reset enemy's step counter
                    this.stepCount = 0;
                    cambiaSprite(this);
                }
                if (this.body.blocked.right || this.body.touching.right) {
                    this.body.velocity.x = -this.speed;
                    cambiaSprite(this);
                }
                else if (this.body.blocked.left || this.body.touching.left) {
                    this.body.setVelocityX(this.speed);
                    cambiaSprite(this);
                }
            }
            if (this.puedeAtacar && p < 200) {
                //Variable con el signo de la velocidad de la piedra: true es positiva false negativa
                let lastSpeed;
                this.body.setVelocityX(0);
                if (this.lastPosition.localeCompare("movizqc") === 0) {
                    this.anims.play("atcizqc", true);
                    lastSpeed = false;
                }
                else {
                    this.anims.play("atcderc", true);
                    lastSpeed = true;
                }
                if (this.anims.currentFrame.index == 2 && !this.piedra) {
                    let audio_ataque = this.scene.sound.add("atacaciclope", {
                        volume: 0.1,
                    });
                    audio_ataque.play();
                }
                //Cuando llega al ultimo frame del ataque aparece la piedra
                else if (this.anims.currentFrame.index == 11 && !this.piedra) {
                    let piedra = new Piedra(this.scene, this.body.x, this.body.y, this, lastSpeed);
                    this.piedra = true;
                }
                else if (this.anims.currentFrame.index == 12) {
                    this.puedeAtacar = false;
                    this.play(this.lastPosition, true);
                    if (this.lastPosition.localeCompare("movizqc") === 0)
                        this.body.setVelocityX(-this.speed);
                    else this.body.setVelocityX(this.speed);
                }
                this.tiempo = 0;
            }
            else {
                this.play(this.lastPosition, true);
                if (this.lastPosition.localeCompare("movizqc") === 0)
                    this.body.setVelocityX(-this.speed);
                else this.body.setVelocityX(this.speed);
            }
            if (this.tiempo >= this.tiempoEntreAtaques) {
                this.puedeAtacar = true;
                this.piedra = false;
            }
            else this.tiempo++;
        }
        else {
            this.anims.play("muerec", true);
            this.body.enable = false;

            this.scene.time.addEvent({
                delay: 1000, callback: function () {
                    this.scene.ciclopsGroup.killAndHide(this);
                    while (this.bonus < 5) {
                        let coin = new Coin(this.scene, this.x, this.y);
                        coin.body.bounce.x = 1;
                        this.scene.coinsGroup.add(coin);
                        this.bonus++;
                    }
                }, callbackScope: this
            });
        }
    }
}
function cambiaSprite(enemy) {
    if (Math.sign(enemy.body.velocity.x) === 1) {
        enemy.anims.play("movderc", true);
        enemy.lastPosition = "movderc";
    }
    //else if enemy moving to left and has started to move over left edge of platform
    else if (Math.sign(enemy.body.velocity.x) === -1) {
        enemy.anims.play("movizqc", true);
        enemy.lastPosition = "movizqc";
    }
}