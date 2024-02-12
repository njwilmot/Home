let rule = 30;
let iterations = 45;
let cells = 100;
let cellSize = 5;
let cellsArray;
let ruleSlider, ruleDisplay;

function setup() {
  createCanvasEnvironment();
  initializeCells();
  setupSlider();
}

function draw() {
  drawCells();
}

function createCanvasEnvironment() {
  let canvas = createCanvas(cells * cellSize, iterations * cellSize);
  canvas.parent('cellular-automaton');
}

function setupSlider() {
  ruleSlider = createSlider(0, 255, rule, 1).parent('cellular-automaton').input(updateRule);
  ruleDisplay = createP(`Rule: ${rule}`).parent('cellular-automaton');
}

function drawCells() {
  background(255);
  cellsArray.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell) fill(0); else fill(255);
      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    });
  });
}

function updateRule() {
  rule = ruleSlider.value();
  ruleDisplay.html(`Rule: ${rule}`);
  initializeCells();
}

function initializeCells() {
  cellsArray = Array.from({ length: iterations }, () => new Uint8Array(cells));
  cellsArray[0][Math.floor(cells / 2)] = 1;
  generateCells();
}

function generateCells() {
  for (let i = 1; i < iterations; i++) {
    for (let j = 0; j < cells; j++) {
      cellsArray[i][j] = computeCellState(i, j);
    }
  }
  noLoop(); // Stop draw loop if the automaton doesn't need to be dynamically updated.
}

function computeCellState(i, j) {
  let left = cellsArray[i - 1][(j - 1 + cells) % cells];
  let center = cellsArray[i - 1][j];
  let right = cellsArray[i - 1][(j + 1) % cells];
  let pattern = (left << 2) | (center << 1) | right;
  return (rule >> pattern) & 1;
}

