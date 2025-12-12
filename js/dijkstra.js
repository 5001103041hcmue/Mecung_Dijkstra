function inBounds(r, c) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

function getNeighbors(r, c) {
  return [
    [r - 1, c],
    [r + 1, c],
    [r, c - 1],
    [r, c + 1],
  ].filter(([nr, nc]) => inBounds(nr, nc));
}
async function runDijkstra() {
  if (running) return; // không spam nút Chạy nhiều lần
  if (!startCell || !endCell) {
    showMessage("⚠️ Hãy chọn điểm bắt đầu và kết thúc!");
    return;
  }
  running = true;
  clearVisited();

  //Reset trạng thái thuật toán
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const prev = Array.from({ length: rows }, () => Array(cols).fill(null));
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const pq = [];
  const [sr, sc] = startCell;
  const [er, ec] = endCell;
  dist[sr][sc] = 0;
  pq.push([0, sr, sc]);

  const doneSound = new Audio("assets/sounds/done.mp3");    // âm thanh hoàn thành
  const startSound = new Audio("assets/sounds/start.mp3");  // âm thanh bắt đầu
  playSound(startSound, 0.6);

  let visitedCount = 0;
  let found = false;
  //DIJKSTRA
  while (pq.length > 0) {
    if (!running) return; 
    pq.sort((a, b) => a[0] - b[0]);
    const [d, r, c] = pq.shift();
    if (visited[r][c]) continue;
    visited[r][c] = true;
    visitedCount++;
    // animation ô đỏ
    if (!(r === sr && c === sc) && !(r === er && c === ec)) {
      grid[r][c] = CELL.VISITED;
      drawCell(r, c, CELL.VISITED);
      await sleep(speed);
    }
    if (r === er && c === ec) {
      found = true;
      break;
    }
    // duyệt lân cận
    for (const [nr, nc] of getNeighbors(r, c)) {
      if (grid[nr][nc] === CELL.WALL) continue;

      const nd = d + 1;
      if (nd < dist[nr][nc]) {
        dist[nr][nc] = nd;
        prev[nr][nc] = [r, c];
        pq.push([nd, nr, nc]);
      }
    }
  }

  if (!found) {
    running = false;
    showMessage(`❌ Không có đường đi.<br>🧮 Ô đã duyệt: ${visitedCount}`);
    return;
  }
  //dựng lại đường đi
  let path = [];
  let cur = [er, ec];
  while (cur) {
    path.push(cur);
    cur = prev[cur[0]][cur[1]];
  }
  path.reverse();

  // TÔ VÀNG 
  for (const [r, c] of path) {
    if (!running) return; 
    if ((r === sr && c === sc) || (r === er && c === ec)) continue;
    grid[r][c] = CELL.PATH;
    drawCell(r, c, CELL.PATH);
    await sleep(Math.max(10, speed / 1.5));
  }
  playSound(doneSound, 0.6);
  running = false;
  const pathLen = path.length > 1 ? path.length - 1 : 0;
  showMessage(`✅ Độ dài đường đi: ${pathLen} bước<br>🧮 Ô đã duyệt: ${visitedCount}`);
}
function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function playSound(audio, vol = 0.5)
{
  try 
  {
    audio.currentTime = 0;
    audio.volume = vol;
    audio.play().catch(() => {});
  } catch(e){}
}