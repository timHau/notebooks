// https://observablehq.com/@timhau/unexpected-ellipse@531
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# unexpected ellipse

Inspired by [this tweet](https://twitter.com/InertialObservr/status/1153356695474585600)`
)});
  main.variable(observer("viewof n")).define("viewof n", ["slider"], function(slider){return(
slider({
  value: 50,
  min: 1,
  max: 70,
  step: 1,
  description: "Number of circles"
})
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("viewof tMax")).define("viewof tMax", ["slider"], function(slider){return(
slider({
  value: 65,
  min: 10,
  max: 140,
  step: 1,
  description: "Iterations until the animation stops"
})
)});
  main.variable(observer("tMax")).define("tMax", ["Generators", "viewof tMax"], (G, _) => G.input(_));
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button>Replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","draw"], function(replay,draw){return(
replay, draw()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Note**: i am still an huge amateur. Feel free to correct my mistakes if you find them or send me suggestions if you see a simpler way to solve it. `
)});
  main.variable(observer("draw")).define("draw", ["DOM","width","height","n","Point","Promises","line","updatePointsPosition","drawTrace","tMax","findMax"], function(DOM,width,height,n,Point,Promises,line,updatePointsPosition,drawTrace,tMax,findMax){return(
function* draw() {
  const context = DOM.context2d(width, height);
  context.translate(width / 2, width / 3);
  let t = 0;

  let points = [];
  for (let i = 0; i < n; ++i) {
    const p = new Point([0, 0, 3], i);
    points.push(p);
  }

  let trace = [];
  let play = true;

  while (play) {
    yield Promises.delay(20).then(() => {
      t += 1;
      context.clearRect(-width / 2, -width / 2, width, width);

      context.beginPath();
      context.rect(-width / 2, 5, width, -width / 2);
      context.clip();
      line([-width / 2, 5], [width / 2, 5], context, {
        color: "rgba(150,150,150,0.9)"
      });

      points.forEach(p => p.draw(context));
      const nextPoints = updatePointsPosition(points, t, context);
      trace.push(nextPoints);

      drawTrace(trace, context);

      if (t > tMax) {
        play = false;
        let maxPoints = findMax(trace);
        maxPoints.forEach(p => p.draw(context, { color: "red" }));
      }
      return context.canvas;
    });
  }
}
)});
  main.variable(observer("findMax")).define("findMax", function(){return(
function findMax(trace) {
  let res = [];

  for (let i = 0; i < trace.length; ++i) {
    for (let j = 0; j < trace[i].length; ++j) {
      const y = trace[i][j].position[1];
      if (!res[j] || y < res[j].position[1]) {
        res[j] = trace[i][j];
      }
    }
  }

  return res;
}
)});
  main.variable(observer("updatePointsPosition")).define("updatePointsPosition", ["enumerate"], function(enumerate){return(
function updatePointsPosition(points, t) {
  const nextPoints = [];

  for (let [i, p] of enumerate(points)) {
    nextPoints.push(p.clone());
    p.update();
    p.applyForce([0, 0.5]);
  }

  return nextPoints;
}
)});
  main.variable(observer("addVec")).define("addVec", function(){return(
function addVec([ax, ay], [fx, fy]) {
  return [ax + fx, ay + fy];
}
)});
  main.variable(observer("enumerate")).define("enumerate", function(){return(
function enumerate(arr) {
  const res = [];
  for (let i = 0; i < arr.length; ++i) {
    res.push([i, arr[i]]);
  }
  return res;
}
)});
  main.variable(observer("drawTrace")).define("drawTrace", ["line"], function(line){return(
function drawTrace(trace, context) {
  for (let i = 0; i < trace.length - 1; ++i) {
    for (let j = 0; j < trace[i].length; ++j) {
      line(trace[i][j].position, trace[i + 1][j].position, context, {
        color: "rgba(150,150,150,0.9)"
      });
    }
  }
}
)});
  main.variable(observer("Point")).define("Point", ["coordsFromDeg","n","circle","addVec"], function(coordsFromDeg,n,circle,addVec){return(
class Point {
  constructor([x, y], i) {
    this.acceleration = [0, 0];
    this.ind = i;
    this.velocity = coordsFromDeg((360 / n) * i, 15, [x, y]);
    this.position = [x, y];
  }

  draw(context, opts) {
    circle([...this.position, 3], context, opts);
  }

  update() {
    const { velocity, acceleration, position } = this;
    this.velocity = addVec(velocity, acceleration);
    this.position = addVec(position, velocity);
    this.acceleration = [0, 0];
  }

  applyForce(force) {
    const { acceleration } = this;
    this.acceleration = addVec(acceleration, force);
  }

  clone() {
    return new Point(this.position, this.ind);
  }
}
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width / 2
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("line", child1);
  main.import("coordsFromDeg", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  return main;
}
