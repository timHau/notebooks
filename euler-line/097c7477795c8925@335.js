// https://observablehq.com/@timhau/euler-line@335
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Euler Line

The Euler line of a triangle passes through the orthocenter (the intersection of altitudes) (blue), the centroid (the intersection of medians) (green), and the circumcenter (the intersection of perpendicular bisectors) (dotted).`
)});
  main.variable(observer()).define(["DOM","width","toggle","dist","sss","orthocenter","altitude","centroid","middleBetween","circumcircle","lineThrough","getAlphaBetweenPoints"], function*(DOM,width,toggle,dist,sss,orthocenter,altitude,centroid,middleBetween,circumcircle,lineThrough,getAlphaBetweenPoints)
{
  const height = 800;
  const context = DOM.context2d(width, height);
  const scale = (Math.min(width, height) - 4) / 3;
  const center = [1 / scale, -0.25];

  function circle([x, y, r], o) {
    const options = Object.assign(
      {
        color: "black",
        fill: true,
        dash: [0, 0]
      },
      o
    );
    context.beginPath();
    context.moveTo(x + r, y);
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.strokeStyle = options.color;
    context.setLineDash(options.dash);
    context.fillStyle = options.color;
    options.fill ? context.fill() : context.stroke();
  }

  function line([x1, y1], [x2, y2], o) {
    const options = Object.assign({ color: "black" }, o);
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = options.color;
    context.stroke();
  }

  function textAt([x, y], text) {
    context.font = `${16 / scale}px sans-serif`;
    context.fillText(text, x + 10 / scale, y + 15 / scale);
  }

  function triangle([x1, y1, r1], [x2, y2, r2], [x3, y3, r3]) {
    line([x1, y1], [x2, y2]);
    circle([x1, y1, r1]);
    textAt([x1, y1], "A");
    line([x2, y2], [x3, y3]);
    circle([x2, y2, r2]);
    textAt([x2, y2], "B");
    line([x3, y3], [x1, y1]);
    circle([x3, y3, r3]);
    textAt([x3, y3], "C");
  }

  while (true) {
    const t1 = toggle ? Math.sin(Date.now() / 1000) / 2 : 0;
    const t2 = toggle ? Math.cos(Date.now() / 1000) / 2 : 0;
    const p = [
      [-280 / scale + t1, 180 / scale, 3 / scale],
      [250 / scale, 150 / scale, 3 / scale],
      [-200 / scale, -180 / scale + t2, 3 / scale]
    ];

    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.scale(scale, scale);
    context.lineWidth = 1 / scale;

    triangle(...p);

    const a = dist(p[1], p[2]);
    const b = dist(p[0], p[2]);
    const c = dist(p[0], p[1]);

    const [alpha, beta, gamma] = sss(a, b, c);

    const oc = orthocenter(p, alpha, beta, gamma);

    const ap = altitude(a, alpha, b, beta, c, gamma, p);
    ap.map((po, i) => {
      circle(po, { color: "blue" });
      line(po, p[i], { color: "blue" });
    });
    const ce = centroid(p);

    // not ideal
    let color = "green";
    const abM = middleBetween(p[0], p[1]);
    circle(abM, { color });
    line(p[2], abM, { color });
    const bcM = middleBetween(p[1], p[2]);
    circle(bcM, { color });
    line(p[0], bcM, { color });
    const acM = middleBetween(p[0], p[2]);
    circle(acM, { color });
    line(p[1], acM, { color });

    const cc = circumcircle(p);
    circle(cc, { fill: false, center: true, dash: [5 / scale, 15 / scale] });

    // circumcenter
    circle([cc[0], cc[1], 4 / scale], { color: "red" });

    // orthocenter
    circle([...oc, 4 / scale], { color: "red" });

    // centroid
    circle([...ce, 4 / scale], { color: "red" });

    // euler line
    const [p1, p2] = lineThrough(oc, getAlphaBetweenPoints(oc, ce));
    line(p1, p2, { color: "red" });

    context.restore();
    yield context.canvas;
  }
}
);
  main.variable(observer("viewof toggle")).define("viewof toggle", ["html"], function(html){return(
html`<input type="checkbox"/>`
)});
  main.variable(observer("toggle")).define("toggle", ["Generators", "viewof toggle"], (G, _) => G.input(_));
  main.variable(observer("orthocenter")).define("orthocenter", function(){return(
function orthocenter([[x1, y1], [x2, y2], [x3, y3]], alpha, beta, gamma) {
  return [
    (x1 * Math.tan(alpha) + x2 * Math.tan(beta) + x3 * Math.tan(gamma)) /
      (Math.tan(alpha) + Math.tan(beta) + Math.tan(gamma)),
    (y1 * Math.tan(alpha) + y2 * Math.tan(beta) + y3 * Math.tan(gamma)) /
      (Math.tan(alpha) + Math.tan(beta) + Math.tan(gamma))
  ];
}
)});
  main.variable(observer("centroid")).define("centroid", function(){return(
function centroid([[xa, ya], [xb, yb], [xc, yc]]) {
  return [(xa + xb + xc) / 3, (ya + yb + yc) / 3];
}
)});
  main.variable(observer("circumcircle")).define("circumcircle", function(){return(
function circumcircle([[x1, y1], [x2, y2], [x3, y3]]) {
  // i borrowed this function from: https://beta.observablehq.com/@mbostock/circumcircle
  const a2 = x1 - x2;
  const a3 = x1 - x3;
  const b2 = y1 - y2;
  const b3 = y1 - y3;
  const d1 = x1 * x1 + y1 * y1;
  const d2 = d1 - x2 * x2 - y2 * y2;
  const d3 = d1 - x3 * x3 - y3 * y3;
  const ab = (a3 * b2 - a2 * b3) * 2;
  const xa = (b2 * d3 - b3 * d2) / ab - x1;
  const ya = (a3 * d2 - a2 * d3) / ab - y1;
  if (isNaN(xa) || isNaN(ya)) return;
  return [x1 + xa, y1 + ya, Math.sqrt(xa * xa + ya * ya)];
}
)});
  main.variable(observer("sss")).define("sss", function(){return(
function sss(a, b, c) {
  const alpha = Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c));
  const beta = Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c));
  const gamma = Math.PI - alpha - beta;

  return [alpha, beta, gamma];
}
)});
  main.variable(observer("dist")).define("dist", function(){return(
function dist([x1, y1], [x2, y2]) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
)});
  main.variable(observer("getAlphaBetweenPoints")).define("getAlphaBetweenPoints", function(){return(
function getAlphaBetweenPoints([xa, ya], [xb, yb]) {
  const w = xa - xb;
  const h = ya - yb;
  return (Math.atan2(h, w) * 180) / Math.PI;
}
)});
  main.variable(observer("degToRad")).define("degToRad", function(){return(
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}
)});
  main.variable(observer("coordsFromDeg")).define("coordsFromDeg", ["degToRad"], function(degToRad){return(
function coordsFromDeg(deg, len, [baseX, baseY, baseR]) {
  return [
    baseX + len * Math.cos(degToRad(deg)),
    baseY + len * Math.sin(degToRad(deg)),
    baseR
  ];
}
)});
  main.variable(observer("altitude")).define("altitude", ["coordsFromDeg","getAlphaBetweenPoints"], function(coordsFromDeg,getAlphaBetweenPoints){return(
function altitude(a, alpha, b, beta, c, gamma, p) {
  const ar = b * Math.cos(alpha);
  const r = coordsFromDeg(getAlphaBetweenPoints(p[1], p[0]), ar, p[0]);

  const bs = c * Math.cos(beta);
  const s = coordsFromDeg(getAlphaBetweenPoints(p[2], p[1]), bs, p[1]);

  const ct = a * Math.cos(gamma);
  const t = coordsFromDeg(getAlphaBetweenPoints(p[0], p[2]), ct, p[2]);

  return [s, t, r];
}
)});
  main.variable(observer("middleBetween")).define("middleBetween", ["getAlphaBetweenPoints","dist","coordsFromDeg"], function(getAlphaBetweenPoints,dist,coordsFromDeg){return(
function middleBetween(a, b) {
  const alpha = getAlphaBetweenPoints(a, b);
  const middle = dist(a, b) / 2;
  return coordsFromDeg(alpha, middle, b);
}
)});
  main.variable(observer("lineThrough")).define("lineThrough", ["coordsFromDeg"], function(coordsFromDeg){return(
function lineThrough(point, deg) {
  const dist = 1000;
  const p1 = coordsFromDeg(deg, dist, point);
  const p2 = coordsFromDeg(deg, -dist, point);
  return [p1, p2];
}
)});
  return main;
}
