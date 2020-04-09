// https://observablehq.com/@timhau/voronoi-experiment@322
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# voronoi experiment

Not that observable needed yet another voronoi notebook... there are plenty great others listed here in no particular order or claim to completeness

* [Voronoi sampling by @mbostock](https://observablehq.com/@mbostock/voronoi-stippling)
* [Graph Voronoi by @fil](https://observablehq.com/@fil/graph-voronoi)
* [Rotating Voronoi by @mbostock](https://observablehq.com/@mbostock/rotating-voronoi)
* [Hover Voronoi by @mbostock](https://observablehq.com/@d3/hover-voronoi)
* [Voronoi of Voronoi by @pstuffa](https://observablehq.com/@pstuffa/voronoi-of-voronoi)
* [Centroid and Voronoi polygons by @redblobgames](https://observablehq.com/@redblobgames/centroid-and-voronoi-polygons)
* [Voronoi Borderlands by @mootari](https://observablehq.com/@mootari/voronoi-borderlands)
* [Voronoi Spirals (again) by @mbostock](https://observablehq.com/@mbostock/voronoi-spirals)
* [Spherical Voronoi (again again) by @mbostock](https://observablehq.com/@mbostock/spherical-voronoi)
* [...](https://observablehq.com/search?query=voronoi)

the list goes on and on. So i wanted to join this list and needed a small and rewarding challenge that was fun to build. Hope you enjoy it and if not leave a suggestion.

`
)});
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button>▶︎ Replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","DOM","width","Point","Promises","d3"], async function*(replay,DOM,width,Point,Promises,d3)
{
  replay;
  const context = DOM.context2d(width, width);
  context.translate(width / 2, width / 2);

  const points = [];
  let t = 0;
  const n = 200;
  while (t < 1500) {
    if (points.length < n && t % 5 === 0) {
      const x = 0;
      const y = 0;

      const p = new Point(x, y, points.length);
      points.push(p);
    }
    if (points.length === n) {
      for (const point of points) {
        point.final();
      }
    }

    await Promises.delay(10);
    context.clearRect(-width / 2, -width / 2, width, width);

    for (let i = 0; i < points.length; ++i) {
      points[i].move();
    }

    const delaunay = new d3.Delaunay(
      points.reduce((acc, p) => [...p.pos, ...acc], [])
    );
    const voronoi = delaunay.voronoi([-width / 2, -width / 2, width, width]);

    context.beginPath();
    context.strokeStyle = "rgba(10,10,10,1)";
    voronoi.render(context);
    context.stroke();

    context.beginPath();
    delaunay.renderPoints(context, 1.5);
    context.fill();

    ++t;
    yield context.canvas;
  }
}
);
  main.variable(observer("Point")).define("Point", ["width"], function(width){return(
class Point {
  constructor(x, y, i) {
    this.index = i;
    this.isFinal = false;
    const rowSize = 15;
    const off = width / (rowSize + 1);
    const row = Math.floor(i / rowSize);
    this.finalPos = [
      -width / 2 + off + (-1) ** row * (rowSize * 2) + (i % rowSize) * off,
      -width / 2 + off + row * off
    ];
    this.pos = [x, y];
    this.vel = [-1 + Math.random() * 2, -1 + Math.random() * 2];
    this.t = 0;
  }

  final() {
    this.isFinal = true;
  }

  move() {
    const { finalPos, isFinal, t } = this;

    const [x, y] = this.pos;

    if (!isFinal) {
      const [vx, vy] = this.vel;
      const [nx, ny] = [x + vx, y + vy];
      if (nx <= -width / 2 || nx > width / 2) {
        this.vel[0] *= -1;
      }
      if (ny <= -width / 2 || ny > width / 2) {
        this.vel[1] *= -1;
      }

      this.pos = [nx, ny];
    } else {
      if (t < 1) {
        const [fx, fy] = finalPos;
        const [nx, ny] = [x + t * (fx - x), y + t * (fy - y)];
        this.pos = [nx, ny];
        this.t += 0.00005;
      }
    }
  }
}
)});
  main.variable(observer("theta")).define("theta", function(){return(
Math.PI * (3 - Math.sqrt(5))
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3-delaunay@5')
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  return main;
}
