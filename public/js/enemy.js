import Entidad from "./entidad.js";

export default class Enemy extends Entidad{
    constructor(scene, x, y, buffs, mapa,tipo) {
        super(scene, x, y, mapa);
        this.maxLife = 3;
        this.tipo= tipo;
        this.mapa = this.getMapa();
        this.pinta = pintaBuffs(this.buffsp);
        this.inix = x;
        this.iniy = y;
        this.pos = 0;
        if(tipo == "vikingo"){
            //Mueve derecha
             anims.create({
                key: "movder",
                frames: anims.generateFrameNumbers('characters', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
            //Mueve izquierda
            anims.create({
                key: "movizq",
                frames: anims.generateFrameNumbers('characters', { start: 40, end: 44 }),
                frameRate: 10,
                repeat: 0
            });

            //Ataca derecha
            anims.create({
                key: "atcder",
                frames: anims.generateFrameNumbers('characters', { start: 16, end: 22 }),
                frameRate: 10,
                repeat: 0
            });
            //Ataca izquierda
            anims.create({
                key: "atcizq",
                frames: anims.generateFrameNumbers('characters', { start: 56, end: 62 }),
                frameRate: 10,
                repeat: 0
            });
        }
        else if(tipo == "ciclope"){
            //Mueve derecha
            anims.create({
                key: "movder",
                frames: anims.generateFrameNumbers('characters', { start: 15, end: 26 }),
                frameRate: 10,
                repeat: 0
            });
            //Mueve izquierda
            anims.create({
                key: "movizq",
                frames: anims.generateFrameNumbers('characters', { start: 165, end: 176 }),
                frameRate: 10,
                repeat: 0
            });

            //Ataca derecha
            anims.create({
                key: "atcder",
                frames: anims.generateFrameNumbers('characters', { start: 45, end: 57 }),
                frameRate: 10,
                repeat: 0
            });
            //Ataca izquierda
            anims.create({
                key: "atcizq",
                frames: anims.generateFrameNumbers('characters', { start: 195, end: 207 }),
                frameRate: 10,
                repeat: 0
            });
        }
        //enemigo extra
        else{
            //Mueve derecha
            anims.create({
                key: "movder",
                frames: anims.generateFrameNumbers('characters', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
            //Mueve izquierda
            anims.create({
                key: "movizq",
                frames: anims.generateFrameNumbers('characters', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });

            //Ataca derecha
            anims.create({
                key: "atcder",
                frames: anims.generateFrameNumbers('characters', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
            //Ataca izquierda
            anims.create({
                key: "atcizq",
                frames: anims.generateFrameNumbers('characters', { start: 0, end: 4 }),
                frameRate: 10,
                repeat: 0
            });
        }
        this.sprite = this.scene.physics.add
        .sprite(x, y, "characters")
        .setSize(10, 10)
        .setOffset(10, 10);
        
        if(this.mapa.localeCompare("verde") === 0)
        this.sprite.body.setGravity(0,200);
        this.keys = scene.input.keyboard.createCursorKeys();  
    }

    freeze() {
        this.sprite.body.moves = false;
    }
    update() {
        const keys = this.keys;
        const sprite = this.sprite;
        const speed = 400;
    
        // Stop any previous movement from the last frame
        if(this.mapa.localeCompare("verde") !== 0)
          sprite.body.setVelocity(0);
        
    
        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        if(this.mapa.localeCompare("verde") !== 0)
          sprite.body.velocity.normalize().scale(speed);
    
        // Update the animation last and give left/right/down animations precedence over up animations
        if(this.inix == x && this.iniy == y){
            this.y--;
            this.pos--;
            if(this.tipo == "vikingo"){
                sprite.anims.play("movizq", true);
            }
            else if(this.tipo== "ciclope"){
                sprite.anims.play("movizq", true);
            }
            else{
                //movimiento del resto de enemigos
               // sprite.anims.play("down", true);
            }
        }else if(this.y < this.iniy && this.y > (this.y-5)){
            this.y--;
            this.pos--;
            if(this.tipo == "vikingo"){
                sprite.anims.play("movizq", true);
            }
            else if(this.tipo== "ciclope"){
                sprite.anims.play("movizq", true);
            }
            else{
                //movimiento del resto de enemigos
               // sprite.anims.play("down", true);
            }
        }
        else if(this.y == (this.iniy-5) && pos < 0){
            this.y++;
            this.pos++;
            if(this.tipo == "vikingo"){
                sprite.anims.play("movizq", true);
            }
            else if(this.tipo== "ciclope"){
                sprite.anims.play("movizq", true);
            }
            else{
                //movimiento del resto de enemigos
               // sprite.anims.play("down", true);
            }
        }
    }
    
      destroy() {
        this.sprite.destroy();
      }
} 