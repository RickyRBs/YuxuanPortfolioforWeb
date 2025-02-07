let data;
let colors;
let waveHeight = [];
let waveSpeed = 0.01;

function setup() {
  createCanvas(1000, 1000);
  noStroke();

  data = [
    {day: '10.14', materials: [40, 47950, 89]},
    {day: '10.15', materials: [33, 41500, 81]},
    {day: '10.16', materials: [32, 45850, 86]},
    {day: '10.17', materials: [31, 42000, 83]},
    {day: '10.18', materials: [35, 43000, 87]},
    {day: '10.19', materials: [34, 43565, 83]},
    {day: '10.20', materials: [38, 48050, 85]},
  ];

  colors = ['#FF5733', '#33FF57', '#3357FF'];

  for (let i = 0; i < data.length; i++) {
    let heights = [];
    for (let j = 0; j < data[i].materials.length; j++) {
      heights.push(map(data[i].materials[j], 31, 46000, 50, 300));
    }
    waveHeight.push(heights);
  }
}

function draw() {
  background(0);

  let baseHeight = height / 2;
  let totalWidth = (data.length - 1) * 130;
  let startX = (width - totalWidth) / 2;

  for (let i = 0; i < data.length; i++) {
    let xOffset = startX + i * 130;
    for (let j = 0; j < 3; j++) {
      let waveY = baseHeight + waveHeight[i][j] * sin((frameCount * waveSpeed) + i + j);
      fill(colors[j]);
      ellipse(xOffset, waveY, 40, 40);
    }
  }
}
