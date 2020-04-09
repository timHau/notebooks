// https://observablehq.com/@timhau/convex-hull@760
import define1 from "./6f35a89e3f4ac2aa@480.js";
import define2 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# convex hull

A convex hull is the smallest polygon around a set of points, that includes all the points. It is a well studied algorithm in computational geometry. And i read about in the first chapter of this book (https://www.springer.com/de/book/9783540779735). 
I also stole some inspiration from here: https://github.com/AndriiHeonia/hull


`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### (feel free to click on the canvas)`
)});
  main.variable(observer()).define(["DOM","width","n","offset","circle","convexHull2D","drawHull"], function(DOM,width,n,offset,circle,convexHull2D,drawHull)
{
  const context = DOM.context2d(width, width);
  const pts = [];
  for (let i = 0; i < n; ++i) {
    const pt = [
      offset / 2 + Math.floor(Math.random() * (width - offset)),
      offset / 2 + Math.floor(Math.random() * (width - offset))
    ];
    pts.push(pt);
  }

  function drawPoints(pts) {
    pts.forEach(p => circle([...p, 2], context));
  }

  drawPoints(pts);
  let hull = convexHull2D(pts);
  drawHull(hull, context);

  const can = context.canvas;
  can.addEventListener("click", ({ layerX, layerY }) => {
    context.clearRect(0, 0, width, width);
    pts.push([layerX, layerY]);
    drawPoints(pts);
    hull = convexHull2D(pts);
    drawHull(hull, context);
  });
  return can;
}
);
  main.variable(observer("viewof n")).define("viewof n", ["slider"], function(slider){return(
slider({
  title: "n",
  min: 2,
  max: 1000,
  step: 1,
  value: 150
})
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("viewof offset")).define("viewof offset", ["slider"], function(slider){return(
slider({
  title: "offset",
  min: 2,
  max: 600,
  step: 1,
  value: 350
})
)});
  main.variable(observer("offset")).define("offset", ["Generators", "viewof offset"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","tex","smallest","direction"], function(md,tex,smallest,direction){return(
md` -----
# Algorithm

There is actually a pretty nice way to computate the convex hull that has a asymptotic runtime of ${tex`O(n\space log\space n)`} called Graham scan. Which I will try to explain.

## pre thoughts

### x-coordinate
The point that has the smallest x-coordinate is **always** part of the convex hull. That is, because all points with bigger x-coordinate can never be more to the left than the point with the smallest x-coordinate. 
${smallest()}

### convex
What does it mean for a polygon to be convex? You may ask (i certainly did).
This is _definitly_ **not** the mathematical definition.
A polygon can be imagined as a path from one point to another. Like every path it can have a direction. In plane geometry there is only left, right and on the same line. If the point is on the same line (colinear), we dont care about the point for now. So there is only left and right. As we already now that the point with the smallest x-coordinate is on the convex hull it makes sense to start from "left". Now we can find out that the polygon through some points is convex, if it never changes the direction of the path.
${direction()}

### calculate direction
For humans it is actually really simple to decide in which direction a connected path of three arrows is pointing. To make it comparable simple for a computer we have to use the determinante of a 3x3 Matrix, where ${tex`(x1,y1)`} = point1, ${tex`(x2,y2)`} = point2 and ${tex`(x3,y3)`} = point3

${tex`\begin{vmatrix} 1 & x1 & y1 \\ 1 & x2 & y2 \\ 1 & x3 & y3 \end{vmatrix} = \begin{vmatrix} 1 & x1 & y1 \\ 0 & x2 - x1 & y2 - y1 \\ 0 & x3 - x1 & y3 -y3 \end{vmatrix} = \begin{vmatrix} x2 - x1 & y2 - y1 \\ x3 - x1 & y3 - y1 \end{vmatrix} = (x2 - x1)(y3 - y1) - (x3 - x1)(y2 - y1)`} 

This gives us: 

${tex`\begin{cases} <0 &\text{if path goes left}\\ \quad0&\text{if path is straight} \\ >0&\text{if path goes right} \end{cases}`}

(Ref: https://de.wikipedia.org/wiki/Graham_Scan)

So to recap, if the value of det3 is smaller or equal to zero the path that goes through the input points does not go in the right direction. Unfortunatly the polygon somewhere turns around. To handle this, we first compute the "upper hull" and later go from the last point to the first and compute the "lower hull"

## Pseudocode

1. First we start by sorting all points depending on their x-coordinate.
2. Create a list "upper" and append first and second of the sorted points.
3. While the list has more than 2 elements and the path does not make a right turn:
    - remove the middle point from the list
4. add the current point to the list.
5. do the same but reverse the List first
6. concat upper and lower (remove duplicates)`
)});
  main.variable(observer("smallest")).define("smallest", ["DOM","width","circle","convexHull2D","line"], function(DOM,width,circle,convexHull2D,line){return(
function smallest() {
  const context = DOM.context2d(width / 2, width / 2);
  const offset = 200;
  const pts = [];
  for (let i = 0; i < 20; ++i) {
    const p = [
      offset / 2 + Math.floor(Math.random() * (width / 2 - offset)),
      offset / 2 + Math.floor(Math.random() * (width / 2 - offset))
    ];
    pts.push(p);
    circle([...p, 2], context);
  }
  const smallest = pts.reduce((acc, cur) => {
    if (acc.length === 0) return cur;
    return cur[0] < acc[0] ? cur : acc;
  });
  circle([...smallest, 5], context, { color: "red" });
  context.font = "16px sans-serif";
  context.fillStyle = "black";
  context.fillText(
    "always on the convex hull",
    smallest[0] - 10,
    smallest[1] + 25
  );

  const hull = convexHull2D(pts);

  for (let i = 1; i < hull.length; ++i) {
    line(hull[i], hull[i - 1], context, {
      dash: [5, 10],
      color: "rgba(0,0,0,0.5)"
    });
  }
  return context.canvas;
}
)});
  main.variable(observer("direction")).define("direction", ["DOM","width","circle","getAlphaBetweenPoints","arrow","lineThrough"], function(DOM,width,circle,getAlphaBetweenPoints,arrow,lineThrough){return(
function direction() {
  const context = DOM.context2d(width / 2, width / 2);
  const offset = 200;
  const pts = [[100, 300], [150, 250], [290, 190], [420, 220]];
  pts.forEach((p, i) => circle([...p, 2], context));
  for (let i = 0; i < pts.length - 1; ++i) {
    const d = getAlphaBetweenPoints(pts[i], pts[i + 1]);
    arrow(pts[i], pts[i + 1], context);
    lineThrough(pts[i], d, context, {
      dash: [5, 10],
      color: "rgba(0,0,0,0.5)"
    });
  }

  return context.canvas;
}
)});
  main.variable(observer("convexHull2D")).define("convexHull2D", ["sortByX","upperHull","lowerHull"], function(sortByX,upperHull,lowerHull){return(
function convexHull2D(p) {
  const p_ = p.slice();
  const sorted = p_.sort((a, b) => sortByX(a, b));
  const upper = upperHull(sorted);
  const lower = lowerHull(sorted);
  return [...upper, ...lower];
}
)});
  main.variable(observer("upperHull")).define("upperHull", ["det3"], function(det3){return(
function upperHull(p) {
  const n = p.length;
  const u = [];
  for (let i = 0; i < n; ++i) {
    while (u.length >= 2 && det3(u[u.length - 2], u[u.length - 1], p[i]) <= 0) {
      u.pop();
    }
    u.push(p[i]);
  }
  return u;
}
)});
  main.variable(observer("lowerHull")).define("lowerHull", ["det3"], function(det3){return(
function lowerHull(p) {
  const n = p.length;
  const b = p.slice().reverse();
  const l = [];
  for (let i = 0; i < b.length; ++i) {
    while (l.length >= 2 && det3(l[l.length - 2], l[l.length - 1], b[i]) <= 0) {
      l.pop();
    }
    l.push(b[i]);
  }
  l.shift();
  return l;
}
)});
  main.variable(observer("drawHull")).define("drawHull", ["line"], function(line){return(
function drawHull(hull, context) {
  const hl = hull.length;
  hull.forEach((p, i) => line(p, hull[(i + 1) % hl], context));
}
)});
  main.variable(observer("sortByX")).define("sortByX", function(){return(
function sortByX(a, b) {
  if (a[0] < b[0]) return -1;
  if (a[0] === b[0]) {
    if (a[1] < b[1]) return -1;
  }
  return 1;
}
)});
  main.variable(observer("det3")).define("det3", function(){return(
function det3([x1, y1], [x2, y2], [x3, y3]) {
  return (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
}
)});
  main.variable(observer("arrow")).define("arrow", function(){return(
function arrow([fromx, fromy], [tox, toy], context) {
  var headlen = 10; // length of head in pixels
  var angle = Math.atan2(toy - fromy, tox - fromx);
  context.beginPath();
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 6),
    toy - headlen * Math.sin(angle - Math.PI / 6)
  );
  context.moveTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 6),
    toy - headlen * Math.sin(angle + Math.PI / 6)
  );
  context.strokeStyle = "black";
  context.setLineDash([0, 0]);
  context.stroke();
}
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("getAlphaBetweenPoints", child1);
  main.import("line", child1);
  main.import("lineThrough", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  main.variable(observer()).define(["html"], function(html){return(
html`<style> 
  canvas:hover {
    cursor: pointer;
  }
</style>`
)});
  return main;
}
