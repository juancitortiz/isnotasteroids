class HighScoreScene extends Phaser.Scene {
  constructor() {
    super("highscoreScene");
  }

  init() {
    // console.log('localStorage.getItem("localHighscore")', localStorage.getItem("localHighscore"));
    if(localStorage.getItem("localHighscore") !== null)
      this.localScore = JSON.parse(localStorage.getItem("localHighscore"));
  }
  create(){

    this.acceptSound = this.sound.add("acceptSound");
    this.selectSound = this.sound.add("selectSound");

    this.labelTop = this.add.text(this.game.config.width / 2, 60, "TOP SCORES", {
      fontSize: '48px',
    })
    .setOrigin(0.5, 0.5)
    .setScrollFactor(0)
    .setDepth(10);

    this.localScore.map((score, i) => {
      let multiplier = 30;
      let scoreLabel = this.add.text(this.game.config.width / 2, 200 + (i * multiplier), i+1 + " - " + score)
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(10)
      if(i === 0)
        scoreLabel
        .setStyle({
          color: '#ee0'
        });
      else if(i === 1)
        scoreLabel
        .setStyle({
          color: '#ee9'
        });
      else if(i === 2)
        scoreLabel
        .setStyle({
          color: '#964'
        });
      else
        scoreLabel
        .setStyle({
          color: '#666'
        });
    })

    this.backMainMenu = this.createButton("BACK TO MENU", this.game.config.height / 2 - 30)
    .on('pointerdown', () => {
      this.scene.start("mainMenu");
      this.acceptSound.play();
    })
    .on('pointerover', () => {
      this.backMainMenu.setStyle({ backgroundColor: '#e90' })
      this.selectSound.play();
    })
    .on('pointerout', () => {
      this.backMainMenu.setStyle({ backgroundColor: 0x00000f })
    })
  }

  createButton(text, offset, options = {}) {
    return this.add.text(this.game.config.width / 2, this.game.config.height / 2 + offset, text, options)
    .setOrigin(0.5, 0.5)
    .setInteractive({ useHandCursor: true });
  }
}