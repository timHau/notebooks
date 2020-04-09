// https://observablehq.com/@timhau/farn@447
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Farn

I guess i am a little late for the christmas tree reference. So i will just reference [this](https://www.youtube.com/watch?v=-HvdsIkY9mY) `
)});
  main.variable(observer("viewof n")).define("viewof n", ["slider"], function(slider){return(
slider({
  min: 0,
  max: 18,
  value: 14,
  step: 1,
  description: "number of iterations"
})
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("viewof h1")).define("viewof h1", ["slider"], function(slider){return(
slider({
  min: 0,
  max: 1,
  value: 0.8,
  step: 0.01,
  description: "length of top segment"
})
)});
  main.variable(observer("h1")).define("h1", ["Generators", "viewof h1"], (G, _) => G.input(_));
  main.variable(observer("viewof lb_h")).define("viewof lb_h", ["slider"], function(slider){return(
slider({
  min: 0,
  max: 1,
  value: 0.43,
  step: 0.01,
  description: "length of left branch"
})
)});
  main.variable(observer("lb_h")).define("lb_h", ["Generators", "viewof lb_h"], (G, _) => G.input(_));
  main.variable(observer("viewof rb_h")).define("viewof rb_h", ["slider"], function(slider){return(
slider({
  min: 0,
  max: 1,
  value: 0.7,
  step: 0.01,
  description: "height of right branch"
})
)});
  main.variable(observer("rb_h")).define("rb_h", ["Generators", "viewof rb_h"], (G, _) => G.input(_));
  main.variable(observer("viewof beta")).define("viewof beta", ["slider"], function(slider){return(
slider({
  min: 0,
  max: 359,
  value: 308,
  step: 1,
  description: "beta"
})
)});
  main.variable(observer("beta")).define("beta", ["Generators", "viewof beta"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","DOM","width","Promises","line","farn","n"], async function*(replay,DOM,width,Promises,line,farn,n)
{
  replay;
  const context = DOM.context2d(width, width);
  context.translate(width / 2, width / 2);

  let cur = 0;

  yield context.canvas;

  while (true) {
    await Promises.tick(50);
    context.clearRect(-width / 2, -width / 2, width, width);
    const start = [[0, width / 3], [0, width / 3 - width / 6]];
    line(start[0], start[1], context);
    farn(start, cur, context);

    if (cur < n) cur += 1;
  }
}
);
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button>Replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer("farn")).define("farn", ["line","dist2D","getAlphaBetweenPoints","coordsFromDeg","alpha","h1","pointOnLine","lb_h","beta","rb_h","cos"], function(line,dist2D,getAlphaBetweenPoints,coordsFromDeg,alpha,h1,pointOnLine,lb_h,beta,rb_h,cos){return(
function farn([p1, p2], n, context, orientation = 1) {
  if (n < 1) return line(p1, p2, context);

  const len = dist2D(p1, p2);

  const angle = getAlphaBetweenPoints(p1, p2);
  const np = coordsFromDeg(angle + orientation * alpha, len * h1, p2);
  line(p2, np, context);

  // left branch
  const lb_height = pointOnLine([p1, p2], lb_h);
  const lb_start = coordsFromDeg(angle + beta, len * lb_h, lb_height);
  line(lb_height, lb_start, context);
  farn([lb_height, lb_start], n - 2, context);

  // right branch
  const rb_height = pointOnLine([p1, p2], rb_h);
  const rb_start = coordsFromDeg(
    angle - (alpha + beta),
    len * cos(alpha),
    rb_height
  );
  line(rb_height, rb_start, context);
  farn([rb_height, rb_start], n - 2, context, -1);

  farn([p2, np], n - 1, context, orientation);
}
)});
  main.variable(observer("alpha")).define("alpha", function(){return(
5
)});
  const child1 = runtime.module(define1);
  main.import("line", child1);
  main.import("dist2D", child1);
  main.import("coordsFromDeg", child1);
  main.import("getAlphaBetweenPoints", child1);
  main.import("pointOnLine", child1);
  main.variable(observer("cos")).define("cos", function(){return(
Math.cos
)});
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  return main;
}
