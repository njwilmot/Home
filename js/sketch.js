let rule = 30;
let iterations = 45;
let cells = 100;
let cellSize = 5;
let cellsArray;
let ruleDisplay;

function setup() {
  let canvas = createCanvas(cells * cellSize, iterations * cellSize);
  canvas.parent('cellular-automaton');
  updateCells();
  ruleSlider = createSlider(0, 255, rule, 1);
  ruleSlider.parent('cellular-automaton');
  ruleSlider.input(updateRule);
  ruleDisplay = createP(`Rule: ${rule}`);
  ruleDisplay.parent('cellular-automaton');
}

function draw() {
  background(255);
  for (let i = 0; i < iterations; i++) {
    for (let j = 0; j < cells; j++) {
      if (cellsArray[i][j]) {
        fill(0);
        rect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }
}

function updateRule() {
  rule = ruleSlider.value();
  ruleDisplay.html(`Rule: ${rule}`);
  updateCells();
  redraw();
}

function updateCells() {
  cellsArray = new Array(iterations).fill().map(() => new Array(cells).fill(0));
  cellsArray[0][Math.floor(cells / 2)] = 1;
  for (let i = 1; i < iterations; i++) {
    for (let j = 0; j < cells; j++) {
      let left = cellsArray[i - 1][(j - 1 + cells) % cells];
      let center = cellsArray[i - 1][j];
      let right = cellsArray[i - 1][(j + 1) % cells];
      let pattern = (left << 2) | (center << 1) | right;
      cellsArray[i][j] = (rule >> pattern) & 1;
    }
  }
}
