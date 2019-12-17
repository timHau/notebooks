// https://observablehq.com/@timhau/farey-map@295
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2209.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`# Farey map

The basic idea is to connect two fractions ${tex`\frac{a}{c}, \frac{b}{d}`} when ${tex`ad - bc = \pm 1`}.

Ref: [this paper](https://arxiv.org/pdf/1909.08568.pdf) from Ioannis Ivrissimtzis David Singerman and James Strudwick. original drawn by Jan Karabaš`
)});
  main.variable(observer("viewof n")).define("viewof n", ["slider"], function(slider){return(
slider({
  value: 9,
  min: 1,
  max: 40,
  step: 1,
  description: "maximal denominator"
})
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer()).define(["DOM","width","line","points","pointOnLine","circle","n","dist2D"], function(DOM,width,line,points,pointOnLine,circle,n,dist2D)
{
  const context = DOM.context2d(width, width - width / 5);
  context.textAlign = "center";

  // number line
  const offset = 20;
  const start = [offset, width / 2 + 100];
  const end = [width - offset, width / 2 + 100];
  line(start, end, context);

  const connected = {};
  for (let i = 0; i < points.length; ++i) {
    connected[i] = [];
  }

  for (let i = 0; i < points.length; ++i) {
    const [nom, denom] = points[i];
    const val = nom / denom;
    const p = pointOnLine([start, end], val);
    circle([...p, 2], context);

    if (n < 20) {
      if (val === 0 || val === 1) {
        context.fillText(nom, p[0], p[1] + 15);
      } else {
        context.fillText(nom, p[0], p[1] + 15);
        context.fillText("－", p[0], p[1] + 22);
        context.fillText(denom, p[0], p[1] + 28);
      }
    }

    for (let j = 0; j < points.length; ++j) {
      const [otherNom, otherDenom] = points[j];
      const otherVal = otherNom / otherDenom;
      const criteria = otherNom * denom - otherDenom * nom;

      if (Math.abs(criteria) === 1 && !connected[j].includes(i)) {
        const other = pointOnLine([start, end], otherVal);
        const half = (otherVal + nom / denom) / 2;
        const halfPoint = pointOnLine([start, end], half);
        context.beginPath();
        context.arc(...halfPoint, dist2D(p, other) / 2, 0, Math.PI, 1);
        context.stroke();
        connected[i].push(j);
      }
    }
  }

  return context.canvas;
}
);
  main.variable(observer("points")).define("points", ["n"], function(n)
{
  const res = [];

  for (let denom = 1; denom <= n; ++denom) {
    for (let nom = 0; nom <= denom; ++nom) {
      const value = nom / denom;
      const found = res.filter(([n, d]) => n / d === value);
      if (found.length === 0) {
        res.push([nom, denom]);
      }
    }
  }

  return res;
}
);
  const child1 = runtime.module(define1);
  main.import("line", child1);
  main.import("circle", child1);
  main.import("pointOnLine", child1);
  main.import("dist2D", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  return main;
}
