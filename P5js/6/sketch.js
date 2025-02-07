let angle = 0;
let speed = 0.01;
let colorOffset = 0;
let shapeMode = 0;

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(2);
}

function draw() {
  let r = map(sin(colorOffset * 0.1), -1, 1, 180, 220); 
  let g = map(cos(colorOffset * 0.1), -1, 1, 180, 220);
  let b = map(sin(colorOffset * 0.05), -1, 1, 180, 230);
  
  background(r, g, b);
  
  translate(width / 2, height / 2);
  
  let numShapes = 20;
  speed = map(mouseX, 0, width, 0.005, 0.02);

  for (let i = 0; i < numShapes; i++) {
    let radius = i * 20;
    let offsetAngle = angle + i * 0.1;
    let x = cos(offsetAngle) * radius;
    let y = sin(offsetAngle) * radius;

    let shapeSize = map(mouseY, 0, height, 20, 80);
    
    stroke(map(mouseX, 0, width, 50, 180), 100, 150, 150);
    
    for (let j = 0; j < 360; j += 45) {
      push();
      rotate(radians(j));
      
      if (shapeMode == 0) {
        ellipse(x, y, shapeSize, shapeSize);
      } else if (shapeMode == 1) {
        rect(x - shapeSize / 2, y - shapeSize / 2, shapeSize, shapeSize);
      } else if (shapeMode == 2) {
        triangle(x, y - shapeSize / 2, x - shapeSize / 2, y + shapeSize / 2, x + shapeSize / 2, y + shapeSize / 2);
      } else {
        line(x - shapeSize / 2, y - shapeSize / 2, x + shapeSize / 2, y + shapeSize / 2);
      }
      
      pop();
    }
  }
  
  angle += speed;
  colorOffset += 0.2;
}

function mousePressed() {
  shapeMode = (shapeMode + 1) % 4;
}
