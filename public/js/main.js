let towerImg;

const enderman = {
  img: null,
  scale: 1/10,
}

const endermanScreeming = {
  img: null,
  scale: 1/10 * 3.333333333,
}

let guesses = {
  correct: [],
  incorrect: []
}

let timesTable = null;

async function setup() {
  timesTable = floor(random(2, 11))
  createCanvas(windowWidth, windowHeight);
  towerImg = await loadImage('images/tower2.JPG');
  enderman.img = await loadImage('images/Enderman.webp');
  endermanScreeming.img = await loadImage('images/Enderman_Screaming.gif');
}

function draw() {
  background(0);
  displayTower();
  displayEnderman();

  if (guesses.correct.length >= 10) {
    displayCongratulations();
  } else {
    displayNumberGrid();
  }

  displayTimesTable();
}

function displayTower() {
  if (towerImg) {
    image(towerImg, 0, 0, width / 2, height);
  }
}

function displayEnderman() {
  if (enderman.img && endermanScreeming.img) {
    const progress = guesses.correct.length + 1;
    let character = progress == 10 ? endermanScreeming : enderman;

    const scaledWidth = character.img.width * character.scale;
    const scaledHeight = character.img.height * character.scale;
    const x = (width / 4) - (scaledWidth / 2);

    const sectionHeight = height / 13;
    const y = height - (progress * sectionHeight) - scaledHeight;

    image(character.img, x, y, scaledWidth, scaledHeight);
  }
}

function displayTimesTable() {
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(32);
  text(`${timesTable}x Table`, 20, 20);
}

function displayCongratulations() {
  fill(255, 215, 0); // Gold color
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(48);
  text('Congratulations!', width * 0.75, height / 2);

  textSize(24);
  fill(255);
  text(`You completed the ${timesTable}x table!`, width * 0.75, height / 2 + 60);
}

function displayNumberGrid() {
  const gridStartX = width / 2;
  const gridWidth = width / 2;
  const gridHeight = height;
  const buttonWidth = gridWidth / 10;
  const buttonHeight = gridHeight / 10;

  textAlign(CENTER, CENTER);
  textSize(16);

  let number = 1;
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const x = gridStartX + col * buttonWidth;
      const y = row * buttonHeight;

      // Determine button color based on guesses
      let buttonColor = 60; // Default gray
      if (guesses.correct.includes(number)) {
        buttonColor = color(0, 200, 0); // Green
      } else if (guesses.incorrect.includes(number)) {
        buttonColor = color(255, 165, 0); // Orange
      }

      // Draw button background
      fill(buttonColor);
      stroke(100);
      strokeWeight(1);
      rect(x, y, buttonWidth, buttonHeight);

      // Draw number
      fill(255);
      noStroke();
      text(number, x + buttonWidth / 2, y + buttonHeight / 2);

      number++;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  const gridStartX = width / 2;
  const gridWidth = width / 2;
  const gridHeight = height;
  const buttonWidth = gridWidth / 10;
  const buttonHeight = gridHeight / 10;

  // Check if click is within the grid area
  if (mouseX >= gridStartX && mouseX < width && mouseY >= 0 && mouseY < height) {
    const col = floor((mouseX - gridStartX) / buttonWidth);
    const row = floor(mouseY / buttonHeight);

    // Calculate button number (1-100)
    const number = row * 10 + col + 1;

    // Determine the correct answer
    const nextMultiplier = guesses.correct.length + 1;
    const correctAnswer = timesTable * nextMultiplier;

    if (number === correctAnswer) {
      guesses.correct.push(number);
      console.log(`Correct! ${number}`);
    } else {
      // Add to incorrect if not already there (keep unique)
      if (!guesses.incorrect.includes(number)) {
        guesses.incorrect.push(number);
      }
      console.log(`Incorrect! ${number} (expected ${correctAnswer})`);
    }
  }
}
