import { GameAnims, MainScene } from "../scene";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  mainScene: MainScene;
  speed: number;
  constructor(scene: MainScene, x: number, y: number, speed: number) {
    super(scene, x, y, "laser-bolts");
    scene.add.existing(this);
    this.setScale(2);
    this.mainScene = scene;
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
