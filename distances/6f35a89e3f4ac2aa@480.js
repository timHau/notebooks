// https://observablehq.com/@timhau/geometry@480
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# geometry

**work in progress** as i am still a huge **amateur**.

hope this will evolve over time

Usage:
\`\`\`{javascript}
import { ... } from "@timhau/geometry"
\`\`\`
`
)});
  main.variable(observer("scale")).define("scale", ["width"], function(width){return(
(Math.min(width, 800) - 4) / 3
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## constants:`
)});
  main.variable(observer("pi")).define("pi", function(){return(
Math.PI
)});
  main.variable(observer("tau")).define("tau", function(){return(
2 * Math.PI
)});
  main.variable(observer("e")).define("e", function(){return(
Math.E
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## meassure functions:`
)});
  main.variable(observer("degToRad")).define("degToRad", ["pi"], function(pi){return(
function degToRad(deg) {
  return (deg * pi) / 180;
}
)});
  main.variable(observer("radToDeg")).define("radToDeg", ["pi"], function(pi){return(
function radToDeg(rad) {
  return (rad * 180) / pi;
}
)});
  main.variable(observer("dist2D")).define("dist2D", function(){return(
function dist2D([x1, y1], [x2, y2]) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
)});
  main.variable(observer("middleBetween")).define("middleBetween", ["getAlphaBetweenPoints","dist2D","coordsFromDeg"], function(getAlphaBetweenPoints,dist2D,coordsFromDeg){return(
function middleBetween(a, b) {
  const alpha = getAlphaBetweenPoints(a, b);
  const middle = dist2D(a, b) / 2;
  return coordsFromDeg(alpha, -middle, b);
}
)});
  main.variable(observer("linesFromPoints")).define("linesFromPoints", ["dist2D"], function(dist2D){return(
function linesFromPoints([p1, p2, p3]) {
  const a = dist2D(p2, p3);
  const b = dist2D(p1, p3);
  const c = dist2D(p1, p2);
  return [a, b, c];
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## angle functions:`
)});
  main.variable(observer("halfDeg")).define("halfDeg", ["getAlphaBetweenPoints"], function(getAlphaBetweenPoints){return(
function halfDeg(a, b, c) {
  const angle1 = getAlphaBetweenPoints(a, b);
  const angle2 = getAlphaBetweenPoints(a, c);
  const halfDeg = (angle1 + angle2) / 2;
  return halfDeg;
}
)});
  main.variable(observer("getAlphaBetweenPoints")).define("getAlphaBetweenPoints", ["pi"], function(pi){return(
function getAlphaBetweenPoints([x1, y1], [x2, y2]) {
  const deltaY = y2 - y1;
  const deltaX = x2 - x1;
  const angle = Math.atan2(deltaY, deltaX);
  return (angle * 180) / pi;
}
)});
  main.variable(observer("sss")).define("sss", ["linesFromPoints","pi"], function(linesFromPoints,pi){return(
function sss(points) {
  const [a, b, c] = linesFromPoints(points);
  const alpha = Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c));
  const beta = Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c));
  const gamma = pi - alpha - beta;

  return [alpha, beta, gamma];
}
)});
  main.variable(observer("coordsFromDeg")).define("coordsFromDeg", ["degToRad"], function(degToRad){return(
function coordsFromDeg(deg, len, [baseX, baseY, baseR] = [0, 0, 0]) {
  return [
    baseX + len * Math.cos(degToRad(deg)),
    baseY + len * Math.sin(degToRad(deg))
  ];
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## circle functions:`
)});
  main.variable(observer("circle")).define("circle", ["pi"], function(pi){return(
function circle([x, y, r], context, o) {
  const options = Object.assign(
    {
      color: "black",
      fill: true,
      lineWidth: 1,
      dash: [0, 0]
    },
    o
  );
  context.beginPath();
  context.moveTo(x + r, y);
  context.arc(x, y, r, 0, 2 * pi);
  context.strokeStyle = options.color;
  context.lineWidth = options.lineWidth;
  context.setLineDash(options.dash);
  context.fillStyle = options.color;
  options.fill ? context.fill() : context.stroke();
}
)});
  main.variable(observer("halfCircle")).define("halfCircle", ["pi"], function(pi){return(
function halfCircle([x, y, r], context, o) {
  const options = Object.assign(
    {
      color: "black",
      fill: true,
      dash: [0, 0],
      cc: false
    },
    o
  );

  context.beginPath();
  context.arc(x, y, r, 0, pi, options.cc);
  context.stroke();
  context.fillStyle = "rgba(0,0,0,0.05)";
  context.fill();
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
  main.variable(observer("pointOnCircle")).define("pointOnCircle", ["coordsFromDeg"], function(coordsFromDeg){return(
function pointOnCircle([x, y, r], deg) {
  const cords = coordsFromDeg(deg, r, [x, y]);
  return cords;
}
)});
  main.variable(observer("incircleTriangle")).define("incircleTriangle", ["dist2D","radiusIncircleTriangle"], function(dist2D,radiusIncircleTriangle){return(
function incircleTriangle([[xa, ya], [xb, yb], [xc, yc]]) {
  const a = dist2D([xb, yb], [xc, yc]);
  const b = dist2D([xa, ya], [xc, yc]);
  const c = dist2D([xa, ya], [xb, yb]);

  return [
    (a * xa + b * xb + c * xc) / (c + a + b),
    (a * ya + b * yb + c * yc) / (c + a + b),
    radiusIncircleTriangle([xa, ya], [xb, yb], [xc, yc])
  ];
}
)});
  main.variable(observer("radiusIncircleTriangle")).define("radiusIncircleTriangle", ["dist2D"], function(dist2D){return(
function radiusIncircleTriangle([xa, ya], [xb, yb], [xc, yc]) {
  const a = dist2D([xb, yb], [xc, yc]);
  const b = dist2D([xa, ya], [xc, yc]);
  const c = dist2D([xa, ya], [xb, yb]);
  const p = (a + b + c) / 2;
  return Math.sqrt(p * (p - a) * (p - b) * (p - c)) / p;
}
)});
  main.variable(observer("exradii")).define("exradii", function(){return(
function exradii(a, b, c) {
  const s = 0.5 * (a + b + c);
  return Math.sqrt((s * (s - b) * (s - c)) / (s - a));
}
)});
  main.variable(observer("excenter")).define("excenter", ["dist2D","exradii"], function(dist2D,exradii){return(
function excenter([[x1, y1], [x2, y2], [x3, y3]]) {
  const a = dist2D([x2, y2], [x3, y3]);
  const b = dist2D([x3, y3], [x1, y1]);
  const c = dist2D([x1, y1], [x2, y2]);
  const exA = [
    (-a * x1 + b * x2 + c * x3) / (-a + b + c),
    (-a * y1 + b * y2 + c * y3) / (-a + b + c),
    exradii(a, b, c)
  ];
  const exB = [
    (a * x1 - b * x2 + c * x3) / (a - b + c),
    (a * y1 - b * y2 + c * y3) / (a - b + c),
    exradii(b, a, c)
  ];
  const exC = [
    (a * x1 + b * x2 - c * x3) / (a + b - c),
    (a * y1 + b * y2 - c * y3) / (a + b - c),
    exradii(c, b, a)
  ];
  return [exA, exB, exC];
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## line functions:`
)});
  main.variable(observer("line")).define("line", function(){return(
function line([x1, y1], [x2, y2], context, o) {
  const options = Object.assign(
    {
      color: "black",
      dash: [0, 0],
      lineWidth: 1
    },
    o
  );
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = options.color;
  context.setLineDash(options.dash);
  context.lineWidth = options.lineWidth;
  context.stroke();
  return [[x1, y1], [x2, y2]];
}
)});
  main.variable(observer("lineThrough")).define("lineThrough", ["coordsFromDeg","line"], function(coordsFromDeg,line){return(
function lineThrough(point, deg, context, opts) {
  const dist = 9000;
  const p1 = coordsFromDeg(deg, dist, point);
  const p2 = coordsFromDeg(deg, -dist, point);
  line(p1, p2, context, opts);
  return [p1, p2];
}
)});
  main.variable(observer("lineThroughTwoPoints")).define("lineThroughTwoPoints", ["getAlphaBetweenPoints","lineThrough"], function(getAlphaBetweenPoints,lineThrough){return(
function lineThroughTwoPoints(p1, p2, context, options) {
  const angle = getAlphaBetweenPoints(p1, p2);
  return lineThrough(p1, angle, context, options);
}
)});
  main.variable(observer("pointOnLine")).define("pointOnLine", function(){return(
function pointOnLine([[x1, y1], [x2, y2]], t) {
  const [vx, vy] = [x2 - x1, y2 - y1];
  const vlen = Math.sqrt(vx ** 2 + vy ** 2);
  const [unitx, unity] = [vx / vlen, vy / vlen];
  const [vtx, vty] = [unitx * vlen * t, unity * vlen * t];
  return [x1 + vtx, y1 + vty];
}
)});
  main.variable(observer("parallelTo")).define("parallelTo", ["middleBetween","getAlphaBetweenPoints","lineThrough","coordsFromDeg"], function(middleBetween,getAlphaBetweenPoints,lineThrough,coordsFromDeg){return(
function parallelTo(a, b, d = 0, context) {
  const middle = middleBetween(a, b);
  const angle = getAlphaBetweenPoints(a, b);
  lineThrough(coordsFromDeg(angle + 90, d, middle), angle, context);
}
)});
  main.variable(observer("tangentPoints")).define("tangentPoints", ["dist2D","getAlphaBetweenPoints","radToDeg"], function(dist2D,getAlphaBetweenPoints,radToDeg){return(
function tangentPoints([x, y, r], p) {
  const dist = dist2D([x, y], p);
  const alpha = getAlphaBetweenPoints([x, y, r], p);
  const degAlpha = radToDeg(Math.asin(r / dist)) + alpha;
  const degBeta = radToDeg(Math.asin(-r / dist)) + alpha;
  return [degAlpha, degBeta];
}
)});
  main.variable(observer("tangentThroughPoint")).define("tangentThroughPoint", ["tangentPoints","lineThrough"], function(tangentPoints,lineThrough){return(
function tangentThroughPoint(a, p, context, opts) {
  const [degAlpha, degBeta] = tangentPoints(a, p);

  lineThrough(p, degAlpha, context, opts);
  lineThrough(p, degBeta, context, opts);
  return [degAlpha, degBeta];
}
)});
  main.variable(observer("lengthTangent")).define("lengthTangent", ["dist2D"], function(dist2D){return(
function lengthTangent([x, y, r], p) {
  return Math.sqrt(dist2D([x, y], p) ** 2 - r ** 2);
}
)});
  main.variable(observer("intersectionLL")).define("intersectionLL", function(){return(
function intersectionLL([[xa1, ya1], [xa2, ya2]], [[xb1, yb1], [xb2, yb2]]) {
  // inspired by: http://www.kevlindev.com/gui/math/intersection/Intersection.js
  const ua_t = (xb2 - xb1) * (ya1 - yb1) - (yb2 - yb1) * (xa1 - xb1);
  const ub_t = (xa2 - xa1) * (ya1 - yb1) - (ya2 - ya1) * (xa1 - xb1);
  const u_b = (yb2 - yb1) * (xa2 - xa1) - (xb2 - xb1) * (ya2 - ya1);
  // coincident or parallel
  if (u_b === 0) return false;
  const ua = ua_t / u_b;
  const ub = ub_t / u_b;
  // no intersection
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false;
  return [xa1 + ua * (xa2 - xa1), ya1 + ua * (ya2 - ya1)];
}
)});
  main.variable(observer("intersectionCL")).define("intersectionCL", function(){return(
function intersectionCL([cx, cy, r], [[x1, y1], [x2, y2]]) {
  // thanks to: https://stackoverflow.com/questions/1073336/circle-line-segment-collision-detection-algorithm
  const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const [dx, dy] = [(x2 - x1) / d, (y2 - y1) / d];
  const t = dx * (cx - x1) + dy * (cy - y1);
  const [ex, ey] = [t * dx + x1, t * dy + y1];
  const dEC = Math.sqrt((ex - cx) ** 2 + (ey - cy) ** 2);

  if (dEC > r) return "outside";
  if (dEC === r) return [ex, ey]; // tangent point

  const dt = Math.sqrt(r ** 2 - dEC ** 2);
  const p1 = [(t - dt) * dx + x1, (t - dt) * dy + y1];
  const p2 = [(t + dt) * dx + x1, (t + dt) * dy + y1];
  return [p1, p2];
}
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`# ${tex`\red{TODO}`} 
check why "-lengthTangent" works`
)});
  main.variable(observer("tangentenAbschnitt")).define("tangentenAbschnitt", ["tangentPoints","coordsFromDeg","lengthTangent"], function(tangentPoints,coordsFromDeg,lengthTangent){return(
function tangentenAbschnitt(center, p) {
  // center -> [x,y,r] :: center of the circle which the tangents touch
  // p      -> [x,y,r] :: point from where the tangents start
  const [degAlpha, degBeta] = tangentPoints(center, p);

  const b1 = coordsFromDeg(degAlpha, -lengthTangent(center, p), p);
  const b2 = coordsFromDeg(degBeta, -lengthTangent(center, p), p);
  return [b1, b2];
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## triangle functions:`
)});
  main.variable(observer("triangle")).define("triangle", ["line","circle"], function(line,circle){return(
function triangle([p1, p2, p3], context, opts) {
  line(p1, p2, context, opts);
  circle(p1, context);
  line(p2, p3, context, opts);
  circle(p2, context);
  line(p3, p1, context, opts);
  circle(p3, context);
}
)});
  main.variable(observer("equiliteralTriangle")).define("equiliteralTriangle", ["dist2D","getAlphaBetweenPoints","coordsFromDeg","line"], function(dist2D,getAlphaBetweenPoints,coordsFromDeg,line){return(
function equiliteralTriangle(a, b, context, dir = 1) {
  const dist = dist2D(a, b);
  const angle = getAlphaBetweenPoints(a, b);
  const c = coordsFromDeg(dir * 60 + angle, dist, b);
  line(a, c, context);
  line(b, c, context);
  return c;
}
)});
  main.variable(observer("centroid")).define("centroid", function(){return(
function centroid([[xa, ya], [xb, yb], [xc, yc]]) {
  return [(xa + xb + xc) / 3, (ya + yb + yc) / 3];
}
)});
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
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`# ${tex`\red{TODO}`} 

altitude is technically working. quite often the length e.g. or the angles or both have to be inverted.
This might help: https://stackoverflow.com/questions/7586063/how-to-calculate-the-angle-between-a-line-and-the-`
)});
  main.variable(observer("altitude")).define("altitude", ["linesFromPoints","coordsFromDeg","getAlphaBetweenPoints"], function(linesFromPoints,coordsFromDeg,getAlphaBetweenPoints){return(
function altitude([p1, p2, p3], [alpha, beta, gamma]) {
  const [a, b, c] = linesFromPoints([p1, p2, p3]);

  const ar = b * Math.cos(alpha);
  const r = coordsFromDeg(getAlphaBetweenPoints(p1, p2), ar, p1);

  const bs = c * Math.cos(beta);
  const s = coordsFromDeg(getAlphaBetweenPoints(p2, p3), bs, p2);

  const ct = a * Math.cos(gamma);
  const t = coordsFromDeg(getAlphaBetweenPoints(p1, p3), ct, p3);

  return [s, t, r];
}
)});
  main.variable(observer("triangleCenter")).define("triangleCenter", function(){return(
function triangleCenter([xa, ya], [xb, yb], [xc, yc]) {
  const centerX = (xa + xb + xc) / 3;
  const centerY = (ya + ya + ya) / 3;
  return [centerX, centerY];
}
)});
  main.variable(observer("innerTriangle")).define("innerTriangle", ["middleBetween","triangle"], function(middleBetween,triangle){return(
function innerTriangle(a, b, c, context) {
  const p1 = middleBetween(a, b);
  const p2 = middleBetween(b, c);
  const p3 = middleBetween(c, a);
  triangle([p1, p2, p3], context);
  return [p1, p2, p3];
}
)});
  main.variable(observer("areaTriangle")).define("areaTriangle", function(){return(
function areaTriangle([x1, y1, _1], [x2, y2, _2], [x3, y3, _3]) {
  return Math.abs(0.5 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)));
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## polygon functions:`
)});
  main.variable(observer("polygon")).define("polygon", ["degToRad","line"], function(degToRad,line){return(
function polygon([x, y], n, r, context, options) {
  const deg = 360 / n;
  const rad = degToRad(deg);
  const nextRad = degToRad(options ? options.offset : 0);

  const points = [];
  for (let i = 0; i < n; ++i) {
    points.push([
      x + Math.sin(rad * i + nextRad) * r,
      y + Math.cos(rad * i + nextRad) * r
    ]);
  }

  for (let i = 0; i < points.length; ++i) {
    line(points[i], points[(i + 1) % points.length], context, options);
  }
  return points;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## util functions:`
)});
  main.variable(observer("drawLoop")).define("drawLoop", ["width"], function(width){return(
function* drawLoop(context, cb, options) {
  const o = Object.assign(
    {
      height: 800,
      scale: (Math.min(width, 800) - 4) / 3
    },
    options
  );

  while (true) {
    context.clearRect(0, 0, width, o.height);
    context.save();
    context.translate(width / 2, o.height / 2);
    context.scale(o.scale, o.scale);
    context.lineWidth = 1 / o.scale;

    cb();

    context.restore();
    yield context.canvas;
  }
}
)});
  main.variable(observer("drawStatic")).define("drawStatic", ["width"], function(width){return(
function drawStatic(context, cb, options) {
  const o = Object.assign(
    {
      height: 800,
      scale: (Math.min(width, 800) - 4) / 3
    },
    options
  );

  context.clearRect(0, 0, width, o.height);
  context.save();
  context.translate(width / 2, o.height / 2);
  context.scale(o.scale, o.scale);
  context.lineWidth = 1 / o.scale;

  cb();

  context.restore();
  return context.canvas;
}
)});
  main.variable(observer("template")).define("template", ["DOM","width"], function(DOM,width){return(
function template(cb, main) {
  const height = 800;
  const context = DOM.context2d(width, height);
  const scale = (Math.min(width, height) - 4) / 3;

  context.lineWidth = 1 / scale;

  return cb(context, main(context, scale));
}
)});
  main.variable(observer("textAt")).define("textAt", function(){return(
function textAt([x, y], t, size, context) {
  context.font = `${size}px sans-serif`;
  context.fillText(t, x, y);
}
)});
  main.variable(observer("offsetText")).define("offsetText", function(){return(
function offsetText([x, y]) {
  return x > 0 ? [x + 10, y + 10] : y > 0 ? [x - 20, y + 10] : [x - 20, y - 10];
}
)});
  return main;
}
