// https://observablehq.com/@timhau/circle-packing@384
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# circle packing

nothing special, i just never did circle packing so i wanted to try it. Lot of inspiration from [this coding train video](https://www.youtube.com/watch?v=QHEQuoIKgNE). 
But my code is worse so do yourself a favor and don't look at it (or send suggestions ;))
If you are looking for better code [check this notebook](https://observablehq.com/@mbostock/circle-packing-methods) or [this notebook](https://observablehq.com/@mbostock/packing-circles-inside-a-rectangle)`
)});
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button>Replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","DOM","width","CircleArray","Promises","n"], async function*(replay,DOM,width,CircleArray,Promises,n)
{
  replay;
  const context = DOM.context2d(width, width);
  context.translate(width / 2, width / 2);

  let circles = new CircleArray();
  yield context.canvas;

  while (true) {
    context.clearRect(-width / 2, -width / 2, width, width);

    circles.grow(context);
    circles.draw(context);

    await Promises.delay(20)
    if (circles.arr.length > n) return;
    for (let i = 0; i < 10; ++i) {
      circles.addCircle();
    }
  }
}
);
  main.variable(observer("maxRadius")).define("maxRadius", function(){return(
400
)});
  main.variable(observer("minRadius")).define("minRadius", function(){return(
1
)});
  main.variable(observer("n")).define("n", function(){return(
1500
)});
  main.variable(observer("showLines")).define("showLines", function(){return(
true
)});
  main.variable(observer("showCircles")).define("showCircles", function(){return(
true
)});
  main.variable(observer("Circle")).define("Circle", ["dist2D","width","showCircles","circle","showLines","line"], function(dist2D,width,showCircles,circle,showLines,line){return(
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  insideCircle([x_, y_, r_]) {
    const { x, y, r } = this;
    return dist2D([x, y], [x_, y_]) <= r + r_ + 1;
  }

  checkEdge() {
    const { x, y, r } = this;
    return (
      x - r - 1 <= -width / 2 ||
      x + r + 1 >= width / 2 ||
      y - r - 1 <= -width / 2 ||
      y + r + 1 >= width / 2
    );
  }

  draw(context) {
    const { x, y, r } = this;
    showCircles && circle([x, y, r], context, { fill: false });
    circle([x, y, 1], context);
  }

  grow(i, all, context) {
    let shouldGrow = true;
    for (let j = 0; j < all.length; ++j) {
      if (i === j) continue;
      const other = all[j];
      if (this.insideCircle([other.x, other.y, other.r])) {
        showLines &&
          line([this.x, this.y], [other.x, other.y], context, {
            color: "rgba(200,200,200,0.5)"
          });
        shouldGrow = false;
      }
    }
    if (shouldGrow) {
      this.r += 1;
    }
    return this;
  }
}
)});
  main.variable(observer("CircleArray")).define("CircleArray", ["Circle","width","minRadius","maxRadius"], function(Circle,width,minRadius,maxRadius){return(
class CircleArray {
  constructor() {
    this.arr = [];
    this.atempts = 0;
  }

  addCircle() {
    let [x, y, r] = this.randomCircle();
    if (this.arr.length === 0) {
      this.arr.push(new Circle(x, y, r));
    } else {
      let found = false;

      while (!found || this.atempts < 100) {
        let valid = true;
        for (let c of this.arr) {
          if (c.insideCircle([x, y, r])) {
            valid = false;
            break;
          }
        }

        const next = new Circle(x, y, r);
        if (valid) {
          found = true;
          this.arr.push(next);
          this.atempts = 0;
        } else {
          this.atempts += 1;
          [x, y, r] = this.randomCircle();
        }
      }
    }

    return this.arr;
  }

  randomCircle() {
    const [x, y] = [
      -width / 2 + Math.random() * width,
      -width / 2 + Math.random() * width
    ];
    const r = minRadius + Math.random() * maxRadius;
    return [x, y, r];
  }

  draw(context) {
    this.arr.forEach(c => c.draw(context));
  }

  grow(context) {
    this.arr.map((c, i, all) => c.grow(i, all, context));
  }
}
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("dist2D", child1);
  main.import("line", child1);
  return main;
}
