var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'canvas-container',
  backgroundColor: 0x00000f,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: [BootScene, MainMenuScene, SpaceScene, HighScoreScene],
  sound: {
    disableWebAudio: true
  }
}

var game = new Phaser.Game(config);