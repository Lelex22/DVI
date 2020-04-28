class Entidad{
    constructor(scene, x, y, mapa){
        this.x = x;
        this.y = y;
        this.scene = scene;
        if(this.mapa !== null && this.mapa !== undefined){
            this.mapa = mapa;
        }
    }

}