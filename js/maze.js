// maze.js - Tạo, vẽ và tương tác mê cung
const CELL_SIZE = 24;
let ctx;
let isMouseDown = false;
let paintMode = CELL.WALL;

// Tạo lưới trôngs
function createGrid(r, c) {
  return Array.from({ length: r }, () =>
    Array.from({ length: c }, () => CELL.EMPTY)
  );
}
// Vẽ lại toàn bộ mê cung
function drawMaze() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      drawCell(r, c, grid[r][c]);
    }
  }
}
// Vẽ 1 ô
function drawCell(r, c, type) {
  const x = c * CELL_SIZE;
  const y = r * CELL_SIZE;
  switch (type) {
    case CELL.WALL: ctx.fillStyle = "#1e293b"; break;
    case CELL.START: ctx.fillStyle = "#10b981"; break;
    case CELL.END: ctx.fillStyle = "#3b82f6"; break;
    case CELL.VISITED: ctx.fillStyle = "#ef4444"; break;
    case CELL.PATH: ctx.fillStyle = "#facc15"; break;
    default: ctx.fillStyle = "#f8fafc";
  }
  ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
}
// Xử lý click và drag
function handleMouseDown(e) {
  if (running) return;
  isMouseDown = true;
  const [r, c] = getCellFromEvent(e);
  if (!r && r !== 0) return;
  handleCellToggle(r, c);
}
function handleMouseMove(e) {
  if (!isMouseDown || running) return;
  const [r, c] = getCellFromEvent(e);
  if (!r && r !== 0) return;
  handleCellToggle(r, c);
}

function handleMouseUp() {
  isMouseDown = false;
}
// Toggle 1 ô
function handleCellToggle(r, c) {
  const cell = grid[r][c];
  if (!startCell) {
    startCell = [r, c];
    grid[r][c] = CELL.START;
  } else if (!endCell && cell !== CELL.START) {
    endCell = [r, c];
    grid[r][c] = CELL.END;
  } else if (cell === CELL.EMPTY) {
    grid[r][c] = CELL.WALL;
  } else if (cell === CELL.WALL) {
    grid[r][c] = CELL.EMPTY;
  }
  drawMaze();
}

function getCellFromEvent(e) {
  const rect = ctx.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const c = Math.floor(x / CELL_SIZE);
  const r = Math.floor(y / CELL_SIZE);
  if (r < 0 || r >= rows || c < 0 || c >= cols) return [];
  return [r, c];
}
// Mê cung ngẫu nhiên
function randomizeWalls() {
  if (running) return;
  grid = createGrid(rows, cols);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.3) grid[r][c] = CELL.WALL;
    }
  }
  //start/end không đè tường
  if (startCell) grid[startCell[0]][startCell[1]] = CELL.START;
  if (endCell) grid[endCell[0]][endCell[1]] = CELL.END;
  drawMaze();
}

//Reset
function resetMaze() {
  running = false;
  grid = createGrid(rows, cols);
  startCell = null;
  endCell = null;
  drawMaze();
}
// Clear animation
function clearVisited() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === CELL.VISITED || grid[r][c] === CELL.PATH)
        grid[r][c] = CELL.EMPTY;
    }
  }
  drawMaze();
}
