let r = 255, g = 255, b = 255; 

let rectW = 70;
let rectH = 70;
let posX = 20;
let posY = 15;
let REDButton = false;

let rectW2 = 70;
let rectH2 = 70;
let posX2 = 110;
let posY2 = 15;

let GREENButton = false;

let rectW3 = 70;
let rectH3 = 70;
let posX3 = 200;
let posY3 = 15;

let BLUEButton = false;

let rectW4 = 70;
let rectH4 = 70;
let posX4 = 290;
let posY4 = 15;

let RANDOMButton = false;

let x = 0;

function setup() {
  createCanvas(600, 600);
  background(255);
  frameRate(60)
  strokeWeight(0);
}

function draw() {
  push()
if (REDButton==false){    
    fill("red");
  } else if (REDButton==true){   
    fill("red");    
  }

  rect(posX, posY, rectW, rectH, 20);

  if (GREENButton==false){    
   fill("green");
  } else if (GREENButton==true){    
    fill("green");    
 }

  rect(posX2, posY2, rectW2, rectH2, 20);

  if (BLUEButton==false){    
    fill("blue");
  } else if (BLUEButton==true){    
    fill("blue");    
 }

  rect(posX3, posY3, rectW3, rectH3, 20);
  
  if (RANDOMButton==false){    
    fill("yellow");
  } else if (RANDOMButton==true){    
    fill("yellow");    
 }

  rect(posX4, posY4, rectW4, rectH4, 20);
  
pop()
  
  
  // push()
  // if (mouseIsPressed) {
  //   fill(r,g,b);
  // } else {
  //   strokeWeight(2)
  //   noFill();
  // }
  // ellipse(mouseX, mouseY, 20, 20);
  // pop()
}




function mousePressed(){

  if (mouseX > posX - rectW  && mouseY > posY - rectH && mouseX < posX + rectW && mouseY < posY + rectH ) {    
    REDButton = !REDButton;
    x=1;
    console.log(x);
      
    if(REDButton==true){
      GREENButton=false;
      BLUEBotton=false;
    }
  }

  if (mouseX > posX2  && mouseY > posY2 - rectH2 && mouseX < posX2 + rectW2 && mouseY < posY2 + rectH2 ) {        
    GREENButton = !GREENButton;   
    x=2;
    console.log(x);
      
    if(GREENButton==true){
      REDButton=false;
      BLUEBotton=false;
      }  
  }
  
  if (mouseX > posX3  && mouseY > posY3 - rectH3 && mouseX < posX3 + rectW3 && mouseY < posY3 + rectH3 ) {        
    BLUEButton = !BLUEButton;   
    
    x=3;
    console.log(x);
      
    if(BLUEButton==true){
      REDButton=false;
      GREENButton=false;
      }  
  }
  
  if (mouseX > posX4  && mouseY > posY4 - rectH4 && mouseX < posX4 + rectW4 && mouseY < posY4 + rectH4 ) {        
    BLUEButton = !BLUEButton;   
    
    x=4;
    console.log(x);
      
    if(BLUEButton==true){
      REDButton=false;
      GREENButton=false;
      }  
  }
    r = random(255);
    g = random(255);
    b = random(255);
}



function mouseDragged(){
  fill(random(150,255), 0, 0);

  if (x == 1) {
    fill("red");
    noStroke();
    circle(mouseX, mouseY, 30);
  }

  if (x == 2) {
    fill("green");
    noStroke();
    circle(mouseX, mouseY, 30);
  }
  
  if (x == 3) {
    fill("blue");
    noStroke();
    circle(mouseX, mouseY, 30);
  }
  
  if (x == 4) {
    fill("yellow");
    noStroke();
    circle(mouseX, mouseY, 30);
  }
}