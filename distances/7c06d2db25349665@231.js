// https://observablehq.com/@timhau/distances@231
import define1 from "./6f35a89e3f4ac2aa@480.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# distances

still in self-quarantine`
)});
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button/>replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","DOM","width","height","Particle","rand","n"], function*(replay,DOM,width,height,Particle,rand,n)
{
  replay;
  const context = DOM.context2d(width, height);
  context.translate(width / 2, height / 2);

  const enemies = [];
  for (let i = 0; i < 8; ++i) {
    const e = new Particle([rand(-150, 150), rand(-150, 150), rand(10, 13)]);
    enemies.push(e);
  }

  const points = [];
  for (let i = 0; i < n; ++i) {
    const p = new Particle(
      [rand(-width / 2, width / 2), rand(-height / 2, height / 2), 4],
      enemies
    );
    points.push(p);
  }

  while (true) {
    context.clearRect(-width / 2, -height / 2, width, height);

    for (let enemy of enemies) {
      enemy.step();
      enemy.show(context, enemies);
    }

    for (let point of points) {
      point.step();
      point.show(context, points);
    }

    yield context.canvas;
  }
}
);
  main.variable(observer("Particle")).define("Particle", ["rand","dist2D","minDist","line","enemyDist","fleeFactor","width","height","circle"], function(rand,dist2D,minDist,line,enemyDist,fleeFactor,width,height,circle){return(
class Particle {
  constructor(pos = [], enemies = []) {
    this.pos = pos;
    this.enemies = enemies;
    const maxVel = 3.8;
    this.vel = [rand(-maxVel, maxVel), rand(-maxVel, maxVel)];
  }

  checkNeigborhood(points, context) {
    // check friends
    for (let point of points) {
      const [p_x, p_y, p_r] = point.pos;
      const [x, y, r] = this.pos;
      const d = dist2D([p_x, p_y], [x, y]);
      if (d < minDist && d > 0.01) {
        line([p_x, p_y], [x, y], context, {
          color: 'rgba(150,150,150,0.2)',
          lineWidth: 0.5
        });
      }
      if (d > 0.01 && d <= p_r + r) {
        const direction = [p_x - x, p_y - y];
        const dirLen = Math.hypot(...direction);
        this.vel = [
          ((-15 / 10) * (p_x - x)) / dirLen,
          ((-15 / 10) * (p_y - y)) / dirLen
        ];
      }
    }

    // check enemies
    for (let enemy of this.enemies) {
      const d = dist2D(enemy.pos, this.pos);
      if (d < enemy.pos[2] + enemyDist) {
        const [e_x, e_y] = enemy.pos;
        const [x, y] = this.pos;
        const direction = [e_x - x, e_y - y];
        const dirLen = Math.hypot(...direction);
        this.vel = [
          (-fleeFactor * (e_x - x)) / dirLen,
          (-fleeFactor * (e_y - y)) / dirLen
        ];
      }
    }
  }

  checkBorders() {
    const [x, y, r] = this.pos;
    const [vx, vy] = this.vel;
    if (x < -width / 2 + r || x > width / 2 - r) this.vel = [-vx, vy];
    if (y < -height / 2 + r || y > height / 2 - r) this.vel = [vx, -vy];
  }

  step() {
    const [x, y, r] = this.pos;
    const [vx, vy] = this.vel;
    this.pos = [x + vx, y + vy, r];
    this.checkBorders();
  }

  show(context, points) {
    this.checkNeigborhood(points, context);
    circle(this.pos, context);
  }
}
)});
  main.variable(observer("rand")).define("rand", function(){return(
function rand(min, max) {
  return min + Math.random() * 2 * max;
}
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("minDist")).define("minDist", function(){return(
70
)});
  main.variable(observer("enemyDist")).define("enemyDist", function(){return(
30
)});
  main.variable(observer("fleeFactor")).define("fleeFactor", function(){return(
4
)});
  main.variable(observer("n")).define("n", function(){return(
150
)});
  const child1 = runtime.module(define1);
  main.import("circle", child1);
  main.import("dist2D", child1);
  main.import("line", child1);
  return main;
}
