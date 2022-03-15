import { spriteScale } from "../main";
import { GameAnims, MainScene } from "../scene";
import Bullet from "./Bullet";
const speedMap = {
  "enemy-small": 4,
  "enemy-medium": 3,
  "enemy-big": 2,
};
export type TEnemy = "enemy-small" | "enemy-medium" | "enemy-big";
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  bulletSpeed: number;
  mainScene: MainScene;
  timer: Phaser.Time.TimerEvent;
  constructor(scene: MainScene, x: number, y: number, name: TEnemy) {
    super(scene, x, y, name);
    this.mainScene = scene;
    this.speed = speedMap[name];
    this.bulletSpeed = this.speed + 2;
    scene.add.existing(this);
    this.setScale(spriteScale);
    const animsName = `${name}_run` as GameAnims;
    this.play(GameAnims[animsName]);
    this.timer = scene.time.addEvent({
      callback: this.fire.bind(this),
      loop: true,
      delay: 1000,
    });
  }
  /**
   * 怪物子弹发射
   */
  fire() {
    const bullet = new Bullet(
      this.mainScene,
      this.x,
      this.y + 8 + 4,
      this.bulletSpeed
    );

    this.mainScene.enemyBoltsGroup.add(bullet);
  }
  /**
   * 怪物超出屏幕自动毁灭
   */
  destroySelf() {
    if (this.y > this.scene.scale.height) {
      this.destroy(true);
    }
  }
  destroy(fromScene?: boolean): void {
    this.timer.destroy();
    super.destroy(fromScene);
  }
  update(time: number, delta: number): void {
    this.y += this.speed;
    this.destroySelf();
  }
}
