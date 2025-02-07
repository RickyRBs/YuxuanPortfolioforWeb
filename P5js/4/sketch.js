let stars = [];
let clouds = [];

function setup() {
  createCanvas(800, 800); 
  angleMode(DEGREES);

  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      brightness: random(150, 255),
    });
  }

  for (let i = 0; i < 10; i++) {
    clouds.push({
      x: random(-200, width + 200),
      y: random(height / 8, height / 3),
      size: random(100, 200),
      opacity: 255
    });
  }
}

function draw() {
  let hr = hour();
  let isDayTime = hr >= 6 && hr < 18;

  if (isDayTime) {
    background(135, 206, 250);
    drawClouds();
  } else {
    background(0);
    drawStars();
  }

  translate(width / 2, height / 2);
  rotate(-90);

  let min = minute();
  let sec = second();
  let hrMod = hr % 12;

  
  
  for (let i = 0; i < 10; i++) {
    stroke(255, 200, 100, 150 - i * 15);
    strokeWeight(4 - i * 0.3);
    ellipse(0, 0, 40 + i * 5, 40 + i * 5); 
  }
  
  // push();
  // rotate(90);
  // fill(0);
  // textAlign(CENTER, CENTER);
  // textSize(28);
  // let currentTime = nf(hr, 2) + ':' + nf(min, 2);
  // text(currentTime, 0, 0);
  // pop();
  
  for (let i = 0; i < 360; i += 30) { 
    strokeWeight(10);
    let x1 = cos(i) * 280;
    let y1 = sin(i) * 280;
    let x2 = cos(i) * 290;
    let y2 = sin(i) * 290;
    stroke(0,191,255); 
    line(x1, y1, x2, y2);
  }

  stroke(0,191,255); 
  strokeWeight(2);
  for (let i = 0; i < 360; i += 6) { 
    let x1 = cos(i) * 260;
    let y1 = sin(i) * 260;
    let x2 = cos(i) * 250;
    let y2 = sin(i) * 250;
    line(x1, y1, x2, y2);
  }

  strokeWeight(12);
  noFill();

  let secondAngle = map(sec, 0, 60, 0, 360);
  stroke("gray"); 
  arc(0, 0, 460, 460, 0, secondAngle);
  push();
  rotate(secondAngle);
  fill("gray");
  noStroke();
  ellipse(150, 0, 20, 20); 
  pop();

  let minuteAngle = map(min, 0, 60, 0, 360);
  stroke("blue");
  arc(0, 0, 420, 420, 0, minuteAngle);
  push();
  rotate(minuteAngle);
  fill("blue");
  noStroke();
  ellipse(120, 0, 30, 30); 
  pop();

  let hourAngle = map(hrMod, 0, 12, 0, 360);
  stroke("red");
  arc(0, 0, 380, 380, 0, hourAngle);
  push();
  rotate(hourAngle);
  fill("red");
  noStroke();
  ellipse(90, 0, 40, 40); 
  pop();

  // fill(255, 255, 150); // 修改中心点颜色地点
  // noStroke();
  // ellipse(0, 0, 15, 15);
}

function drawClouds() {
  for (let i = 0; i < clouds.length; i++) {
    let cloud = clouds[i];
    fill(255, 255, 255);
    noStroke();
    ellipse(cloud.x, cloud.y, cloud.size, cloud.size / 2);
    ellipse(cloud.x - cloud.size / 3, cloud.y, cloud.size / 1.5, cloud.size / 3);
    ellipse(cloud.x + cloud.size / 3, cloud.y, cloud.size / 1.5, cloud.size / 3);
  }
}

function drawStars() {
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    stroke(star.brightness);
    strokeWeight(star.size);
    point(star.x, star.y);
  }
}
