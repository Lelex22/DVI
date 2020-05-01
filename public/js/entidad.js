export default class Entidad extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y);
        this.setPosition(x, y);
    }
}