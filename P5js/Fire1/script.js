let fireParticles = [];
let font;

function setup() {
  createCanvas(600, 400);
  textFont('Georgia');
  textSize(100);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  background(20);

  drawGlowingText("FIRE", width / 2, height / 2);

  if (frameCount % 2 === 0) {
    for (let i = 0; i < 5; i++) {
      fireParticles.push(new FireParticle(width / 2 + random(-100, 100), height / 2 + 30));
    }
  }

  for (let i = fireParticles.length - 1; i >= 0; i--) {
    fireParticles[i].update();
    fireParticles[i].show();
    if (fireParticles[i].isFinished()) {
      fireParticles.splice(i, 1);
    }
  }
}

function drawGlowingText(txt, x, y) {
  for (let glow = 15; glow > 0; glow--) {
    let alpha = map(glow, 15, 0, 30, 180);
    fill(255, 140, 0, alpha);
    text(txt, x + random(-1, 1), y + random(-1, 1));
  }
  fill(255, 200, 0);
  text(txt, x, y);
}

class FireParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-3, -1);
    this.alpha = 255;
    this.size = random(5, 15);
  }

  update() {
    this.x += this.vx + sin(frameCount * 0.2) * 1;
    this.y += this.vy;
    this.alpha -= 4;
  }

  show() {
    fill(255, random(120, 220), 0, this.alpha);
    ellipse(this.x, this.y, this.size + random(-2, 2));
  }

  isFinished() {
    return this.alpha < 0;
  }
}