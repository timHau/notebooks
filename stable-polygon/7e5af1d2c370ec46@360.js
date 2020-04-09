// https://observablehq.com/@timhau/stable-polygon@360
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2227.js";
import define3 from "./7dfec509126263f5@298.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# stable polygon
Inspired by [this tweet](https://twitter.com/jagarikin/status/1149492270250393600)`
)});
  main.variable(observer("viewof values")).define("viewof values", ["inputsGroup","slider"], function(inputsGroup,slider){return(
inputsGroup([
  [
    slider({
      value: 6,
      min: 2,
      max: 30,
      step: 1,
      description: "Number of circles"
    }),
    slider({
      value: 20,
      min: 0,
      max: 30,
      step: 1,
      description: "Number of Iterations / Polygons"
    }),
    slider({
      value: 40,
      min: 0,
      max: 300,
      step: 10,
      description: "Delay before next Polygon is created"
    })
  ]
])
)});
  main.variable(observer("values")).define("values", ["Generators", "viewof values"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`This actually also works if the circles overlap! Try it by increasing the radius below`
)});
  main.variable(observer("viewof radi")).define("viewof radi", ["inputsGroup","slider"], function(inputsGroup,slider){return(
inputsGroup([
  [
    slider({
      value: 100,
      min: 0,
      max: 300,
      step: 1,
      description: "Radius of 'local' (smaller) circle"
    }),
    slider({
      value: 250,
      min: 0,
      max: 300,
      step: 1,
      description: "Distance of local circles from center"
    })
  ]
])
)});
  main.variable(observer("radi")).define("radi", ["Generators", "viewof radi"], (G, _) => G.input(_));
  main.variable(observer()).define(["DOM","width","values","Promises","drawCircles","drawPointsOnCircles","drawPolygon"], async function*(DOM,width,values,Promises,drawCircles,drawPointsOnCircles,drawPolygon)
{
  const context = DOM.context2d(width, width);
  context.translate(width / 2, width / 2);
  const [[numCircles, maxIteration, delay]] = values;

  let t = 0;
  let iterations = 0;

  yield context.canvas;

  while (true) {
    await Promises.delay(delay);
    t += 1;
    if (t % 40 === 0) iterations = (iterations + 1) % maxIteration;
    context.clearRect(-width / 2, -width / 2, width, width);

    const circles = drawCircles(numCircles, context);
    const points = drawPointsOnCircles(circles, t, context);
    drawPolygon(points, iterations, context);
  }
}
);
  main.variable(observer("drawCircles")).define("drawCircles", ["values","radi","coordsFromDeg","circle"], function(values,radi,coordsFromDeg,circle){return(
function drawCircles(n, context) {
  const [[numCircles]] = values;
  const [[localRadius, globalRadius]] = radi;

  const circles = [];
  for (let i = 0; i < n; ++i) {
    const coords = coordsFromDeg((360 / numCircles) * i, globalRadius);
    const c = [...coords, localRadius];
    circle(c, context, { fill: false, dash: [5, 10] });
    circles.push([i, c]);
  }

  return circles;
}
)});
  main.variable(observer("drawPointsOnCircles")).define("drawPointsOnCircles", ["pointOnCircle","pointDeg","circle"], function(pointOnCircle,pointDeg,circle){return(
function drawPointsOnCircles(circles, t, context) {
  const points = [];
  for (let [i, c] of circles) {
    const p = pointOnCircle(c, pointDeg(i, t));
    circle([...p, 3], context);
    points.push([i, p]);
  }

  return points;
}
)});
  main.variable(observer("pointDeg")).define("pointDeg", function(){return(
function pointDeg(i, t) {
  return (-1) ** i * Math.sin(i) * (180 / Math.PI) + ((5 * t) % 360);
}
)});
  main.variable(observer("drawPolygon")).define("drawPolygon", ["stepColor","line","pointOnLine","circle"], function(stepColor,line,pointOnLine,circle){return(
function drawPolygon(points, iterations, context) {
  if (iterations === 0) return;
  const color = stepColor(iterations);

  const lines = [];
  for (let [i, p] of points) {
    const [_, q] = points[(i + 1) % points.length];
    const l = line(p, q, context, {
      lineWidth: 1,
      color,
      lineWidth: 1.5,
      dash: [1, 0]
    });
    lines.push([i, l]);
  }

  let nextPoints = [];
  for (let [i, l] of lines) {
    const p = pointOnLine(l, 0.5);
    circle([...p, 1], context);
    nextPoints.push([i, p]);
  }
  return drawPolygon(nextPoints, iterations - 1, context);
}
)});
  main.variable(observer("stepColor")).define("stepColor", ["values"], function(values){return(
function stepColor(iterations) {
  const [[_, maxIteration]] = values;
  return `rgba(0, 0, 0, 
    ${1 - iterations / maxIteration})`;
}
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("coordsFromDeg", child1);
  main.import("pointOnCircle", child1);
  main.import("line", child1);
  main.import("pointOnLine", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  const child3 = runtime.module(define3);
  main.import("inputsGroup", child3);
  return main;
}
