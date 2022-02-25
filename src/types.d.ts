import { Game } from "phaser";

declare global {
  interface Window {
    g_game: Game;
  }
}

export {};
