import { GameAnims } from "../scene";
const speedMap = {
  "enemy-small": 4,
  "enemy-medium": 3,
  "enemy-big": 2,
};
export type TEnemy = "enemy-small" | "enemy-medium" | "enemy-big";
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  speed = 3;
  constructor(scene: Phaser.Scene, x: number, y: number, name: TEnemy) {
    super(scene, x, y, name);
    this.speed = speedMap[name];
    scene.add.existing(this);
    this.setScale(2);
    const animsName = `${name}_run` as GameAnims;
    this.play(GameAnims[animsName]);
  }
  destroySelf() {
    if (this.y > this.scene.scale.height) {
      this.destroy();
    }
  }
  update(time: number, delta: number): void {
    this.y += this.speed;
    this.destroySelf();
  }
}
