let textParticles = [];
let font;

function preload() {
  font = loadFont('MigaeSemibold.otf');
}

function setup() {
  createCanvas(600, 400);
  textFont(font);
  textSize(100);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  background(20);
  updateTextParticles();
}

function mousePressed() {
  generateTextParticles("FIRE", mouseX - 100, mouseY);
}

function generateTextParticles(txt, x, y) {
  let points = font.textToPoints(txt, x, y, 100, {
    sampleFactor: 0.2
  });
  for (let pt of points) {
    textParticles.push(new TextParticle(pt.x, pt.y));
  }
}

function updateTextParticles() {
  for (let i = textParticles.length - 1; i >= 0; i--) {
    textParticles[i].update();
    textParticles[i].show();
    if (textParticles[i].isFinished()) {
      textParticles.splice(i, 1);
    }
  }
}

class TextParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 255;
  }

  update() {
    this.y -= random(0.5, 1.5);
    this.alpha -= 2;
  }

  show() {
    fill(255, 100, 0, this.alpha);
    ellipse(this.x, this.y, 5, 5);
  }

  isFinished() {
    return this.alpha < 0;
  }
}
