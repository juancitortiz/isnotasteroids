class Player extends Phaser.Physics.Arcade.Sprite {
  
  rotationSpeed = 200;
  health = 5;

  constructor(scene, x, y) {
    super(scene, x, y, "player");

    this.setTexture("redShip");
    this.cursorKeys = scene.input.keyboard.createCursorKeys();
    this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.speed = 500;

    this.laserSound = scene.sound.add("laserSound");
    this.explosionSound = scene.sound.add("explosionSound");
    this.damageSounds = [scene.sound.add("lightHitSound"), scene.sound.add("metalHitSound")];
    
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    scene.physics.add.existing(this);
  }
  
  preload(){

  }
  create(){
    
  }

  update(){
    if(this.body) {
      this.body.velocity.x *= 0.99;
      this.body.velocity.y *= 0.99;
      this.body.angularVelocity *= 0.7;

      if(this.cursorKeys)
        this.handlePlayerMovement();

      this.on('animationcomplete', (a) => {
        if(a.key === 'shipImpact')
          this.setTexture("redShip");
      })
    }
  }

  handlePlayerMovement() {
    if(this.cursorKeys.left.isDown) {
      this.setAngularVelocity(-this.rotationSpeed);
    }
    if(this.cursorKeys.right.isDown) {
      this.setAngularVelocity(this.rotationSpeed);
    }
    if(this.cursorKeys.up.isDown) {
      this.scene.physics.velocityFromRotation(
        this.rotation,
        this.speed,
        this.body.velocity);
    }
    if(this.cursorKeys.down.isDown) {
      this.scene.physics.velocityFromRotation(
        this.rotation,
        -(this.speed / 2),
        this.body.velocity);
    }
    if(Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      let beam = new Beam(this.scene).setInteractive();
      this.laserSound.play();
    }
  }

  damage(scene) {
    if(this.health > 0)
      this.health -= 1;
    scene.updateLives();    
    if(this.health <= 1) {
      this.health -= 1;
      scene.updateLives();
      this.setTexture("explosion1")
      .play("shipExplosion");
      this.explosionSound.play();
      this.scene.time.addEvent({
        delay: 1000,
        callback: () => {
          this.destroy();
          scene.displayGameOver();
        },
        callbackScope: this,
        loop: false
      })
      
      return;
    }
    else {
      let index = Phaser.Math.Between(0,1);
      this.play("shipImpact");
      this.damageSounds[index].play();
    }
  }

}