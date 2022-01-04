class MainMenuScene extends Phaser.Scene {

  constructor() {
    super("mainMenu");
  }
  
  init() {
    if(localStorage.getItem("localHighscore") === null)
      localStorage.setItem("localHighscore", "[]");
  }
  
  create() {
    
    this.acceptSound = this.sound.add("acceptSound");
    this.selectSound = this.sound.add("selectSound");

    this.startButton = this.createButton("START GAME", 0, {
      fontSize: '28px',
      backgroundColor: null
    }).on('pointerdown', () => {
      this.scene.start("spaceScene");
      this.acceptSound.play();
    })
    .on('pointerover', () => {
      this.startButton.setStyle({ backgroundColor: '#e90' });
      this.selectSound.play();
    })
    .on('pointerout', () => {
      this.startButton.setStyle({ backgroundColor: 0x00000f })
    });

    this.highscoreButton = this.createButton("HIGHSCORES", 48, {
      fontSize: '28px',
      backgroundColor: null
    }).on('pointerdown', () => {
      this.scene.start("highscoreScene");
      this.acceptSound.play();
    })
    .on('pointerover', () => {
      this.highscoreButton.setStyle({ backgroundColor: '#e90' })
      this.selectSound.play();
    })
    .on('pointerout', () => {
      this.highscoreButton.setStyle({ backgroundColor: 0x00000f })
    });

    this.anims.create({
      key: 'laserImpact',
      frames: [
        { key: 'laser1' },
        { key: 'laser2' },
        { key: 'laser3' },
        { key: 'laser4' }
      ],
      frameRate: 4,
      repeat: -1
    })

    this.anims.create({
      key: 'shipImpact',
      frames: [
        { key: 'redShip' },
        { key: 'redShipDamage' }
      ],
      repeat: 2
    })

    this.anims.create({
      key: 'shipExplosion',
      frames: [
        { key: 'explosion1' },
        { key: 'explosion2' },
        { key: 'explosion3' },
        { key: 'explosion4' },
        { key: 'explosion5' }
      ],
      frameRate: 4,
      repeat: -1
    })

    let labelVersion = this.add.text(0, 0, "version: 1.0");
    let labelPhaser = this.add.text(20, this.game.config.height - 40, "Powered by ", {
      fontSize: '20px'
    });
    let phaserLogo = this.add.image(labelPhaser.x + 235, labelPhaser.y, 'phaserLogo')
    .setScale(0.5)
    .setOrigin(0.5, 0.5);

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background")
    .setOrigin(0, 0)
    .setScrollFactor(0)
    .setDepth(-5);
  }

  update(time, delta) {
    this.background.tilePositionX += 0.03 * delta;
  }
  
  createButton(text, offset, options = {}) {
    return this.add.text(this.game.config.width / 2, this.game.config.height / 2 + offset, text, options)
    .setOrigin(0.5, 0.5)
    .setInteractive({ useHandCursor: true });
  }
}