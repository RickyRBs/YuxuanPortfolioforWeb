let angle = 90
let x = 0
let y = 350

function setup() {
  createCanvas(800,600);
  rectMode(CENTER);
  angleMode(RADIANS)
  blendMode(BLEND)
}

function draw() {
  background(225);
  

    push();//road
      
      fill('green');
      strokeWeight(0);
      rect(400,100,800,175);
  
      fill('gray')
      strokeWeight(0);
      rect(400,100,800,130)
          
      fill('white')
      strokeWeight(0);
      rect(30,100,60,15)    
          
      fill('white')
      strokeWeight(0);
      rect(120,100,60,15)    
  
      fill('white')
      strokeWeight(0);
      rect(210,100,60,15)    
          
      fill('white')
      strokeWeight(0);
      rect(300,100,60,15)    
      
      fill('white')
      strokeWeight(0);
      rect(390,100,60,15)    
  
      fill('white')
      strokeWeight(0);
      rect(480,100,60,15)   
  
      fill('white')
      strokeWeight(0);
      rect(570,100,60,15)   
  
      fill('white')
      strokeWeight(0);
      rect(660,100,60,15)    
  
      fill('white')
      strokeWeight(0);
      rect(750,100,60,15)   
  
    pop();
  
     push();//skateboard topview 
      
        fill('blue');
        strokeWeight(0);
        rect(x + 200,100,200,65,140);

        strokeWeight(0);     
        fill('darkblue')
        arc(x + 130,100,65,65,HALF_PI,HALF_PI + PI);

        strokeWeight(0);     
        fill('darkblue');
        arc(x + 270,100,65,65,HALF_PI + PI,HALF_PI);

        fill('black');
        circle(x + 140,90,7);

        fill('black');
        circle(x + 140,110,7);

        fill('black');        
        circle(x + 260,90,7);

        fill('black');
        circle(x + 260,110,7);
  pop();
 
    push()
  //The following code was found from p5.js reference page, put after modify
      x += 5;
    if (x > width + 25) {
      x = -350;
}

    describe('circle moving to the right');


  function mousePressed() {
    // Start/stop the animation loop
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
}

  function keyPressed() {
    // Draw one frame
    redraw();
}
  pop()
  
  
//bottom view

  //street scence
    push();//tree
      
      blendMode(BLEND)
  
      fill('brown')
      strokeWeight(0)
      rect(720 - 220 + y,455,30,80)
      
      fill('green')
      strokeWeight(0)
      triangle(675 - 220 + y,435,720 - 220 + y,345,765 - 220 + y,435)
  
      fill('green')
      strokeWeight(0)
      triangle(680 - 220 + y,395,720 - 220 + y,325,760 - 220 + y,395)
  
      fill('green')
      strokeWeight(0)
      triangle(690 - 220 + y,360,720 - 220 + y,295,750 - 220 + y,360)
  
      fill('brown')
      strokeWeight(0)
      rect(720 + y,455,30,80)
      
      fill('green')
      strokeWeight(0)
      triangle(675 + y,435,720 + y,345,765 + y,435)
  
      fill('green')
      strokeWeight(0)
      triangle(680 + y,395,720 + y,325,760 + y,395)
  
      fill('green')
      strokeWeight(0)
      triangle(690 + y,360,720 + y,295,750 + y,360)

      fill('brown')
      strokeWeight(0)
      rect(720 - 220 - 80 + y,455,30,80)
      
      fill('green')
      strokeWeight(0)
      triangle(675 - 220 - 80 + y,435,720 - 220 - 80 + y,345,765 - 220 - 80 + y,435)
  
      fill('green')
      strokeWeight(0)
      triangle(680 - 220 - 80 + y,395,720 - 220 - 80 + y,325,760 - 220 - 80 + y,395)
  
      fill('green')
      strokeWeight(0)
      triangle(690 - 220 - 80 + y,360,720 - 220 - 80 + y,295,750 - 220 - 80 + y,360)
  
      fill('brown')
      strokeWeight(0)
      rect(720 - 263 + y,455 + 30,30,40)
      
      fill('green')
      strokeWeight(0)
      triangle(675 - 263 + y,435 + 30,720 - 263 + y,345 + 30,765 - 263 + y,435 + 30)
  
      fill('green')
      strokeWeight(0)
      triangle(680 - 263 + y,395 + 30,720 - 263 + y,325 + 30,760 - 263 + y,395 + 30)
  
      fill('brown')
      strokeWeight(0)
      rect(720 - 430 + y,455,30,80)
      
      fill('green')
      strokeWeight(0)
      triangle(675 - 430 + y,435,720 - 430 + y,345,765 - 430 + y,435)
  
      fill('green')
      strokeWeight(0)
      triangle(680 - 430 + y,395,720 - 430 + y,325,760 - 430 + y,395)
  
      fill('green')
      strokeWeight(0)
      triangle(690 - 430 + y,360,720 - 430 + y,295,750 - 430 + y,360)

      fill('brown')
      strokeWeight(0)
      rect(720 - 263 - 430 + y,455 + 30,30,40)
      
      fill('green')
      strokeWeight(0)
      triangle(675 - 263 - 430 + y,435 + 30,720 - 263 - 430 + y,345 + 30,765 - 263 - 430 + y,435 + 30)
  
      fill('green')
      strokeWeight(0)
      triangle(680 - 263 - 430 + y,395 + 30,720 - 263 - 430 + y,325 + 30,760 - 263 - 430 + y,395 + 30)
//  
      fill('brown')
      strokeWeight(0)
      rect(720 - 220 - 80 - 296 + y,455,30,80)
      
      fill('green')
      strokeWeight(0)
      triangle(675 - 220 - 80 - 296 + y,435,720 - 220 - 80 - 296 + y,345,765 - 220 - 80 - 296 + y,435)
  
      fill('green')
      strokeWeight(0)
      triangle(680 - 220 - 80 - 296 + y,395,720 - 220 - 80 - 296 + y,325,760 - 220 - 80 - 296 + y,395)
  
      fill('green')
      strokeWeight(0)
      triangle(690 - 220 - 80 - 296 + y,360,720 - 220 - 80 - 296 + y,295,750 - 220 - 80 - 296 + y,360)
  
      fill('brown')
      strokeWeight(0)
      rect(720 - 263 - 296 + y,455 + 30,30,40)
      
      fill('green')
      strokeWeight(0)
      triangle(675 - 263 - 296 + y,435 + 30,720 - 263 - 296 + y,345 + 30,765 - 263 - 296 + y,435 + 30)
  
      fill('green')
      strokeWeight(0)
      triangle(680 - 263 - 296 + y,395 + 30,720 - 263 - 296 + y,325 + 30,760 - 263 - 296 + y,395 + 30)
  
      fill('brown')
      strokeWeight(0)
      rect(720 - 430 - 296 + y,455,30,80)
      
      fill('green')
      strokeWeight(0)
      triangle(675 - 430 - 296 + y,435,720 - 430 - 296 + y,345,765 - 430 - 296 + y,435)
  
      fill('green')
      strokeWeight(0)
      triangle(680 - 430 - 296 + y,395,720 - 430 - 296 + y,325,760 - 430 - 296 + y,395)
  
      fill('green')
      strokeWeight(0)
      triangle(690 - 430 - 296 + y,360,720 - 430 - 296 + y,295,750 - 430 - 296 + y,360)

      fill('brown')
      strokeWeight(0)
      rect(720 - 263 - 430 - 296 + y,455 + 30,30,40)
      
      fill('green')
      strokeWeight(0)
      triangle(675 - 263 - 430 - 296 + y,435 + 30,720 - 263 - 430 - 296 + y,345 + 30,765 - 263 - 430 - 296 + y,435 + 30)
  
      fill('green')
      strokeWeight(0)
      triangle(680 - 263 - 430 - 296 + y,395 + 30,720 - 263 - 430 - 296 + y,325 + 30,760 - 263 - 430 - 296 + y,395 + 30)

      // fill('green')
      // strokeWeight(0)
      // triangle(690 - 263 + y,360 + 30,720 - 263 + y,295 + 30,750 - 263 + y,360 + 30)
  
  
  
  
  
  
  
  
  
  
  
  
      push()
    //The following code was found from p5.js reference page, put after modify
        y += 5;
    if (y > width + 50) {
      y = -550;
}

      describe('circle moving to the right');


    function mousePressed() {
      // Start/stop the animation loop
      if (isLooping()) {
        noLoop();
      } else {
        loop();
      }
}

    function keyPressed() {
      // Draw one frame
      redraw();
}
    pop()
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
    push();//ground
      fill('gray');
      strokeWeight(0);
      rect(400,502,800,20);
  pop();
      
    push();//board body
      
      fill('#c0c0c0')
      strokeWeight(0);
      rect(520,470,10,20)
      
      fill('#c0c0c0')
      strokeWeight(0);
      rect(680,470,10,20)
  
      stroke('blue');
      noFill();

      strokeWeight(10);
      arc(500, 430, 60, 60,HALF_PI,4/HALF_PI);

      strokeWeight(10);
      line(500,460,700,460);

      strokeWeight(10);
      arc(700,430,60, 60,1/HALF_PI,HALF_PI);
      
        push();
          translate(520,480)

          fill('black');
          strokeWeight(0);
          circle(0,0,25)

          noFill();
          rotate(angle)
          stroke('white')
          strokeWeight(3)
          arc(0,0,15,15,-4/HALF_PI,-1/HALF_PI)
          
          fill('#c0c0c0');
          strokeWeight(0);
          circle(0,0,7)
      pop();
      
        push();
          translate(680,480)

          fill('black');
          strokeWeight(0);
          circle(0,0,25)

          fill('#c0c0c0');
          strokeWeight(0);
          circle(0,0,7)
          
          noFill();
          rotate(angle)
          stroke('white')
          strokeWeight(3)
          arc(0,0,15,15,HALF_PI,-4/HALF_PI)
      pop();
    angle = angle + 0.1
  pop();
  
  












}
