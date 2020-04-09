// https://observablehq.com/@timhau/napoleons-theorem@61
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Napoleon's theorem

https://en.wikipedia.org/wiki/Napoleon%27s_theorem 

Napoleon's theorem: If the triangles centered on L, M, and N are equilateral, then so is the red triangle.
In geometry, Napoleon's theorem states that if equilateral triangles are constructed on the sides of any triangle, either all outward or all inward, the centres of those equilateral triangles themselves form an equilateral triangle.

The triangle thus formed is called the inner or outer Napoleon triangle. The difference in area of these two triangles equals the area of the original triangle.`
)});
  main.variable(observer("height")).define("height", function(){return(
800
)});
  main.variable(observer("offset")).define("offset", function(){return(
180
)});
  main.variable(observer("center")).define("center", ["width","height"], function(width,height){return(
{ x: width/2, y: height/2 }
)});
  main.variable(observer()).define(["DOM","width","height","toggle","now","center","offset","point","textAt","triangle","equiliteralTriangle","getTriangleCenter"], function(DOM,width,height,toggle,now,center,offset,point,textAt,triangle,equiliteralTriangle,getTriangleCenter)
{
  const ctx = DOM.context2d(width, height)
  
  const t = toggle ? (Math.sin(now / 1000) + 1) : 1
  const t2 = toggle ? ((Math.cos(now / 1000) + 1)) : 1
 
  const p = [
    { x: center.x - offset * t, y: center.y, t: 'A' },
    { x: center.x + offset, y: center.y * t2, t: 'B' },
    { x: center.x, y: center.y - offset, t: 'C' },
   ]
  p.map(po => {
    point(po, 3, ctx)
    textAt(po.t, { x: po.x + 10, y: po.y + 15 }, ctx)
  })
  triangle(...p, ctx)
  
  const centers = []
  const centerNames = ['L', 'M', 'N']
  
  for( let i = 0; i < 3; i++ ) {
    const nextInd = (i+1) % p.length
    const c = equiliteralTriangle(p[i], p[nextInd], ctx, -1)
    centers.push(Object.assign(getTriangleCenter(p[i], p[nextInd], c), {t: centerNames[i]}))
    point(centers[i], 3, ctx)
  }
 centers.map(c => textAt(c.t, { x:c.x + 10, y: c.y + 15 }, ctx))

 triangle(...centers, ctx, {col: 'red'})
 
 return ctx.canvas
}
);
  main.variable(observer("viewof toggle")).define("viewof toggle", ["html"], function(html){return(
html`<input type="checkbox" />`
)});
  main.variable(observer("toggle")).define("toggle", ["Generators", "viewof toggle"], (G, _) => G.input(_));
  main.variable(observer("point")).define("point", function(){return(
function point(center, radius, ctx, opts) {
  const o = Object.assign({ 
    fill:true, 
    col: 'black',
    dash: [0, 0]
  }, opts)
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.setLineDash(o.dash)
  ctx.fillStyle = o.col;
  ctx.strokeStyle = o.col;
  o.fill ? ctx.fill() : ctx.stroke();
}
)});
  main.variable(observer("textAt")).define("textAt", function(){return(
function textAt(text, point, ctx) {
  ctx.font = "16px sans-serif";
  ctx.fillText(text, point.x, point.y);
}
)});
  main.variable(observer("triangle")).define("triangle", ["line"], function(line){return(
function triangle(a,b,c,ctx,opts) {
  line(a,b,ctx,opts); 
  line(b,c,ctx,opts); 
  line(c,a,ctx,opts); 
}
)});
  main.variable(observer("line")).define("line", function(){return(
function line(from, to, ctx, opts ) {
  const o = Object.assign({
    col: 'black',
    dash: [0, 0]
  }, opts)
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.setLineDash(o.dash)
  ctx.strokeStyle = o.col
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}
)});
  main.variable(observer("euclidDist2")).define("euclidDist2", function(){return(
function euclidDist2(a,b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2) 
}
)});
  main.variable(observer("getAlphaBetweenPoints")).define("getAlphaBetweenPoints", ["radToDeg"], function(radToDeg){return(
function getAlphaBetweenPoints(a,b) {
  const w = a.x - b.x;
  const h = a.y - b.y;
  return radToDeg(Math.atan2(h, w));
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
  main.variable(observer("radToDeg")).define("radToDeg", function(){return(
function radToDeg(rad) {
  return rad * 180 / Math.PI;
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
  main.variable(observer("getTriangleCenter")).define("getTriangleCenter", function(){return(
function getTriangleCenter(a,b,c) {
  const centerX = (a.x + b.x + c.x) / 3
  const centerY = (a.y + b.y + c.y) / 3
  return {x: centerX, y: centerY}
}
)});
  return main;
}
