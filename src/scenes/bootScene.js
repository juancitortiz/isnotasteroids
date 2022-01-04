class BootScene extends Phaser.Scene {

  constructor() {
    super("bootScene");
  }

  preload() {
    
    this.load.path = './assets/';

    this.load.image('phaserLogo', 'phaser3-logo.png');
    
    this.load.image("background", "background.png");
    this.load.image("redShip", "playerShip1_red.png");
    this.load.image("redShipDamage", "playerShip1_damage.png");
    this.load.image("laserRed", "laserRed01.png");
    this.load.image("rock", "meteorBrown_med1.png");

    this.load.image('laser1', 'laserRed08.png');
    this.load.image('laser2', 'laserRed09.png');
    this.load.image('laser3', 'laserRed10.png');
    this.load.image('laser4', 'laserRed11.png');

    this.load.image('explosion1', 'explosion1.png');
    this.load.image('explosion2', 'explosion2.png');
    this.load.image('explosion3', 'explosion3.png');
    this.load.image('explosion4', 'explosion4.png');
    this.load.image('explosion5', 'explosion5.png');

    this.load.audio('laserSound', ['sfx_laser2.ogg']);
    this.load.audio('acceptSound', ['sfx_twoTone.ogg']);
    this.load.audio('selectSound', ['sfx_zap.ogg']);
    this.load.audio('explosionSound', ['sfx_explosion.mp3']);
    this.load.audio('explosionRockSound', ['sfx_explosionRock.ogg']);
    this.load.audio('lightHitSound', ['sfx_lightHit.ogg']);
    this.load.audio('metalHitSound', ['sfx_metalHit.ogg']);

    let loadingBar = this.add.graphics()
    .fillGradientStyle(0xffffff, 0xee9900, 0xffffff, 0xee9900, 1);

    this.load.on('progress', (percentaje) => {
      loadingBar.fillRect(0, this.game.config.height / 2, this.game.config.width * percentaje, 50);
    })
    this.load.on('complete', () => {
      this.scene.start('mainMenu');
    })
  }
  create() {}
}