// https://observablehq.com/@timhau/pascals-theorem-ii@239
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Pascals theorem II

I already did the circle case [here](https://observablehq.com/@timhau/pascals-theorem?collection=@timhau/learning-geometry) but the theorem is also true in an ellipse (in any conic actually). It states that

if six arbitrary points are choosen on a conic which are joined by lines in any order form a hexagon, then the three pairs of opposite sides meet at three points which lie on a straight line

Ref: [Wikipedia..](https://en.wikipedia.org/wiki/Pascal%27s_theorem)
`
)});
  main.variable(observer("viewof rearrange")).define("viewof rearrange", ["html"], function(html){return(
html`<button>Rearrange`
)});
  main.variable(observer("rearrange")).define("rearrange", ["Generators", "viewof rearrange"], (G, _) => G.input(_));
  main.variable(observer("viewof basicConfig")).define("viewof basicConfig", ["checkbox"], function(checkbox){return(
checkbox({
  options: [{ value: "basic", label: "Show basic Configuration" }],
  value: ""
})
)});
  main.variable(observer("basicConfig")).define("basicConfig", ["Generators", "viewof basicConfig"], (G, _) => G.input(_));
  main.variable(observer()).define(["rearrange","DOM","width","drawEllipse","a","b","pointOnEllipse","basicConfig","randRange","circle","line","intersectionLL"], function(rearrange,DOM,width,drawEllipse,a,b,pointOnEllipse,basicConfig,randRange,circle,line,intersectionLL)
{
  rearrange;
  const context = DOM.context2d(width, width);
  context.translate(width / 2, width / 2);

  drawEllipse(a, b, context);
  const points = [
    pointOnEllipse(-Math.PI * (basicConfig ? 3 / 4 : randRange(3 / 4, 1))),
    pointOnEllipse(Math.PI * (basicConfig ? 1 / 2 : randRange(1 / 4, 3 / 4))),
    pointOnEllipse(-Math.PI * (basicConfig ? 1 / 4 : randRange(0, 1 / 4))),
    pointOnEllipse(Math.PI * (basicConfig ? 3 / 4 : randRange(3 / 4, 1))),
    pointOnEllipse(-Math.PI * (basicConfig ? 1 / 2 : randRange(1 / 4, 3 / 4))),
    pointOnEllipse(Math.PI * (basicConfig ? 1 / 4 : randRange(0, 1 / 4)))
  ];

  const lines = [];
  for (let i = 0; i < points.length; ++i) {
    circle([...points[i], 3], context);
    context.fillText("P" + (i + 1), points[i][0] + 10, points[i][1] + 10);

    const con = points[(i + 1) % points.length];
    const l = line(points[i], con, context);
    lines.push(l);
  }

  const intersections = [];
  for (let i = 0; i < 3; ++i) {
    const intersection = intersectionLL(lines[i], lines[i + 3]);
    circle([...intersection, 3], context, { color: "red" });
    intersections.push(intersection);
  }

  line(intersections[0], intersections[1], context, { color: "red" });

  return context.canvas;
}
);
  main.variable(observer("a")).define("a", function(){return(
380
)});
  main.variable(observer("b")).define("b", function(){return(
200
)});
  main.variable(observer("randRange")).define("randRange", function(){return(
function randRange(min, max) {
  return Math.random() * (max - min) + min;
}
)});
  main.variable(observer("pointOnEllipse")).define("pointOnEllipse", ["a","b"], function(a,b){return(
function pointOnEllipse(angle) {
  // angle is in radian
  const sign = -Math.PI / 2 <= angle && angle <= Math.PI / 2 ? 1 : -1;
  const x =
    sign *
    ((a * b) / Math.sqrt(b * b + a * a * Math.tan(angle) * Math.tan(angle)));
  const y = x * Math.tan(angle);
  return [x, y];
}
)});
  main.variable(observer("drawEllipse")).define("drawEllipse", function(){return(
function drawEllipse(a, b, context) {
  const points = [];
  for (let i = 0; i < 2 * Math.PI; i += 0.01) {
    points.push([a * Math.cos(i), b * Math.sin(i)]);
  }

  context.beginPath();
  context.moveTo(...points[0]);
  for (let point of points.slice(1)) {
    context.lineTo(...point);
  }
  context.stroke();
}
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("line", child1);
  main.import("intersectionLL", child1);
  const child2 = runtime.module(define2);
  main.import("checkbox", child2);
  return main;
}
