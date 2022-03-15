import { spriteScale } from "../main";
import { GameAnims, MainScene } from "../scene";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  speed: number = 5;
  /**
   * 键盘控制器
   */
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  private skins: Phaser.GameObjects.Group;
  constructor(scene: MainScene, x: number, y: number) {
    super(scene, x, y, "ship");
    scene.add.existing(this);

    scene.physics.world.enable(this);
    this.skins = scene.add.group();
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
    const bolts = [
      this.x,
      this.x - 20,
      this.x - 40,
      this.x + 20,
      this.x + 40,
    ].map((x) => {
      const bolt = this.scene.physics.add
        .sprite(x, this.y - (12 + 20), "ship")
        .setScale(spriteScale)
        .setFrame(18);

      bolt.body.setSize(10);
      bolt.body.isCircle = true;
      return bolt;
    });

    (this.scene as MainScene).boltsGroup.addMultiple(bolts);
  }
  setSkin() {
    const skins = [28, 29, 30].map((frame) =>
      this.scene.add.sprite(this.x, this.y, "ship").setFrame(frame)
    );
    this.skins.addMultiple(skins);
  }
  skinFollowPlayer() {
    this.skins.children.each((e) =>
      (e as Phaser.GameObjects.Sprite).setPosition(this.x, this.y)
    );
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
