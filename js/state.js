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
let rows = 22;
let cols = 38;
let startCell = null;
let endCell = null;
let running = false;
let speed = 20;