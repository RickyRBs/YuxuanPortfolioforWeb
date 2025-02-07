let playerColor, cameraColor, cameraFlashlightColor;
let playerSpeed = 0.5; 
let cellSize = 40;
let playerSize = 20;
let collectible;
let collectedCount = 0;
let maze = [];
let mazeSizeX, mazeSizeY;
let currentLevel = 0;
let gameState = "start";
let endlessMode = false;
let chaser;
let chaserSpeed = 1; 

let crawlText = `
  What is "Journalism?"
  By Robert Niles
  Prepared for McKinley Elementary School, Pasadena, Calif.

  Journalism is a form of writing that tells people about things that really happened, but that they might not have known about already.

  People who write journalism are called "journalists." They might work at newspapers, magazines, websites or for TV or radio stations.

  The most important characteristic shared by good journalists is curiosity. Good journalists love to read and want to find out as much as they can about the world around them.

  Journalism comes in several different forms:

  News
  - Breaking news: Telling about an event as it happens.
  - Feature stories: A detailed look at something interesting that's not breaking news.
  - Enterprise or Investigative stories: Stories that uncover information that few people knew.

  Opinion
  - Editorials: Unsigned articles that express a publication's opinion.
  - Columns: Signed articles that express the writer's reporting and his conclusions.
  - Reviews: Such as concert, restaurant or movie reviews.

  Online, journalism can come in the forms listed above, as well as:
  - Blogs: Online diaries kept by individuals or small groups.
  - Discussion boards: Online question and answer pages where anyone can participate.
  - Wikis: Articles that any reader can add to or change.
`;
let textY = 600; // Start text below the canvas
let bgm;

function setup() {
  createCanvas(600, 400);

  // Define colours for player and collectibles
  playerColor = color(255, 0, 0); // Red for player
  cameraColor = color(0, 255, 0); // Green for camera
  cameraFlashlightColor = color(0, 0, 255); // Blue for camera flashlight

  mazeSizeX = floor(width / cellSize);
  mazeSizeY = floor(height / cellSize);
  setupLevel();
}

function draw() {
  switch (gameState) {
    case "start":
      startScreen();
      break;
    case "play":
      background(200);
      drawMaze();
      drawCollectible();
      drawPlayer();
      handleMovement();

      if (currentLevel === 2 && chaser) {
        updateChaser();
        drawChaser();
      }

      if (collectedCount === 1 && currentLevel < 2) {
        nextLevel();
      }
      break;
    case "end":
      endScreen();
      break;
    case "scroll":
      drawScrollingText();
      break;
  }
}

function startScreen() {
  background(100, 150, 200);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("Fech and Shoot", width / 2, height / 2);
}

function setupLevel() {
  player = createVector(cellSize / 2, cellSize / 2);
  collectedCount = 0;
  chaser = null;

  if (currentLevel === 0) {
    generateConnectedMaze();
    generateAccessibleCollectible(cameraColor);
  } else if (currentLevel === 1) {
    generateConnectedMaze();
    generateAccessibleCollectible(cameraFlashlightColor);
  } else if (currentLevel === 2) {
    generateConnectedMaze();
    generateAccessibleCollectible(cameraColor);
  } else if (endlessMode) {
    generateConnectedMaze();
    generateAccessibleCollectible(cameraColor);
  }
}

function generateConnectedMaze() {
  maze = Array.from({ length: mazeSizeY }, () => Array(mazeSizeX).fill(1));
  let startX = 0;
  let startY = 0;
  maze[startY][startX] = 0;
  createPath(startX, startY);
}

function createPath(x, y) {
  const directions = shuffle([
    { x: 0, y: -2 },
    { x: 2, y: 0 },
    { x: 0, y: 2 },
    { x: -2, y: 0 }
  ]);
  for (const dir of directions) {
    let newX = x + dir.x;
    let newY = y + dir.y;
    if (newX >= 0 && newX < mazeSizeX && newY >= 0 && newY < mazeSizeY && maze[newY][newX] === 1) {
      maze[y + dir.y / 2][x + dir.x / 2] = 0;
      maze[newY][newX] = 0;
      createPath(newX, newY);
    }
  }
}

function generateAccessibleCollectible(colour) {
  let farthestCell = findFarthestCell(0, 0);
  collectible = {
    position: createVector(farthestCell.x * cellSize, farthestCell.y * cellSize),
    color: colour
  };
}

function findFarthestCell(startX, startY) {
  let queue = [{ x: startX, y: startY, dist: 0 }];
  let visited = Array.from({ length: mazeSizeY }, () => Array(mazeSizeX).fill(false));
  visited[startY][startX] = true;
  let farthest = { x: startX, y: startY, dist: 0 };

  while (queue.length > 0) {
    let cell = queue.shift();
    if (cell.dist > farthest.dist) {
      farthest = cell;
    }

    const directions = [
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 }
    ];
    for (const dir of directions) {
      let newX = cell.x + dir.x;
      let newY = cell.y + dir.y;
      if (
        newX >= 0 &&
        newY >= 0 &&
        newX < mazeSizeX &&
        newY < mazeSizeY &&
        !visited[newY][newX] &&
        maze[newY][newX] === 0
      ) {
        visited[newY][newX] = true;
        queue.push({ x: newX, y: newY, dist: cell.dist + 1 });
      }
    }
  }
  return farthest;
}

function drawMaze() {
  for (let i = 0; i < mazeSizeY; i++) {
    for (let j = 0; j < mazeSizeX; j++) {
      fill(maze[i][j] === 1 ? 150 : 255);
      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}

function drawCollectible() {
  if (collectible) {
    fill(collectible.color); // Use the specified colour
    rect(
      collectible.position.x + cellSize / 4,
      collectible.position.y + cellSize / 4,
      cellSize / 2,
      cellSize / 2
    );

    if (
      dist(player.x, player.y, collectible.position.x + cellSize / 2, collectible.position.y + cellSize / 2) <
      playerSize
    ) {
      collectible = null;
      collectedCount++;
      if (currentLevel === 2 && collectedCount === 1) {
        startChase();
      }
    }
  }
}

function drawPlayer() {
  fill(playerColor); // Draw player with colour block
  rect(player.x - playerSize / 2, player.y - playerSize / 2, playerSize, playerSize);
}

function startChase() {
  chaser = createVector(cellSize / 2, cellSize / 2);
}

function updateChaser() {
  if (chaser) {
    if (chaser.x % cellSize === cellSize / 2 && chaser.y % cellSize === cellSize / 2) {
      let direction = createVector(player.x - chaser.x, player.y - chaser.y);
      if (abs(direction.x) > abs(direction.y)) {
        direction.x = direction.x > 0 ? chaserSpeed * cellSize : -chaserSpeed * cellSize;
        direction.y = 0;
      } else {
        direction.y = direction.y > 0 ? chaserSpeed * cellSize : -chaserSpeed * cellSize;
        direction.x = 0;
      }
      let newX = chaser.x + direction.x;
      let newY = chaser.y + direction.y;

      if (!checkCollision(newX, newY)) {
        chaser.x = newX;
        chaser.y = newY;
      }
    }

    if (dist(player.x, player.y, chaser.x, chaser.y) < playerSize) {
      gameState = "end";
    }
  }
}

function drawChaser() {
  fill(0, 0, 255);
  rect(chaser.x - playerSize / 2, chaser.y - playerSize / 2, playerSize, playerSize);
}

function handleMovement() {
  let newX = player.x;
  let newY = player.y;

  if (player.x % cellSize === cellSize / 2 && player.y % cellSize === cellSize / 2) {
    if (keyIsDown(87) && !checkCollision(player.x, player.y - cellSize)) newY -= cellSize;
    else if (keyIsDown(83) && !checkCollision(player.x, player.y + cellSize)) newY += cellSize;
    else if (keyIsDown(65) && !checkCollision(player.x - cellSize, player.y)) newX -= cellSize;
    else if (keyIsDown(68) && !checkCollision(player.x + cellSize, player.y)) newX += cellSize;
  }

  player.x = newX;
  player.y = newY;
}

function checkCollision(x, y) {
  let col = floor(x / cellSize);
  let row = floor(y / cellSize);
  return row < 0 || col < 0 || row >= mazeSizeY || col >= mazeSizeX || maze[row][col] === 1;
}

function nextLevel() {
  currentLevel++;
  if (currentLevel < 3) {
    playerSpeed += 0.1;
    collectedCount = 0;
    setupLevel();
  } else {
    gameState = "end";
  }
}

function endScreen() {
  background(150, 100, 150);
  if (gameState === "scroll") {
    drawScrollingText();
  } else {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("YOU WIN\nCLICK TO RESTART OR CONTINUE", width / 2, height / 2 - 20);
    fill(0, 255, 0);
    rect(width / 2 - 100, height / 2 + 30, 80, 40);
    fill(255);
    textSize(16);
    text("CONTINUE", width / 2 - 60, height / 2 + 50);
    fill(255, 0, 0);
    rect(width / 2 + 20, height / 2 + 30, 80, 40);
    fill(255);
    text("RESTART", width / 2 + 60, height / 2 + 50);
  }
}

function drawScrollingText() {
  background(0);
  fill(255, 255, 0);
  textSize(20);
  textAlign(CENTER);
  textWrap(WORD);
  textLeading(40);

  text(crawlText, width / 2 - 150, textY, 300);

  textY -= 1;

  if (textY < -crawlText.length * 10) {
    textY = 600;
  }
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "play";
    setupLevel();
  } else if (gameState === "end") {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 - 20 && mouseY > height / 2 + 30 && mouseY < height / 2 + 70) {
      gameState = "scroll";
    } else if (mouseX > width / 2 + 20 && mouseX < width / 2 + 100 && mouseY > height / 2 + 30 && mouseY < height / 2 + 70) {
      endlessMode = false;
      currentLevel = 0;
      playerSpeed = 0.5;
      gameState = "start";
    }
  }
}