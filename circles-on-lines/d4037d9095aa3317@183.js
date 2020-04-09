// https://observablehq.com/@timhau/circles-on-lines@183
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# circles on lines

just being bored and staying at home.`
)});
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button>replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","DOM","width","height","coordsFromDeg","Promises","line","pointOnLine","circle"], async function*(replay,DOM,width,height,coordsFromDeg,Promises,line,pointOnLine,circle)
{
  replay;
  const context = DOM.context2d(width, height);
  context.translate(width / 2, height / 2);

  const n = 92; // must be even
  const points = [];
  for (let i = 0; i < n; ++i) {
    const p = coordsFromDeg(i * (360 / n), 300);
    points.push(p);
  }

  const lines = [];
  const times = [];
  const signs = [];
  for (let i = 0; i < n / 2; ++i) {
    const l = [points[i], points[n / 2 + i]];
    times.push(0);
    signs.push(1);
    lines.push(l);
  }

  yield context.canvas;
  let numL = 0;
  let t = 0;
  while (true) {
    await Promises.delay(10);
    context.clearRect(-width / 2, -height / 2, width, height);

    for (let i = 0; i <= numL; ++i) {
      line(...lines[i], context, { color: 'rgba(100,100,100,0.3)' });
      const q = pointOnLine(lines[i], times[i]);
      circle([...q, 3], context);
      times[i] += signs[i] * 0.0033;
      if (times[i] < 0 || times[i] > 1) signs[i] *= -1;
    }

    if (numL < lines.length - 1 && t % 20 === 19) {
      numL++;
    }

    t++;
  }
}
);
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width / 1.5
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("line", child1);
  main.import("pointOnLine", child1);
  main.import("coordsFromDeg", child1);
  return main;
}
