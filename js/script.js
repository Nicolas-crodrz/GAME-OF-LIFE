
// Developed by: Nicolás Cabrera Rodríguez. 


var textoDer = document.getElementById("text-der");
var textoIzq = document.getElementById("text-izq");

  textoDer.innerHTML = "Game of Life";
  textoIzq.innerHTML = "Game of Life";

if (window.innerWidth < 389) {
    textoDer.style.fontSize = "30px";
    textoIzq.style.fontSize = "30px";

}


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 10;
canvas.width = 800;
canvas.height = 800;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;


function buildGrid() {

  return new Array(COLS)
    .fill(null)
    .map(() => new Array(ROWS)
      .fill(0)
      .map(() => Math.floor(Math.random() * 2)));

}


let grid = buildGrid();

requestAnimationFrame(update);

function update() {

  grid = nextGen(grid);

  render(grid);

  requestAnimationFrame(update);
}

function nextGen(grid) {

  const nextGen = grid.map(arr => [...arr]);

  for (let col = 0; col < grid.length; col++) {

    for (row = 0; row < grid[col].length; row++) {

      const cell = grid[col][row];

      let numNeighbors = 0;

      for (let i = -1; i < 2; i++) {

        for (let j = -1; j < 2; j++) {

          if (i === 0 && j === 0) {

            continue;
          };

          const x_cell = col + i;
          const y_cell = row + j;

          if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {

            const currentNeighbor = grid[col + i][row + j];
            numNeighbors += currentNeighbor;
          };
        };
      };

      // Rules of Life
      if (cell === 1 && numNeighbors < 2) {

        nextGen[col][row] = 0;
      }
      else if (cell === 1 && numNeighbors > 3) {

        nextGen[col][row] = 0;
      }
      else if (cell === 0 && numNeighbors === 3) {

        nextGen[col][row] = 1;
      };

    };

  };
  return nextGen;
};

function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (row = 0; row < grid[col].length; row++) {

      const cell = grid[col][row];

      ctx.beginPath();

      ctx.rect(col * resolution, row * resolution, resolution, resolution);

     ctx.fillStyle = cell ? '#000' : '#fff';
     
      ctx.fill();

      ctx.stroke(); // outline / grid
    };

  };
};


