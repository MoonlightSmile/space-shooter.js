import { Game } from "phaser";
import "./style.css";
const dpr = window.devicePixelRatio;
export const width = 800;
export const height = 600;
import { Preload, MainScene } from "./scene";

const game = new Game({
  type: Phaser.AUTO,
  scene: [Preload, MainScene],

  antialias: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width,
    height,
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
});
window.g_game = game;

