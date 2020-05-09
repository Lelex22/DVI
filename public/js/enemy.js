const stepLimit = 100;
export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, mapa, tipo) {
        super(scene, x, y, tipo);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.life = 3;
        this.atacado = false;
        this.mapa = mapa;
        this.maxLife = 3;
        this.tipo = tipo;
        //this.pinta = pintaBuffs(this.buffsp);
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
        
        let rnd = Phaser.Math.RND;
        this.body.velocity.x = 150;
        this.stepCount = rnd.integerInRange(0, stepLimit);
        if (this.mapa.localeCompare("verde") === 0)
            this.body.setGravity(0, 200);
    }

    freeze() {
        this.body.moves = false;
    }
    preUpdate(d, t) {
        super.preUpdate(d, t);
        this.setScale(1);
        this.body.setSize(40, 43).setOffset(20, 21);
        this.anims.play("movizq", true);
        
        // increase enemy's step counter
        this.stepCount++;
        //check if enemy's step counter has reach limit
        if (this.stepCount > stepLimit) {
            // reverse enemy direction
            this.body.setVelocityX(-this.body.velocity.x);
            // reset enemy's step counter
            this.stepCount = 0;
            // can add other code - change enemy animation, etc.
        }
        if (Math.sign(this.body.velocity.x) === 1) {
            this.anims.play("movder", true);
        }
        //else if enemy moving to left and has started to move over left edge of platform
        else if (Math.sign(this.body.velocity.x) === -1) {
            this.anims.play("movizq", true);
        }
        if(this.life <= 0){
            this.scene.ciclopsGroup.killAndHide(this);
            this.body.enable = false;
        }
    }
} 