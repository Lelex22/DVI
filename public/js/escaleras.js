export default class Escaleras {
    constructor(scene, x, y) {
        this.scene = scene;
        this.scene.physics.add.staticImage(x, y, "escaleras");
        
        console.log("Creadas");
    }
    
    update() {
        if (this.scene.physics.overlap(this.scene.player, this)) console.log("Overlap");
    }
    
    destroy() {
        this.destroy();
    }


} 