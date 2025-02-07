//credit from hex wu for helping me with the eye tracking 
let eyeX = 250;
let eyeY = 292.5;
let eyeRadius = 40;
let pupilRadius = 20;
let maxDistance = eyeRadius - pupilRadius;//from interenet

function setup() {
  createCanvas(600, 600);
  background(255);
  rectMode(CENTER);
  strokeWeight(15);
  frameRate(24);
  
  
//   text("Click to shoot lazer",100,50)
  
}

function draw() {
  push()
  for (let i = 0; i < width; i++) {
    let r = random(255);
    fill(random(255), random(255), random(255));
    stroke(r);
    line(i, 0, i, height);
  }
  


  pop()
  textSize(50)
  text("Click to shoot lazer",100,70)
  
  push();
  // Ears
  fill(180, 175, 170);
  noStroke();
  triangle(220, 230, 260, 140, 300, 230); // Left
  triangle(300, 230, 340, 140, 380, 230); // Right
  
  fill(230, 225, 220);
  noStroke();
  triangle(240, 230, 260, 160, 290, 230); // Left ear
  triangle(310, 230, 340, 160, 360, 230); // Right ear
  
  stroke('black');
  strokeWeight(3);
  line(270, 200, 285, 230); // Left ear
  line(315, 230, 330, 200); // Right ear
  
  strokeWeight(2);
  line(265, 210, 280, 230); // Left ear
  line(320, 230, 335, 210); // Right ear
  
  // Face
  fill(230, 225, 220);
  strokeWeight(0);
  rect(300, 300, 260, 150, 150);
  
  fill(180, 175, 170);
  noStroke();
  ellipse(300, 300, 60, 60);
  pop();
  
  // Eyes
  fill("white");
  noStroke();
  circle(250, 300, 80); // Left
  circle(350, 300, 80); // Right
  
  // Eye-tracking logic//From internet
  drawEye(250, 292.5, pupilRadius); // Left eyeball
  drawEye(350, 292.5, pupilRadius); // Right eyeball
}

function drawEye(centerX, centerY, pupilRadius) {
  // Calculate the vector from the eye center to the mouse
  let direction = createVector(mouseX - centerX, mouseY - centerY);
  
  // Limit pupil movement to stay within the eye //From internet
  if (direction.mag() > maxDistance) {
    direction.setMag(maxDistance);
  }
  
  // Pupil position
  let pupilX = centerX + direction.x;
  let pupilY = centerY + direction.y + 8;
  
  // Draw pupil
  fill("black");
  noStroke();
  circle(pupilX, pupilY, pupilRadius * 2);
}


function mouseDragged(){
  fill(255,0,0);
  ellipse(mouseX,mouseY,10);
}