export { default as MainScene } from "./MainScene";
export { default as Preload } from "./Preload";
export enum Resource {
  // audio
  "spaceship shooter .mp3" = "spaceship shooter .mp3",
  "spaceship shooter .ogg" = "spaceship shooter .ogg",
  "spaceship shooter .wav" = "spaceship shooter .wav",
  // background
  "clouds-transparent.png" = "clouds-transparent.png",
  "clouds.png" = "clouds.png",
  "desert-background.png" = "desert-background.png",
  // spritesheet
  "enemy-big.png" = "enemy-big.png",
  "enemy-medium.png" = "enemy-medium.png",
  "enemy-small.png" = "enemy-small.png",
  "explosion.png" = "explosion.png",
  "laser-bolts.png" = "laser-bolts.png",
  "power-up.png" = "power-up.png",
  "ship.png" = "ship.png",
}
export enum GameAnims {
  "ship_run" = "ship_run",
  "enemy-small_run" = "enemy-small_run",
  "enemy-medium_run" = "enemy-medium_run",
  "enemy-big_run" = "enemy-big_run",
  "bolts1_run" = "bolts1_run",
  "bolts2_run" = "bolts2_run",
  "explosion_run" = "explosion_run",
}
export const modules: Record<
  string,
  {
    key: string;
    url: string;
    frame?: { frameWidth: number; frameHeight: number };
  }[]
> = {
  audio: [
    { key: "Explode1", url: "Explode1.wav" },
    { key: "Hit_Hurt2", url: "Hit_Hurt2.wav" },
    { key: "Jump1", url: "Jump1.wav" },
    { key: "Laser_002", url: "Laser_002.wav" },
    { key: "music", url: "music.wav" },
  ],
  sprites: [
    {
      key: "enemy-big",
      url: "enemy-big.bmp",
      frame: {
        frameWidth: 32,
        frameHeight: 32,
      },
    },
    {
      key: "enemy-medium",
      url: "enemy-medium.bmp",
      frame: {
        frameWidth: 32,
        frameHeight: 16,
      },
    },
    {
      key: "enemy-small",
      url: "enemy-small.bmp",
      frame: {
        frameWidth: 16,
        frameHeight: 16,
      },
    },
    {
      key: "explosion",
      url: "explosion.bmp",
      frame: {
        frameWidth: 16,
        frameHeight: 16,
      },
    },
    {
      key: "laser-bolts",
      url: "laser-bolts.bmp",
      frame: {
        frameWidth: 16,
        frameHeight: 16,
      },
    },
    {
      key: "pixelspritefont32",
      url: "pixelspritefont32.bmp",
      frame: {
        frameWidth: 16,
        frameHeight: 24,
      },
    },
    {
      key: "ship",
      url: "space-shooter.png",
      frame: {
        frameWidth: 114,
        frameHeight: 109,
      },
    },
  ],
  image: [
    {
      key: "desert-background",
      url: "desert-background.png",
    },
  ],
};
