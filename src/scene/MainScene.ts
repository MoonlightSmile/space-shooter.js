import Phaser from "phaser";

import { GameAnims } from ".";

export default class MainScene extends Phaser.Scene {
  /**
   * 移动速度
   */
  public speed = 5;
  /**
   * 子弹速度
   */
  public bulletSpeed = 10;
  /**
   * 背景地板
   */
  private bg!: Phaser.GameObjects.TileSprite;
  /**
   * 角色
   */
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  /**
   * 怪物-small
   */
  private enemySmall!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  /**
   * 怪物-medium
   */
  private enemyMedium!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  /**
   * 怪物-big
   */
  private enemyBig!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  /**
   * 键盘控制器
   */
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  /**
   * 子弹组
   */
  private boltsGroup!: Phaser.Physics.Arcade.Group;
  /**
   * 怪物组
   */
  private enemyGroup!: Phaser.Physics.Arcade.Group;

  constructor() {
    super({ key: "MainScene" });
  }
  create() {
    this.sound.play("music", {
      loop: true,
      volume: 0.2,
    });
    this.boltsGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();

    this.bg = this.add
      .tileSprite(0, 0, 256, 608, "desert-background")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setOrigin(0);

    this.player = this.physics.add
      .sprite(this.scale.width / 2, this.scale.height - 32, "ship")
      .setAlpha(0)
      .setCollideWorldBounds()
      .setScale(2)
      .play(GameAnims["ship_run"]);
    this.player.body.enable = false;

    this.tweens.add({
      targets: this.player,
      y: "-=60",
      alpha: 1,
      onComplete: () => {
        this.player.body.enable = true;
      },
    });
    this.enemySmall = this.physics.add
      .sprite(200, 500, "enemy-small")
      .setScale(2)
      .play(GameAnims["enemy-small_run"]);
    this.enemyMedium = this.physics.add
      .sprite(200, 30, "enemy-medium")
      .setScale(2)
      .play(GameAnims["enemy-medium_run"]);
    this.enemyBig = this.physics.add
      .sprite(200, 100, "enemy-big")

      .setScale(2)
      .play(GameAnims["enemy-big_run"]);
    this.physics.collide(this.player, this.enemySmall);
    this.physics.collide(this.boltsGroup, this.enemySmall);
    this.cursor = this.input.keyboard.createCursorKeys();
    this.enemyGroup.add(this.enemySmall);
    this.enemyGroup.add(this.enemyMedium);
    this.enemyGroup.add(this.enemyBig);
    this.physics.add.overlap(this.boltsGroup, this.enemyGroup, (b, e) => {
      b.destroy();
      e.body.enable = false;
      this.anims.play({ key: "explosion_run" }, e);
      this.sound.play("Explode1");
      e.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        e.destroy();
      });
    });
    this.physics.add.overlap(this.player, this.enemyGroup, (b) => {
      this.anims.play({ key: "explosion_run" }, b);
      this.sound.play("Explode1");
      b.body.enable = false;
      b.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.player.setAlpha(0);
        this.player.setX(this.scale.width / 2);
        this.player.setY(this.scale.height - 32);
        this.anims.play({ key: "ship_run" }, b);
        this.player.setAlpha(1);

        const destroy = this.tweens.add({
          targets: this.player,
          y: "-=60",
          duration: 400,
          alpha: {
            from: 1,
            to: 0,
          },
          onComplete: () => {
            b.body.enable = true;
            this.player.setAlpha(1);
            destroy.remove();
          },
        });
      });
    });
  }
  shooter() {
    console.log("shooter");
    this.sound.play("Laser_002");
    this.boltsGroup.add(
      this.add
        .sprite(this.player.x, this.player.y - (12 + 20), "laser-bolts")
        .setScale(2)
        .play(GameAnims["bolts1_run"])
    );
  }
  checkBolts() {
    this.boltsGroup.children.each((_bolt) => {
      const bolt = _bolt as Phaser.Physics.Arcade.Sprite;
      if (bolt.y < 0) {
        bolt.destroy();
      } else {
        bolt.y -= this.bulletSpeed;
      }
    });
  }
  update() {
    this.bg.tilePositionY -= 1;
    if (this.cursor.up.isDown) {
      this.player.y -= this.speed;
    }
    if (this.cursor.down.isDown) {
      this.player.y += this.speed;
    }
    if (this.cursor.left.isDown) {
      this.player.x -= this.speed;
    }
    if (this.cursor.right.isDown) {
      this.player.x += this.speed;
    }
    if (this.cursor.space.isDown) {
      if (this.cursor.space.duration <= 0) {
        this.shooter();
      }
      this.cursor.space.duration = this.cursor.space.getDuration();
    }
    this.checkBolts();
  }
}
