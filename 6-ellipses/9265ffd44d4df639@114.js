// https://observablehq.com/@timhau/6-ellipses@114
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 6 ellipses

Inspired by [this tweet](https://twitter.com/Matematickcom/status/1108006843278913536)`
)});
  main.variable(observer("viewof innerRadius")).define("viewof innerRadius", ["slider"], function(slider){return(
slider({
  value: 300,
  min: 1,
  max: 500,
  step: 1,
  description: "Radius of rotating circle"
})
)});
  main.variable(observer("innerRadius")).define("innerRadius", ["Generators", "viewof innerRadius"], (G, _) => G.input(_));
  main.variable(observer("viewof outerRadius")).define("viewof outerRadius", ["slider"], function(slider){return(
slider({
  value: 150,
  min: 1,
  max: 300,
  step: 1,
  description: "Radius of rotating circle"
})
)});
  main.variable(observer("outerRadius")).define("outerRadius", ["Generators", "viewof outerRadius"], (G, _) => G.input(_));
  main.variable(observer("nOuter")).define("nOuter", function(){return(
10
)});
  main.variable(observer()).define(["DOM","width","Promises","innerRadius","circle","pointOnCircle","outerRadius","nOuter","drawTrace"], function*(DOM,width,Promises,innerRadius,circle,pointOnCircle,outerRadius,nOuter,drawTrace)
{
  const context = DOM.context2d(width, width);
  context.translate(width / 2, width / 2);
  let t = 0;
  let trace = [];

  while (true) {
    yield Promises.delay(10).then(() => {
      t += 1;
      context.clearRect(-width / 2, -width / 2, width, width);

      const oc = [0, 0, innerRadius];
      circle(oc, context, {
        fill: false,
        color: "rgba(150,150,150,0.8)"
      });

      const ic = [...pointOnCircle(oc, t), outerRadius];
      circle(ic, context, {
        fill: false
      });

      let positions = [];
      for (let i = 0; i < nOuter; ++i) {
        const p = [...pointOnCircle(ic, (360 / nOuter) * i - t), 3];
        circle(p, context);
        positions.push(p);
      }
      trace.push(positions);

      if (trace.length >= 400) trace.shift();

      drawTrace(trace, context);

      return context.canvas;
    });
  }
}
);
  main.variable(observer("drawTrace")).define("drawTrace", ["line"], function(line){return(
function drawTrace(trace, context) {
  for (let i = 0; i < trace.length - 1; ++i) {
    for (let j = 0; j < trace[i].length; ++j) {
      line(trace[i][j], trace[i + 1][j], context);
    }
  }
}
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("pointOnCircle", child1);
  main.import("line", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  return main;
}
