let textParticles = [];
let font;
let time = 0; 
let bgColor, textColor;
let colorPairs = [
  [0, 255, 255, 255, 0, 0],
  [255, 255, 0, 0, 0, 255], 
  [0, 0, 0, 255, 255, 255],
  [255, 255, 255, 0, 0, 0], 
  [128, 0, 128, 255, 165, 0]
];

function preload() {
  font = loadFont('MigaeSemibold.otf');
}

function setup() {
  createCanvas(700, 400);
  textAlign(CENTER, CENTER);
  setRandomColors();
  generateTextParticles();
}

function draw() {
  background(bgColor);
  time += 0.02;

  for (let p of textParticles) {
    p.update();
    p.show();
  }
}

function mousePressed() {
  setRandomColors();
}

function setRandomColors() {
  let pair = random(colorPairs);
  bgColor = color(pair[0], pair[1], pair[2]);
  textColor = color(pair[3], pair[4], pair[5]);

  for (let p of textParticles) {
    p.col = textColor;
  }
}

function generateTextParticles() {
  textParticles = [];
  let points = font.textToPoints('REAL?', width / 5, height / 1.8, 180, { 
    sampleFactor: 0.15
  });

  for (let pt of points) {
    let size = random(3, 6);
    let phase = random(TWO_PI);
    textParticles.push(new Particle(pt.x, pt.y, size, textColor, phase));
  }
}

class Particle {
  constructor(x, y, size, col, phase) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = size;
    this.col = col;
    this.phase = phase;
  }

  update() {
    let waveX = sin(time + this.baseY * 0.04 + this.phase) * 3;
    let waveY = cos(time + this.baseX * 0.04 + this.phase) * 3;

    this.x = this.baseX + waveX;
    this.y = this.baseY + waveY;
  }

  show() {
    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
