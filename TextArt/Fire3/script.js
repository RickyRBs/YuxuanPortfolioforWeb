let fire = [];
let font;
let fireMask;

function preload() {
  font = loadFont('MigaeSemibold.otf');
}

function setup() {
  createCanvas(600, 600);
  textFont(font);
  textSize(100);
  textAlign(CENTER, CENTER);
  noStroke();
  
  fireMask = createGraphics(width, height);
  fireMask.textFont(font);
  fireMask.textSize(100);
  fireMask.textAlign(CENTER, CENTER);
  fireMask.fill(255);
  fireMask.text("FIRE", width / 2, height / 3);
  fireMask.stroke(255, 0, 0);
  fireMask.strokeWeight(3);
  fireMask.noFill();
  fireMask.text("FIRE", width / 2, height / 3);
  
  for (let i = 0; i < width * height; i += 1) {
    fire[i] = 0;
  }
}

function draw() {
  background(0);

  for (let i = 0; i < width; i += 1) {
    fire[width * (height - 1) + i] = floor(random(180, 255));
  }

  for (let y = 0; y < height - 1; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let index0 = x + y * width;
      let index1 = (x - 1 + width) % width + ((y + 1) % height) * width;
      let index2 = x % width + ((y + 1) % height) * width;
      let index3 = (x + 1) % width + ((y + 1) % height) * width;
      let index4 = x % width + ((y + 2) % height) * width;
      
      let f1 = fire[index1];
      let f2 = fire[index2];
      let f3 = fire[index3];
      let f4 = fire[index4];
      fire[index0] = ((f1 + f2 + f3 + f4) * 15) / 61;
    }
  }

  loadPixels();
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let i = x + y * width;
      let col = fire[i];
      let ii = (x + y * width) * 4;
      
      if (fireMask.get(x, y)[0] > 200) {
        pixels[ii + 0] = col << 2;
        pixels[ii + 1] = col << 1;
        pixels[ii + 2] = col;
      }
    }
  }
  updatePixels();

  image(fireMask, 0, 0);
}
