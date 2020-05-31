import Fireball from "./fireball.js";
import Coin from "./coins.js";

const stepLimit = 300;
export default class Mago extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, mapa, tipo) {
        super(scene, x, y, tipo);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.life = 6;
        this.speed = 30;
        this.firstInstance = true;
        this.atacado = false;
        this.puedeAtacar = true;
        this.tiempoEntreAtaques = 40;
        this.tiempo = 50;
        this.smash = false;
        this.mapa = mapa;
        this.maxLife = 3;
        this.bonus = 0;
        this.tipo = tipo;
        this.lastPosition = null;
        this.body.setVelocityX(this.speed);
        const anims = this.scene.anims;
        //Muere
        anims.create({
            key: "muerem",
            frames: anims.generateFrameNumbers('mago', { start: 16, end: 19 }),
            frameRate: 4,
            repeat: 0
        });
        //Mueve derecha
        anims.create({
            key: "movderm",
            frames: anims.generateFrameNumbers('mago', { start: 8, end: 11 }),
            frameRate: 4,
            repeat: 0
        });
        //Mueve izquierda
        anims.create({
            key: "movizqm",
            frames: anims.generateFrameNumbers('mago', { start: 12, end: 15 }),
            frameRate: 4,
            repeat: 0
        });

        //Ataca derecha
        anims.create({
            key: "atcderm",
            frames: anims.generateFrameNumbers('mago', { start: 24, end: 27 }),
            frameRate: 4,
            repeat: 0
        });
        //Ataca izquierda
        anims.create({
            key: "atcizqm",
            frames: anims.generateFrameNumbers('mago', { start: 28, end: 31 }),
            frameRate: 4,
            repeat: 0
        });
        this.body.setSize(70,80).setOffset(10,-12);
        this.stepCount = Phaser.Math.Between(0, stepLimit);
        if (this.mapa.localeCompare("verde") === 0)
            this.body.setGravity(0, 200);
    }
    preUpdate(d, t) {
        super.preUpdate(d, t);
        if(this.life > 0){
            if(this.firstInstance){
                this.body.velocity.x = this.speed;
                this.anims.play("movizqm", true);
                this.lastPosition = "movizqm";
                this.firstInstance = false;
            }
            let p = this.body.x - this.scene.player.body.x;
            if (Math.sign(p) === -1) {
                p = -p;
            }

            if (p < 300) {   
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
                if(this.body.blocked.right || this.body.touching.right){
                    this.body.velocity.x = -this.speed;
                    cambiaSprite(this);
                }
                else if(this.body.blocked.left || this.body.touching.left){
                    this.body.setVelocityX(this.speed);
                    cambiaSprite(this);
                }
            }
            if(!this.atacado && this.puedeAtacar && p < 300){     
                //Variable con el signo de la velocidad de la piedra: true es positiva false negativa
                let lastSpeed;       
                this.body.setVelocityX(0);
                if(this.lastPosition.localeCompare("movizqm") === 0){
                    this.anims.play("atcizqm", true);
                    lastSpeed = false;
                }
                else{
                    this.anims.play("atcderm", true);
                    lastSpeed = true;
                }
                if(this.anims.currentFrame.index == 1 && !this.smash){
                    let audio_ataque = this.scene.sound.add("firesound", {
                        volume: 0.1,
                      });
                      audio_ataque.play();
                      let fireball;
                      if(lastSpeed)
                          fireball = new Fireball(this.scene, this.body.x + 25, this.body.y, this, lastSpeed);
                      else fireball = new Fireball(this.scene, this.body.x, this.body.y, this, lastSpeed);
                      this.smash = true;
                }
                else if(this.anims.currentFrame.index == 3){
                    this.puedeAtacar = false;
                    this.play(this.lastPosition, true);
                    if(this.lastPosition.localeCompare("movizqm") === 0)
                        this.body.setVelocityX(-this.speed);
                    else this.body.setVelocityX(this.speed);
                }
                this.tiempo = 0;
            }
            else {
                this.play(this.lastPosition, true);
                if(this.lastPosition.localeCompare("movizqm") === 0)
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
            this.anims.play("muerem", true);
            this.body.enable = false;
            
            this.scene.time.addEvent({ delay: 1000, callback: function(){
                this.scene.magosGroup.killAndHide(this);
                while(this.bonus < 50){
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
function cambiaSprite(enemy){
    if (Math.sign(enemy.body.velocity.x) === 1) {
        enemy.anims.play("movderm", true);
        enemy.lastPosition = "movderm";
    }
    //else if enemy moving to left and has started to move over left edge of platform
    else if (Math.sign(enemy.body.velocity.x) === -1) {
        enemy.anims.play("movizqm", true);
        enemy.lastPosition = "movizqm";
    }
}