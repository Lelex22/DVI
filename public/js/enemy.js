import Entidad from "./entidad.js";

export default class Enemy extends Entidad{
    constructor(scene, x, y, mapa, tipo) {
        super(scene, x, y, mapa);
        this.maxLife = 3;
        this.tipo= tipo;
        this.mapa = this.getMapa();
        //this.pinta = pintaBuffs(this.buffsp);
        this.inix = this.getX();
        this.iniy = this.getY();
        this.pos = 0;
        const anims = scene.anims;
        if(tipo.localeCompare("vikingo") === 0){
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
        else if(tipo.localeCompare("ciclope") === 0){
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
        this.sprite = this.getScene().physics.add
        .sprite(x, y, "ciclopes");
        
        if(this.mapa.localeCompare("verde") === 0)
            this.sprite.body.setGravity(0,200);
        //this.keys = scene.input.keyboard.createCursorKeys();  
    }

    freeze() {
        this.sprite.body.moves = false;
    }
    update() {
        // Update the animation last and give left/right/down animations precedence over up animations
        if(this.inix == x && this.iniy == y){
            this.y--;
            this.pos--;
            if(this.tipo.localeCompare("vikingo") === 0){
                sprite.anims.play("movizq", true);
            }
            else if(this.tipo.localeCompare("ciclope") === 0){
                sprite.anims.play("movizq", true);
            }
            else{
                //movimiento del resto de enemigos
               // sprite.anims.play("down", true);
            }
        }else if(this.y < this.iniy && this.y > (this.y-5)){
            this.y--;
            this.pos--;
            if(this.tipo.localeCompare("vikingo") === 0){
                sprite.anims.play("movizq", true);
            }
            else if(this.tipo.localeCompare("ciclope") === 0){
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
            if(this.tipo.localeCompare("vikingo") === 0){
                sprite.anims.play("movizq", true);
            }
            else if(this.tipo.localeCompare("ciclope") === 0){
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