export default class Entidad{
    constructor(scene, x, y, mapa){
        this.x = x;
        this.y = y;
        this.scene = scene;
        if(mapa !== null && mapa !== undefined){
            this.mapa = mapa;
        }
        else this.mapa = "no_definido";
    }
    getMapa(){
        return this.mapa;
    }

}