import "./general";

const deviceWidth = window.innerWidth;

class Memes {
  constructor() {
    this.$canvas = document.querySelector("#imgCanvas");
    this.$topTextInput = document.querySelector("#topText");
    this.$bottomTextInput = document.querySelector("#bottomText");
    this.$imageInput = document.querySelector("#image");
    this.$downloadButton = document.querySelector("#downloadMeme");
    this.createCanvas();
    this.addEventListeners();
  }

  createCanvas() {
    let canvasHeight = Math.min(480, deviceWidth - 30);
    let canvasWidth = Math.min(640, deviceWidth - 30);
    this.$canvas.height = canvasHeight;
    this.$canvas.width = canvasWidth;
  }

  createMeme() {
    console.log("Created");
  }

  addEventListeners() {
    let nodes = [this.$topTextInput, this.$bottomTextInput, this.$imageInput];
    nodes.forEach((node) => node.addEventListener("keyup", this.createMeme));
    nodes.forEach((node) => node.addEventListener("change", this.createMeme));
  }
}

new Memes();
