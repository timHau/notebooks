// https://observablehq.com/@timhau/rectangular-hyperbola@59
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2209.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# rectangular hyperbola

Nothing fancy here.

Two lines spinning at the same speed but with different angles intersect at a rectangular hyperbola.

Inspired by [this tweet from Tungsteno](https://twitter.com/74WTungsteno/status/1182019162824163329)`
)});
  main.variable(observer("viewof x1")).define("viewof x1", ["slider"], function(slider){return(
slider({
  value: -0.3,
  min: -1,
  max: 1,
  step: 0.01,
  description: "x1"
})
)});
  main.variable(observer("x1")).define("x1", ["Generators", "viewof x1"], (G, _) => G.input(_));
  main.variable(observer("viewof y1")).define("viewof y1", ["slider"], function(slider){return(
slider({
  value: 0.3,
  min: -1,
  max: 1,
  step: 0.01,
  description: "y1"
})
)});
  main.variable(observer("y1")).define("y1", ["Generators", "viewof y1"], (G, _) => G.input(_));
  main.variable(observer()).define(["DOM","width","Promises","x1","y1","circle","lineThrough","intersectionLL"], async function*(DOM,width,Promises,x1,y1,circle,lineThrough,intersectionLL)
{
  const context = DOM.context2d(width, width);
  context.translate(width / 2, width / 2);

  let angle = 0;
  const trace = [];

  yield context.canvas;

  while (true) {
    await Promises.delay(50);
    context.clearRect(-width / 2, -width / 2, width, width);

    const p1 = [x1 * (width / 2), y1 * (width / 2), 3];
    circle(p1, context);
    const l1 = lineThrough(p1, angle, context);

    const p2 = [0.5 * (width / 2), -0.3 * (width / 2), 3];
    circle(p2, context);
    const l2 = lineThrough(p2, -angle, context);

    const intersection = intersectionLL(l1, l2);
    if (intersection) {
      circle([...intersection, 3], context, { color: "red" });
      trace.push(intersection);
    }

    if (trace.length > 150) trace.shift();

    for (let p of trace) {
      circle([...p, 3], context, { color: "red" });
    }

    angle = (angle + 1) % 360;
  }
}
);
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("lineThrough", child1);
  main.import("intersectionLL", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  return main;
}
