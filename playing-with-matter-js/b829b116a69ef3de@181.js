// https://observablehq.com/@timhau/playing-with-matter-js@181
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# playing with matter.js

small sunday quarantine coding based on [this matter demo](https://github.com/liabru/matter-js/blob/master/examples/timescale.js)`
)});
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], function(html){return(
html`<button>replay`
)});
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","DOM","width","height","Matter","explosion","html"], function(replay,DOM,width,height,Matter,explosion,html)
{
  replay
  const canvas = DOM.canvas(width, height);

  const engine = Matter.Engine.create();
  const world = engine.world;
  const renderer = Matter.Render.create({
    element: canvas,
    engine,
    options: {
      width,
      height,
      wireframes: false,
      background: 'rgb(255, 255, 255)'
      //      showAngleIndicator: true
    }
  });
  Matter.Render.run(renderer);

  const runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);

  // walls
  Matter.World.add(world, [
    Matter.Bodies.rectangle(0, 0, width, 40, {
      isStatic: true,
      render: { fillStyle: "rgba(200,200,200,1)" }
    }),
    Matter.Bodies.rectangle(0, height - 10, width, 40, {
      isStatic: true,
      render: { fillStyle: "rgba(200,200,200,1)" }
    }),
    Matter.Bodies.rectangle(-width / 2, height / 2, 40, height, {
      isStatic: true,
      render: { fillStyle: "rgba(200,200,200,1)" }
    }),
    Matter.Bodies.rectangle(width / 2, height / 2, 40, height, {
      isStatic: true,
      render: { fillStyle: "rgba(200,200,200,1)" }
    })
  ]);

  // objects
  const bodyOptions = {
    frictionAir: 0,
    friction: 0.0001,
    restitution: 0.8,
    render: { fillStyle: "black" }
  };
  Matter.World.add(
    world,
    Matter.Composites.stack(-width / 2 + 20, 0, 10, 12, 3, 5, (x, y) =>
      Matter.Bodies.circle(x, y, Matter.Common.random(3, 15), bodyOptions)
    )
  );

  Matter.World.add(
    world,
    Matter.Composites.stack(-width / 2 + 20, 0, 10, 12, 3, 5, (x, y) =>
      Matter.Bodies.polygon(
        x,
        y,
        Matter.Common.random(5, 7),
        Matter.Common.random(10, 20),
        bodyOptions
      )
    )
  );

  Matter.Render.lookAt(renderer, Matter.Composite.allBodies(world));

  let timeScaleTarget = 1,
    counter = 0;

  Matter.Events.on(engine, 'afterUpdate', event => {
    engine.timing.timeScale +=
      (timeScaleTarget - engine.timing.timeScale) * 0.05;
    counter += 1;

    if (counter >= 150) {
      if (timeScaleTarget < 1) {
        timeScaleTarget = 1;
      } else {
        timeScaleTarget = 0.05;
      }

      explosion(engine);

      counter = 0;
    }
  });

  const mouse = Matter.Mouse.create(renderer.canvas),
    mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true
        }
      }
    });
  Matter.World.add(world, mouseConstraint);
  renderer.mouse = mouse;

  return html`${renderer.canvas}`;
}
);
  main.variable(observer("explosion")).define("explosion", ["Matter"], function(Matter){return(
function explosion(engine) {
  const bodies = Matter.Composite.allBodies(engine.world);

  for (let i = 0; i < bodies.length; ++i) {
    const body = bodies[i];

    if (!body.isStatic && body.position.y >= 500) {
      const forceMagnitude = 0.025 * body.mass;

      Matter.Body.applyForce(body, body.position, {
        x:
          (forceMagnitude + Matter.Common.random() * forceMagnitude) *
          Matter.Common.choose([1, -1]),
        y: -forceMagnitude + Matter.Common.random() * -forceMagnitude
      });
    }
  }
}
)});
  main.variable(observer("Matter")).define("Matter", ["require"], function(require){return(
require('matter-js@0.14.2/build/matter.js').catch(() => window["Matter"])
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  return main;
}
