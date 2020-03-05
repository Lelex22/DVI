/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    const anims = scene.anims;
    anims.create({
      key: "player-walk",
      frames: [ { key: 'characters', frame: 1 } ],
      frameRate: 20
    });
    anims.create({
      key: "player-walk-back",
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

    this.sprite.anims.play("player-walk-back");

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
      sprite.anims.play("player-walk", true);
    } else if (keys.up.isDown) {
      sprite.anims.play("player-walk-back", true);
    } 
    else if (keys.right.isDown){
        sprite.anims.play("right", true);
    }else if(keys.left.isDown){
        sprite.anims.play("left", true);
    }else {
      sprite.anims.stop();

      // If we were moving & now we're not, then pick a single idle frame to use
      if (prevVelocity.y < 0) sprite.setTexture("characters", 0);
      //else sprite.setTexture("characters", 1);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
