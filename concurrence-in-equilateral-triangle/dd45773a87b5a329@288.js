// https://observablehq.com/@timhau/concurrence-in-equilateral-triangle@288
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./a1c6b80dd82757f3@88.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`# Concurrence in Equilateral Triangle


Let ${tex`A',B',C'`} be the midpoints of the Triangle ${tex`\Delta ABC, `} and ${tex`G`} be its center. ${tex`D`} is the intersection of the lines from ${tex`A',B',C'`} to the corresponding feets of the perpendiculars from the vertices of ${tex`\Delta ABC, `} to a line through ${tex`G`}.


inspired by [this cut-the-knot applet](https://www.cut-the-knot.org/m/Geometry/ConcurrenceInEquilateralTriangle.shtml).`
)});
  main.variable(observer()).define(["DOM","width","triangle","points","textAt","offsetText","letters","circle","r","pointOnLine","incircleTriangle","lineThrough","deg","dash","perpendicular","line","getAlphaBetweenPoints","intersectionLL","positions"], function(DOM,width,triangle,points,textAt,offsetText,letters,circle,r,pointOnLine,incircleTriangle,lineThrough,deg,dash,perpendicular,line,getAlphaBetweenPoints,intersectionLL,positions)
{
  const context = DOM.context2d(width, width);
  context.translate(width / 2, width / 2);

  triangle(points, context);

  const middlepoints = [];
  points.forEach((p, i) => {
    textAt(offsetText(p), letters[i], 16, context);
    circle([...p, r], context);

    const pt = pointOnLine([p, points[(i + 1) % points.length]], 0.5);
    const tOff = offsetText(pt);
    textAt(tOff, `${letters[(i + 2) % letters.length]}'`, 16, context);
    circle([...pt, r], context);
    middlepoints.push(pt);
  });

  const ic = incircleTriangle(points);
  circle([ic[0], ic[1], r], context);
  textAt(offsetText(ic), "G", 16, context);

  const l = lineThrough(ic, deg, context, { dash });

  const lines = [];
  points.forEach((p, i) => {
    const pr = perpendicular(l, p);
    line(p, pr, context, { dash });
    circle([...pr, r], context);
    const np = middlepoints[(i + 1) % middlepoints.length];
    const lPrNp = lineThrough(pr, getAlphaBetweenPoints(pr, np), context, {
      dash
    });
    lines.push(lPrNp);
  });

  const d = intersectionLL(...lines);
  textAt(offsetText(d), "D", 16, context);
  circle([...d, r * 2], context, { color: "red" });

  positions.push(d);

  positions.forEach(p => circle([...p, r], context, { color: "red" }));

  return context.canvas;
}
);
  main.variable(observer("deg")).define("deg", ["Promises"], function*(Promises)
{
  let i = 0;
  while (true) {
    yield Promises.delay(80).then(() => i++ % 360);
  }
}
);
  main.variable(observer("perpendicular")).define("perpendicular", ["width","distance","interpolate","project"], function(width,distance,interpolate,project){return(
function perpendicular([p1, p2], p3) {
  // thanks to https://beta.observablehq.com/@mbostock/closest-point-on-line
  const t = (width * 2) / distance(p1, p2);
  const l1 = interpolate(p1, p2, t);
  const l2 = interpolate(p2, p1, t);
  const p = interpolate(p1, p2, Math.max(0, Math.min(1, project(p1, p2, p3))));
  return p;
}
)});
  main.define("initial positions", function(){return(
[]
)});
  main.variable(observer("mutable positions")).define("mutable positions", ["Mutable", "initial positions"], (M, _) => new M(_));
  main.variable(observer("positions")).define("positions", ["mutable positions"], _ => _.generator);
  main.variable(observer("points")).define("points", ["w"], function(w){return(
[[-w, w / 2], [w, w / 2], [0, -Math.sqrt(3) * w + w / 2]]
)});
  main.variable(observer("letters")).define("letters", function(){return(
["A", "B", "C"]
)});
  main.variable(observer("w")).define("w", function(){return(
300
)});
  main.variable(observer("dash")).define("dash", function(){return(
[5, 10]
)});
  main.variable(observer("r")).define("r", function(){return(
2.5
)});
  const child1 = runtime.module(define1);
  main.import("triangle", child1);
  main.import("pointOnLine", child1);
  main.import("circle", child1);
  main.import("textAt", child1);
  main.import("offsetText", child1);
  main.import("incircleTriangle", child1);
  main.import("lineThrough", child1);
  main.import("line", child1);
  main.import("getAlphaBetweenPoints", child1);
  main.import("intersectionLL", child1);
  const child2 = runtime.module(define2);
  main.import("project", child2);
  main.import("interpolate", child2);
  main.import("distance", child2);
  return main;
}
