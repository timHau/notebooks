// https://observablehq.com/@timhau/lindenmayer-system@866
import define1 from "./e93997d5089d7165@2227.js";
import define2 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Lindenmayer System

An Lindenmayer system or L-sytem is a parallel rewriting system and a type of formal grammar. An L-system consists of an alphabet of symbols that can be used to make strings, a collection of production rules that expand each symbol into some larger string of symbols, an initial "axiom" string from which to begin construction, and a mechanism for translating the generated strings into geometric structures. L-systems were introduced and developed in 1968 by Aristid Lindenmayer. 

Wikipedia: https://en.wikipedia.org/wiki/L-system

Wolfram: http://mathworld.wolfram.com/LindenmayerSystem.html

-----
`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`# Dragon Curve

### angle: 90
### axiom: FA
### rules: ${tex`A \rightarrow\space A-BF-\space,\quad B \rightarrow\space +FA+B`}`
)});
  main.variable(observer()).define(["DOM","width","height","lsys","iterationsDC","dragoncurve","draw"], function(DOM,width,height,lsys,iterationsDC,dragoncurve,draw)
{
  const context = DOM.context2d(width, height);
  const l = lsys(iterationsDC, dragoncurve.axiom, dragoncurve);
  draw(l, dragoncurve, context);

  return context.canvas;
}
);
  main.variable(observer("viewof iterationsDC")).define("viewof iterationsDC", ["slider"], function(slider){return(
slider({
  title: "number of iterations (dragon curve)",
  min: 1,
  max: 20,
  step: 1,
  value: 23
})
)});
  main.variable(observer("iterationsDC")).define("iterationsDC", ["Generators", "viewof iterationsDC"], (G, _) => G.input(_));
  main.variable(observer("viewof angleDC")).define("viewof angleDC", ["slider"], function(slider){return(
slider({
  title: "angle (dragon curve)",
  min: 1,
  max: 360,
  step: 1,
  value: 90
})
)});
  main.variable(observer("angleDC")).define("angleDC", ["Generators", "viewof angleDC"], (G, _) => G.input(_));
  main.variable(observer("viewof stepDC")).define("viewof stepDC", ["slider","width","iterationsDC"], function(slider,width,iterationsDC){return(
slider({
  title: "step (dragon curve)",
  min: 0.001,
  max: 30,
  step: 0.001,
  value: width / (iterationsDC * 90)
})
)});
  main.variable(observer("stepDC")).define("stepDC", ["Generators", "viewof stepDC"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`
-----
# Sierpinski triangle

### angle: 60
### axiom: A
### rules: ${tex`A \rightarrow\space B-A-B\space,\quad B \rightarrow\space A+B+A`}`
)});
  main.variable(observer()).define(["DOM","width","height","lsys","iterationsS","sierpinski","draw"], function(DOM,width,height,lsys,iterationsS,sierpinski,draw)
{
  const context = DOM.context2d(width, height);
  const l = lsys(iterationsS, sierpinski.axiom, sierpinski);
  draw(l, sierpinski, context);

  return context.canvas;
}
);
  main.variable(observer("viewof iterationsS")).define("viewof iterationsS", ["slider"], function(slider){return(
slider({
  title: "number of iterations (Sierpinski Triangle)",
  min: 1,
  max: 9,
  step: 1,
  value: 9
})
)});
  main.variable(observer("iterationsS")).define("iterationsS", ["Generators", "viewof iterationsS"], (G, _) => G.input(_));
  main.variable(observer("viewof angleS")).define("viewof angleS", ["slider"], function(slider){return(
slider({
  title: "angle (Sierpinski Triangle)",
  min: 1,
  max: 360,
  step: 1,
  value: 60
})
)});
  main.variable(observer("angleS")).define("angleS", ["Generators", "viewof angleS"], (G, _) => G.input(_));
  main.variable(observer("viewof stepS")).define("viewof stepS", ["slider","width","iterationsS"], function(slider,width,iterationsS){return(
slider({
  title: "step (Sierpinski Triangle)",
  min: 0.001,
  max: 30,
  step: 0.001,
  value: width / (iterationsS * 60)
})
)});
  main.variable(observer("stepS")).define("stepS", ["Generators", "viewof stepS"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`
-----
# Box fractal

### angle: 90
### axiom: F+F+F+F
### rules: ${tex`F \rightarrow\space F+F-F-F+F\space`}`
)});
  main.variable(observer()).define(["DOM","width","height","lsys","iterationsB","boxfractal","draw"], function(DOM,width,height,lsys,iterationsB,boxfractal,draw)
{
  const context = DOM.context2d(width, height);
  const l = lsys(iterationsB, boxfractal.axiom, boxfractal);
  draw(l, boxfractal, context);

  return context.canvas;
}
);
  main.variable(observer("viewof iterationsB")).define("viewof iterationsB", ["slider"], function(slider){return(
slider({
  title: "number of iterations (Box fractal)",
  min: 1,
  max: 6,
  step: 1,
  value: 6
})
)});
  main.variable(observer("iterationsB")).define("iterationsB", ["Generators", "viewof iterationsB"], (G, _) => G.input(_));
  main.variable(observer("viewof angleB")).define("viewof angleB", ["slider"], function(slider){return(
slider({
  title: "angle (Box fractal)",
  min: 1,
  max: 360,
  step: 1,
  value: 90
})
)});
  main.variable(observer("angleB")).define("angleB", ["Generators", "viewof angleB"], (G, _) => G.input(_));
  main.variable(observer("viewof stepB")).define("viewof stepB", ["slider","width","iterationsB"], function(slider,width,iterationsB){return(
slider({
  title: "step (Box fractal)",
  min: 0.001,
  max: 30,
  step: 0.001,
  value: width / (iterationsB * 125)
})
)});
  main.variable(observer("stepB")).define("stepB", ["Generators", "viewof stepB"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`
-----
# Hilbert curve

### angle: 90
### axiom: A
### rules: ${tex`A \rightarrow\space +BF-AFA-FB+\space, B \rightarrow\space -AF+BFB+FA-`}`
)});
  main.variable(observer()).define(["DOM","width","height","lsys","iterationsH","hilbertcurve","draw"], function(DOM,width,height,lsys,iterationsH,hilbertcurve,draw)
{
  const context = DOM.context2d(width, height);
  const l = lsys(iterationsH, hilbertcurve.axiom, hilbertcurve);
  draw(l, hilbertcurve, context);

  return context.canvas;
}
);
  main.variable(observer("viewof iterationsH")).define("viewof iterationsH", ["slider"], function(slider){return(
slider({
  title: "number of iterations (Hilbert curve)",
  min: 1,
  max: 7,
  step: 1,
  value: 7
})
)});
  main.variable(observer("iterationsH")).define("iterationsH", ["Generators", "viewof iterationsH"], (G, _) => G.input(_));
  main.variable(observer("viewof angleH")).define("viewof angleH", ["slider"], function(slider){return(
slider({
  title: "angle (Hilbert curve)",
  min: 1,
  max: 360,
  step: 1,
  value: 90
})
)});
  main.variable(observer("angleH")).define("angleH", ["Generators", "viewof angleH"], (G, _) => G.input(_));
  main.variable(observer("viewof stepH")).define("viewof stepH", ["slider","width","iterationsH"], function(slider,width,iterationsH){return(
slider({
  title: "step (Hilbert curve)",
  min: 0.001,
  max: 30,
  step: 0.001,
  value: width / (iterationsH * 20)
})
)});
  main.variable(observer("stepH")).define("stepH", ["Generators", "viewof stepH"], (G, _) => G.input(_));
  main.variable(observer("height")).define("height", function(){return(
1000
)});
  main.variable(observer("dragoncurve")).define("dragoncurve", ["stepDC","width","height","angleDC"], function(stepDC,width,height,angleDC){return(
{
  step: stepDC,
  pos: [width / 2 + 200, height / 2],
  axiom: "FA",
  rules: {
    A: "A-BF-",
    B: "+FA+B"
  },
  meaning: {
    "+": angleDC,
    "-": -angleDC,
    F: "draw"
  }
}
)});
  main.variable(observer("sierpinski")).define("sierpinski", ["stepS","height","angleS"], function(stepS,height,angleS){return(
{
  step: stepS,
  pos: [0, (height * 5) / 6],
  axiom: "A",
  rules: {
    A: "B-A-B",
    B: "A+B+A"
  },
  meaning: {
    "+": angleS,
    "-": -angleS,
    A: "draw",
    B: "draw"
  }
}
)});
  main.variable(observer("boxfractal")).define("boxfractal", ["stepB","angleB"], function(stepB,angleB){return(
{
  step: stepB,
  pos: [0, 0],
  axiom: "F+F+F+F",
  rules: {
    F: "F+F-F-F+F"
  },
  meaning: {
    "+": angleB,
    "-": -angleB,
    F: "draw"
  }
}
)});
  main.variable(observer("hilbertcurve")).define("hilbertcurve", ["stepH","angleH"], function(stepH,angleH){return(
{
  step: stepH,
  pos: [0, 0],
  axiom: "A",
  rules: {
    A: "+BF-AFA-FB+",
    B: "-AF+BFB+FA-"
  },
  meaning: {
    "+": angleH,
    "-": -angleH,
    F: "draw"
  }
}
)});
  main.variable(observer("lsys")).define("lsys", ["modifyPattern"], function(modifyPattern){return(
function lsys(n, pattern, config) {
  if (n === 0) return pattern;
  return lsys(n - 1, modifyPattern(pattern, config), config);
}
)});
  main.variable(observer("modifyPattern")).define("modifyPattern", function(){return(
function modifyPattern(p, config) {
  let nextPattern = "";
  for (let i = 0; i < p.length; ++i) {
    const np = config.rules[p[i]];
    if (np) {
      nextPattern += np;
    } else {
      nextPattern += p[i];
    }
  }
  return nextPattern;
}
)});
  main.variable(observer("draw")).define("draw", ["drawSegment"], function(drawSegment){return(
function draw(p, config, context) {
  context.beginPath();
  const [x, y] = config.pos;
  context.moveTo(x, y);
  context.strokeStyle = "black";

  drawSegment(p, config, context);

  context.stroke();
}
)});
  main.variable(observer("drawSegment")).define("drawSegment", ["coordsFromDeg"], function(coordsFromDeg){return(
function drawSegment(s, config, context) {
  let nextAngle = 0;
  let prev = config.pos;
  for (let i = 0; i < s.length; ++i) {
    if (config.meaning[s[i]] === "draw") {
      prev = coordsFromDeg(nextAngle, config.step, prev);
      context.lineTo(prev[0], prev[1]);
      continue;
    }
    const na = config.meaning[s[i]];
    if (na) nextAngle += na;
  }
}
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("select", child1);
  const child2 = runtime.module(define2);
  main.import("coordsFromDeg", child2);
  return main;
}
