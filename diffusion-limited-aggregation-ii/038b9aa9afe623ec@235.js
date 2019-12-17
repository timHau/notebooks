// https://observablehq.com/@timhau/diffusion-limited-aggregation-ii@235
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# diffusion limited aggregation II

I did this already but i wanted to do a better version. If you are looking for some fast and better written examples, i recommend [this notebook by @bryangingechen](https://observablehq.com/@bryangingechen/poisson-kpz-and-quenched-kpz) and [this notebook by @tmcw](https://observablehq.com/@tmcw/diffusion-limited-aggregation)

it is really slow..`
)});
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button>Replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","DOM","width","Particle","Promises"], async function*(replay,DOM,width,Particle,Promises)
{
  replay;
  const context = DOM.context2d(width, width);
  context.translate(width / 2, width / 2);
  const margin = 200;

  const struc = [new Particle(0, 0, 3, "black")];
  let current = [];

  for (let i = 0; i < 3000; ++i) {
    current.push(
      new Particle(
        -width / 2 + margin / 2 + Math.random() * (width - margin),
        -width / 2 + margin / 2 + Math.random() * (width - margin)
      )
    );
  }

  yield context.canvas;
  while (true) {
    await Promises.delay(10);
    context.clearRect(-width / 2, -width / 2, width, width);

    for (let i = 0; i < current.length; ++i) {
      let c = current[i];
      c.draw(context);
      c.update();

      if (c.stick(struc)) {
        struc.push(c);
        current.splice(i, 1);
        //   current.push(
        //     new Particle(
        //       -width / 2 + margin / 2 + Math.random() * (width - margin),
        //       -width / 2 + margin / 2 + Math.random() * (width - margin)
        //    )
        //   );
      }
    }

    for (let p of struc) {
      p.draw(context);
    }
  }
}
);
  main.variable(observer("Particle")).define("Particle", ["dist2D","line"], function(dist2D,line){return(
class Particle {
  constructor(x, y, r = 3, c = "rgb(200, 200, 200)") {
    this.pos = [x, y];
    this.r = r;
    this.color = c;
    this.step = 6;
    this.con = false;
  }

  update() {
    const [x, y] = this.pos;
    const { step } = this;
    let [nextX, nextY] = [
      x + Math.floor(-step + Math.random() * (2 * step + 1)),
      y + Math.floor(-step + Math.random() * (2 * step + 1))
    ];

    this.pos = [nextX, nextY];
  }

  stick(struc, context) {
    for (let other of struc) {
      const d = dist2D(other.pos, this.pos);
      const target = other.r + this.r + 10;
      if (d <= target) {
        this.color = "rgb(100, 100, 100)";
        this.con = other.pos;
        return true;
      }
    }
  }

  draw(context) {
    const [x, y] = this.pos;
    const { color, r } = this;
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x, y, r, r);
    if (this.con) {
      const pos = [x + r / 2, y + r / 2];
      const [oX, oY] = this.con;
      const otherPos = [oX + r / 2, oY + r / 2];
      line(pos, otherPos, context, {
        lineWidth: r * 0.5
      });
    }
  }
}
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("dist2D", child1);
  main.import("line", child1);
  return main;
}
