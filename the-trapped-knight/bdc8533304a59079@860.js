// https://observablehq.com/@timhau/the-trapped-knight@860
import define1 from "./e93997d5089d7165@2209.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# The Trapped Knight

Instead of learning for my exam next week i was inspired by [this brilliant Numberphile Video](https://www.youtube.com/watch?v=RGQe8waGJ4w) and spend (and enjoyed) most of the day building this.
Adjust the sliders below to change some settings. There is also an animated version below.

(Might be slightly unperformant. If you have suggestions on how to increase performance or clean up my code, just let me know.)`
)});
  main.variable(observer("viewof step")).define("viewof step", ["slider"], function(slider){return(
slider({
  title: "size of one board rectangle",
  min: 1,
  max: 2084,
  step: 1,
  value: 2084
})
)});
  main.variable(observer("step")).define("step", ["Generators", "viewof step"], (G, _) => G.input(_));
  main.variable(observer("viewof lineWidth")).define("viewof lineWidth", ["slider"], function(slider){return(
slider({
  title: "lineWidth",
  min: 1,
  max: 7,
  step: 1,
  value: 2
})
)});
  main.variable(observer("lineWidth")).define("lineWidth", ["Generators", "viewof lineWidth"], (G, _) => G.input(_));
  main.variable(observer("viewof r")).define("viewof r", ["slider"], function(slider){return(
slider({
  title: "radius of the knight",
  min: 1,
  max: 10,
  step: 1,
  value: 2
})
)});
  main.variable(observer("r")).define("r", ["Generators", "viewof r"], (G, _) => G.input(_));
  main.variable(observer("viewof size")).define("viewof size", ["slider"], function(slider){return(
slider({
  title: "size of one board rectangle",
  min: 10,
  max: 100,
  step: 1,
  value: 17
})
)});
  main.variable(observer("size")).define("size", ["Generators", "viewof size"], (G, _) => G.input(_));
  main.variable(observer("viewof showGrid")).define("viewof showGrid", ["checkbox"], function(checkbox){return(
checkbox(["show grid"])
)});
  main.variable(observer("showGrid")).define("showGrid", ["Generators", "viewof showGrid"], (G, _) => G.input(_));
  main.variable(observer("viewof showNumbers")).define("viewof showNumbers", ["checkbox"], function(checkbox){return(
checkbox(["show numbers"])
)});
  main.variable(observer("showNumbers")).define("showNumbers", ["Generators", "viewof showNumbers"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`#### Note
numbers are only shown when the size of one board rectangle is big enough`
)});
  main.variable(observer("viewof hideLines")).define("viewof hideLines", ["checkbox"], function(checkbox){return(
checkbox(["hide lines"])
)});
  main.variable(observer("hideLines")).define("hideLines", ["Generators", "viewof hideLines"], (G, _) => G.input(_));
  main.variable(observer()).define(["trappedKnight","step"], function(trappedKnight,step)
{
  let canvas, s = 0;
  for (canvas of trappedKnight()) {
    if (++s === step + 2) {
      break;
    }
  }
  return canvas;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`# Animated Version`
)});
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button>Replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","trappedKnight"], function(replay,trappedKnight){return(
replay, trappedKnight()
)});
  main.variable(observer("trappedKnight")).define("trappedKnight", ["DOM","width","size","board","showGrid","showNumbers","knight","lineColor","hideLines","lineWidth","r"], function(DOM,width,size,board,showGrid,showNumbers,knight,lineColor,hideLines,lineWidth,r){return(
function* trappedKnight() {
  const context = DOM.context2d(width, width);
  context.translate(width / 2 - size / 2, width / 2 - size / 2);

  let counter = 1;
  for (let [x, y] of board) {
    context.beginPath();
    context.rect(x, y, size, size);
    context.fillStyle = "white";
    context.fill();

    if (showGrid) {
      context.strokeStyle = "black";
      context.stroke();
    }

    if (size > 30 && showNumbers) {
      context.font = "18px Arial";
      context.textAlign = "center";
      context.fillStyle = "black";
      context.fillText(counter, x + size / 2, y + size / 2 + 9);
      ++counter;
    }
  }
  yield context.canvas;

  let prevKnight = [size / 2, size / 2];
  for (let i = 0, n = knight.length; i < n; ++i) {
    const [x, y] = knight[i];
    const color = lineColor(i);
    const pos = [x + size / 2, y + size / 2];
    const isTrapped = i === n - 1;

    if (!hideLines) {
      context.beginPath();
      context.moveTo(...prevKnight);
      context.lineTo(...pos);
      context.lineWidth = lineWidth;
      context.strokeStyle = color;
      context.stroke();
    }

    context.beginPath();
    context.arc(...pos, isTrapped ? r * 2 : r, 0, Math.PI * 2);
    context.fillStyle = isTrapped ? "red" : color;
    context.fill();

    prevKnight = pos;
    yield context.canvas;
  }
}
)});
  main.variable(observer("lineColor")).define("lineColor", function(){return(
function lineColor(x) {
  return `rgba(0,
              ${Math.round(255 * (x / 2084))},
              ${Math.round(255 - 255 * (x / 2084))},
           1)`;
}
)});
  main.variable(observer("board")).define("board", ["createBoard","n"], function(createBoard,n){return(
createBoard(n)
)});
  main.variable(observer("knight")).define("knight", ["size","board","hasCoords"], function(size,board,hasCoords)
{
  const moves = [[0, 0]];

  const directions = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1]
  ];

  let prev = moves[0];

  for (let i = 0; i < 2084; ++i) {
    let nextMove = [Infinity, prev];

    for (let [x, y] of directions) {
      const posM = [prev[0] + x * size, prev[1] + y * size]; // possible next move coordinates

      // ugly way to get the number value
      const num = board.findIndex(coord => hasCoords(coord, posM));

      const visited = moves.findIndex(coord => hasCoords(coord, posM));
      if (visited < 0 && num < nextMove[0]) {
        nextMove = [num, posM];
      }
    }

    if (nextMove[1][0] === prev[0] && nextMove[1][1] === prev[1]) {
      break;
    }

    const [ind, pos] = nextMove;
    prev = pos;
    moves.push(pos);
  }

  return moves;
}
);
  main.variable(observer("hasCoords")).define("hasCoords", function(){return(
([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2
)});
  main.variable(observer("createBoard")).define("createBoard", ["size","isDiag"], function(size,isDiag){return(
function createBoard(n) {
  const board = [[0, 0]];

  const directions = [
    [1, 0], // right
    [0, -1], //upper
    [-1, 0], // left
    [0, 1] //down
  ];

  let direction = 0;
  for (let i = 1; i < n; ++i) {
    const [xs, ys] = directions[direction];
    const prev = board[i - 1];
    const [x, y] = [prev[0] + xs * size, prev[1] + ys * size];
    board.push([x, y]);

    if (isDiag(i)) {
      direction = (direction + 1) % 4;
    }
  }

  return board;
}
)});
  main.variable(observer("isDiag")).define("isDiag", ["n"], function(n){return(
function isDiag(i) {
  const corners = [1];

  let next = 1;
  for (let j = 1; j <= Math.floor(n / 4); ++j) {
    next = j % 2 === 0 ? next + 1 : next;
    const prev = corners[j - 1];
    corners.push(prev + next);
  }

  return corners.includes(i);
}
)});
  main.variable(observer("n")).define("n", function(){return(
8000
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("checkbox", child1);
  return main;
}
