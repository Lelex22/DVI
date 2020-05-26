import Smash from "./fireball.js";
import Coin from "./coins.js";

const stepLimit = 200;
export default class Mago extends Phaser.GameObjects.Sprite {
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
        this.smash = false;
        this.mapa = mapa;
        this.maxLife = 3;
        this.bonus = 0;
        this.tipo = tipo;
        this.lastPosition = null;
        this.body.setVelocityX(this.speed);
        const anims = this.scene.anims;
        if (this.tipo.localeCompare("Mago") === 0) {
            //Muere
            anims.create({
                key: "muere",
                frames: anims.generateFrameNumbers('mago', { start: 16, end: 19 }),
                frameRate: 6,
                repeat: -1
            });
            //Mueve derecha
            anims.create({
                key: "movder",
                frames: anims.generateFrameNumbers('mago', { start: 8, end: 11 }),
                frameRate: 8,
                repeat: -1
            });
            //Mueve izquierda
            anims.create({
                key: "movizq",
                frames: anims.generateFrameNumbers('mago', { start: 12, end: 15 }),
                frameRate: 8,
                repeat: -1
            });

            //Ataca derecha
            anims.create({
                key: "atcder",
                frames: anims.generateFrameNumbers('mago', { start: 24, end: 27 }),
                frameRate: 7,
                repeat: -1
            });
            //Ataca izquierda
            anims.create({
                key: "atcizq",
                frames: anims.generateFrameNumbers('mago', { start: 28, end: 31 }),
                frameRate: 7,
                repeat: -1
            });
        }
        
        this.body.setSize(32, 40).setOffset(0,18);
        this.stepCount = Phaser.Math.Between(0, stepLimit);
        if (this.mapa.localeCompare("verde") === 0)
            this.body.setGravity(0, 200);
    }

    freeze() {
        this.body.moves = false;
    }
    preUpdate(d, t) {
        super.preUpdate(d, t);
        if(this.life > 0){
            if(this.firstInstance){
                this.body.velocity.x = this.speed;
                this.anims.play("movizq", true);
                this.lastPosition = "movizq";
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
            else{
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
                if(this.body.blocked.right){
                    this.body.velocity.x = -this.speed;
                    cambiaSprite(this);
                }
                else if(this.body.blocked.left){
                    this.body.setVelocityX(this.speed);
                    cambiaSprite(this);
                }
            }
            if(this.puedeAtacar && p < 200){     
                //Variable con el signo de la velocidad de la piedra: true es positiva false negativa
                let lastSpeed;       
                this.body.setVelocityX(0);
                if(this.lastPosition.localeCompare("movizq") === 0){
                    this.anims.play("atcizq", true);
                    lastSpeed = false;
                }
                else{
                    this.anims.play("atcder", true);
                    lastSpeed = true;
                }
                if(this.anims.currentFrame.index == 2 && !this.smash){
                    let audio_ataque = this.scene.sound.add("atacaciclope", {
                        volume: 0.5,
                      });
                      audio_ataque.play();
                }
                //Cuando llega al ultimo frame del ataque aparece la piedra
                else if(this.anims.currentFrame.index == 4 && !this.smash){
                    let smash;
                    if(lastSpeed)
                        smash = new Smash(this.scene, this.body.x + 25, this.body.y, this, lastSpeed);
                    else smash = new Smash(this.scene, this.body.x, this.body.y, this, lastSpeed);
                    this.smash = true;
                }
                else if(this.anims.currentFrame.index == 7){
                    this.puedeAtacar = false;
                    this.play(this.lastPosition, true);
                    if(this.lastPosition.localeCompare("movizq") === 0)
                        this.body.setVelocityX(-this.speed);
                    else this.body.setVelocityX(this.speed);
                }
                this.tiempo = 0;
            }
            else {
                this.play(this.lastPosition, true);
                if(this.lastPosition.localeCompare("movizq") === 0)
                    this.body.setVelocityX(-this.speed);
                else this.body.setVelocityX(this.speed);
            }
            if(this.tiempo >= this.tiempoEntreAtaques){
                this.puedeAtacar = true;
                this.smash = false;
            }
            else this.tiempo++;
        }
        else {
            this.anims.play("muere", true);
            this.body.enable = false;
            
            this.scene.time.addEvent({ delay: 1000, callback: function(){
                this.scene.ciclopsGroup.killAndHide(this);
                while(this.bonus < 10){
                    let coin = new Coin(this.scene, this.x, 530);
                    coin.body.bounce.x = 1; 
                    this.scene.coinsGroup.add(coin);
                    this.bonus++;
                }
                }, callbackScope: this
            });            
        }
    }
} 
function cambiaSprite(enemy){
    if (Math.sign(enemy.body.velocity.x) === 1) {
        enemy.anims.play("movder", true);
        enemy.lastPosition = "movder";
    }
    //else if enemy moving to left and has started to move over left edge of platform
    else if (Math.sign(enemy.body.velocity.x) === -1) {
        enemy.anims.play("movizq", true);
        enemy.lastPosition = "movizq";
    }
}