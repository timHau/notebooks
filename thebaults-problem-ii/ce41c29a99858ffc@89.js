// https://observablehq.com/@timhau/thebaults-problem-ii@89
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Thébault's problem II

Given a square, construct equilateral triangles on two adjacent edges, either both inside or both outside the square. Then the triangle formed by joining the vertex of the square distant from both triangles and the vertices of the triangles distant from the square is equilateral`
)});
  main.variable(observer("height")).define("height", function(){return(
800
)});
  main.variable(observer("offset")).define("offset", function(){return(
100
)});
  main.variable(observer("center")).define("center", ["width","height"], function(width,height){return(
{ x: width/2, y: height/2 }
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
  main.variable(observer()).define(["DOM","width","height","center","offset","square","toggle","equiliteralTriangle","triangle"], function(DOM,width,height,center,offset,square,toggle,equiliteralTriangle,triangle)
{
  const ctx = DOM.context2d(width, height)
  const p = [
    { x: center.x + offset, y: center.y + offset },
    { x: center.x - offset, y: center.y + offset },
  ]
  
  const sq = square(...p, ctx)
  let distantCorner = sq.d, 
      eq1, eq2
  
  if(!toggle) {
    eq1 = equiliteralTriangle(...p, ctx)
    eq2 = equiliteralTriangle(p[1], sq.c, ctx)
  } else {
    eq1 = equiliteralTriangle(...p, ctx, -1)
    eq2 = equiliteralTriangle(p[1], sq.c, ctx, -1)
  }
  
  triangle(distantCorner, eq1, eq2, ctx, "red")
  
  return ctx.canvas
}
);
  main.variable(observer("viewof toggle")).define("viewof toggle", ["html"], function(html){return(
html`<input type="checkbox" />`
)});
  main.variable(observer("toggle")).define("toggle", ["Generators", "viewof toggle"], (G, _) => G.input(_));
  main.variable(observer("triangle")).define("triangle", ["line"], function(line){return(
function triangle(a,b,c,ctx,col="black") {
  ctx.strokeStyle = col
  line(a,b,ctx); 
  line(b,c,ctx); 
  line(c,a,ctx); 
}
)});
  main.variable(observer("radToDeg")).define("radToDeg", function(){return(
function radToDeg(rad) {
  return rad * 180 / Math.PI;
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
  main.variable(observer("coordFromDeg")).define("coordFromDeg", ["degToRad"], function(degToRad){return(
function coordFromDeg(deg, len, base=({x:0, y:0})) {
  return ({
     x: base.x + len * Math.cos(degToRad(deg)),
     y: base.y + len * Math.sin(degToRad(deg))
  })
}
)});
  main.variable(observer("square")).define("square", ["euclidDist2","line"], function(euclidDist2,line){return(
function square(a,b,ctx) {
  const dist = euclidDist2(a,b)
  line(a,b,ctx)
  const c = { x: b.x, y: b.y - dist }
  line(b,c,ctx)
  const d = { x: a.x, y: a.y - dist }
  line(c,d,ctx)
  line(d,a,ctx)
  return { c, d }
}
)});
  main.variable(observer("equiliteralTriangle")).define("equiliteralTriangle", ["euclidDist2","getAlphaBetweenPoints","coordFromDeg","line"], function(euclidDist2,getAlphaBetweenPoints,coordFromDeg,line){return(
function equiliteralTriangle(a,b,ctx,dir=1) {
  const dist = euclidDist2(a,b)
  const angle = getAlphaBetweenPoints(a,b)
  const c = coordFromDeg(dir * 60 + angle, dist, b)
  line(a,c,ctx)
  line(b,c,ctx)
  return c
}
)});
  return main;
}
