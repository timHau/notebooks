// https://observablehq.com/@timhau/symmediane@753
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Symmedians

In geometry, symmedians are three particular geometrical lines associated with every triangle. They are constructed by taking a median of the triangle (a line connecting a vertex with the midpoint of the opposite side), and reflecting the line over the corresponding angle bisector (the line through the same vertex that divides the angle there in half). The angle formed by the symmedian and the angle bisector has the same measure as the angle between the median and the angle bisector, but it is on the other side of the angle bisector.

Ref: https://en.wikipedia.org/wiki/Symmedian`
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("drawStatic", child1);
  main.import("halfDeg", child1);
  main.import("pointOnCircle", child1);
  main.import("line", child1);
  main.import("sss", child1);
  main.import("triangle", child1);
  main.import("dist2D", child1);
  main.import("template", child1);
  main.import("getAlphaBetweenPoints", child1);
  main.import("linesFromPoints", child1);
  main.import("coordsFromDeg", child1);
  main.import("lineThrough", child1);
  main.variable(observer()).define(["linesFromPoints","getAlphaBetweenPoints","coordsFromDeg","lineThrough","triangle","sss","circle","line","halfDeg","template","drawStatic"], function(linesFromPoints,getAlphaBetweenPoints,coordsFromDeg,lineThrough,triangle,sss,circle,line,halfDeg,template,drawStatic)
{
  function main(context, scale) {
    const p = [
      [-250 / scale, 120 / scale, 3 / scale],
      [400 / scale, 180 / scale, 3 / scale],
      [200 / scale, -250 / scale, 3 / scale]
    ];
    const pl = p.length;

    function altitude([p1, p2, p3], [alpha, beta, gamma]) {
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

      return [[s, angleS, bs], [t, angleT, ct], [r, angleR, ar]];
    }

    function symmedian(p, degAlti, halfDeg) {
      const symDeg = halfDeg - degAlti;
      lineThrough(p, halfDeg + symDeg, context, {
        color: "red",
        lineWidth: 1 / scale
      });
    }

    const dash = [5 / scale, 10 / scale];

    return () => {
      triangle(p, context, { lineWidth: 1 / scale });

      const angles = sss(p);
      const altidutes = altitude(p, angles);
      altidutes.forEach(([point, angle, len], i) => {
        circle([...point, 3 / scale], context);
        line(point, p[i], context, { lineWidth: 1 / scale });
        const hd = halfDeg(p[i], p[(i + 1) % pl], p[(i + 2) % pl]);
        lineThrough(p[i], hd, context, { dash, lineWidth: 1 / scale });
        symmedian(p[i], angle + 90, hd);
      });
    };
  }
  return template(drawStatic, main);
}
);
  return main;
}
