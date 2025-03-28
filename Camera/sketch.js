let capture;
let tracker;
let positions;

let classifier;
let thumbLabel = "good";

let gridSize = 20;
let fracturingFactor = 1.0;
let smileThreshold = 45;

function preload(){
  // 加载你训练好的模型（注意：URL 后面需要添加 model.json）
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0zWn0RcAC/model.json');
}

function setup() {
  createCanvas(600, 400);

  // 初始化摄像头
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();

  // 初始化 clmtrackr 用于人脸检测（仅用于调整碎裂效果）
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  background(0);
  
  // 获取当前人脸特征点数据，用于更新碎裂效果
  positions = tracker.getCurrentPosition();
  if (positions && positions.length >= 32) {
    let mouthLeft = createVector(positions[44][0], positions[44][1]);
    let mouthRight = createVector(positions[50][0], positions[50][1]);
    let smileDistance = mouthLeft.dist(mouthRight);
    
    if (smileDistance > smileThreshold) {
      fracturingFactor -= 0.05;
    } else {
      fracturingFactor += 0.05;
    }
    fracturingFactor = constrain(fracturingFactor, 0, 1);
  }
  
  // 将摄像头图像填满整个画布
  image(capture, 0, 0, width, height);
  
  // 在摄像头图像上绘制碎裂效果
  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      let imgBlock = capture.get(x, y, gridSize, gridSize);
      let offsetX = random(-10 * fracturingFactor, 10 * fracturingFactor);
      let offsetY = random(-10 * fracturingFactor, 10 * fracturingFactor);
      let angle = random(-PI / 8 * fracturingFactor, PI / 8 * fracturingFactor);
      
      push();
      translate(x + gridSize/2 + offsetX, y + gridSize/2 + offsetY);
      rotate(angle);
      imageMode(CENTER);
      image(imgBlock, 0, 0, gridSize, gridSize);
      pop();
    }
  }
  
  // 如果大拇指识别结果为 "bad"，则应用灰度滤镜使画面失去颜色
  if (thumbLabel === "bad") {
    filter(GRAY);
  }
  
  // 使用分类器检测当前帧大拇指手势
  classifier.classify(capture, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // 假设你的模型返回的 label 为 "good" 或 "bad"
  thumbLabel = results[0].label;
}