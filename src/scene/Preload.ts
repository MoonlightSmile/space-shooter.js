import { Loader, Scene } from "phaser";
import { GameAnims, modules } from ".";

export default class Preload extends Scene {
  constructor() {
    super({ key: "Preload" });
  }

  preload() {
    // 进度
    const progress = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "0%")
      .setOrigin(0.5);

    // 添加资源
    Object.entries(modules).forEach(([key, value]) => {
      this.load.setBaseURL("./assets");
      switch (key) {
        case "audio":
          value.forEach((audio) => {
            this.load.audio(audio.key, "audio/" + audio.url);
          });
          break;
        case "sprites":
          value.forEach((sprite) => {
            this.load.spritesheet(
              sprite.key,
              "sprites/" + sprite.url,
              sprite.frame
            );
          });
          break;
        case "image":
          value.forEach((image) => {
            this.load.image(image.key, "image/" + image.url);
          });
          break;
        default:
          break;
      }
    });

    this.load.on(Loader.Events.PROGRESS, (v: number) => {
      progress.setText(`${parseInt(String(v * 100))}%`);
    });
  }
  /**
   * 创建动画
   */
  createAnimations() {
    this.anims.create({
      key: GameAnims["ship_run"],
      frames: this.anims.generateFrameNumbers("ship", {}),
      repeat: -1,
      frameRate: 10,
    });
    this.anims.create({
      key: GameAnims["enemy-small_run"],
      frames: this.anims.generateFrameNumbers("enemy-small", {}),
      repeat: -1,
      frameRate: 10,
    });
    this.anims.create({
      key: GameAnims["enemy-medium_run"],
      frames: this.anims.generateFrameNumbers("enemy-medium", {}),
      repeat: -1,
      frameRate: 10,
    });
    this.anims.create({
      key: GameAnims["enemy-big_run"],
      frames: this.anims.generateFrameNumbers("enemy-big", {}),
      repeat: -1,
      frameRate: 10,
    });
    this.anims.create({
      key: GameAnims["bolts1_run"],
      frames: this.anims.generateFrameNumbers("laser-bolts", {
        frames: [2, 3],
      }),
      repeat: -1,
      frameRate: 7,
    });
    this.anims.create({
      key: GameAnims["bolts2_run"],
      frames: this.anims.generateFrameNumbers("laser-bolts", {
        frames: [0, 1],
      }),
      repeat: -1,
      frameRate: 7,
    });
    this.anims.create({
      key: GameAnims["explosion_run"],
      frames: this.anims.generateFrameNumbers("explosion", {}),
    });
  }
  create() {
    this.createAnimations();
    // 切换到 main 场景
    this.scene.start("MainScene");
  }
}
