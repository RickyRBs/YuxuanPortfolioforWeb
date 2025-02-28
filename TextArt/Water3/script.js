let textParticles = [];
let font;
let maxOffset = 15; 
let time = 0;

function preload() {
  font = loadFont('MigaeSemibold.otf');
}

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);

  let points = font.textToPoints('WATER', width / 6, height / 2, 120, {
    sampleFactor: 0.2
  });

  for (let pt of points) {
    let size = random(6, 12);
    textParticles.push(new Particle(pt.x, pt.y, size, color(0, 0, 139)));
  }
}

function draw() {
  background(240, 250, 255);

  time += 0.02;

  for (let p of textParticles) {
    p.update();
    p.show();
  }
}

class Particle {
  constructor(x, y, size, col) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = size;
    this.col = col;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  update() {
    let d = dist(mouseX, mouseY, this.x, this.y);

    if (d < 50) {
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      this.offsetX = cos(angle) * map(d, 0, 50, maxOffset, 0);
      this.offsetY = sin(angle) * map(d, 0, 50, maxOffset, 0);
    } else {
      this.offsetX = 0;
      this.offsetY = 0;
    }

    let waveX = sin(time + this.baseY * 0.05) * 5;
    let waveY = cos(time + this.baseX * 0.05) * 5;

    this.x = this.baseX + this.offsetX + waveX;
    this.y = this.baseY + this.offsetY + waveY;
  }

  show() {
    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
