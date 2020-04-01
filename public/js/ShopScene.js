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
        }
        //else this.player = new Player(this, 0, 0);
      }
    preload(){
        this.load.image("heart", "../public/img/heart.png");
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
        this.player = new Player(this, 250, 290);
        if(this.lifesPlayer && (this.coinsPlayer || this.coinsPlayer === 0) && this.buffsPlayer){
            this.buffsPlayer.forEach(function (elem, i){
                if(elem.value) 
                this.player.buffs[i].value = elem.value;
            }, this);
            this.player.buffs = this.buffsPlayer;
            this.player.coins = this.coinsPlayer;
            this.player.life = this.lifesPlayer;
        }
        for(let i = 0; i < this.player.life; i++)
            this.add.image(32 * i + 16, 20, 'heart').setScrollFactor(0);
        
        

        this.physics.add.collider(this.player.sprite, borde);
        this.physics.add.collider(this.player.sprite, pared);
        this.physics.add.collider(this.player.sprite, colisiones);
        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main;

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.player.sprite);
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
                for (let i=0; i < this.player.buffs.length; i++)
                {
                    let marker = this.player.buffs[i];
                    if(!marker.value)
                        makeButton.call(this, marker.name, 660, 115 + i*40, 1000);
                }
                makeButton.call(this, "Vida", 660, 115 + 120, 50);
                makeButton.call(this, "Aumento de Vida Máxima", 640, 115 + 160, 500);

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
        if(this.player.sprite.x <= 255 && this.player.sprite.x >= 215 && this.player.sprite.y <= 250)
            this.enMostrador = true;
        else this.enMostrador = false;
        if(this.player.sprite.x <= 250 && this.player.sprite.x >= 240 && this.player.sprite.y > 290){
            const cam = this.cameras.main;
            cam.fade(250, 0, 0, 0);
            cam.once("camerafadeoutcomplete", () => {
                this.player.destroy();
                this.scene.start("DungeonScene", {vidas: this.player.life, monedas: this.player.coins, buffs: this.player.buffs});
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

