// https://observablehq.com/@timhau/recursive-bezier@217
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# recursive Bézier

I know this is probably known to most of you and nothing new. But it is still beautiful.

Inspired by [jason davies](https://www.jasondavies.com/animated-bezier/) and [this tweet](https://twitter.com/FreyaHolmer/status/1180596435575689217)`
)});
  main.variable(observer("points")).define("points", ["width"], function(width){return(
[
  [0.02, 0.85],
  [0.28, 0.9],
  [0.58, 0.8],
  [0.88, 0.5],
  [0.7, 0.2],
  [0.6, 0.6],
  [0.5, 0.3],
  [0.3, 0.4],
  [0.2, 0.7],
  [0.07, 0.38],
  [0.15, 0.12],
  [0.4, 0.1]
].map(([x, y]) => [x * width, y * width])
)});
  main.variable(observer()).define(["DOM","width","points","Promises","line","drawIteration","pointOnLine","circle"], async function*(DOM,width,points,Promises,line,drawIteration,pointOnLine,circle)
{
  const context = DOM.context2d(width, width);

  const lines = [];
  for (let i = 0; i < points.length - 1; ++i) {
    lines.push([points[i], points[i + 1]]);
  }

  yield context.canvas;

  let t = 0;
  let trace = [];
  while (true) {
    await Promises.delay(50);
    context.clearRect(0, 0, width, width);
    t = (t + 0.01) % 1;

    for (let l of lines) {
      line(...l, context);
    }

    const l = drawIteration(lines, points.length - 1, t, context);
    const pt = pointOnLine(...l, t);
    circle([...pt, 4], context, { color: "red" });
    trace.push(pt);

    if (t >= 0.99) trace = [];

    for (let i = 0; i < trace.length - 1; ++i) {
      line(trace[i], trace[i + 1], context, { color: "red", lineWidth: 2 });
    }
  }
}
);
  main.variable(observer("drawIteration")).define("drawIteration", ["points","circle","pointOnLine","line"], function(points,circle,pointOnLine,line){return(
function drawIteration(lines, n, t, context) {
  if (n <= 1) return lines;

  const c = 100 + (points.length - 1 - n) * points.length;
  const color = `rgb(${c}, ${c}, ${c})`;

  const p1s = [];
  for (let l of lines) {
    circle([...l[0], 3], context, { color });
    const p1 = pointOnLine(l, t);
    circle([...p1, 3], context, { color });
    p1s.push(p1);
  }
  circle([...lines[lines.length - 1][1], 3], context, { color });

  const nextLines = [];
  for (let i = 0; i < p1s.length - 1; ++i) {
    const nl = line(p1s[i], p1s[i + 1], context, { color });
    nextLines.push(nl);
  }

  return drawIteration(nextLines, n - 1, t, context);
}
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("line", child1);
  main.import("pointOnLine", child1);
  return main;
}
