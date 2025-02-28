let grotesk;
let firstLetter = [];
let secondLetter = [];
let particles = [];
let fontSize = 150;
let isTransforming = false;
let progress = 0;

function preload() {
  grotesk = loadFont('MigaeSemibold.otf');
}

function setup() {
  createCanvas(600, 300);
  textAlign(CENTER, CENTER);

  let x = width / 6;
  let y = height / 1.8;

  firstLetter = grotesk.textToPoints('REAL?', x, y, fontSize, {
    sampleFactor: 0.15
  });

  secondLetter = grotesk.textToPoints('FAKE!', x, y, fontSize, {
    sampleFactor: 0.15
  });

  for (let i = 0; i < max(firstLetter.length, secondLetter.length); i++) {
    let posA = firstLetter[i % firstLetter.length];
    let posB = secondLetter[i % secondLetter.length];
    particles.push(new Particle(posA.x, posA.y, posB.x, posB.y));
  }
}

function draw() {
  background(20, 20, 30);

  if (isTransforming) {
    progress = min(progress + 0.03, 1);
  } else {
    progress = max(progress - 0.03, 0);
  }

  for (let p of particles) {
    p.update(progress);
    p.show();
  }
}

function mousePressed() {
  isTransforming = !isTransforming;
}

class Particle {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x = x1;
    this.y = y1;
    this.size = random(3, 6);
    this.noiseOffset = random(1000);
    this.colorStart = color(255, 50, 50);
    this.colorEnd = color(50, 100, 255);
  }

  update(progress) {
    let smoothProgress = sin(progress * HALF_PI);

    this.x = lerp(this.x1, this.x2, smoothProgress);
    this.y = lerp(this.y1, this.y2, smoothProgress);

    let noiseX = (noise(this.noiseOffset + frameCount * 0.01) - 0.5) * 4;
    let noiseY = (noise(this.noiseOffset + frameCount * 0.02) - 0.5) * 4;
    this.x += noiseX;
    this.y += noiseY;
  }

  show() {
    let col = lerpColor(this.colorStart, this.colorEnd, sin(progress * PI));
    fill(col);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
