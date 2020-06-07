export default class GameOver extends Phaser.Scene {

    constructor() {
        super('GameOver');
    }
    init(data) {
        this.escenaPausada = data.escena;
    }
    preload() { }
    create() {
        this.scene.get("Preloads");
        this.add.image(500, 300, "gameover");
        let click = this.add.image(500, 380, "click").setDepth(1).setInteractive();
        click.on("pointerover", () => {
            click.setTexture('click2');
        });
        click.on("pointerout", () => {
            click.setTexture('click');
        });
        click.on("pointerup", () => {
            this.sound.add("bye", {
                volume: 1.5,
            }).play();
            this.scene.start("DungeonScene", { vidas: 5, monedas: 0, buffs: null });
            this.scene.stop(this.escenaPausada);
        });
    }
}