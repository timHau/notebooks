// https://observablehq.com/@timhau/bezier-surface@1624
import define1 from "./542f8e2ed35ce6d3@212.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`# bézier surface

A [Bézier surface](https://en.wikipedia.org/wiki/B%C3%A9zier_surface) is given by ${tex`n \times m`} control points. The parametric coordinates for the parameterization variables ${tex`u,v`} is given by:

${tex.block`
  \begin{aligned}
    p(u,v) = \sum_{i=0}^{n}\sum_{j=0}^{m}B_{i}^{n}(u)B_{j}^{m}(v)k_{ij}
  \end{aligned}
`}

where ${tex`B_i^n(u)`} is the ${tex`i`}-th [Bernstein polynomial](https://observablehq.com/@timhau/bernstein-poylnomial) given by

${tex.block`
  \begin{aligned} 
    B_i^n(u) = \binom{n}{i}u^i(1-u)^{n-i}
  \end{aligned}
`}

and ${tex`k_{ij}`} is the ${tex`i,j`}-th control point.

feel free to drag / send suggestions / correct my mistakes 
`
)});
  main.variable(observer()).define(["gl"], function(gl){return(
gl.canvas
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
__Note__: unfortunately, i did not get [regl.js](http://regl.party/) 100% to work with Observable, so if you update the code you should reload the page. Suggestions are welcome as always.
`
)});
  main.variable(observer("draw")).define("draw", ["camera","drawGrid","curvePoints","drawCurve","drawPoint","drawBezier","n","bezier_surface"], function(camera,drawGrid,curvePoints,drawCurve,drawPoint,drawBezier,n,bezier_surface){return(
function draw(t) {
  const view = camera.view();
  drawGrid({ view });

  const bPoints = [];
  for (let points of curvePoints) {
    drawCurve({
      view,
      count: points.length,
      point: points,
      color: [0.5, 0.5, 0.5, 0.8]
    });
    drawPoint({
      view,
      count: points.length,
      point: points,
      pointSize: 5.0
    });
    const [lastPoint] = drawBezier(points, n - 1, view, t);
    bPoints.push(lastPoint);
  }

  const surface = [];
  const num = 20;
  const step = 1 / num;
  for (let u = 0; u < 1; u += step) {
    for (let v = 0; v < 1; v += step) {
      const c = bezier_surface(curvePoints, [u, v]);
      surface.push(c);
    }
  }

  for (let i = 0; i < num; ++i) {
    const color = [0.2, 0.2, 1, 0.8];
    drawCurve({
      view,
      count: num,
      point: surface.slice(i * num, i * num + num + 1),
      color
    });
    drawCurve({
      view,
      count: num,
      point: surface.filter((v, j) => j % num === i),
      color
    });
  }

  return bPoints;
}
)});
  main.variable(observer("bezier_surface")).define("bezier_surface", ["bernstein_poly"], function(bernstein_poly){return(
function bezier_surface(controlPoints, [u, v]) {
  const n = controlPoints.length;
  const m = controlPoints[0].length;

  let res = [];
  for (let i = 0; i < n; ++i) {
    const i_poly = bernstein_poly(i, n - 1, u);
    for (let j = 0; j < m; ++j) {
      const [x, y, z] = controlPoints[i][j];
      const j_Poly = bernstein_poly(j, m - 1, v);
      res.push([i_poly * j_Poly * x, i_poly * j_Poly * y, i_poly * j_Poly * z]);
    }
  }

  return res.reduce(([x1, y1, z1], [x2, y2, z2]) => [
    x1 + x2,
    y1 + y2,
    z1 + z2
  ]);
}
)});
  main.variable(observer("bezier_curve")).define("bezier_curve", ["bernstein_poly"], function(bernstein_poly){return(
function bezier_curve(controlPoints, t) {
  const n = controlPoints.length;

  let res = [];
  for (let i = 0; i < controlPoints.length; ++i) {
    const [x, y, z] = controlPoints[i];
    const b_poly = bernstein_poly(i, n - 1, t);
    res.push([b_poly * x, b_poly * y, b_poly * z]);
  }

  return res.reduce(([x1, y1, z1], [x2, y2, z2]) => [
    x1 + x2,
    y1 + y2,
    z1 + z2
  ]);
}
)});
  main.variable(observer("drawBezier")).define("drawBezier", ["lerp3D","drawPoint","drawCurve"], function(lerp3D,drawPoint,drawCurve){return(
function drawBezier(old, n, view, t) {
  const current = [];
  for (let i = 0; i < n; ++i) {
    current.push(lerp3D(old[i], old[i + 1], t / 100));
  }

  if (n === 1) {
    drawPoint({
      view,
      count: n,
      point: current,
      highlight: true,
      pointSize: 5.0
    });
    return current;
  }

  drawPoint({
    view,
    count: current.length,
    point: current,
    pointSize: 5.0
  });
  drawCurve({
    view,
    count: current.length,
    point: current,
    color: [0.5, 0.5, 0.5, 0.8]
  });

  return drawBezier(current, n - 1, view, t);
}
)});
  main.variable(observer()).define(["gl","camera","draw","bezier_curve","drawCurve","drawPoint"], function(gl,camera,draw,bezier_curve,drawCurve,drawPoint)
{
  const bPoints = [];
  gl.regl.frame(({ tick }) => {
    camera.tick();
    const time = (tick / 2) % 100;
    const lastBPoints = draw(time);
    bPoints.push(lastBPoints);

    const path = [];
    for (let t = 0; t < 1; t += 0.05) {
      const c = bezier_curve(lastBPoints, t);
      path.push(c);
    }

    drawCurve({
      view: camera.view(),
      count: path.length,
      point: path,
      color: [1, 0, 0, 1]
    });

    drawPoint({
      view: camera.view(),
      count: bPoints.length,
      point: bPoints,
      pointSize: 3.0,
      highlight: true
    });

    if (bPoints.length > 450) bPoints.shift();
  });
}
);
  main.variable(observer("gl")).define("gl", ["createGL"], function(createGL){return(
createGL()
)});
  main.variable(observer("positions")).define("positions", function(){return(
function positions(points) {
  const startPos = [];
  for (let i = 0; i < points.length; ++i) {
    for (let j = 0; j < points[i].length - 1; ++j) {
      startPos.push(points[i][j]);
    }
  }

  const endPos = [];
  for (let i = 0; i < points.length; ++i) {
    for (let j = 1; j < points[i].length; ++j) {
      endPos.push(points[i][j]);
    }
  }

  return [startPos, endPos];
}
)});
  main.variable(observer("curvePoints")).define("curvePoints", ["n","w","randh","d"], function(n,w,randh,d)
{
  const res = [];

  for (let i = 0; i < n; ++i) {
    const curve = [];
    for (let j = 0; j < n; ++j) {
      const p = [
        -w + i * ((2 * w) / (n - 1)),
        Math.floor(Math.random() * randh),
        -d + j * ((2 * d) / (n - 1))
      ];
      curve.push(p);
    }
    res.push(curve);
  }

  return res;
}
);
  main.variable(observer("drawPoint")).define("drawPoint", ["gl","mat4","width","height"], function(gl,mat4,width,height){return(
gl.regl({
  vert: `
    precision mediump float;

    attribute vec3 point;
  
    uniform mat4 proj;
    uniform mat4 view;
    uniform float pointSize;
  
    void main () {
      gl_PointSize = pointSize;
      gl_Position = proj * view * vec4(point, 1.0);
    }
`,
  frag: `
    precision mediump float;

    uniform bool highlight;

    void main () {
      vec4 color;
      if(highlight) {
        color = vec4(1, 0, 0, 1);
      } else {
        color = vec4(0.4, 0.4, 0.4, 0.7);
      }
      gl_FragColor = color;
    }
`,
  attributes: {
    point: gl.regl.prop('point')
  },
  uniforms: {
    view: gl.regl.prop('view'),
    proj: mat4.perspective([], Math.PI / 4, width / height, 0.001, 10000),
    highlight: gl.regl.prop('highlight'),
    pointSize: gl.regl.prop('pointSize') || 5.0
  },
  count: gl.regl.prop('count'),
  primitive: 'points'
})
)});
  main.variable(observer("drawCurve")).define("drawCurve", ["gl","mat4","width","height"], function(gl,mat4,width,height){return(
gl.regl({
  vert: `
    precision mediump float;
    attribute vec3 point;
  
    uniform mat4 proj;
    uniform mat4 view;
  
    void main () {
      gl_Position = proj * view * vec4(point, 1.0);
    }
`,
  frag: `
    precision mediump float;

    uniform bool highlight;
    uniform vec4 color;

    void main () {
      gl_FragColor = color;
    }
`,
  attributes: {
    point: gl.regl.prop('point')
  },
  uniforms: {
    view: gl.regl.prop('view'),
    proj: mat4.perspective([], Math.PI / 4, width / height, 0.001, 10000),
    highlight: gl.regl.prop('highlight'),
    color: gl.regl.prop('color')
  },
  count: gl.regl.prop('count'),
  primitive: 'line strip'
})
)});
  main.variable(observer("drawGrid")).define("drawGrid", ["gl","groundPoints","mat4","width","height"], function(gl,groundPoints,mat4,width,height){return(
gl.regl({
  vert: `
    precision mediump float;
    attribute vec3 point;
  
    uniform mat4 proj;
    uniform mat4 view;
  
    void main () {
      gl_Position = proj * view * vec4(point, 1.0);
    }
`,
  frag: `
    precision mediump float;
    void main () {
      gl_FragColor = vec4(0, 0, 0, 0.5);
    }
`,
  attributes: {
    point: groundPoints
  },
  uniforms: {
    view: gl.regl.prop('view'),
    proj: mat4.perspective([], Math.PI / 4, width / height, 0.001, 10000)
  },
  count: groundPoints.length,
  primitive: 'lines'
})
)});
  main.variable(observer("lerp3D")).define("lerp3D", function(){return(
function lerp3D([x1, y1, z1], [x2, y2, z2], t) {
  const v = [x2 - x1, y2 - y1, z2 - z1];
  const d = Math.hypot(...v);
  return [x1 + t * v[0], y1 + t * v[1], z1 + t * v[2]];
}
)});
  main.variable(observer("groundPoints")).define("groundPoints", ["w","h","d"], function(w,h,d){return(
[
  [-w, h, -d],
  [-w, h, d],
  [w, h, -d],
  [w, h, d],
  [w, h, d],
  [-w, h, d],
  [w, h, -d],
  [-w, h, -d]
]
)});
  main.variable(observer("camera")).define("camera", ["createCamera","gl"], function(createCamera,gl)
{
  const camera = createCamera(gl.canvas);
  camera.lookAt([0, 800, -900], [0, 0, 0], [0, 1, 0]);
  return camera;
}
);
  main.variable(observer("createGL")).define("createGL", ["DOM","width","height","createREGL"], function(DOM,width,height,createREGL){return(
function createGL(opts) {
  var canvas = DOM.canvas(width, height)
  var regl = createREGL(Object.assign({ canvas: canvas }, opts || {}));
  return { canvas, regl };
}
)});
  main.variable(observer("n")).define("n", function(){return(
5
)});
  main.variable(observer("d")).define("d", function(){return(
250
)});
  main.variable(observer("w")).define("w", function(){return(
250
)});
  main.variable(observer("h")).define("h", function(){return(
-10
)});
  main.variable(observer("randh")).define("randh", function(){return(
350
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  const child1 = runtime.module(define1);
  main.import("bernstein_poly", child1);
  main.variable(observer("createREGL")).define("createREGL", ["require"], function(require){return(
require('https://unpkg.com/regl@1.3.1/dist/regl.min.js')
)});
  main.variable(observer("createCamera")).define("createCamera", ["require"], function(require){return(
require("https://bundle.run/canvas-orbit-camera@1.0.2")
)});
  main.variable(observer("mat4")).define("mat4", ["require"], function(require){return(
require('https://bundle.run/gl-mat4@1.2.0')
)});
  return main;
}
