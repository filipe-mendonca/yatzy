import Phaser from "phaser";
import Dice from "./reusables/Dice";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
    this.dice = new Dice(this, "dice", 5);
    this.resultText = undefined;
    this.diceContainer = undefined;
    this.diceArray = undefined;
  }

  preload() {
    this.load.image("bg", "assets/bg.jpg");
    this.load.spritesheet("dice", "assets/dice_sprites_188x188.png", {
      frameWidth: 188,
      frameHeight: 188,
    });
  }

  create() {
    this.add.image(200, 300, "bg");

    const startButton = this.add
      .text(200, 550, "Roll", {})
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: "#111" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.rollDice())
      .on("pointerover", () => startButton.setStyle({ fill: "#f39c12" }))
      .on("pointerout", () => startButton.setStyle({ fill: "#FFF" }));

    this.resultText = this.add
      .text(200, 475, "Roll the dice", {
        fontFamily: "monospace",
      })
      .setOrigin(0.5);

    this.diceContainer = this.add.container();

    this.input.on("gameobjectdown", (pointer, gameObject) => {
      if (gameObject.name.includes("dice")) {
        const diceKept = this.dice.keepDice(gameObject);
        if (diceKept.keep) {
          gameObject.setTexture("dice", diceKept.value + 5);
        } else {
          gameObject.setTexture("dice", diceKept.value - 1);
        }
      }
    });
  }

  rollDice() {
    this.resultText.text = "";

    this.diceArray = this.dice.roll();

    for (let i = 0; i < 5; i++) {
      this.diceContainer.add(
        this.add
          .sprite(
            60 + 70 * i,
            475,
            "dice",
            this.diceArray[i].keep
              ? this.diceArray[i]["value"] + 5
              : this.diceArray[i]["value"] - 1
          )
          .setScale(0.3)
          .setName(`dice${i}`)
          .setState(this.diceArray[i]["keep"] ? "keep" : "roll")
          .setInteractive({ useHandCursor: true })
      );
    }

    this.diceContainer.removeAll();
  }
}
