// ui.js - Giao diện, thông báo
function showMessage(text) {
  const statsDiv = document.getElementById("stats");
  statsDiv.innerHTML = text;
}

function attachUIEvents() 
{
  document.getElementById("runBtn").addEventListener("click", runDijkstra);
  document.getElementById("clearBtn").addEventListener("click", clearAllExceptWalls);
  document.getElementById("resetBtn").addEventListener("click", () => {
    resetMaze();
    showMessage("Đã reset mê cung.");
  });
  document.getElementById("randomBtn").addEventListener("click", () => {
    randomizeWalls();
  });

  const speedRange = document.getElementById("speedRange");
  const speedValue = document.getElementById("speedValue");
  speedRange.addEventListener("input", e => {
  const val = parseInt(e.target.value);
  speed = 155 - val; 
  speedValue.textContent = val; 
 });

  document.getElementById("applySizeBtn").addEventListener("click", () => {
    const r = parseInt(document.getElementById("rows").value);
    const c = parseInt(document.getElementById("cols").value);
    if (r && c && r > 4 && c > 4) {
      rows = r;
      cols = c;
      grid = createGrid(rows, cols);
      ctx.canvas.width = cols * CELL_SIZE;
      ctx.canvas.height = rows * CELL_SIZE;
      resetMaze();
      showMessage(`Kích thước lưới: ${rows}x${cols}`);
    }
  })
}
setInterval(() => {
  const logo = document.getElementById("fit-logo");
  logo.classList.add("glow");
  setTimeout(() => logo.classList.remove("glow"), 600);
}, 2800);


