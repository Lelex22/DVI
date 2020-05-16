export default class GameOver extends Phaser.Scene {

    constructor() {
        super('GameOver');
    }
    preload(){
        this.load.image("gameover", "../public/assets/imagenes/gameover.png");
        this.load.image("click", "../public/assets/imagenes/subimagengameover.png");
        this.load.image("click2", "../public/assets/imagenes/volveraempezar.png");
    }
    create() {
        this.add.image(400, 300, "gameover");
        let click = this.add.image(400, 380, "click").setDepth(1).setInteractive();
        click.on("pointerover", () => {
            click.setTexture('click2');
        });
        click.on("pointerout", () => {
            click.setTexture('click');
        });
        click.on("pointerup", () => {
            this.scene.start("DungeonScene", { vidas: 5, monedas: 0, buffs: null });
        });
    }
}