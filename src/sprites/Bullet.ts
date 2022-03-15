import { spriteScale } from "../main";
import { GameAnims, MainScene } from "../scene";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  constructor(scene: MainScene, x: number, y: number, speed: number) {
    super(scene, x, y, "laser-bolts");
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.body.setSize(8);
    this.body.isCircle = true;
    this.setScale(spriteScale);
    this.speed = speed;
    this.play(GameAnims["bolts2_run"]);
  }

  update() {
    this.y += this.speed;
    if (this.y > this.scene.scale.height) {
      this.destroy();
    }
  }
}
