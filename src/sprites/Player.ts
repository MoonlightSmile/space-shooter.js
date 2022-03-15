import { spriteScale } from "../main";
import { GameAnims, MainScene } from "../scene";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  speed: number = 5;
  /**
   * 键盘控制器
   */
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  skin?: Phaser.GameObjects.Sprite;
  constructor(scene: MainScene, x: number, y: number) {
    super(scene, x, y, "ship");
    scene.add.existing(this);

    scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);
    this.body.setSize(35);
    this.body.isCircle = true;

    this.play(GameAnims["ship_run"]);

    this.setScale(spriteScale / 2);

    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.setSkin();
  }
  fire() {
    this.scene.sound.play("Laser_002", {
      volume: 0.1,
    });
    const bolts = this.scene.physics.add
      .sprite(this.x, this.y - (12 + 20), "ship")
      .setScale(spriteScale)
      .setFrame(18);

    bolts.body.setSize(10);
    bolts.body.isCircle = true;
    (this.scene as MainScene).boltsGroup.add(bolts);
  }
  setSkin() {
    this.skin = this.scene.add.sprite(this.x, this.y, "ship");
    this.skin.setFrame(30);
  }
  skinFollowPlayer() {
    this.skin?.setPosition(this.x, this.y);
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
    this.skinFollowPlayer();
  }
}
