import Entidad from "./entidad.js";

export default class Player extends Entidad{
  // Orden: Escudo 0 Espada 1 Capa 2

  constructor(scene, x, y, buffs) {
    super(scene, x, y);
    //this.setTexture(spritesheet);
    this.mapa = "verde";
    if(buffs === null || buffs === undefined)
      this.buffsp = [false, false, false];
    else {
      this.buffsp = [];
      this.buffsp[0] = buffs[0]["value"];
      this.buffsp[1] = buffs[1]["value"];
      this.buffsp[2] = buffs[2]["value"];
    }
    
    this.maxLife = 5;
    this.life = 5;
    this.coins = 1000;
    this.buffs = [{name: "Escudo", value: this.buffsp[0]}, {name: "Espada", value: this.buffsp[1]}, {name: "Capa", value: this.buffsp[2]}];
    //console.log(this.mapa);
    const anims = scene.anims;
    this.pinta = pintaBuffs(this.buffsp);
     //Sin nada
     anims.create({
      key: "up",
      frames: anims.generateFrameNumbers('characters', { start: 56, end: 57 }),
      frameRate: 10,
      repeat: 0
    });
    //Solo capa
    anims.create({
      key: "up-capa",
      frames: anims.generateFrameNumbers('characters', { start: 69, end: 70 }),
      frameRate: 10,
      repeat: 0
    });
    //Solo espada
    anims.create({
      key: "up-espada",
      frames: anims.generateFrameNumbers('characters', { start: 58, end: 59 }),
      frameRate: 10,
      repeat: 0
    });
    //Capa espada
    anims.create({
      key: "up-capa-espada",
      frames: anims.generateFrameNumbers('characters', { start: 62, end: 63 }),
      frameRate: 10,
      repeat: 0
    });
    //Solo escudo
    anims.create({
      key: "up-escudo",
      frames: anims.generateFrameNumbers('characters', { start: 65, end: 66 }),
      frameRate: 10,
      repeat: 0
    });
    //Escudo capa
    anims.create({
      key: "up-capa-escudo",
      frames: anims.generateFrameNumbers('characters', { start: 67, end: 68 }),
      frameRate: 10,
      repeat: 0
    });
    //Escudo espada
    anims.create({
      key: "up-espada-escudo",
      frames: anims.generateFrameNumbers('characters', { start: 60, end: 61 }),
      frameRate: 10,
      repeat: 0
    });
    //Todo
    anims.create({
      key: "up-capa-espada-escudo",
      frames: anims.generateFrameNumbers('characters', { start: 70, end: 71 }),
      frameRate: 10,
      repeat: 0
    });
    //Sin nada
    anims.create({
      key: "down",
      frames: anims.generateFrameNumbers('characters', { start: 39, end: 40 }),
      frameRate: 10,
      repeat: 0
    });
    //Solo capa
    anims.create({
      key: "down-capa",
      frames: anims.generateFrameNumbers('characters', { start: 45, end: 46 }),
      frameRate: 10,
      repeat: 0
    });
    //Solo espada
    anims.create({
      key: "down-espada",
      frames: anims.generateFrameNumbers('characters', { start: 41, end: 42 }),
      frameRate: 10,
      repeat: 0
    });
    //Capa espada
    anims.create({
      key: "down-capa-espada",
      frames: anims.generateFrameNumbers('characters', { start: 49, end: 50 }),
      frameRate: 10,
      repeat: 0
    });
    //Solo escudo
    anims.create({
      key: "down-escudo",
      frames: anims.generateFrameNumbers('characters', { start: 43, end: 44 }),
      frameRate: 10,
      repeat: 0
    });
    //Escudo capa
    anims.create({
      key: "down-capa-escudo",
      frames: anims.generateFrameNumbers('characters', { start: 52, end: 53 }),
      frameRate: 10,
      repeat: 0
    });
    //Escudo espada
    anims.create({
      key: "down-espada-escudo",
      frames: anims.generateFrameNumbers('characters', { start: 47, end: 48 }),
      frameRate: 10,
      repeat: 0
    });
    //Todo
    anims.create({
      key: "down-capa-espada-escudo",
      frames: anims.generateFrameNumbers('characters', { start: 54, end: 55 }),
      frameRate: 10,
      repeat: 0
    });
      //Sin nada
      anims.create({
        key: "right",
        frames: anims.generateFrameNumbers('characters', { start: 18, end: 19 }),
        frameRate: 10,
        repeat: 0
      });
      //Solo capa
      anims.create({
        key: "right-capa",
        frames: anims.generateFrameNumbers('characters', { start: 14, end: 15 }),
        frameRate: 10,
        repeat: 0
      });
      //Solo espada
      anims.create({
        key: "right-espada",
        frames: anims.generateFrameNumbers('characters', { start: 16, end: 17 }),
        frameRate: 10,
        repeat: 0
      });
      //Capa espada
      anims.create({
        key: "right-capa-espada",
        frames: anims.generateFrameNumbers('characters', { start: 6, end: 7 }),
        frameRate: 10,
        repeat: 0
      });
      //Solo escudo
      anims.create({
        key: "right-escudo",
        frames: anims.generateFrameNumbers('characters', { start: 24, end: 25 }),
        frameRate: 10,
        repeat: 0
      });
      //Escudo capa
      anims.create({
        key: "right-capa-escudo",
        frames: anims.generateFrameNumbers('characters', { start: 32, end: 33 }),
        frameRate: 10,
        repeat: 0
      });
      //Escudo espada
      anims.create({
        key: "right-espada-escudo",
        frames: anims.generateFrameNumbers('characters', { start: 26, end: 27 }),
        frameRate: 10,
        repeat: 0
      });
      //Todo
      anims.create({
        key: "right-capa-espada-escudo",
        frames: anims.generateFrameNumbers('characters', { start: 28, end: 29 }),
        frameRate: 10,
        repeat: 0
      });
      //Sin nada
      anims.create({
        key: "left",
        frames: anims.generateFrameNumbers('characters', { start: 4, end: 5 }),
        frameRate: 10,
        repeat: 0
      });
      //Solo capa
      anims.create({
        key: "left-capa",
        frames: anims.generateFrameNumbers('characters', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: 0
      });
      //Solo espada
      anims.create({
        key: "left-espada",
        frames: anims.generateFrameNumbers('characters', { start: 10, end: 11 }),
        frameRate: 10,
        repeat: 0
      });
      //Capa espada
      anims.create({
        key: "left-capa-espada",
        frames: anims.generateFrameNumbers('characters', { start: 8, end: 9 }),
        frameRate: 10,
        repeat: 0
      });
      //Solo escudo
      anims.create({
        key: "left-escudo",
        frames: anims.generateFrameNumbers('characters', { start: 12, end: 13 }),
        frameRate: 10,
        repeat: 0
      });
      //Escudo capa
      anims.create({
        key: "left-capa-escudo",
        frames: anims.generateFrameNumbers('characters', { start: 30, end: 31 }),
        frameRate: 10,
        repeat: 0
      });
      //Escudo espada
      anims.create({
        key: "left-espada-escudo",
        frames: anims.generateFrameNumbers('characters', { start: 20, end: 21 }),
        frameRate: 10,
        repeat: 0
      });
      //Todo
      anims.create({
        key: "left-capa-espada-escudo",
        frames: anims.generateFrameNumbers('characters', { start: 22, end: 23 }),
        frameRate: 10,
        repeat: 0
      });
    this.sprite = this.scene.physics.add
      .sprite(x, y, "characters")
      .setSize(10, 10)
      .setOffset(10, 10);

    //this.sprite.anims.play("up");
    if(this.mapa.localeCompare("verde") === 0)
      this.sprite.body.setGravity(0,200);
    this.keys = scene.input.keyboard.createCursorKeys();

    function pintaBuffs(buffs){
      let ret = [];
      if(buffs[0]) ret[0] = 1;
      else ret[0] = 0;
      if(buffs[1]) ret[1] = 1;
      else ret[1] = 0;
      if(buffs[2]) ret[2] = 1;
      else ret[2] = 0;
      return ret[0] * 100 + ret[1] * 10 + ret[2];
    }
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
    if(this.mapa.localeCompare("verde") !== 0){
      if (keys.left.isDown){
        sprite.body.setVelocityX(-speed);
      }
      else if(keys.right.isDown){
        sprite.body.setVelocityX(speed);
      }
      else sprite.body.setVelocityX(0);
    }
    else if(this.mapa.localeCompare("verde") === 0){
      if(keys.left.isDown){
        sprite.body.setVelocityX(-speed/2);
      }
      else if(keys.right.isDown){
        sprite.body.setVelocityX(speed/2);
      }
      else sprite.body.setVelocityX(0);
    }
    
    if(this.mapa.localeCompare("verde") !== 0){
      if (keys.up.isDown) {
        sprite.body.setVelocityY(-speed);
      }
    }    
    else{
      if (keys.up.isDown && sprite.body.onFloor())
        sprite.body.setVelocityY(-speed);
    }
    
    if (keys.down.isDown && this.mapa.localeCompare("verde") !== 0) {
      sprite.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    if(this.mapa.localeCompare("verde") !== 0)
      sprite.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right/down animations precedence over up animations
    if (keys.down.isDown) {
      switch(this.pinta){
        case 0:
          sprite.anims.play("down", true);
          break;
        case 1:
          sprite.anims.play("down-capa", true);
          break;
        case 10:
          sprite.anims.play("down-espada", true);
          break;
        case 11:
          sprite.anims.play("down-capa-espada", true);
          break;
        case 100:
          sprite.anims.play("down-escudo", true);
          break;
        case 101:
          sprite.anims.play("down-capa-escudo", true);
          break;
        case 110:
          sprite.anims.play("down-espada-escudo", true);
          break;
        case 111:
          sprite.anims.play("down-capa-espada-escudo", true);
          break;
      }
    } else if (keys.up.isDown) {
      if(this.mapa.localeCompare("verde") === 0){}
      else{
        switch(this.pinta){
          case 0:
            sprite.anims.play("up", true);
            break;
          case 1:
            sprite.anims.play("up-capa", true);
            break;
          case 10:
            sprite.anims.play("up-espada", true);
            break;
          case 11:
            sprite.anims.play("up-capa-espada", true);
            break;
          case 100:
            sprite.anims.play("up-escudo", true);
            break;
          case 101:
            sprite.anims.play("up-capa-escudo", true);
            break;
          case 110:
            sprite.anims.play("up-espada-escudo", true);
            break;
          case 111:
            sprite.anims.play("up-capa-espada-escudo", true);
            break;
        }
      }
    } 
    else if (keys.right.isDown){
      switch(this.pinta){
        case 0:
          sprite.anims.play("right", true);
          break;
        case 1:
          sprite.anims.play("right-capa", true);
          break;
        case 10:
          sprite.anims.play("right-espada", true);
          break;
        case 11:
          sprite.anims.play("right-capa-espada", true);
          break;
        case 100:
          sprite.anims.play("right-escudo", true);
          break;
        case 101:
          sprite.anims.play("right-capa-escudo", true);
          break;
        case 110:
          sprite.anims.play("right-espada-escudo", true);
          break;
        case 111:
          sprite.anims.play("right-capa-espada-escudo", true);
          break;
      }
    }else if(keys.left.isDown){
      switch(this.pinta){
        case 0:
          sprite.anims.play("left", true);
          break;
        case 1:
          sprite.anims.play("left-capa", true);
          break;
        case 10:
          sprite.anims.play("left-espada", true);
          break;
        case 11:
          sprite.anims.play("left-capa-espada", true);
          break;
        case 100:
          sprite.anims.play("left-escudo", true);
          break;
        case 101:
          sprite.anims.play("left-capa-escudo", true);
          break;
        case 110:
          sprite.anims.play("left-espada-escudo", true);
          break;
        case 111:
          sprite.anims.play("left-capa-espada-escudo", true);
          break;
      }
    }//else {
      //sprite.anims.stop();

      // If we were moving & now we're not, then pick a single idle frame to use
      
    //}
  }

  destroy() {
    this.sprite.destroy();
  }
}
