class SpaceScene extends Phaser.Scene {
  constructor() {
    super("spaceScene");
  }

  create(){
    this.mainCamera = this.cameras.main;

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background")
    .setOrigin(0, 0)
    .setScrollFactor(0)
    .setDepth(0);

    this.acceptSound = this.sound.add("acceptSound");
    this.selectSound = this.sound.add("selectSound");
    
    this.player = new Player(this, config.width / 2, config.height / 2).setInteractive().setDepth(1);
    this.projectiles = this.add.group();
    this.rocks = this.add.group();
    this.maxRocks = 5;
    
    this.camWorldView = this.mainCamera.worldView;
    
    this.physics.add.collider(this.player, this.rocks, (player, rock) => {
      rock.damage(this);
      player.damage(this);
    });
    this.physics.add.collider(this.projectiles, this.rocks, (projectile, rock) => {
      projectile.laserImpact();
      rock.damage(this);
    });

    this.score = 0;
    this.scoreLabel = this.add.text(20, 20, "SCORE " + this.score)
    .setScrollFactor(0).setDepth(10);
    
    this.livesLabel = this.add.text(config.width - 100, 20, "LIVES " + this.player.health)
    .setScrollFactor(0).setDepth(10);

    this.gameOverLabel = this.add.text(config.width/2 - 50, config.height/2, "GAME OVER")
    .setScrollFactor(0)
    .setDepth(10)
    .setVisible(false);

    this.replayButton = this.createButton("RESTART?", 48)
    .setScrollFactor(0)
    .setVisible(false)
    .on('pointerdown', () => {
      this.scene.restart();
      this.acceptSound.play();
    })
    .on('pointerover', () => {
      this.replayButton.setStyle({ backgroundColor: '#e90' })
      this.selectSound.play();
    })
    .on('pointerout', () => {
      this.replayButton.setStyle({ backgroundColor: '#000' })
    });

    this.backMenuButton = this.createButton("TO MAIN MENU", 90)
    .setScrollFactor(0)
    .setVisible(false)
    .on('pointerdown', () => {
      this.scene.start("mainMenu");
      this.acceptSound.play();
    })
    .on('pointerover', () => {
      this.backMenuButton.setStyle({ backgroundColor: '#e90' })
      this.selectSound.play();
    })
    .on('pointerout', () => {
      this.backMenuButton.setStyle({ backgroundColor: '#000' })
    });
  }
  update(){
    this.deleteOutOfScene();
    this.populateWithRocks();
    this.player.update();
    if (this.player)
      this.handleCamera();
    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
      this.projectiles.getChildren()[i].update();
    }
    this.scoreLabel.text = "SCORE " + this.score;
  }

  handleCamera(){
    this.mainCamera.startFollow(this.player);
    this.background.tilePositionX = this.cameras.main.scrollX * 0.3;
    this.background.tilePositionY = this.cameras.main.scrollY * 0.3;
  }

  populateWithRocks(){
    if(this.rocks.getChildren().length < this.maxRocks){
      let randomPoint;
      for (let i = 0; this.rocks.getChildren().length < this.maxRocks; i++) {
        do {
          randomPoint = this.camWorldView.getRandomPoint();
        } while (this.isInCenterOfViewport(randomPoint));
        new Rock(this, randomPoint.x, randomPoint.y).setInteractive().setDepth(1);
      }
    }
  }

  deleteOutOfScene() {
    for (let i = 0; i < this.rocks.getChildren().length; i++) {
      if(!this.camWorldView.contains(
        this.rocks.getChildren()[i].x,
        this.rocks.getChildren()[i].y
      ))
      this.rocks.getChildren()[i].destroy();
    }
  }

  displayGameOver() {
    this.saveHighScore();
    this.gameOverLabel.visible = true;
    this.backMenuButton.visible = true;
    this.replayButton.visible = true;
  }

  updateLives() {
    this.livesLabel.text = "LIVES " + this.player.health;
  }

  createButton(text, offset, options = {}) {
    return this.add.text(this.game.config.width / 2, this.game.config.height / 2 + offset, text, options)
    .setOrigin(0.5, 0.5)
    .setInteractive({ useHandCursor: true })
    .setDepth(10);
  }

  saveHighScore() {
    let local = JSON.parse(localStorage.getItem("localHighscore"));

    if(local === null){
      local = [this.score];
      localStorage.setItem("localHighscore", JSON.stringify(local));
    }
    else {
      // console.log("local", local);
      if(local.length < 10) {
        local.push(this.score);
        local.sort((a, b) => b - a);
        // console.log("array", local);
        localStorage.setItem("localHighscore", JSON.stringify(local));
      }
      else {
        if(Math.min(...local) < this.score){
          local.splice(local.length - 1, 1, this.score);
          local.sort((a, b) => b - a);
          // console.log("array", local);
          localStorage.setItem("localHighscore", JSON.stringify(local));
        }
      }
    }
  }

  isInCenterOfViewport(randomPoint){
    return randomPoint.x > (300 + this.camWorldView.x) && randomPoint.x < (500 + this.camWorldView.x)
    && randomPoint.y > (200 + this.camWorldView.y) && randomPoint.y < (400 + this.camWorldView.y)
  }
}