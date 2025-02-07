// let eyeX = 250;
// let eyeY = 292.5;
let eyeRadius = 10;
let pupilRadius = 4;
let maxDistance = eyeRadius - pupilRadius;//from interenet

function setup() {
  createCanvas(600, 900);
}

function draw() {
  background(220);
  
  push()
  stroke("black");
  strokeWeight(3);
  line(0,300,600,300);
  line(0,600,600,600);
  pop()
  
  push()
  stroke("black");
  strokeWeight(0.5);
  textSize(20);
  text("Richard",500,580);
  text("Longren",500,880);
  text("Megan",500,280);
  pop()
  
  //leg
  push()
  strokeWeight(0);
  fill(61,12,2)
  rect(245,500,30,300);
  rect(325,500,30,300);
  fill(170,56,30)
  rect(215,770,60,30);
  rect(325,770,60,30);
  
  fill("red");
  triangle(215,800,245,870,275,800);
  triangle(325,800,355,870,385,800);
  
  fill(61,12,2)
  triangle(375,550,500,620,385,675);
  pop()
  
  
  //body
  push()
  
  strokeWeight(5);
  fill(205,91,69)
  ellipse(260,275,120,250);
  fill(136,45,23);
  ellipse(260,275,80,180);
  fill(205,91,69);
  ellipse(340,275,120,250);
  fill(136,45,23);
  ellipse(340,275,80,180);
  strokeWeight(0);
  fill(55);
  rect(222.5,295,155,260,15);
  rect(200,380,200,200,15);
  rect(125,310,350,45,15);
  rect(125,320,55,200,15);
  rect(425,310,55,210,15);
  fill("gray");
  rect(125,470,55,50,0,0,15,15);
  rect(425,470,55,50,0,0,15,15);
  strokeWeight(7);
  line(152.5,500,152.5,515.5);
  line(452.5,500,452.5,515.5);
  
  
  strokeWeight(3);
  fill("white");
  circle(300,525,20);
  pop()
  
  //head
  push()

  fill(205,91,69);
  strokeWeight(0);
  ellipse(300,220,115,150);
  ellipse(300,250,150,100);
  
  
  //from here is the eye
  push()
  fill("black");
  circle(285,215,20);
  circle(315,215,20);
  // fill("white");
  // circle(280,212,7);
  // circle(310,212,7);
  fill("black");
  triangle(290,240,300,250,310,240);
  pop()
  
  push()
  stroke("brown");
  strokeWeight(3);
  line(300,250,300,260);
  line(300,260,290,265);
  line(300,260,310,265);
  
  pop()
  
  push()
  drawEye(285, 215, pupilRadius); // Left eyeball
  drawEye(315, 215, pupilRadius); // Right eyeball
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
  let pupilY = centerY + direction.y;
  
  // Draw pupil
  fill("white");
  noStroke();
  circle(pupilX, pupilY, pupilRadius * 2);
  pop()
  
  
  push()
  if (mouseIsPressed) {
    fill("red");
  } else {
    strokeWeight(2)
    noFill();
  }
  ellipse(mouseX, mouseY, 20, 20);
  pop()
}