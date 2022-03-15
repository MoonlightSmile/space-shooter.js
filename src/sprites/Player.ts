import { spriteScale } from "../main";
import { GameAnims, MainScene } from "../scene";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  speed: number = 5;
  /**
   * 键盘控制器
   */
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(scene: MainScene, x: number, y: number) {
    super(scene, x, y, "ship");
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.body.setSize(35);
    this.body.isCircle = true;

    this.play(GameAnims["ship_run"]);

    this.setScale(spriteScale / 2);

    this.cursor = this.scene.input.keyboard.createCursorKeys();
  }
  fire() {
    console.log(1);
  }
  update(...args: any[]): void {
    if (this.cursor.up.isDown) {
      this.y -= this.speed;
    }
    if (this.cursor.down.isDown) {
      this.y += this.speed;
    }
    if (this.cursor.left.isDown) {
      this.x -= this.speed;
    }
    if (this.cursor.right.isDown) {
      this.x += this.speed;
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursor.space)) {
      this.fire();
    }
  }
}
