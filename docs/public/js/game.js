var config = {
  width: 800,
  height: 600, 
  scene: [scene1,scene2],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 200 }
    }
  },
}

var game = new Phaser.Game(config);