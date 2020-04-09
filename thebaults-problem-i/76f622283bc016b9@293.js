// https://observablehq.com/@timhau/thebaults-problem-i@293
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Thébault's problem I

Given any parallelogram, construct on its sides four squares external to the parallelogram. The quadrilateral formed by joining the centers of those four squares is a square`
)});
  main.variable(observer("height")).define("height", function(){return(
400
)});
  main.variable(observer("offset")).define("offset", function(){return(
150
)});
  main.variable(observer("center")).define("center", ["width","height"], function(width,height){return(
{ x: width/2, y: height/2 }
)});
  main.variable(observer()).define(["DOM","width","height","move","now","center","offset","thebaultsTheorem","euclidDist2"], function(DOM,width,height,move,now,center,offset,thebaultsTheorem,euclidDist2)
{
  const ctx = DOM.context2d(width, height*2)
  let t = move ? now / 1000 : 1
  const r = Math.sin(t) * 90
  const p = [
    { x: center.x - offset * Math.sin(t) , y: center.y + offset * 1.5 * Math.cos(t/2)},
    { x: center.x + offset , y: center.y + offset * 1.5 },
   ]
  
  thebaultsTheorem(...p, 40, euclidDist2(...p) / 2, ctx)
  
  return ctx.canvas
}
);
  main.variable(observer("viewof move")).define("viewof move", ["html"], function(html){return(
html`<input type="checkbox"/>`
)});
  main.variable(observer("move")).define("move", ["Generators", "viewof move"], (G, _) => G.input(_));
  main.variable(observer("thebaultsTheorem")).define("thebaultsTheorem", ["parallelogram","squareFromDeg","centerInSquare","point","line"], function(parallelogram,squareFromDeg,centerInSquare,point,line){return(
function thebaultsTheorem(a, b, deg, len, ctx) {
   const { c, d } = parallelogram(a, b, deg, len, ctx)
   const sq1 = squareFromDeg(a, b, ctx)
   const centerSq1 = centerInSquare(sq1.a, sq1.b, sq1.c, sq1.d)
   point(centerSq1, 3, ctx)
  
   const sq2 = squareFromDeg(b, c, ctx)
   const centerSq2 = centerInSquare(sq2.a, sq2.b, sq2.c, sq2.d)
   point(centerSq2, 3, ctx)

   const sq3 = squareFromDeg(c, d, ctx)
   const centerSq3 = centerInSquare(sq3.a, sq3.b, sq3.c, sq3.d)
   point(centerSq3, 3, ctx)
   
   const sq4 = squareFromDeg(d, a, ctx)
   const centerSq4 = centerInSquare(sq4.a, sq4.b, sq4.c, sq4.d)
   point(centerSq4, 3, ctx)
  
   line(centerSq1,centerSq2, ctx)
   line(centerSq2,centerSq3, ctx)
   line(centerSq3,centerSq4, ctx)
   line(centerSq4,centerSq1, ctx)
}
)});
  main.variable(observer("squareFromDeg")).define("squareFromDeg", ["euclidDist2","coordFromDeg","getAlphaBetweenPoints"], function(euclidDist2,coordFromDeg,getAlphaBetweenPoints){return(
function squareFromDeg(a, b, ctx, fill=false) {
  const dist = euclidDist2(a,b)
  ctx.beginPath()
  ctx.moveTo(a.x, a.y)
  const c = coordFromDeg(getAlphaBetweenPoints(a,b) - 90, dist, a)
  ctx.lineTo(c.x, c.y)
  const d = coordFromDeg(getAlphaBetweenPoints(a,b) - 90, dist, b)
  ctx.lineTo(d.x, d.y)
  ctx.lineTo(b.x, b.y)
  ctx.stroke()
  ctx.fillStyle = "rgba(0,0,0,0.05)"
  ctx.fill()
  return { a, b, c, d }
}
)});
  main.variable(observer("euclidDist2")).define("euclidDist2", function(){return(
function euclidDist2(a,b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2) 
}
)});
  main.variable(observer("line")).define("line", function(){return(
function line(from, to, ctx) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}
)});
  main.variable(observer("point")).define("point", function(){return(
function point(center, radius, ctx, fill=true) {
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = ctx.fillStyle = "rgba(0,0,0,1)"
  fill ? ctx.fill() : ctx.stroke();
}
)});
  main.variable(observer("getAlphaBetweenPoints")).define("getAlphaBetweenPoints", ["radToDeg"], function(radToDeg){return(
function getAlphaBetweenPoints(a,b) {
  const w = a.x - b.x;
  const h = a.y - b.y;
  return radToDeg(Math.atan2(h, w));
}
)});
  main.variable(observer("degToRad")).define("degToRad", function(){return(
function degToRad(deg){
  return (deg * Math.PI) / 180 
}
)});
  main.variable(observer("middleBetween")).define("middleBetween", ["getAlphaBetweenPoints","euclidDist2","coordFromDeg"], function(getAlphaBetweenPoints,euclidDist2,coordFromDeg){return(
function middleBetween(a,b) {
  const alpha = getAlphaBetweenPoints(a,b);
  const middle = euclidDist2(a,b) / 2;
  return coordFromDeg(alpha, middle, b);
}
)});
  main.variable(observer("radToDeg")).define("radToDeg", function(){return(
function radToDeg(rad) {
  return rad * 180 / Math.PI;
}
)});
  main.variable(observer("parallelogram")).define("parallelogram", ["line","coordFromDeg"], function(line,coordFromDeg){return(
function parallelogram(a, b, deg, len, ctx) {
    line(a, b, ctx)
    const c = coordFromDeg(-deg, len, b) 
    line(b, c, ctx)
    const d = coordFromDeg(-deg, len, a)
    line(c, d, ctx)
    line(a, d, ctx)
    return { a, b, c, d }
}
)});
  main.variable(observer("coordFromDeg")).define("coordFromDeg", ["degToRad"], function(degToRad){return(
function coordFromDeg(deg, len, base=({x:0, y:0})) {
  return ({
     x: base.x + len * Math.cos(degToRad(deg)),
     y: base.y + len * Math.sin(degToRad(deg))
  })
}
)});
  main.variable(observer("centerInSquare")).define("centerInSquare", function(){return(
function centerInSquare(a, b, c, d) {
  return {
    x: (a.x + b.x + c.x + d.x) / 4,
    y: (a.y + b.y + c.y + d.y) / 4,
  }
}
)});
  return main;
}
