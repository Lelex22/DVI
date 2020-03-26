export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.maxLife = 5;
    this.life = 5;
    this.coins = 1000;
    this.buffs = [{name: "Escudo", value: false}, {name: "Espada", value: false}, {name: "Capa", value: false}];
    
    const anims = scene.anims;
    anims.create({
      key: "down",
      frames: [ { key: 'characters', frame: 1 } ],
      frameRate: 20
    });
    anims.create({
      key: "up",
      frames: [ { key: 'characters', frame: 0 } ],
      frameRate: 20
    });
    anims.create({
        key: "right",
        frames: anims.generateFrameNumbers('characters', { start: 8, end: 9 }),
        frameRate: 10,
        repeat: 0
      });
      anims.create({
        key: "left",
        frames: anims.generateFrameNumbers('characters', { start: 6, end: 7 }),
        frameRate: 10,
        repeat: 0
      });
    this.sprite = scene.physics.add
      .sprite(x, y, "characters")
      .setSize(10, 10)
      .setOffset(10, 10);

    this.sprite.anims.play("up");

    this.keys = scene.input.keyboard.createCursorKeys();
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
