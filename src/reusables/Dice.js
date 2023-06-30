import Phaser from "phaser";

export default class Dice {
  constructor(scene, diceKey = "dice") {
    this.scene = scene;
    this.key = diceKey;
  }

  roll() {
    const result = Phaser.Math.Between(1, 6);
    return result;
  }
}
