let grotesk;
let firstLetter = [];
let secondLetter = [];
let particles = [];
let fontSize = 150;
let progress = 0;
let isTransforming = false;
let nextSwitchTime = 0;
let time = 0;
let bounce = 0; 
let bounceSpeed = 0.3;
let bounceAmplitude = 15; 

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

  setNextSwitch();
}

function draw() {
  background(20);

  time += 0.02; 

  if (millis() > nextSwitchTime) {
    isTransforming = !isTransforming;
    setNextSwitch();
  }

  if (isTransforming) {
    progress = min(progress + 0.06, 1);
  } else {
    progress = max(progress - 0.06, 0);
  }

  bounce = sin(progress * PI * 10) * bounceAmplitude;

  for (let p of particles) {
    p.update(progress, time, bounce);
    p.show();
  }
}

function setNextSwitch() {
  nextSwitchTime = millis() + random(1000, 3000);
}

class Particle {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x = x1;
    this.y = y1;
    this.baseSize = random(3, 6);
    this.size = this.baseSize;
    this.noiseOffset = random(1000);
  }

  update(progress, time, bounce) {
    let smoothProgress = sin(progress * HALF_PI);

    this.x = lerp(this.x1, this.x2, smoothProgress);
    this.y = lerp(this.y1, this.y2, smoothProgress);


    let waveX = sin(time + this.y * 0.02) * 3;
    let waveY = cos(time + this.x * 0.02) * 3;
    this.x += waveX;
    this.y += waveY;

    this.x += bounce;

    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 50) {
      this.size = this.baseSize * 2;
    } else {
      this.size = this.baseSize;
    }
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}
