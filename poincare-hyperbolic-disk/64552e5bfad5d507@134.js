// https://observablehq.com/@timhau/poincare-hyperbolic-disk@134
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Poincaré hyperbolic disk

I am still trying to understand the basics of non-euclidean geometry and therefor can not talk to much in detail about it. But I can say that the Poincaré disk looks nice.
As I understood it is basically a geometry that can be constructed in which the parallel postulate does not hold.
The parallel postulate is one of the five axioms of geometry that Euclid (~300 BC) wrote about in his book "Elements". In short it states, that parallel lines don't intersect (totally not formal correct, i know.) You can read more about it [here](https://mathcs.clarku.edu/~djoyce/java/elements/bookI/post5.html).
In the Poincaré disk an arc that is orthogonal to the disk is thought of as a straight line.

----
#### Refs
[jason davis](https://www.jasondavies.com/poincare-disc/) \t
[haishi's blog](https://haishibai.blogspot.com/2010/07/draw-hyperbolic-geometry-poincare-disc.html) \t
[wikipedia](https://en.wikipedia.org/wiki/Poincar%C3%A9_disk_model) \t
[bijkeng](https://bjlkeng.github.io/posts/hyperbolic-geometry-and-poincare-embeddings/)
`
)});
  main.variable(observer()).define(["DOM","width","n","circle"], function(DOM,width,n,circle)
{
  const context = DOM.context2d(width, width);
  context.translate(width / 4, width / 4);
  const r = width / 2;
  context.beginPath();
  context.arc(width / 4, width / 4, r / 2, 0, Math.PI * 2, false);
  context.clip();

  function arc(r, q1, q2) {
    const f = (q2 - q1) / 2;
    const dq = Math.abs(f);
    const ra = r * Math.tan(dq);
    const rp = Math.sqrt(ra ** 2 + r ** 2);
    const cx = r + rp * Math.cos(q1 + f);
    const cy = r + rp * Math.sin(q1 + f);
    const beta = Math.PI - dq * 2;
    const k = Math.PI / 2 + q2;
    return [cx, cy, ra];
  }

  for (let i = 1.5; i <= n; i = i * 2) {
    for (let j = 0; j < Math.PI * 2; j += Math.PI / i) {
      const q = j + Math.PI / i;
      const a = arc(r / 2, j, q);
      circle(a, context, { fill: false });
    }
  }

  return context.canvas;
}
);
  main.variable(observer("viewof n")).define("viewof n", ["slider"], function(slider){return(
slider({
  title: "n",
  min: 2,
  max: 300,
  step: 1,
  value: 140
})
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  return main;
}
