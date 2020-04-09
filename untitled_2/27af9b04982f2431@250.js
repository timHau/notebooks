// https://observablehq.com/@timhau/untitled/2@250
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# simson line

Given a triangle and a point P on its circumcircle (circle through all its points), for every side of the triangle find the closest point to that point P (the closest point can also be on the extended line of one of the triangle sides). Then these points are collinear and the line through them is called the **Simson line**

Ref: http://mathworld.wolfram.com/SimsonLine.html
`
)});
  const child1 = runtime.module(define1);
  main.import("template", child1);
  main.import("drawStatic", child1);
  main.import("circle", child1);
  main.import("triangle", child1);
  main.import("circumcircle", child1);
  main.import("pointOnCircle", child1);
  main.import("dist2D", child1);
  main.import("radToDeg", child1);
  main.import("coordsFromDeg", child1);
  main.import("getAlphaBetweenPoints", child1);
  main.import("lineThrough", child1);
  main.import("line", child1);
  main.variable(observer()).define(["DOM","width","moveTriangle","now","triangle","circumcircle","circle","deltoid","deltoidN","pointOnCircle","angle","simsonLine"], function(DOM,width,moveTriangle,now,triangle,circumcircle,circle,deltoid,deltoidN,pointOnCircle,angle,simsonLine)
{
  const height = 800;
  const context = DOM.context2d(width, height);

  const t1 = moveTriangle ? Math.sin(now / 1000) * 150 : 0;
  const t2 = moveTriangle ? Math.cos(now / 1000) * 200 : 0;

  const tr = [
    [width / 2 - 200 + t1, height / 2 - t2, 3],
    [width / 2 + 200 - t2, height / 2 + t1, 3],
    [width / 2 - 100, height / 2 - 200, 3]
  ];

  triangle(tr, context, { lineWidth: 1 });

  const cc = circumcircle(tr);
  circle(cc, context, { fill: false });

  if (deltoid) {
    const n = deltoidN;
    for (let i = 0; i < n; ++i) {
      const point = pointOnCircle(cc, i * (360 / n) + angle, context);
      circle([...point, 3], context);
      simsonLine(tr, point, context);
    }
  } else {
    const point = pointOnCircle(cc, angle, context);
    circle([...point, 3], context);
    simsonLine(tr, point, context);
  }

  return context.canvas;
}
);
  main.variable(observer("viewof showHelpers")).define("viewof showHelpers", ["html"], function(html){return(
html`<input type="checkbox" checked/>`
)});
  main.variable(observer("showHelpers")).define("showHelpers", ["Generators", "viewof showHelpers"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`This is true for all triangles. Move the points:`
)});
  main.variable(observer("viewof moveTriangle")).define("viewof moveTriangle", ["html"], function(html){return(
html`<input type="checkbox"/>`
)});
  main.variable(observer("moveTriangle")).define("moveTriangle", ["Generators", "viewof moveTriangle"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`This is also true for every point on the circumcircle:`
)});
  main.variable(observer("viewof angle")).define("viewof angle", ["html"], function(html){return(
html`<input type="range" min="0" max="359" value="123" />`
)});
  main.variable(observer("angle")).define("angle", ["Generators", "viewof angle"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`If you show the Simson line for multiple points, you get beautiful shape. It is called a _deltoid_.`
)});
  main.variable(observer("viewof deltoid")).define("viewof deltoid", ["html"], function(html){return(
html`<input type="checkbox"/>`
)});
  main.variable(observer("deltoid")).define("deltoid", ["Generators", "viewof deltoid"], (G, _) => G.input(_));
  main.variable(observer("viewof deltoidN")).define("viewof deltoidN", ["html"], function(html){return(
html`<input type="range" min="1" max="100" value="20" />`
)});
  main.variable(observer("deltoidN")).define("deltoidN", ["Generators", "viewof deltoidN"], (G, _) => G.input(_));
  main.variable(observer("simsonLine")).define("simsonLine", ["coordsFromDeg","getAlphaBetweenPoints","line","interpolate","project","circle","showHelpers","deltoid","lineThrough"], function(coordsFromDeg,getAlphaBetweenPoints,line,interpolate,project,circle,showHelpers,deltoid,lineThrough){return(
function simsonLine(triangle, point, context) {
  const trl = triangle.length;
  const sp = [];
  triangle.forEach((_, i) => {
    const np = triangle[(i + 1) % trl];
    const p1 = coordsFromDeg(
      getAlphaBetweenPoints(triangle[i], np),
      10000,
      triangle[i]
    );
    const p2 = coordsFromDeg(
      getAlphaBetweenPoints(triangle[i], np),
      -10000,
      triangle[i]
    );
    line(p1, p2, context, { lineWidth: 1, dash: [5, 10] });
    const p = interpolate(
      p1,
      p2,
      Math.max(0, Math.min(1, project(p1, p2, point)))
    );
    circle([...p, 3], context);
    sp.push(p);

    if (showHelpers && !deltoid) {
      line(point, p, context, { lineWidth: 1, dash: [5, 10] });
    }
  });

  const sAngle = getAlphaBetweenPoints(sp[0], sp[2]);
  lineThrough(sp[1], sAngle, context, { color: "red", lineWidth: 1 });
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Could not be possible without: https://beta.observablehq.com/@mbostock/closest-point-on-line`
)});
  main.variable(observer("project")).define("project", function(){return(
function project([x1, y1], [x2, y2], [x3, y3]) {
  const x21 = x2 - x1,
    y21 = y2 - y1;
  const x31 = x3 - x1,
    y31 = y3 - y1;
  return (x31 * x21 + y31 * y21) / (x21 * x21 + y21 * y21);
}
)});
  main.variable(observer("interpolate")).define("interpolate", function(){return(
function interpolate([x1, y1], [x2, y2], t) {
  return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
}
)});
  return main;
}
