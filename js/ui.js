// ui.js - Giao diện, thông báo, gắn sự kiện nút
function showMessage(text) {
  const statsDiv = document.getElementById("stats");
  statsDiv.innerHTML = text;
}
function attachUIEvents() {
  document.getElementById("runBtn").addEventListener("click", runDijkstra);
  document.getElementById("clearBtn").addEventListener("click", clearAllExceptWalls);
  document.getElementById("resetBtn").addEventListener("click", () => {
    resetMaze();
    showMessage("Đã reset mê cung.");
  });
  document.getElementById("randomBtn").addEventListener("click", () => {
    randomizeWalls();
  });
    //Thanh speed
  const speedRange = document.getElementById("speedRange");
  const speedValue = document.getElementById("speedValue");
  speedRange.addEventListener("input", e => {
    const val = parseInt(e.target.value);
    speed = 155 - val;
    speedValue.textContent = val;
  });
    //Nút áp dụng kích thước lưới
  document.getElementById("applySizeBtn").addEventListener("click", () => {
    const r = parseInt(document.getElementById("rows").value);
    const c = parseInt(document.getElementById("cols").value);
    if (r && c && r > 4 && c > 4) {
      rows = r;
      cols = c;
      ctx.canvas.width = cols * CELL_SIZE;
      ctx.canvas.height = rows * CELL_SIZE;
      resetMaze(); 
      showMessage(`Kích thước lưới: ${rows}x${cols}`);
    }
  });
  //NÚT NHẬP MA TRẬN
  document.getElementById("importMatBtn").addEventListener("click", () => {
    document.getElementById("matFileInput").click();
  });
  document.getElementById("matFileInput").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    // Phân tích file thành ma trận nhị phân
    const matrix = text
      .trim()
      .split("\n")
      .map(row => row.trim().split(/\s+/).map(Number));
    rows = matrix.length;
    cols = matrix[0].length;
    grid = createGrid(rows, cols);
    // Gán tường/trống
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        grid[r][c] = matrix[r][c] === 1 ? CELL.WALL : CELL.EMPTY;
      }
    }
    startCell = null;
    endCell = null;
    ctx.canvas.width = cols * CELL_SIZE;
    ctx.canvas.height = rows * CELL_SIZE;

    drawMaze();
    showMessage(`📥 Đã vẽ mê cung từ file ma trận nhị phân:  <b>${file.name}</b>`);
    e.target.value = "";
  });
  //  NÚT XUẤT MA TRẬN
  document.getElementById("exportMatBtn").addEventListener("click", () => {
    let text = "";
    for (let r = 0; r < rows; r++) {
      text += grid[r].map(cell => (cell === CELL.WALL ? 1 : 0)).join(" ") + "\n";
    }
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "matrix.txt";
    a.click();
    URL.revokeObjectURL(url);
    showMessage("📤 Đã xuất mê cung thành file ma trận nhị phân.");
  });
}
// Fit Logo effect
setInterval(() => {
  const logo = document.getElementById("fit-logo");
  logo.classList.add("glow");
  setTimeout(() => logo.classList.remove("glow"), 600);
}, 2800);
