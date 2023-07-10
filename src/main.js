import Phaser from "phaser";
import Game from "./Game";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 400,
  height: 600,
  scene: [Game],
};

export default new Phaser.Game(config);
