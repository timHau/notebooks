// https://observablehq.com/@timhau/reaction-diffusion@559
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# reaction diffusion

If you are looking for a fast reaction diffusion you should turn around and look at other notebooks e.g. [this one](https://observablehq.com/@mbostock/gray-scott-reaction-diffusion). Would not be possible without [this coding train video](coding train reaction diffusion). Which itself mostly follows [Karl Sims blog post](http://karlsims.com/rd.html) which i highly recommend.`
)});
  main.variable(observer("step")).define("step", function(){return(
9
)});
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button>Replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","DOM","width","makeGrid","Promises","drawGrid","nextGrid"], async function*(replay,DOM,width,makeGrid,Promises,drawGrid,nextGrid)
{
  replay;
  const canvas = DOM.canvas(width, width);
  const context = canvas.getContext("2d");
  const grid = makeGrid();

  yield canvas;
  while (true) {
    await Promises.delay(1);

    context.clearRect(0, 0, width, width);

    drawGrid(grid, context);
    nextGrid(grid);
  }
}
);
  main.variable(observer("d_a")).define("d_a", function(){return(
1
)});
  main.variable(observer("d_b")).define("d_b", function(){return(
0.5
)});
  main.variable(observer("feed")).define("feed", function(){return(
0.055
)});
  main.variable(observer("k")).define("k", function(){return(
0.062
)});
  main.variable(observer("directNeighborWeight")).define("directNeighborWeight", function(){return(
0.2
)});
  main.variable(observer("diagonalNeighborWeight")).define("diagonalNeighborWeight", function(){return(
0.05
)});
  main.variable(observer("laplace")).define("laplace", ["colSize","directNeighborWeight","diagonalNeighborWeight"], function(colSize,directNeighborWeight,diagonalNeighborWeight){return(
function laplace([i, j], val, grid) {
  let sum = 0;

  const center = grid[i][j];
  sum += -1 * center[val];

  const directNeighbors = [
    [i - 1 < 0 ? colSize - 1 : i - 1, j],
    [(i + 1) % colSize, j],
    [i, j - 1 < 0 ? colSize - 1 : j - 1],
    [i, (j + 1) % colSize]
  ];
  directNeighbors.forEach(
    ([x, y]) => (sum += directNeighborWeight * grid[x][y][val])
  );

  const diagonalNeighbors = [
    [(i + 1) % colSize, j - 1 < 0 ? colSize - 1 : j - 1],
    [(i + 1) % colSize, (j + 1) % colSize],
    [i - 1 < 0 ? colSize - 1 : i - 1, (j + 1) % colSize],
    [i - 1 < 0 ? colSize - 1 : i - 1, j - 1 < 0 ? colSize - 1 : j - 1]
  ];
  diagonalNeighbors.forEach(
    ([x, y]) => (sum += diagonalNeighborWeight * grid[x][y][val])
  );

  return sum;
}
)});
  main.variable(observer("nextGrid")).define("nextGrid", ["d_a","laplace","feed","d_b","k"], function(d_a,laplace,feed,d_b,k){return(
function nextGrid(grid) {
  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
      const { a, b } = grid[i][j];
      grid[i][j] = {
        a: a + (d_a * laplace([i, j], 'a', grid) - a * b * b + feed * (1 - a)),
        b: b + d_b * laplace([i, j], 'b', grid) + a * b * b - (k + feed) * b
      };
    }
  }
}
)});
  main.variable(observer("drawGrid")).define("drawGrid", ["step"], function(step){return(
function drawGrid(grid, context) {
  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
      const { a, b } = grid[i][j];
      const c = Math.abs(a - b) * 255;
      context.fillStyle = `rgba(${c}, ${c}, ${c}, 1)`;
      context.fillRect(i * step, j * step, step, step);
    }
  }
}
)});
  main.variable(observer("colSize")).define("colSize", ["width","step"], function(width,step){return(
Math.floor(width / step)
)});
  main.variable(observer("makeGrid")).define("makeGrid", ["colSize"], function(colSize){return(
function makeGrid() {
  const res = [];

  for (let x = 0; x < colSize; ++x) {
    const row = [];
    for (let y = 0; y < colSize; ++y) {
      row.push({
        a: 0,
        b: Math.floor(Math.random() * 2)
      });
    }
    res.push(row);
  }

  return res;
}
)});
  return main;
}
