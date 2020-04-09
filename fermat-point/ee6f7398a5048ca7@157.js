// https://observablehq.com/@timhau/fermat-point@157
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Fermat point

The Fermat point is named after [Pierre de Fermat](https://en.wikipedia.org/wiki/Pierre_de_Fermat), who practised mathematics besides his job as a lawyer and still was one of the greatest mathematicians. He is mostly known for his [last theorem](https://en.wikipedia.org/wiki/Fermat's_Last_Theorem), but I also like this geometry theorem.

Given a triangle which angles does not exceed 120°, construct equilateral triangles on each side. Draw a line from the point of each equilateral triangle to the opposite point of the starting triangle. Then Those lines will intersact at the fermat point.

[Wikipedia](https://en.wikipedia.org/wiki/Fermat_point)`
)});
  main.variable(observer()).define(["DOM","width","move","now","triangleLess120","equilateralTriangle","offsetText","line","intersectionLL","circle"], function*(DOM,width,move,now,triangleLess120,equilateralTriangle,offsetText,line,intersectionLL,circle)
{
  const context = DOM.context2d(width, width);
  context.translate(width / 2, width / 2);
  context.font = "14px sans-serif";

  while (true) {
    const p1 = [-200, 0, 3];
    const t = move ? Math.sin(now / 1000) + 1 : 1;
    const tr = triangleLess120(p1, context, t);

    const lines = [];
    for (let i = 0; i < 3; ++i) {
      const ci = equilateralTriangle(tr[i], tr[(i + 1) % tr.length], context);
      context.fillText("c" + i, ...offsetText(ci));
      const l = [tr[(i + 2) % tr.length], ci];
      line(...l, context, { color: "rgba(50,50,50,0.4)" });
      lines.push(l);
    }

    const fp = intersectionLL(lines[0], lines[1]);
    circle([...fp, 4], context, { color: "red" });
    context.fillStyle = "black";
    context.fillText("fermat point", fp[0] + 20, fp[1] + 5);

    yield context.canvas;
  }
}
);
  main.variable(observer("viewof move")).define("viewof move", ["checkbox"], function(checkbox){return(
checkbox({
  options: [{ value: "move", label: "Move triangle" }],
  value: "toggle"
})
)});
  main.variable(observer("move")).define("move", ["Generators", "viewof move"], (G, _) => G.input(_));
  main.variable(observer("offsetText")).define("offsetText", function(){return(
function offsetText([x, y]) {
  return x > 0 ? [x + 10, y + 10] : y > 0 ? [x - 20, y + 10] : [x - 20, y - 10];
}
)});
  main.variable(observer("equilateralTriangle")).define("equilateralTriangle", ["dist2D","getAlphaBetweenPoints","coordsFromDeg","circle","line"], function(dist2D,getAlphaBetweenPoints,coordsFromDeg,circle,line){return(
function equilateralTriangle(a, b, context) {
  const d = dist2D(a, b);
  const angle = getAlphaBetweenPoints(a, b);
  const c = coordsFromDeg(60 + angle, d, a);
  circle([...c, 3], context);
  line(a, c, context, { color: "rgba(50,50,50,0.4)" });
  line(b, c, context, { color: "rgba(50,50,50,0.4)" });
  return c;
}
)});
  main.variable(observer("triangleLess120")).define("triangleLess120", ["circle","offsetText","coordsFromDeg","line"], function(circle,offsetText,coordsFromDeg,line){return(
function triangleLess120(a, context, t) {
  circle(a, context);
  context.fillText("A", ...offsetText(a));
  const b = coordsFromDeg(5, 500 * t, a);
  circle([...b, 3], context);
  context.fillText("B", ...offsetText(b));
  line(a, b, context);
  const c = coordsFromDeg(-50, 300, a);
  circle([...c, 3], context);
  context.fillText("C", ...offsetText(c));
  line(b, c, context);
  line(a, c, context);
  return [a, b, c];
}
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("coordsFromDeg", child1);
  main.import("line", child1);
  main.import("getAlphaBetweenPoints", child1);
  main.import("dist2D", child1);
  main.import("intersectionLL", child1);
  const child2 = runtime.module(define2);
  main.import("checkbox", child2);
  return main;
}
