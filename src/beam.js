class Beam extends Phaser.Physics.Arcade.Sprite {
  
  duration = 2000;

  constructor(scene) {
    let x = scene.player.getRightCenter().x;
    let y = scene.player.getRightCenter().y;
    super(scene, x, y, "beam");
    
    this.player = scene.player;
    this.setRotation(this.player.rotation + Phaser.Math.DEG_TO_RAD * 90);
    this.setTexture("laserRed");
    scene.physics.world.enableBody(this);
    scene.projectiles.add(this);
    scene.add.existing(this);
    let vecAcce = scene.player.getRightCenter().subtract(scene.player.getCenter());
    this.body.setVelocity(vecAcce.x * 20, vecAcce.y * 20);
  }
  
  update() {
    if(this.scene)
      this.timeEvent();
  }

  timeEvent() {
    this.scene.time.addEvent({
      delay: this.duration,
      callback: () => {
        this.destroy();
      },
      callbackScope: this,
      loop: false
    });
  }

  laserImpact() {
    this.setTexture("laser1")
    .play('laserImpact')
    .body.setVelocity(0,0);
  }
}