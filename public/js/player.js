import Fregona from "./fregona.js";
import Escudo from "./escudo.js";
export default class Player extends Phaser.GameObjects.Sprite{
  // Orden: Escudo 0 Espada 1 Capa 2

  constructor(scene, x, y, buffs, mapa, life, coins) {
    super(scene, x, y, 'player');
    this.enemyTouch = false;
    this.atacado = false;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.speed = 400;
    this.scene = scene;
    this.lastPosition = null;
    this.isAttacking = false;
    this.isDefending = false;
    this.escaleras = false;
    this.yEscalera = null;
    this.xEscalera = null;
    this.mapa = mapa;
    if(buffs === null || buffs === undefined)
      this.buffsp = [false, false, false];
    else {
      this.buffsp = [];
      this.buffsp[0] = buffs[0]["value"];
      this.buffsp[1] = buffs[1]["value"];
      this.buffsp[2] = buffs[2]["value"];
    }
    this.buffs = [{name: "Escudo", value: this.buffsp[0]}, {name: "Espada", value: this.buffsp[1]}, {name: "Capa", value: this.buffsp[2]}];
    if(coins === null || coins === undefined)
        this.coins = 0;
    else this.coins = coins;
    if(life === null || life === undefined || life === "undefined")
        this.life = 5;
    else this.life = life;
    this.maxLife = 5;
    const anims = this.scene.anims;
    this.pinta = pintaBuffs(this.buffsp);
    this.scene.carga.creaAnimacionesPlayer(anims);
    

    
    
    //this.sprite.anims.play("up");
    if(this.mapa.localeCompare("verde") === 0){
      this.body.setGravity(0,200);
    }
    this.keys = scene.input.keyboard.createCursorKeys();
    this.s = scene.input.keyboard.addKey('S');
    this.a = scene.input.keyboard.addKey('A');
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
    this.body.moves = false;
  }

  preUpdate(d, t) {
    super.preUpdate(d, t);
    if(this.lastPosition != null && (this.lastPosition.includes("capa") || this.lastPosition.includes("espada")))
      this.body.setSize(10, 10).setOffset(20,10);
    else if (this.mapa.localeCompare("verde") !== 0)
      this.body.setSize(10, 10).setOffset(10,15);
    else this.body.setSize(10, 10).setOffset(10,10);
  }

  update(){
    const keys = this.keys;

    // Stop any previous movement from the last frame
    if(this.mapa.localeCompare("verde") !== 0)
      this.body.setVelocity(0);
    if(this.mapa.localeCompare("verde") !== 0){
      if (keys.left.isDown){
        this.body.setVelocityX(-this.speed);
      }
      else if(keys.right.isDown){
        this.body.setVelocityX(this.speed);
      }
      else this.body.setVelocityX(0);
      if (keys.up.isDown) {
        this.body.setVelocityY(-this.speed);
      }
      else if (keys.down.isDown) {
        this.body.setVelocityY(this.speed);
      }      
    }
    else if(this.mapa.localeCompare("verde") === 0){
      if(keys.left.isDown){
        this.body.setVelocityX(-this.speed/2);
      }
      else if(keys.right.isDown){
        this.body.setVelocityX(this.speed/2);
      }
      else if (Phaser.Input.Keyboard.JustDown(this.s) && this.buffs[1]["value"]) {
        if (!this.isAttacking){
          let fregona;
          this.body.setVelocityX(0);
          if(this.lastPosition.includes("espada")){
            let anim = this.lastPosition.replace("-espada","");
            this.anims.play(anim, false);
          }
          else this.anims.play(this.lastPosition, false);
          if(this.lastPosition.includes("right")){
            if(this.lastPosition != null && (this.lastPosition.includes("capa") || this.lastPosition.includes("espada")))
              fregona = new Fregona(this.scene, this.body.x + 13, this.body.y + 5, "fregona", this);
            else fregona = new Fregona(this.scene, this.body.x + 3, this.body.y + 5, "fregona", this);
          }
          else if(this.lastPosition != null && (this.lastPosition.includes("capa") || this.lastPosition.includes("espada"))) 
            fregona = new Fregona(this.scene, this.body.x - 22, this.body.y + 5, "fregonaiz", this);
          else fregona = new Fregona(this.scene, this.body.x - 12, this.body.y + 5, "fregonaiz", this);
          this.isAttacking = true;
          let audio_ataque = this.scene.sound.add("atacaplayer", {
            volume: 0.1,
          });
          audio_ataque.play();
        }
      }
      else if (Phaser.Input.Keyboard.JustDown(this.a) && this.buffs[0]["value"]) {
          this.isDefending = true;
          this.body.setVelocityX(0);
          keys.right.enabled = false;
          keys.left.enabled = false;
          keys.up.enabled = false;
          let escudo;
          if(this.lastPosition.includes("escudo")){
            let anim = this.lastPosition.replace("-escudo","");
            this.anims.play(anim, false);
          }
          else this.anims.play(this.lastPosition, false);
          if(this.lastPosition.includes("right")){
            escudo = new Escudo(this.scene, this.body.x + 12, this.body.y + 5, "escudoiz", this);
          }
          else escudo = new Escudo(this.scene, this.body.x - 20, this.body.y + 5, "escudo", this);
          this.isDefending = true;
      }
      else if(Phaser.Input.Keyboard.JustUp(this.a) && this.buffs[0]["value"]){
        this.isDefending = false;
        keys.right.enabled = true;
        keys.left.enabled = true;
        keys.up.enabled = true;
      }
      else this.body.setVelocityX(0);
      if (keys.up.isDown && this.body.onFloor() && !this.escaleras) {
        this.body.setGravity(0,200);
        this.body.setVelocityY(-this.speed);
        //this.anims.play(this.lastPosition, true);
      }
      else if(this.escaleras){
        this.body.setGravity(0,0);
        this.anims.play("up", true);
        if (keys.up.isDown) {
          if(this.y <= this.yEscalera/2 - 10 && this.x <= this.xEscalera + 16 && this.x >= this.xEscalera - 16){
              this.body.setVelocityY(this.speed/2);
          }
          else{
            this.body.setVelocityY(-this.speed/2);
          }
        }
      }
    }    
    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    if(this.mapa.localeCompare("verde") !== 0)
      this.body.velocity.normalize().scale(this.speed);

    // Update the animation last and give left/right/down animations precedence over up animations
    if (keys.down.isDown) {
      if(this.mapa.localeCompare("verde") !== 0){
        switch(this.pinta){
          case 0:
            this.anims.play("down", true);
            this.lastPosition = "down-stand";
            break;
          case 1:
            this.anims.play("down-capa", true);
            this.lastPosition = "down-capa-stand";
            break;
          case 10:
            this.anims.play("down-espada", true);
            this.lastPosition = "down-espada-stand";
            break;
          case 11:
            this.anims.play("down-capa-espada", true);
            this.lastPosition = "down-capa-espada-stand";
            break;
          case 100:
            this.anims.play("down-escudo", true);
            this.lastPosition = "down-escudo-stand";
            break;
          case 101:
            this.anims.play("down-capa-escudo", true);
            this.lastPosition = "down-capa-escudo-stand";
            break;
          case 110:
            this.anims.play("down-espada-escudo", true);
            this.lastPosition = "down-espada-escudo-stand";
            break;
          case 111:
            this.anims.play("down-capa-espada-escudo", true);
            this.lastPosition = "down-capa-espada-escudo-stand";
            break;
        }
      }
    } else if (keys.up.isDown) {
      if(this.mapa.localeCompare("verde") !== 0){
        switch(this.pinta){
          case 0:
            this.anims.play("up", true);
            this.lastPosition = "up-stand";
            break;
          case 1:
            this.anims.play("up-capa", true);
            this.lastPosition = "up-capa-stand";
            break;
          case 10:
            this.anims.play("up-espada", true);
            this.lastPosition = "up-espada-stand";
            break;
          case 11:
            this.anims.play("up-capa-espada", true);
            this.lastPosition = "up-capa-espada-stand";
            break;
          case 100:
            this.anims.play("up-escudo", true);
            this.lastPosition = "up-escudo-stand";
            break;
          case 101:
            this.anims.play("up-capa-escudo", true);
            this.lastPosition = "up-capa-escudo-stand";
            break;
          case 110:
            this.anims.play("up-espada-escudo", true);
            this.lastPosition = "up-espada-escudo-stand";
            break;
          case 111:
            this.anims.play("up-capa-espada-escudo", true);
            this.lastPosition = "up-capa-espada-escudo-stand";
            break;
        }
      }
    } 
    else if (keys.right.isDown){
      switch(this.pinta){
        case 0:
          this.anims.play("right", true);
          this.lastPosition = "right-stand";
          break;
        case 1:
          this.anims.play("right-capa", true);
          this.lastPosition = "right-capa-stand";
          break;
        case 10:
          this.anims.play("right-espada", true);
          this.lastPosition = "right-espada-stand";
          break;
        case 11:
          this.anims.play("right-capa-espada", true);
          this.lastPosition = "right-capa-espada-stand";
          break;
        case 100:
          this.anims.play("right-escudo", true);
          this.lastPosition = "right-escudo-stand";
          break;
        case 101:
          this.anims.play("right-capa-escudo", true);
          this.lastPosition = "right-capa-escudo-stand";
          break;
        case 110:
          this.anims.play("right-espada-escudo", true);
          this.lastPosition = "right-espada-escudo-stand";
          break;
        case 111:
          this.anims.play("right-capa-espada-escudo", true);
          this.lastPosition = "right-capa-espada-escudo-stand";
          break;
      }
    }else if(keys.left.isDown){
      switch(this.pinta){
        case 0:
          this.anims.play("left", true);
          this.lastPosition = "left-stand";
          break;
        case 1:
          this.anims.play("left-capa", true);
          this.lastPosition = "left-capa-stand";
          break;
        case 10:
          this.anims.play("left-espada", true);
          this.lastPosition = "left-espada-stand";
          break;
        case 11:
          this.anims.play("left-capa-espada", true);
          this.lastPosition = "left-capa-espada-stand";
          break;
        case 100:
          this.anims.play("left-escudo", true);
          this.lastPosition = "left-escudo-stand";
          break;
        case 101:
          this.anims.play("left-capa-escudo", true);
          this.lastPosition = "left-capa-escudo-stand";
          break;
        case 110:
          this.anims.play("left-espada-escudo", true);
          this.lastPosition = "left-espada-escudo-stand";
          break;
        case 111:
          this.anims.play("left-capa-espada-escudo", true);
          this.lastPosition = "left-capa-espada-escudo-stand";
          break;
      }
    }
    else {
      if(this.lastPosition != null && !this.s.isDown && !this.isAttacking && !this.a.isDown && !this.isDefending){
        this.anims.play(this.lastPosition, true);
      }
    }
  }
  
  alive(){
    return this.life > 0;
  }
}

