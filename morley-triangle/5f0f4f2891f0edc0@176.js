// https://observablehq.com/@timhau/morley-triangle@176
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Morley triangle

The first Morley triangle is constructed from the pairwise intersection of the angle trisectors.  

Ref: http://mathworld.wolfram.com/FirstMorleyTriangle.html`
)});
  const child1 = runtime.module(define1);
  main.import("triangle", child1);
  main.import("sss", child1);
  main.import("radToDeg", child1);
  main.import("lineThrough", child1);
  main.import("getAlphaBetweenPoints", child1);
  main.import("intersectionLL", child1);
  main.import("circle", child1);
  main.import("line", child1);
  main.variable(observer()).define(["DOM","width","sss","radToDeg","triangle","getAlphaBetweenPoints","lineThrough","intersectionLL","circle"], function(DOM,width,sss,radToDeg,triangle,getAlphaBetweenPoints,lineThrough,intersectionLL,circle)
{
  const height = 800;
  const context = DOM.context2d(width, height);
  context.font = "16px sans-serif";
  const dash = [5, 10];
  const letters = ["A", "B", "C"];
  const p = [
    [width / 2 - 200, height / 2 + 100, 3],
    [width / 2 + 280, height / 2 + 100, 3],
    [width / 2 - 100, height / 2 - 200, 3]
  ];
  const angles = sss(p).map(r => radToDeg(r));

  triangle(p, context, { lineWidth: 1 });

  const trisectors = [];
  for (let i = 0; i < 3; ++i) {
    context.fillText(letters[i], p[i][0] + 10, p[i][1] + 10);

    const sa = getAlphaBetweenPoints(p[i], p[(i + 1) % p.length]);
    const t1 = lineThrough(p[i], sa - angles[i] / 3 - angles[i] / 3, context, {
      lineWidth: 0.5
    });

    const t2 = lineThrough(p[i], sa - angles[i] / 3, context, {
      lineWidth: 0.5
    });

    trisectors.push({
      point: i,
      t1,
      t2
    });
  }

  const morleyP = {};
  for (let i = 0; i < 3; ++i) {
    const otherp = trisectors.filter(t => t.point !== i);
    const p1 = intersectionLL(otherp[0].t2, otherp[1].t1);
    circle([...p1, 3], context);
    morleyP[letters[i] + "1"] = p1;
    const p2 = intersectionLL(otherp[0].t1, otherp[1].t2);
    circle([...p2, 3], context);
    morleyP[letters[i] + "2"] = p2;
  }

  triangle([morleyP["A1"], morleyP["B2"], morleyP["C1"]], context, {
    lineWidth: 1,
    color: "red"
  });
  // line(morleyP["A2"], p[0], context, { lineWidth: 1, color: "red" });
  // line(morleyP["B1"], p[1], context, { lineWidth: 1, color: "red" });
  // line(morleyP["C2"], p[2], context, { lineWidth: 1, color: "red" });

  return context.canvas;
}
);
  return main;
}
