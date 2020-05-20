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
        //else this.player = new Player(this, 0, 0);
      }
    preload(){
        this.load.image("5vidas", "../public/assets/imagenes/5vidas.png");
        this.load.image("4vidas", "../public/assets/imagenes/4vidas.png");
        this.load.image("3vidas", "../public/assets/imagenes/3vidas.png");
        this.load.image("2vidas", "../public/assets/imagenes/2vidas.png");
        this.load.image("1vida", "../public/assets/imagenes/1vida.png");
        this.load.spritesheet("coin", "../public/assets/imagenes/coins.png", {
            frameWidth: 22.8333,
            frameHeight: 29
        });
        this.load.spritesheet(
        "characters",
        "../public/assets/spritesheets/luigi-sprites.png",
        {
            frameWidth: 28,
            frameHeight: 28
        }
        );
        this.load.image('tiendaTiles', '../public/assets/tilesets/tienda.png');
        this.load.tilemapTiledJSON('map', '../public/assets/tilesets/tienda.json');
        
        this.load.spritesheet('button', '../public/img/flixel-button.png', { frameWidth: 80, frameHeight: 20 });

        this.load.bitmapFont('nokia', '../public/assets/nokia16black.png', '../public/assets/nokia16black.xml');
        
    }
    create(){
        
        const map = this.make.tilemap({ key: "map" });
        let tileset = map.addTilesetImage('tienda', 'tiendaTiles');
        const fondo = map.createStaticLayer("Capa de patrones 1", tileset, 0, 0);
        const borde = map.createStaticLayer("borde", tileset, 0, 0);
        const floor = map.createStaticLayer("floor", tileset, 0, 0);
        const pared = map.createStaticLayer("pared", tileset, 0, 0);
        const colisiones = map.createStaticLayer("objetoscoli", tileset, 0, 0);

        colisiones.setCollisionByExclusion([-1, 0]);
        borde.setCollisionByExclusion([-1, 0]);
        pared.setCollisionByExclusion([-1, 0]);
        this.player = new Player(this, 250, 290, this.buffsPlayer, this.mapa, this.lifesPlayer, this.coinsPlayer);
        
        this.vidas = dibujaVidas(this, this.player.life);
        this.monedas = this.add.sprite(650, 20, "coin").setOrigin(0).setScrollFactor(0).setScale(1.5);
        this.textMonedas = this.add.text(690, 27, "X " + this.player.coins, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "30px" }).setOrigin(0).setScrollFactor(0);
        

        this.physics.add.collider(this.player, borde);
        this.physics.add.collider(this.player, pared);
        this.physics.add.collider(this.player, colisiones);
        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main;

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.player);
        this.enMostrador = false;

        this.add.text(16, 460, `Ve al mostrador y pulsa ENTER\npara comprarle algo al tendero.`, {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
          })
          .setScrollFactor(0);
        
        this.input.keyboard.on('keydown-ENTER',function(event){
            let texto = this.add.text(100, 360, `Pulsa con el ratón aquello\nque quieras comprar. `, {
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
                        makeButton.call(this, marker.name, 660, 115 + j*40, precio);
                        j++;
                    }
                }
                makeButton.call(this, "Vida", 660, 115 + j*40, 25);
                makeButton.call(this, "Aumento de Vida Máxima", 640, 115 + (j + 1)* 40, 500);

                this.input.on('gameobjectover', function (pointer, button)
                {
                    setButtonFrame(button, 0);
                });
                this.input.on('gameobjectout', function (pointer, button)
                {
                    setButtonFrame(button, 1);
                });

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
                                        break;
                                    case "Escudo": 
                                        this.player.buffs[0].value = true;
                                        this.messages = ["Escudo."];
                                        break;
                                    case "Capa": 
                                        this.player.buffs[2].value = true;
                                        this.messages = ["Capa."];
                                        break;
                                }
                        }
                        else if(button.name === "Vida"){
                            //Si el jugador ya tiene el maximo de vida no le dejamos comprar
                            if(this.player.life < this.player.maxLife){
                                
                                this.player.coins -= button.precio;
                                this.player.life += 1;
                                this.messages = "1 Vida. Ahora tienes " + this.player.life + "vidas";

                                this.add.image(32 * (this.player.life - 1) + 16, 20, 'heart').setScrollFactor(0);
                            }
                            else {
                                this.fail = true;
                                this.messages = "No puedes comprar más vidas\nporque ya tienes el máximo" 
                            }
                        }
                        else if(button.name === "Aumento de Vida Máxima"){
                            
                            this.player.coins -= button.precio;
                            this.player.maxLife += 1;
                            this.messages = "Aumento de Vida Máxima.\nAhora tu máximo de vidas es " + this.player.maxLife;
                        }
                        if(this.fail){
                            texto.text = `${this.messages}.\nAumenta tu máximo de vidas para comprar más.\n¡Vuelve cuando quieras!`;
                            this.fail = false;
                        }
                        else {
                            texto.text = `Has comprado ${this.messages}.\nTe quedan ${this.player.coins} monedas.\n¡Vuelve cuando quieras!`;
                        }
                    }
                    //Caso de que no tenga monedas suficientes
                    else {
                        texto.text = `No tienes monedas suficientes\npara comprar ese artículo.`;
                    }
                }, this);

            }
        },this);

            
        
    
    }

    update(time, delta){
        if(this.player.x <= 255 && this.player.x >= 215 && this.player.y <= 250)
            this.enMostrador = true;
        else this.enMostrador = false;
        if(this.player.x <= 250 && this.player.x >= 240 && this.player.y > 290){
            const cam = this.cameras.main;
            cam.fade(250, 0, 0, 0);
            cam.once("camerafadeoutcomplete", () => {
                this.player.destroy();
                this.scene.start("DungeonScene", {vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs});
                this.scene.stop();
            });
        }

        else this.player.update();
        
    }
    
}

function makeButton(name, x, y, precio)
{
    let button = this.add.image(x, y, 'button', 0).setInteractive();
    button.name = name;
    button.precio = precio;
    if(button.name === "Aumento de Vida Máxima"){
        button.setScale(4, 1.5);
        let text = this.add.bitmapText(x - 40, y - 8, 'nokia', "+1 Vida Máxima X " + precio + "monedas", 16);
        text.x += (button.width - text.width) / 2;
    }
    else{
        button.setScale(3, 1.5)
        let text = this.add.bitmapText(x - 40, y - 8, 'nokia', name + " X " + precio + "monedas", 16);
        text.x += (button.width - text.width) / 2;
    }
    
}

function setButtonFrame(button, frame)
{
    button.frame = button.scene.textures.getFrame('button', frame);
}
function dibujaVidas(scene, vidasPlayer){
    switch (vidasPlayer) {
        case 5:
            return scene.add.sprite(16, 20, "5vidas").setOrigin(0).setScrollFactor(0);
            break;
        case 4:
            return scene.add.sprite(16, 20, "4vidas").setOrigin(0).setScrollFactor(0);
            break;
        case 3:
            return scene.add.sprite(16, 20, "3vidas").setOrigin(0).setScrollFactor(0);
            break;
        case 2:
            return scene.add.sprite(16, 20, "2vidas").setOrigin(0).setScrollFactor(0);
            break;
        case 1:
            return scene.add.sprite(16, 20, "1vida").setOrigin(0).setScrollFactor(0);
            break;
        default:
            break;
    }
  }