export default class Entidad extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, life){
        super(scene, x, y);
        this.setPosition(x, y);
        this.life = life;
        this.scene = scene;
    }
}