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
          let fontSize =
            (((this.$canvas.width + this.$canvas.height) / 2) * 4) / 100;
          const topText = this.$topTextInput.value.toUpperCase();
          const bottomText = this.$bottomTextInput.value.toUpperCase();
          context.clearRect(0, 0, this.$canvas.height, this.$canvas.width);
          context.drawImage(image, 0, 0);
          context.font = `${fontSize}pt sans-serif`;
          context.textAlign = "center";
          context.textBaseLine = "top";

          // for stroke text
          context.lineWidth = fontSize / 5;
          context.strokeStyle = "black";

          // for fill text
          context.fillStyle = "white";

          // Top Text
          context.strokeText(
            topText,
            this.$canvas.width / 2,
            this.$canvas.height * (5 / 100)
          );
          context.fillText(
            topText,
            this.$canvas.width / 2,
            this.$canvas.height * (5 / 100)
          );

          // Bottom Text
          context.strokeText(
            bottomText,
            this.$canvas.width / 2,
            this.$canvas.height * (90 / 100)
          );
          context.fillText(
            bottomText,
            this.$canvas.width / 2,
            this.$canvas.height * (90 / 100)
          );

          context.lineJoin = "round";
        };

        image.src = reader.result;
      };

      reader.readAsDataURL(this.$imageInput.files[0]);
    }
  }

  addEventListeners() {
    this.createMeme = this.createMeme.bind(this);
    let nodes = [this.$topTextInput, this.$bottomTextInput, this.$imageInput];
    nodes.forEach((node) => node.addEventListener("keyup", this.createMeme));
    nodes.forEach((node) => node.addEventListener("change", this.createMeme));
    this.$downloadButton.addEventListener(
      "click",
      this.downloadMeme.bind(this)
    );
  }

  downloadMeme() {
    if (!this.$imageInput.files[0]) {
      this.$imageInput.parentElement.classList.add("has-error");
      return;
    }

    if (this.$bottomTextInput.value === "") {
      this.$imageInput.parentElement.classList.remove("has-error");
      this.$bottomTextInput.parentElement.classList.add("has-error");
      return;
    }

    this.$imageInput.parentElement.classList.remove("has-error");
    this.$bottomTextInput.parentElement.classList.remove("has-error");

    const imageSrc = this.$canvas.toDataURL("image/png");
    let attribute = document.createAttribute("href");
    attribute.value = imageSrc.replace(
      /^data:image\/[^;]/,
      "data:application/octet-stream"
    );
    this.$downloadButton.setAttributeNode(attribute);
  }
}

new Memes();
