// main.js - Khởi động(canvas scale + fix click lệch)
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("mazeCanvas");
  ctx = canvas.getContext("2d");

  //Ti lệ zoom mê cung(1.0 = mặc định, 1.15 = to hơn 15%)
   //const SCALE = (canvas.width / canvas.clientWidth);

  // Cập nhật kích thước canvas
  canvas.width = cols * CELL_SIZE;// * SCALE;
  canvas.height = rows * CELL_SIZE;// * SCALE;
  window.getCellFromEvent = function (e) {
    const rect = canvas.getBoundingClientRect();
    // Tính chính xác toạ độ chuột theo scale
    const x = (e.clientX - rect.left)*(canvas.width / rect.width);
    const y = (e.clientY - rect.top)*(canvas.height / rect.height);
    const c = Math.floor(x / CELL_SIZE);
    const r = Math.floor(y / CELL_SIZE);
    if (r < 0 || r >= rows || c < 0 || c >= cols) return [];
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
  showMessage("Chuột trái: vẽ tường | Chuột phải: xoá tường.<br>Chọn điểm bắt đầu, kết thúc và vẽ tường hoặc chọn 'Mê cung ngẫu nhiên'.<br>Sau đó nhấn 'Chạy'.");
});
