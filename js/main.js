// main.js - Khởi động(canvas scale + fix click lệch)
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("mazeCanvas");
  ctx = canvas.getContext("2d");

  // Cập nhật kích thước canvas
  canvas.width = cols * CELL_SIZE;
  canvas.height = rows * CELL_SIZE;
  window.getCellFromEvent = function (e) {
    const rect = canvas.getBoundingClientRect();
    // Tính chính xác toạ độ chuột theo scale
    const x = (e.clientX - rect.left)*(canvas.width / rect.width);
    const y = (e.clientY - rect.top)*(canvas.height / rect.height);
    const c = Math.floor(x / CELL_SIZE);
    const r = Math.floor(y / CELL_SIZE);
    if (!inBounds(r,c)) return [];
    return [r, c];
  };

  grid = createGrid(rows, cols);
  drawMaze();

  // Clicking events
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
  //Chặn menu chuột phải
  canvas.addEventListener("contextmenu", e => e.preventDefault());

  //Giao diện
  attachUIEvents();
  showMessage("Kéo giữ chuột trái : vẽ tường | Chuột phải : xoá tường.<br><br>Chọn điểm bắt đầu và kết thúc.<br>Mê cung: vẽ tường bằng chuột hoặc chọn 'Random Maze' (vẽ mê cung ngẫu nhiên) / 'Nhập ma trận nhị phân'.<br><br>Nhấn 'Run' để bắt đầu duyệt.");
});
