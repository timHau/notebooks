// https://observablehq.com/@timhau/nine-point-circle@923
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# nine-point circle

The nine-point circle is named after the nine significant concyclic points that it passes through. Those nine points are:

+ The midpoint of each triangle side
+ The foot of each altitude
+ The midpoint of the line segment from each vertex of the triangle to the orthocenter

### construction

The center of the nine-point circle, often called nine-point center, lies on the [euler line]( https://beta.observablehq.com/@timhau/euler-line) (green) and is located at the midpoint between the orthocenter (intersection of the altitudes) and the center of the circumcircle.

Given the center it is of course trivial to calculate the radius. Just take the distance from the center to one of the nine points.

Refs:

https://en.wikipedia.org/wiki/Nine-point_circle

https://en.wikipedia.org/wiki/Nine-point_center
     `
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("drawStatic", child1);
  main.import("drawLoop", child1);
  main.import("pointOnCircle", child1);
  main.import("line", child1);
  main.import("sss", child1);
  main.import("triangle", child1);
  main.import("dist2D", child1);
  main.import("template", child1);
  main.import("getAlphaBetweenPoints", child1);
  main.import("linesFromPoints", child1);
  main.import("coordsFromDeg", child1);
  main.import("orthocenter", child1);
  main.import("circumcircle", child1);
  main.import("lineThrough", child1);
  main.variable(observer()).define(["toggle","now","triangle","sss","altitude","circle","line","orthocenter","circumcircle","getAlphaBetweenPoints","lineThrough","middleBetween","dist2D","template","drawLoop"], function(toggle,now,triangle,sss,altitude,circle,line,orthocenter,circumcircle,getAlphaBetweenPoints,lineThrough,middleBetween,dist2D,template,drawLoop)
{
  function main(context, scale) {
    return () => {
      const t = toggle ? Math.sin(now / 1000) / 2 : 0;
      const w = toggle ? Math.cos(now / 1000) / 2.5 : 0;
      const p = [
        [-250 / scale + t, 120 / scale, 3 / scale],
        [400 / scale, 180 / scale + w, 3 / scale],
        [-50 / scale, -250 / scale, 3 / scale]
      ];

      triangle(p, context, { lineWidth: 1 / scale });

      const angles = sss(p);

      const altidutes = altitude(p, angles);
      altidutes.forEach((point, i) => {
        circle([...point, 3 / scale], context, { color: "red" });
        line(point, p[i], context, { lineWidth: 1 / scale });
      });

      const oc = orthocenter(p, ...angles);
      circle([...oc, 3 / scale], context, { lineWidth: 1 / scale });

      const cc = circumcircle(p);
      circle(cc, context, {
        fill: false,
        dash: [5 / scale, 10 / scale],
        lineWidth: 1 / scale
      });
      circle([cc[0], cc[1], 3 / scale], context, { lineWidth: 1 / scale });

      const angleOcCc = getAlphaBetweenPoints(oc, cc);
      const eulerLine = lineThrough(cc, angleOcCc, context, {
        color: "rgba(0, 255, 0, 0.8)",
        lineWidth: 1 / scale
      });

      const npc = middleBetween(cc, oc);
      circle([...npc, 3 / scale], context, {
        color: "red",
        lineWidth: 1 / scale
      });

      const midps = [];
      for (let i = 0; i < p.length; i++) {
        const mid = middleBetween(p[i], p[(i + 1) % p.length]);
        midps.push(mid);
        circle([...mid, 3 / scale], context, {
          color: "red",
          lineWidth: 1 / scale
        });
      }

      const r = dist2D(npc, midps[0]);
      circle([...npc, r], context, {
        fill: false,
        color: "red",
        lineWidth: 1 / scale
      });

      p.forEach(point => {
        circle([...middleBetween(oc, point), 3 / scale], context, {
          color: "red",
          lineWidth: 1 / scale
        });
      });
    };
  }
  return template(drawLoop, main);
}
);
  main.variable(observer("viewof toggle")).define("viewof toggle", ["html"], function(html){return(
html`<input type="checkbox" />`
)});
  main.variable(observer("toggle")).define("toggle", ["Generators", "viewof toggle"], (G, _) => G.input(_));
  main.variable(observer("altitude")).define("altitude", ["linesFromPoints","getAlphaBetweenPoints","coordsFromDeg"], function(linesFromPoints,getAlphaBetweenPoints,coordsFromDeg){return(
function altitude([p1, p2, p3], [alpha, beta, gamma]) {
  // not reliable for all triangles...
  const [a, b, c] = linesFromPoints([p1, p2, p3]);

  const ar = b * Math.cos(alpha);
  const angleR = getAlphaBetweenPoints(p1, p2);
  const r = coordsFromDeg(angleR, ar, p1);

  const bs = c * Math.cos(beta);
  const angleS = getAlphaBetweenPoints(p2, p3);
  const s = coordsFromDeg(angleS, bs, p2);

  const ct = a * Math.cos(gamma);
  const angleT = getAlphaBetweenPoints(p1, p3);
  const t = coordsFromDeg(angleT, -ct, p3);

  return [s, t, r];
}
)});
  main.variable(observer("middleBetween")).define("middleBetween", ["getAlphaBetweenPoints","dist2D","coordsFromDeg"], function(getAlphaBetweenPoints,dist2D,coordsFromDeg){return(
function middleBetween(a, b, dir = -1) {
  const alpha = getAlphaBetweenPoints(a, b);
  const middle = dist2D(a, b) / 2;
  return coordsFromDeg(alpha, middle * dir, b);
}
)});
  return main;
}
