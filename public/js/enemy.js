import Entidad from "./entidad.js";
const stepLimit = 5;
export default class Enemy extends Entidad{
    constructor(scene, x, y, tipo) {
        super(scene, x, y);
        this.mapa = "verde";
        this.maxLife = 3;
        this.tipo= tipo;
        //this.pinta = pintaBuffs(this.buffsp);
        this.inix = this.x;
        this.iniy = this.y;
        this.pos = 0;
        const anims = scene.anims;
        if(tipo.localeCompare("vikingo") === 0){
            //Mueve derecha
             anims.create({
                key: "movder",
                frames: anims.generateFrameNumbers('vikingos', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
            //Mueve izquierda
            anims.create({
                key: "movizq",
                frames: anims.generateFrameNumbers('vikingos', { start: 40, end: 44 }),
                frameRate: 10,
                repeat: 0
            });

            //Ataca derecha
            anims.create({
                key: "atcder",
                frames: anims.generateFrameNumbers('vikingos', { start: 16, end: 22 }),
                frameRate: 10,
                repeat: 0
            });
            //Ataca izquierda
            anims.create({
                key: "atcizq",
                frames: anims.generateFrameNumbers('vikingos', { start: 56, end: 62 }),
                frameRate: 10,
                repeat: 0
            });
        }
        else if(tipo.localeCompare("ciclope") === 0){
            //Mueve derecha
            anims.create({
                key: "movder",
                frames: anims.generateFrameNumbers('ciclopes', { start: 15, end: 26 }),
                frameRate: 10,
                repeat: 0
            });
            //Mueve izquierda
            anims.create({
                key: "movizq",
                frames: anims.generateFrameNumbers('ciclopes', { start: 165, end: 176 }),
                frameRate: 10,
                repeat: 0
            });

            //Ataca derecha
            anims.create({
                key: "atcder",
                frames: anims.generateFrameNumbers('ciclopes', { start: 45, end: 57 }),
                frameRate: 10,
                repeat: 0
            });
            //Ataca izquierda
            anims.create({
                key: "atcizq",
                frames: anims.generateFrameNumbers('ciclopes', { start: 195, end: 207 }),
                frameRate: 10,
                repeat: 0
            });
        }
        //enemigo extra
        else{
            //Mueve derecha
            anims.create({
                key: "movder",
                frames: anims.generateFrameNumbers('ciclopes', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
            //Mueve izquierda
            anims.create({
                key: "movizq",
                frames: anims.generateFrameNumbers('ciclopes', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });

            //Ataca derecha
            anims.create({
                key: "atcder",
                frames: anims.generateFrameNumbers('ciclopes', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
            //Ataca izquierda
            anims.create({
                key: "atcizq",
                frames: anims.generateFrameNumbers('ciclopes', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
        }
        this.sprite = this.scene.physics.add.sprite(x, y, "ciclopes").setSize(30,43).setOffset(15, 21);
        let rnd = Phaser.Math.RND;
        this.sprite.setVelocityX(5);
        this.sprite.stepCount = rnd.integerInRange(0, stepLimit);
        if(this.mapa.localeCompare("verde") === 0)
            this.sprite.body.setGravity(0,200);
    }
    
    freeze() {
        this.sprite.body.moves = false;
    }
    update() {
        if (this.body.velocity.x > 0 && enemy.right > platform.right) {
            this.sprite.anims.play("movder", true);
            this.body.velocity.x *= -1; // reverse direction
        }
        // else if enemy moving to left and has started to move over left edge of platform
        else if (this.body.velocity.x < 0 && enemy.left < platform.left) {
            this.sprite.anims.play("movizq", true);
            this.body.velocity.x *= -1; // reverse direction
        }
    }
    
    destroy() {
        this.sprite.destroy();
    }


} 