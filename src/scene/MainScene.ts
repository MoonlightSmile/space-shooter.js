import Phaser from "phaser";
import Bullet from "../sprites/Bullet";
import Enemy, { TEnemy } from "../sprites/Enemy";
import Player from "../sprites/Player";

export default class MainScene extends Phaser.Scene {
  /**
   * 积分数量
   */
  coins: number = 0;
  /**
   * 积分显示游戏对象
   */
  coinsText!: Phaser.GameObjects.DynamicBitmapText;
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
  public player!: Player;

  /**
   * 玩家子弹组
   */
  public boltsGroup!: Phaser.Physics.Arcade.Group;
  /**
   * 怪物子弹组
   */
  public enemyBoltsGroup!: Phaser.Physics.Arcade.Group;
  /**
   * 怪物组
   */
  private enemyGroup!: Phaser.Physics.Arcade.Group;

  constructor() {
    super({ key: "MainScene" });
  }
  create() {
    this.boltsGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group({
      runChildUpdate: true,
    });
    this.enemyBoltsGroup = this.physics.add.group({
      runChildUpdate: true,
    });
    this.sound.play("music", {
      loop: true,
      volume: 0.2,
    });

    this.coinsText = this.add
      .dynamicBitmapText(16, 16, "Minecraft", `Coins: ${this.coins}`)
      .setDepth(9)
      .setScale(1);

    this.bg = this.add
      .tileSprite(0, 0, 256, 608, "desert-background")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setOrigin(0);

    this.player = new Player(
      this,
      this.scale.width / 2,
      this.scale.height - 32
    );

    this.physics.add.overlap(this.boltsGroup, this.enemyGroup, (b, e) => {
      b.destroy();
      e.body.enable = false;
      this.anims.play({ key: "explosion_run" }, e);
      this.sound.play("Explode1", {
        volume: 0.1,
      });
      e.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        e.destroy();
        this.coinsText.text = `Coins: ${(this.coins += 1)}`;
      });
    });
    this.physics.add.overlap(
      this.player,
      this.enemyBoltsGroup,
      this.playerDestroyed.bind(this)
    );
    this.physics.add.overlap(
      this.player,
      this.enemyGroup,
      this.playerDestroyed.bind(this)
    );
  }
  playerDestroyed(b: any, c: any) {
    console.log(c);
    if (c instanceof Bullet) {
      c.destroy();
    }
    this.coinsText.text = `Coins: ${(this.coins = 0)}`;

    this.anims.play({ key: "explosion_run" }, b);
    this.sound.play("Explode1", {
      volume: 0.1,
    });
    b.body.enable = false;
    b.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.player.setAlpha(0);
      this.player.setX(this.scale.width / 2);
      this.player.setY(this.scale.height - 32);
      this.anims.play({ key: "ship_run" }, b);
      this.player.setAlpha(1);
      const timeline = this.tweens.createTimeline();
      timeline.add({
        targets: this.player,
        y: "-=60",
        duration: 300,
      });
      timeline.add({
        targets: this.player,
        alpha: { from: 1, to: 0 },
        repeat: 5,
        duration: 300,
        yoyo: true,
        onComplete: () => {
          timeline.destroy();
          b.body.enable = true;
          this.player.setAlpha(1);
        },
      });
      timeline.play();
    });
  }
  generateEnemy() {
    const name: TEnemy = Phaser.Math.RND.pick([
      "enemy-small",
      "enemy-medium",
      "enemy-big",
    ]);
    this.enemyGroup.add(
      new Enemy(
        this,
        Phaser.Math.RND.between(0 + 16, this.scale.width - 16),
        0,
        name
      )
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
  update(time: number, delta: number) {
    this.bg.tilePositionY -= 1;
    this.player.update();
    this.checkBolts();

    if (this.enemyGroup.children.entries.length < 6) {
      this.generateEnemy();
    }
  }
}
