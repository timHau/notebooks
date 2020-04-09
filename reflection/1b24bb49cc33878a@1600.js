// https://observablehq.com/@timhau/reflection@1600
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Reflection

I am to 90% sure that i did an mistake somewhere. If you find it just send a suggestion.
So note that this might not be physically correct, but i liked the pattern anyway.`
)});
  main.variable(observer("viewof r")).define("viewof r", ["slider","width"], function(slider,width){return(
slider({
  value: 300,
  min: 50,
  max: width / 2,
  step: 1,
  description: "Radius of circle"
})
)});
  main.variable(observer("r")).define("r", ["Generators", "viewof r"], (G, _) => G.input(_));
  main.variable(observer("viewof n")).define("viewof n", ["slider"], function(slider){return(
slider({
  value: 40,
  min: 1,
  max: 100,
  step: 1,
  description: "Number of Rays"
})
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("viewof showTrace")).define("viewof showTrace", ["checkbox"], function(checkbox){return(
checkbox({
  description: "Show the ray trace",
  options: [{ value: "show", label: "Show" }],
  value: "show"
})
)});
  main.variable(observer("showTrace")).define("showTrace", ["Generators", "viewof showTrace"], (G, _) => G.input(_));
  main.variable(observer()).define(["DOM","width","r","Obstacle","n","Ray","Promises"], function*(DOM,width,r,Obstacle,n,Ray,Promises)
{
  const context = DOM.context2d(width, width);

  console.clear();

  const points = [];
  const tmp = [];
  const c_n = 60;
  for (let i = 0; i < c_n; ++i) {
    //const c = coordsFromDeg(i * (360 / c_n), r, [width / 2, width / 2]);
    const c = [
      width / 2 + r * Math.cos((i * (2 * Math.PI)) / c_n),
      width / 2 + 200 * Math.sin((i * (2 * Math.PI)) / c_n)
    ];
    tmp.push(c);
  }
  points.push(tmp);

  const environment = [];
  points.forEach(p => environment.push(new Obstacle(p, context)));

  const rays = [];
  for (let i = 0; i < n; ++i) {
    rays.push(
      new Ray([width / 2, width / 2, i * (360 / n)], environment, context)
    );
  }

  while (true) {
    yield Promises.delay(1).then(() => {
      context.clearRect(0, 0, width, width);

      environment.forEach(obsticle => obsticle.draw());
      rays.forEach(r => r.run());

      return context.canvas;
    });
  }
}
);
  main.variable(observer("Ray")).define("Ray", ["intersectionCL","dist2D","degBetweenLines","width","coordsFromDeg","showTrace","line","circle"], function(intersectionCL,dist2D,degBetweenLines,width,coordsFromDeg,showTrace,line,circle){return(
class Ray {
  constructor([x, y, deg], environment, context) {
    this.history = [[x, y]];
    this.pos = [x, y];
    this.r = 3;
    this.deg = deg;
    this.context = context;
    this.environment = environment;
    this.stepSize = 2;
  }

  run() {
    this.intersection();
    this.step();
    this.draw();
  }

  intersection() {
    const { pos, r, environment, history } = this;
    for (let obsticle of environment) {
      for (let segment of obsticle.lines) {
        const intersect = intersectionCL([...pos, 1], segment);
        const notOnPoint = dist2D(history[history.length - 1], pos) > 10;

        if (intersect && notOnPoint) {
          const beam = [history[history.length - 1], pos];
          const angle = degBetweenLines(beam, segment);
          const segAngle = degBetweenLines(segment, [[0, 0], [width, 0]]);

          this.history.push(pos);

          this.deg = this.deg + angle * 2;
        }
      }
    }
  }

  step() {
    const { pos, deg, history, stepSize } = this;
    const nextPos = coordsFromDeg(deg, stepSize, pos);
    this.pos = nextPos;
  }

  draw() {
    const { history, pos, context, r } = this;

    const c = "rgba(150, 150, 150, 1)";
    if (showTrace) {
      line(history[history.length - 1], pos, context, { color: c });
      for (let i = history.length - 1; i > 0; --i) {
        line(history[i], history[i - 1], context, { color: c });
      }
    }
    circle([...pos, r], context);
  }
}
)});
  main.variable(observer("Obstacle")).define("Obstacle", ["circle","line"], function(circle,line){return(
class Obstacle {
  constructor(points, context) {
    this.points = points;
    const pl = points.length;
    this.lines = points.map((p, i) => [p, points[(i + 1) % pl]]);
    this.context = context;
  }

  draw() {
    const { points, context } = this;
    const l = points.length;
    for (let i = 0; i < l; ++i) {
      circle([...points[i], 1.5], context);
      line(points[i], points[(i + 1) % l], context);
    }
  }
}
)});
  main.variable(observer("intersectionCL")).define("intersectionCL", ["pointDistFromLine","dist2D"], function(pointDistFromLine,dist2D){return(
function intersectionCL([cx, cy, r], [[x1, y1], [x2, y2]]) {
  const d = pointDistFromLine([cx, cy], [[x1, y1], [x2, y2]]);

  const inLineSegment =
    dist2D([cx, cy], [x1, y1]) + dist2D([cx, cy], [x2, y2]) <=
    dist2D([x1, y1], [x2, y2]) + 1;

  if (inLineSegment && Math.abs(d) < 1) {
    return [cx, cy];
  }

  return false;
}
)});
  main.variable(observer("degBetweenLines")).define("degBetweenLines", ["slope"], function(slope){return(
function degBetweenLines([s1, e1], [s2, e2]) {
  const m1 = slope(s1, e1);
  const m2 = slope(s2, e2);
  return Math.atan(Math.abs((m2 - m1) / (1 + m1 * m2))) * (180 / Math.PI);
}
)});
  main.variable(observer("pointDistFromLine")).define("pointDistFromLine", ["dist2D"], function(dist2D){return(
function pointDistFromLine([x, y], [[x1, y1], [x2, y2]]) {
  return (
    ((x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)) / dist2D([x1, y1], [x2, y2])
  );
}
)});
  main.variable(observer("slope")).define("slope", function(){return(
function slope([x1, y1], [x2, y2]) {
  if (x2 - x1 === 0) return 10000000000000000; // should be inifinity but i want to work with it... its ugly i know
  return (y2 - y1) / (x2 - x1);
}
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("line", child1);
  main.import("coordsFromDeg", child1);
  main.import("dist2D", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  main.import("checkbox", child2);
  return main;
}
