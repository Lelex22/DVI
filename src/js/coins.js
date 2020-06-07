export default class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "coin");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        const anims = this.scene.anims;
        anims.create({
            key: "move",
            frames: anims.generateFrameNumbers('coin', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        });
        this.body.setGravity(0, 200);
    }
    preUpdate(d, t) {
        super.preUpdate(d, t);
        this.body.setOffset(0, -5);
        this.anims.play("move", true);
    }
} 