import Phaser from "phaser";

export default class Dice {
  constructor(scene, diceKey = "dice", repeat) {
    this.scene = scene;
    this.key = diceKey;
    this.repeat = repeat;

    this.diceArray = [];
    for (let i = 0; i < repeat; i++) {
      this.diceArray.push({
        key: `dice${i}`,
        value: undefined,
        keep: false,
      });
    }
  }

  roll() {
    this.diceArray.forEach((dice) => {
      if (dice.keep === false) {
        dice.value = Phaser.Math.Between(1, 6);
      }
    });

    return this.diceArray;
  }

  keepDice(sprite) {
    const selectedDice = this.diceArray.find(
      (dice) => dice.key === sprite.name
    );
    selectedDice.keep = !selectedDice.keep;
    return selectedDice;
  }
}
