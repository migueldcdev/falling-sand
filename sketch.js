// Create a 2D array
// Sorry if you are used to matrix math!
// How would you do this with a
// higher order function????

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    // Fill the array with 0s
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

// The grid
let grid;
// How big is each square?
let w = 5;
let cols, rows;
let hueValue = 250;

// Check if a row is within the bounds
function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}

// Check if a column is within the bounds
function withinRows(j) {
  return j >= 0 && j <= rows - 1;
}

let count = 0
let col = 20
let row = 1
let sum = true

function setup() {
  createCanvas(500, 300);  
  colorMode(HSB, 360, 55, 55);  
  background(255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
  
  init();
}

function init() {
  const interval = setInterval(() => {
    if(count > 325) clearInterval(interval)
    customFunction() 
    count++ 
    if(sum) {
      col = col + Math.floor(Math.random() * 10) + 1; 
    } else {
      col = col - Math.floor(Math.random() * 10) + 1; 
    }  
    
    if(col > 80) {
      sum = false;   
      row = row + 1     
    } else if (col < 20){
      sum = true;     
    }
  }, 15)  
}

function customFunction() {  
  let randomCol = col;
  const randomRow = row 
  // Randomly add an area of sand particles
  let matrix = 5;
  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.75) {
        let col = randomCol + i;
        let row = randomRow + j;
        if (withinCols(col) && withinRows(row)) {
          grid[col][row] = hueValue;
        }
      }
    }
  }
  // Change the color of the sand over time
  hueValue += 1;
  if (hueValue > 360) {
    hueValue = 1;
  }
}

function draw() {
  background(255);  
  // Draw the sand
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }
  
  // Create a 2D array for the next frame of animation
  let nextGrid = make2DArray(cols, rows);
  
  // Check every cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows ; j++) {
      // What is the state?
      let state = grid[i][j];
      
      // If it's a piece of sand!
      if (state > 0) {
        // What is below?
        let below = grid[i][j + 1];
        
        // Randomly fall left or right
        let dir = 1;
        if (random(1) < 0.5) {
          dir *= -1;
        }
        
        // Check below left or right
        let belowA = -1;
        let belowB = -1;
        if (withinCols(i + dir)) {
          belowA = grid[i + dir][j + 1];
        }
        if (withinCols(i - dir)) {
          belowB = grid[i - dir][j + 1];
        }
        
        
        // Can it fall below or left or right?
        if (below === 0) {
          nextGrid[i][j + 1] = state;
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = state;
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] = state;
        // Stay put!
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  grid = nextGrid;
}
