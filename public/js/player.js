export default class Player {
  // Orden: Escudo 0 Espada 1 Capa 2
  constructor(scene, x, y, buffs) {
    if(buffs === null || buffs === undefined)
      this.buffsp = [false, false, false];
    else {
      console.log(buffs[2]["value"]);
      this.buffsp = [];
      this.buffsp[0] = buffs[0]["value"];
      this.buffsp[1] = buffs[1]["value"];
      this.buffsp[2] = buffs[2]["value"];
      console.log(this.buffsp[2]);
    }
    this.scene = scene;
    this.maxLife = 5;
    this.life = 5;
    this.coins = 1000;
    this.buffs = [{name: "Escudo", value: this.buffsp[0]}, {name: "Espada", value: this.buffsp[1]}, {name: "Capa", value: this.buffsp[2]}];
    
    const anims = scene.anims;
    //If para crear down
    anims.create({
      key: "down",
      frames: [ { key: 'characters', frame: 1 } ],
      frameRate: 20
    });
    //If para crear up
    anims.create({
      key: "up",
      frames: [ { key: 'characters', frame: 0 } ],
      frameRate: 20
    });
    //If para crear right
    let pinta = pintaBuffs(this.buffsp);
    console.log("Pinta = " + pinta);
    switch(parseInt(pinta)){
      case 0:
        //Sin nada
        anims.create({
          key: "right",
          frames: anims.generateFrameNumbers('characters', { start: 18, end: 19 }),
          frameRate: 10,
          repeat: 0
        });
        break;
      case 1:
        //Solo capa
        console.log("Hola");
        anims.create({
          key: "right",
          frames: anims.generateFrameNumbers('characters', { start: 14, end: 15 }),
          frameRate: 10,
          repeat: 0
        });
        break;
        //Solo espada
      case 10:
        anims.create({
          key: "right",
          frames: anims.generateFrameNumbers('characters', { start: 16, end: 17 }),
          frameRate: 10,
          repeat: 0
        });
        break;
      case 11:
        //Capa espada
        anims.create({
          key: "right",
          frames: anims.generateFrameNumbers('characters', { start: 6, end: 7 }),
          frameRate: 10,
          repeat: 0
        });
        break;
        //Solo escudo
      case 100:
        anims.create({
          key: "right",
          frames: anims.generateFrameNumbers('characters', { start: 25, end: 26 }),
          frameRate: 10,
          repeat: 0
        });
        break;
        //Escudo capa
      case 101:
        anims.create({
          key: "right",
          frames: anims.generateFrameNumbers('characters', { start: 34, end: 35 }),
          frameRate: 10,
          repeat: 0
        });
        break;
        //Escudo espada
      case 110:
        anims.create({
          key: "right",
          frames: anims.generateFrameNumbers('characters', { start: 27, end: 28 }),
          frameRate: 10,
          repeat: 0
        });
        break;
        //Todo
      case 111:
        anims.create({
          key: "right",
          frames: anims.generateFrameNumbers('characters', { start: 29, end: 30 }),
          frameRate: 10,
          repeat: 0
        });
        break;
    }
      anims.create({
        key: "left",
        frames: anims.generateFrameNumbers('characters', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: 0
      });
    this.sprite = scene.physics.add
      .sprite(x, y, "characters")
      .setSize(10, 10)
      .setOffset(10, 10);

    this.sprite.anims.play("up");

    this.keys = scene.input.keyboard.createCursorKeys();

    function pintaBuffs(buffs){
      let ret = [];
      if(buffs[0]) ret[0] = 1;
      else ret[0] = 0;
      if(buffs[1]) ret[1] = 1;
      else ret[1] = 0;
      if(buffs[2]) ret[2] = 1;
      else ret[2] = 0;
      console.log(ret);
      return ret[0] * 100 + ret[1] * 10 + ret[2];
    }
  }

  freeze() {
    this.sprite.body.moves = false;
  }

  update() {
    const keys = this.keys;
    const sprite = this.sprite;
    const speed = 300;
    const prevVelocity = sprite.body.velocity.clone();

    // Stop any previous movement from the last frame
    sprite.body.setVelocity(0);

    // Horizontal movement
    if (keys.left.isDown) {
      sprite.body.setVelocityX(-speed);
      //sprite.setFlipX(true);
    } else if (keys.right.isDown) {
      sprite.body.setVelocityX(speed);
      //sprite.setFlipX(false);
    }

    // Vertical movement
    if (keys.up.isDown) {
      sprite.body.setVelocityY(-speed);
    } else if (keys.down.isDown) {
      sprite.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that sprite can't move faster along a diagonal
    sprite.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right/down animations precedence over up animations
    if (keys.down.isDown) {
      sprite.anims.play("down", true);
    } else if (keys.up.isDown) {
      sprite.anims.play("up", true);
    } 
    else if (keys.right.isDown){
        sprite.anims.play("right", true);
    }else if(keys.left.isDown){
        sprite.anims.play("left", true);
    }else {
      sprite.anims.stop();

      // If we were moving & now we're not, then pick a single idle frame to use
      
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
