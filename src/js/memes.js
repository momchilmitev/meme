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
    let context = this.$canvas.getContext("2d");

    if (this.$imageInput.files && this.$imageInput.files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        let image = new Image();

        image.onload = () => {
          this.$canvas.height = image.height;
          this.$canvas.width = image.width;
          context.clearRect(0, 0, this.$canvas.height, this.$canvas.width);
          context.drawImage(image, 0, 0);
        };

        image.src = reader.result;
      };

      reader.readAsDataURL(this.$imageInput.files[0]);
      console.log("This will get printed first");
    }
  }

  addEventListeners() {
    this.createMeme = this.createMeme.bind(this);
    let nodes = [this.$topTextInput, this.$bottomTextInput, this.$imageInput];
    nodes.forEach((node) => node.addEventListener("keyup", this.createMeme));
    nodes.forEach((node) => node.addEventListener("change", this.createMeme));
  }
}

new Memes();
