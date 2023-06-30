import Phaser from "phaser";
import Dice from "./reusables/Dice";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
    this.dice1 = new Dice(this, "dice1");
    this.resultText = undefined;
    this.result = 0;
    this.diceDisplay = undefined;
    this.diceResult = undefined;
  }

  preload() {
    this.load.image("bg", "assets/bg.jpg");
    this.load.spritesheet("dice", "assets/dice_sprites_188x188.png", {
      frameWidth: 188,
      frameHeight: 188,
    });
  }

  create() {
    const startButton = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 100,
        "Roll",
        {}
      )
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: "#111" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.rollDice())
      .on("pointerover", () => startButton.setStyle({ fill: "#f39c12" }))
      .on("pointerout", () => startButton.setStyle({ fill: "#FFF" }));

    this.resultText = this.add
      .text(200, 300, "Roll the dice", {
        fontFamily: "monospace",
      })
      .setOrigin(0.5);
  }

  update() {}

  rollDice() {
    this.result = this.dice1.roll();
    this.resultText.text = "";
    //this.resultText.text = `The result is ${this.result}`;
    this.diceDisplay = this.add
      .sprite(200, 300, "dice", this.result - 1)
      .setScale(0.3);
  }
}
