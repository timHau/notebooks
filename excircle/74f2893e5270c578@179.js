// https://observablehq.com/@timhau/excircle@179
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Excircle

Given a triangle, extend two sides in the direction opposite their common vertex. The circle tangent to these two lines and to the other side of the triangle is called an excircle, or sometimes an escribed circle

Ref: http://mathworld.wolfram.com/Excircles.html`
)});
  const child1 = runtime.module(define1);
  main.import("triangle", child1);
  main.import("circle", child1);
  main.import("dist2D", child1);
  main.import("halfDeg", child1);
  main.import("coordsFromDeg", child1);
  main.import("radToDeg", child1);
  main.import("lineThrough", child1);
  main.import("getAlphaBetweenPoints", child1);
  main.import("line", child1);
  main.import("incircleTriangle", child1);
  main.import("radiusIncircleTriangle", child1);
  main.variable(observer()).define(["DOM","width","move","now","getAlphaBetweenPoints","lineThrough","triangle","excenter","circle","line","incircleTriangle"], function(DOM,width,move,now,getAlphaBetweenPoints,lineThrough,triangle,excenter,circle,line,incircleTriangle)
{
  const height = 800;
  const context = DOM.context2d(width, height);

  const t1 = move ? Math.sin(now / 1000) : 1;
  const t2 = move ? Math.cos(now / 1000) : 1;
  const t3 = move ? Math.atan(now / 1000) : 1;

  const tr = [
    [width / 2 - 190 * t1, height / 2, 3],
    [width / 2 + 150 * t3, height / 2, 3],
    [width / 2 - 100, height / 2 - 200 * t2, 3]
  ];
  const trl = tr.length;
  tr.forEach((p, i) => {
    const angle = getAlphaBetweenPoints(p, tr[(i + 1) % trl]);
    lineThrough(p, angle, context, {
      lineWidth: 1,
      dash: [5, 10],
      color: "rgba(0,0,0,0.4)"
    });
  });
  triangle(tr, context, { lineWidth: 1 });

  const exCenters = excenter(tr);
  exCenters.forEach((center, i) => {
    circle(center, context, { fill: false });
    circle([center[0], center[1], 3], context);
    line(center, exCenters[(i + 1) % exCenters.length], context, {
      lineWidth: 1,
      color: "rgba(0,0,0,0.4)",
      dash: [5, 10]
    });
  });

  const ic = incircleTriangle(tr);
  circle(ic, context, { fill: false });

  return context.canvas;
}
);
  main.variable(observer("viewof move")).define("viewof move", ["html"], function(html){return(
html`<input type="checkbox" />`
)});
  main.variable(observer("move")).define("move", ["Generators", "viewof move"], (G, _) => G.input(_));
  main.variable(observer("exradii")).define("exradii", function(){return(
function exradii(a, b, c) {
  const s = 0.5 * (a + b + c);
  return Math.sqrt((s * (s - b) * (s - c)) / (s - a));
}
)});
  main.variable(observer("excenter")).define("excenter", ["dist2D","exradii"], function(dist2D,exradii){return(
function excenter([[x1, y1], [x2, y2], [x3, y3]]) {
  const a = dist2D([x2, y2], [x3, y3]);
  const b = dist2D([x3, y3], [x1, y1]);
  const c = dist2D([x1, y1], [x2, y2]);
  const exA = [
    (-a * x1 + b * x2 + c * x3) / (-a + b + c),
    (-a * y1 + b * y2 + c * y3) / (-a + b + c),
    exradii(a, b, c)
  ];
  const exB = [
    (a * x1 - b * x2 + c * x3) / (a - b + c),
    (a * y1 - b * y2 + c * y3) / (a - b + c),
    exradii(b, a, c)
  ];
  const exC = [
    (a * x1 + b * x2 - c * x3) / (a + b - c),
    (a * y1 + b * y2 - c * y3) / (a + b - c),
    exradii(c, b, a)
  ];
  return [exA, exB, exC];
}
)});
  return main;
}
