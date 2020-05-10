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
        this.mapa = mapa;
        this.maxLife = 3;
        this.tipo = tipo;
        this.body.setVelocityX(this.speed);
        const anims = this.scene.anims;
        if (this.tipo.localeCompare("vikingo") === 0) {
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
        else if (this.tipo.localeCompare("ciclope") === 0) {
            //Muere
            anims.create({
                key: "muere",
                frames: anims.generateFrameNumbers('ciclope', { start: 241, end: 248 }),
                frameRate: 8,
                repeat: -1
            });
            //Mueve derecha
            anims.create({
                key: "movder",
                frames: anims.generateFrameNumbers('ciclope', { start: 15, end: 26 }),
                frameRate: 12,
                repeat: -1
            });
            //Mueve izquierda
            anims.create({
                key: "movizq",
                frames: anims.generateFrameNumbers('ciclope', { start: 165, end: 176 }),
                frameRate: 12,
                repeat: -1
            });

            //Ataca derecha
            anims.create({
                key: "atcder",
                frames: anims.generateFrameNumbers('ciclope', { start: 45, end: 57 }),
                frameRate: 10,
                repeat: 0
            });
            //Ataca izquierda
            anims.create({
                key: "atcizq",
                frames: anims.generateFrameNumbers('ciclope', { start: 195, end: 207 }),
                frameRate: 10,
                repeat: 0
            });
            anims.create({
                key: "stand",
                frames: anims.generateFrameNumbers('ciclope', { start: 150, end: 150 }),
                frameRate: 1,
                repeat: 0
            });
        }
        //enemigo extra
        // else {
        //     //Mueve derecha
        //     anims.create({
        //         key: "movder",
        //         frames: anims.generateFrameNumbers('ciclope', { start: 0, end: 4 }),
        //         frameRate: 10,
        //         repeat: 0
        //     });
        //     //Mueve izquierda
        //     anims.create({
        //         key: "movizq",
        //         frames: anims.generateFrameNumbers('ciclope', { start: 0, end: 4 }),
        //         frameRate: 10,
        //         repeat: 0
        //     });

        //     //Ataca derecha
        //     anims.create({
        //         key: "atcder",
        //         frames: anims.generateFrameNumbers('ciclope', { start: 0, end: 4 }),
        //         frameRate: 10,
        //         repeat: 0
        //     });
        //     //Ataca izquierda
        //     anims.create({
        //         key: "atcizq",
        //         frames: anims.generateFrameNumbers('ciclope', { start: 0, end: 4 }),
        //         frameRate: 10,
        //         repeat: 0
        //     });
        // }
        this.body.setSize(45, 43).setOffset(20, 21);
        this.stepCount = Phaser.Math.Between(0, stepLimit);
        if (this.mapa.localeCompare("verde") === 0)
            this.body.setGravity(0, 200);
    }

    freeze() {
        this.body.moves = false;
    }
    preUpdate(d, t) {
        super.preUpdate(d, t);
        if(this.firstInstance){
            this.body.velocity.x = this.speed;
            this.anims.play("movder", true);
            this.firstInstance = false;
        }
        let p = this.body.x - this.scene.player.body.x;
        if (Math.sign(p) === -1) {
            p = -p;
        }
        //else if enemy moving to left and has started to move over left edge of platform
        // if bottom positions equal (could be on same platform) AND player within 400px
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
        if(this.life <= 0){
            this.anims.play("muere", true);
            this.body.enable = false;
            this.scene.time.addEvent({ delay: 1000, callback: function(){
                this.scene.ciclopsGroup.killAndHide(this);
                
                }, callbackScope: this
            });            
        }
    }
} 
function cambiaSprite(enemy){
    if (Math.sign(enemy.body.velocity.x) === 1) {
        enemy.anims.play("movder", true);
    }
    //else if enemy moving to left and has started to move over left edge of platform
    else if (Math.sign(enemy.body.velocity.x) === -1) {
        enemy.anims.play("movizq", true);
    }
}