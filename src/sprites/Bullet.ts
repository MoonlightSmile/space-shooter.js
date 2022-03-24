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
    const n = Phaser.Math.RND.pick([1, 2, 3])
    switch (n) {
      case 1:
        const a = this.scene.tweens.add({
          targets: this,
          y: scene.player.y,
          x: scene.player.x,
          ease: "Linear",
          duration: 2000,
          onComplete: (() => {
            this.destroy()
            a.remove()
          })
        })
        break;
      case 2:
        const b = this.scene.tweens.add({
          targets: this,
          ease: "Linear",
          duration: 2000,

          y: `+=${scene.scale.height}`,
          onComplete: () => {
            this.destroy()
            b.remove()
          }
        })
        break
      default:
        const c = this.scene.tweens.add({
          targets: this, duration: 2000,

          y: `+=${scene.scale.height}`,
          onComplete: () => {
            this.destroy()
            c.remove()
          }
        })
        break;
    }


  }


}
