
// state.js-Quản lý trạng thái 
const CELL = {
  EMPTY: "empty",
  WALL: "wall",
  START: "start",
  END: "end",
  VISITED: "visited",
  PATH: "path"
};

let grid = [];
let rows = 20;
let cols = 35;
let startCell = null;
let endCell = null;
let running = false;
let speed = 20;
