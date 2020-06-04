import Coin from "./coins.js";

const stepLimit = 200;
export default class Masked extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, mapa, tipo) {
        super(scene, x, y, tipo);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.life = 2;
        this.speed = 40;
        this.firstInstance = true;
        this.atacado = false;
        this.puedeAtacar = true;
        this.tiempoEntreAtaques = 40;
        this.tiempo = 50;
        this.smash = false;
        this.mapa = mapa;
        this.maxLife = 2;
        this.bonus = 0;
        this.tipo = tipo;
        this.lastPosition = null;
        this.body.setVelocityX(this.speed);
        const anims = this.scene.anims;
        //Muere
        anims.create({
            key: "muereg",
            frames: anims.generateFrameNumbers('masked', { start: 32, end: 38 }),
            frameRate: 7,
            repeat: 0
        });
        //Mueve izquierda
        anims.create({
            key: "movizqg",
            frames: anims.generateFrameNumbers('masked', { start: 8, end: 15 }),
            frameRate: 8,
            repeat: 0
        });
        //Mueve izquierda
        anims.create({
            key: "movderg",
            frames: anims.generateFrameNumbers('maskedd', { start: 8, end: 15 }),
            frameRate: 8,
            repeat: 0
        });
        //Ataca izquierda
        anims.create({
            key: "atcizqg",
            frames: anims.generateFrameNumbers('masked', { start: 16, end: 22 }),
            frameRate: 7,
            repeat: 0
        });
        //Ataca izquierda
        anims.create({
            key: "atcderg",
            frames: anims.generateFrameNumbers('maskedd', { start: 16, end: 22 }),
            frameRate: 7,
            repeat: 0
        });
        this.body.setSize(32, 32).setOffset(2, 0);
        this.setScale(2);
        this.stepCount = Phaser.Math.Between(0, stepLimit);
        if (this.mapa.localeCompare("verde") === 0)
            this.body.setGravity(0, 200);
    }
    preUpdate(d, t) {
        super.preUpdate(d, t);
        if (this.life > 0) {
            if (this.firstInstance) {
                this.body.velocity.x = this.speed;
                this.anims.play("movizqg", true);
                this.lastPosition = "movizqg";
                this.firstInstance = false;
            }
            let p = this.body.x - this.scene.player.body.x;
            if (Math.sign(p) === -1) {
                p = -p;
            }

            if (p < 100) {
                // if player to left of enemy AND enemy moving to right
                if (this.scene.player.body.x < this.body.x && this.body.velocity.x > 0) {
                    // move enemy to left            
                    this.body.velocity.x *= -1; // reverse direction
                    cambiaSprite(this);
                    // or could set directly: enemy.body.velocity.x = -150;        
                    // could add other code - change enemy animation, make enemy fire weapon, etc.
                }
                // if player to right of enemy AND enemy moving to left
                else if (this.scene.player.body.x > this.body.x && this.body.velocity.x < 0) {
                    // move enemy to right
                    this.body.velocity.x *= -1; // reverse direction
                    cambiaSprite(this);
                    // or could set directly: enemy.body.velocity.x = 150;
                    // could add other code - change enemy animation, make enemy fire weapon, etc.
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
                    // can add other code - change enemy animation, etc.
                    cambiaSprite(this);
                }
                if (this.body.blocked.right) {
                    this.body.velocity.x = -this.speed;
                    cambiaSprite(this);
                }
                else if (this.body.blocked.left) {
                    this.body.setVelocityX(this.speed);
                    cambiaSprite(this);
                }
            }
            if (!this.atacado && this.puedeAtacar && p < 100) {
                //Variable con el signo de la velocidad de la piedra: true es positiva false negativa
                let lastSpeed;
                this.body.setVelocityX(0);
                if (this.lastPosition.localeCompare("movizqg") === 0) {
                    this.anims.play("atcizqg", true);
                    lastSpeed = false;
                }
                else {
                    this.anims.play("atcderg", true);
                    lastSpeed = true;
                }
                if(this.anims.currentFrame.index == 2){
                    let audio_ataqueg = this.scene.sound.add("gladiador", {
                        volume: 0.1,
                    }).play();
                }
                else if (this.anims.currentFrame.index == 4) {
                    this.puedeAtacar = false;
                    this.play(this.lastPosition, true);
                    if (this.lastPosition.localeCompare("movizqm") === 0)
                        this.body.setVelocityX(-this.speed);
                    else this.body.setVelocityX(this.speed);
                }
                this.tiempo = 0;
            }
            else {
                this.play(this.lastPosition, true);
                if (this.lastPosition.localeCompare("movizqg") === 0)
                    this.body.setVelocityX(-this.speed);
                else this.body.setVelocityX(this.speed);
            }
            if (this.tiempo >= this.tiempoEntreAtaques) {
                this.puedeAtacar = true;
                this.smash = false;
            }
            else this.tiempo++;
        }
        else {
            this.anims.play("muereg", true);
            this.body.enable = false;

            this.scene.time.addEvent({
                delay: 1000, callback: function () {
                    this.scene.maskedGroup.killAndHide(this);
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
        enemy.anims.play("movderg", true);
        enemy.lastPosition = "movderg";
    }
    //else if enemy moving to left and has started to move over left edge of platform
    else if (Math.sign(enemy.body.velocity.x) === -1) {
        enemy.anims.play("movizqg", true);
        enemy.lastPosition = "movizqg";
    }
}