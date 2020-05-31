import Player from "./player.js";

export default class ShopScene extends Phaser.Scene {

    constructor ()
    {
        super('ShopScene');
    }

    init(data){
        if(data !== null){
          this.lifesPlayer = data.vidas;
          this.coinsPlayer = data.monedas;
          this.buffsPlayer = data.buffs;
          this.mapa = data.mapa;
        }
      }
    preload(){
        
        
    }
    create(){
        this.carga = this.scene.get("Preloads");
        const map = this.make.tilemap({ key: "tiendaMap" });
        let tileset = map.addTilesetImage('tienda', 'tiendaTiles');
        const fondo = map.createStaticLayer("Capa de patrones 1", tileset, 0, 0);
        const borde = map.createStaticLayer("borde", tileset, 0, 0);
        const floor = map.createStaticLayer("floor", tileset, 0, 0);
        const pared = map.createStaticLayer("pared", tileset, 0, 0);
        
        const colisiones = map.createStaticLayer("objetoscoli", tileset, 0, 0);
        for (const objeto of map.getObjectLayer('tendera').objects) {
            this.add.image(235, 160, "tendera");
        }
        colisiones.setCollisionByExclusion([-1, 0]);
        borde.setCollisionByExclusion([-1, 0]);
        pared.setCollisionByExclusion([-1, 0]);
        this.player = new Player(this, 250, 290, this.buffsPlayer, this.mapa, this.lifesPlayer, this.coinsPlayer);
        
        this.vidas = this.carga.dibujaVidas(this, this.player.life);
        this.textMonedas = this.carga.dibujaMonedas(this);
        this.buttonsGroup = this.add.group();
        this.textos = [];

        this.physics.add.collider(this.player, borde);
        this.physics.add.collider(this.player, pared);
        this.physics.add.collider(this.player, colisiones);
        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main;

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.player);
        this.enMostrador = false;

        this.text = this.add.text(16, 460, `Ve al mostrador y pulsa ENTER\npara comprarle algo al tendero.`, {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
          })
          .setScrollFactor(0);
        
        this.input.keyboard.on('keydown-ENTER',function(event){
            this.text.setText(`Pulsa con el ratón aquello\nque quieras comprar.\nPoniendo el cursor encima\nde cada opción se muestra\nsu descripción y uso. `, {
                font: "18px monospace",
                fill: "#000000",
                padding: { x: 20, y: 10 },
                backgroundColor: "#ffffff"
              })
              .setScrollFactor(0);
            if(this.enMostrador){
                let activos = 0, precio = 0, p;
                for(p of this.player.buffs){
                    if(p.value)
                        activos++;
                }
                if(activos === 0)
                    precio = 250;
                else if(activos === 1)
                    precio = 1000;
                else if(activos === 2)
                    precio = 3000;
                let j = 0;
                for (let i=0; i < this.player.buffs.length; i++)
                {
                    let marker = this.player.buffs[i];
                    if(!marker.value){
                        let ret = makeButton.call(this, marker.name, 760, 135 + j*40, precio);
                        this.buttonsGroup.add(ret[0]);
                        this.textos.push(ret[1]);
                        j++;
                    }
                }
                makeButton.call(this, "Vida", 760, 135 + j*40, 25);
                makeButton.call(this, "Aumento de Vida Máxima", 760, 135 + (j + 1)* 40, 500);

                this.input.on('gameobjectover', function (pointer, button)
                {
                    setButtonFrame(button, 0);
                    switch(button.name){
                        case "Espada": 
                            this.explicacion = this.add.text(590, 70, "Con la espada podrás atacar a los\nenemigos pulsando la tecla S.");
                            break;
                        case "Escudo": 
                            this.explicacion = this.add.text(585, 70, "Con el escudo podrás defenderte de\nlos enemigos pulsando la tecla A.");
                            break;
                        case "Capa": 
                            this.explicacion = this.add.text(590, 70, "Con la capa el contacto con los\nenemigos no te producirá daño.");
                            break;
                        case "Aumento de Vida Máxima": 
                            this.explicacion = this.add.text(640, 70, "Se aumenta en 1 el máximo\nde vidas (hasta 10 vidas).");
                            break;
                        case "Vida": 
                            this.explicacion = this.add.text(650, 70, "Recupera una vida.");
                            break;
                    }
                }, this);
                this.input.on('gameobjectout', function (pointer, button)
                {
                    setButtonFrame(button, 1);
                    this.explicacion.destroy();
                }, this);

                this.input.on('gameobjectup', function (pointer, button)
                {
                    setButtonFrame(button, 2);
                    if(this.player.coins >= button.precio){
                        
                        if(button.name === "Espada" || button.name === "Escudo" ||
                            button.name === "Capa"){
                                this.player.coins -= button.precio;
                                
                                switch(button.name){
                                    case "Espada": 
                                        this.player.buffs[1].value = true;
                                        this.messages = ["Espada."];
                                        this.explicacion.destroy();
                                        button.destroy();
                                        this.textos[1].destroy();
                                        this.textos.splice(1,1);
                                        if(this.buttonsGroup.children.entries.length === 2){
                                            for(let i of this.buttonsGroup.children.entries)
                                                i.precio = 1000;
                                            this.textos[0].text = "Escudo X 1000 monedas";
                                            this.textos[1].text = "Capa X 1000 monedas";
                                        }
                                        else if(this.buttonsGroup.children.entries.length === 1){
                                            for(let i of this.buttonsGroup.children.entries)
                                                i.precio = 3000;
                                            if(this.textos[0].text.includes("Escudo"))
                                                this.textos[0].text = "Escudo X 3000 monedas";
                                            else this.textos[0].text = "Capa X 3000 monedas";
                                        }                                        
                                        break;
                                    case "Escudo": 
                                        this.player.buffs[0].value = true;
                                        this.messages = ["Escudo."];
                                        this.explicacion.destroy();
                                        button.destroy();
                                        this.textos[0].destroy();
                                        this.textos.splice(0,1);
                                        if(this.buttonsGroup.children.entries.length === 2){
                                            for(let i of this.buttonsGroup.children.entries)
                                                i.precio = 1000;
                                            this.textos[0].text = "Espada X 1000 monedas";
                                            this.textos[1].text = "Capa X 1000 monedas";
                                        }
                                        else if(this.buttonsGroup.children.entries.length === 1){
                                            for(let i of this.buttonsGroup.children.entries)
                                                i.precio = 3000;
                                            if(this.textos[0].text.includes("Espada"))
                                                this.textos[0].text = "Espada X 3000 monedas";
                                            else this.textos[0].text = "Capa X 3000 monedas";
                                        }       
                                        break;
                                    case "Capa": 
                                        this.player.buffs[2].value = true;
                                        this.messages = ["Capa."];
                                        this.explicacion.destroy();
                                        button.destroy();
                                        this.textos[2].destroy();
                                        this.textos.splice(2,1);
                                        if(this.buttonsGroup.children.entries.length === 2){
                                            for(let i of this.buttonsGroup.children.entries)
                                                i.precio = 1000;
                                            this.textos[0].text = "Escudo X 1000 monedas";
                                            this.textos[1].text = "Espada X 1000 monedas";
                                        }
                                        else if(this.buttonsGroup.children.entries.length === 1){
                                            for(let i of this.buttonsGroup.children.entries)
                                                i.precio = 3000;
                                            if(this.textos[0].text.includes("Espada"))
                                                this.textos[0].text = "Espada X 3000 monedas";
                                            else this.textos[0].text = "Escudo X 3000 monedas";
                                        }    
                                        break;
                                }
                        }
                        else if(button.name === "Vida"){
                            //Si el jugador ya tiene el maximo de vida no le dejamos comprar
                            if(this.player.life < this.player.maxLife){
                                
                                this.player.coins -= button.precio;
                                this.player.life += 1;
                                this.messages = "1 Vida. Ahora tienes " + this.player.life + " vidas";
                            }
                            else {
                                this.fail = true;
                                this.messages = "No puedes comprar más vidas\nporque ya tienes el máximo" 
                            }
                        }
                        else if(button.name === "Aumento de Vida Máxima"){
                            if(this.player.maxLife < 10){
                                this.player.coins -= button.precio;
                                this.player.maxLife += 1;
                                this.messages = "Aumento de Vida Máxima.\nAhora tu máximo de vidas es " + this.player.maxLife;
                            }
                            else this.messages = "El máximo de vidas no puede aumentar más.";
                        }
                        if(this.fail){
                            this.text.setText(`${this.messages}.\nAumenta tu máximo de vidas para comprar más.\n¡Vuelve cuando quieras!`);
                            this.fail = false;
                        }
                        else {
                            this.text.setText(`Has comprado ${this.messages}\nTe quedan ${this.player.coins} monedas.\n¡Vuelve cuando quieras!`);
                        }
                    }
                    //Caso de que no tenga monedas suficientes
                    else {
                        this.text.setText(`No tienes monedas suficientes\npara comprar ese artículo.`);
                    }
                    this.carga.updateMonedas(this.textMonedas, this.player.coins);
                }, this);

            }
        },this);

            
        
    
    }

    update(time, delta){
        if(this.player.x <= 255 && this.player.x >= 215 && this.player.y <= 250)
            this.enMostrador = true;
        else this.enMostrador = false;
        if(this.player.x <= 250 && this.player.x >= 220 && this.player.y > 290){
            const cam = this.cameras.main;
            cam.fade(250, 0, 0, 0);
            cam.once("camerafadeoutcomplete", () => {
                this.scene.start("DungeonScene", {vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs});
                this.scene.stop();
            });
        }

        else this.player.update();
        this.carga.updateLife(this.vidas, this.player.life);
    }
    
}

function makeButton(name, x, y, precio)
{
    let button = this.add.image(x, y, 'button', 0).setInteractive(), text;
    button.name = name;
    button.precio = precio;
    if(button.name === "Aumento de Vida Máxima"){
        button.setScale(4, 1.5);
        text = this.add.bitmapText(x - 40, y - 8, 'nokia', "+1 Vida Máxima X " + precio + " monedas", 16);
        text.x += (button.width - text.width) / 2;
    }
    else{
        button.setScale(3, 1.5)
        text = this.add.bitmapText(x - 40, y - 8, 'nokia', name + " X " + precio + " monedas", 16);
        text.x += (button.width - text.width) / 2;
    }
    return [button,text];
}

function setButtonFrame(button, frame)
{
    button.frame = button.scene.textures.getFrame('button', frame);
}
