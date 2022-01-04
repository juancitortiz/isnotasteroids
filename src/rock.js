class Rock extends Phaser.Physics.Arcade.Image {
  
  health = 2;
  points = 5;

  constructor(scene, x, y) {
    super(scene, x, y, "rock");

    this.setTexture("rock");
    scene.physics.world.enableBody(this);
    scene.rocks.add(this);
    scene.add.existing(this);
    scene.physics.moveToObject(this, scene.player, 40, 3000)
    this.explosionSound = scene.sound.add("explosionRockSound");
  }
  
  damage(scene) {
    if(this.health - 1 === 0) {
      this.explosionSound.play();
      scene.time.addEvent({
        delay: 1000,
        callback: () => {
          this.destroy();
          scene.score += this.points;
        },
        callbackScope: this,
        loop: false
      })
      this.destroy();
      return;
    }
    this.health -= 1;
  }
}