// https://observablehq.com/@timhau/platonic-solids@1002
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Platonic solids
---

thanks for helping [@mxfh](https://observablehq.com/@mxfh)

## Icosahedron`
)});
  main.variable(observer()).define(["DOM","width","createREGL","createCamera","drawSolid","icosahedron"], function(DOM,width,createREGL,createCamera,drawSolid,icosahedron)
{
  const canvas = DOM.canvas(width, width / 1.5);

  const regl = createREGL({
    canvas: canvas
  });

  const camera = createCamera(canvas);
  camera.lookAt([10, 0, 15], [0, 0, 0], [0, 1, 0]);

  const ico = drawSolid(icosahedron, regl, camera, [0, 0, 0, 1]);

  let t = 0;
  regl.frame(() => {
    ++t;

    regl.clear({
      color: [1, 1, 1, 1]
    });

    ico();

    camera.tick();
    camera.rotate([0.01, 0], [0.0, 0]);
  });

  return canvas;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## dodecahedron`
)});
  main.variable(observer()).define(["DOM","width","createREGL","createCamera","drawSolid","dodecahedron"], function(DOM,width,createREGL,createCamera,drawSolid,dodecahedron)
{
  const canvas = DOM.canvas(width, width / 1.5);

  const regl = createREGL({
    canvas: canvas
  });

  const camera = createCamera(canvas);
  camera.lookAt([10, 0, 15], [0, 0, 0], [0, 1, 0]);

  const dode = drawSolid(dodecahedron, regl, camera, [0, 0, 0, 1]);

  regl.frame(() => {
    regl.clear({
      color: [1, 1, 1, 1]
    });

    dode();

    camera.tick();
    camera.rotate([0.01, 0], [0.0, 0]);
  });

  return canvas;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## octahedron`
)});
  main.variable(observer()).define(["DOM","width","createREGL","createCamera","drawSolid","octahedron"], function(DOM,width,createREGL,createCamera,drawSolid,octahedron)
{
  const canvas = DOM.canvas(width, width / 1.5);

  const regl = createREGL({
    canvas: canvas
  });

  const camera = createCamera(canvas);
  camera.lookAt([30, 0, 15], [0, 0, 0], [0, 1, 0]);

  const octa = drawSolid(octahedron, regl, camera, [0, 0, 0, 1]);

  regl.frame(() => {
    regl.clear({
      color: [1, 1, 1, 1]
    });

    octa();

    camera.tick();
    camera.rotate([0.01, 0], [0.0, 0]);
  });

  return canvas;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## cube`
)});
  main.variable(observer()).define(["DOM","width","createREGL","createCamera","drawSolid","cube"], function(DOM,width,createREGL,createCamera,drawSolid,cube)
{
  const canvas = DOM.canvas(width, width / 1.5);

  const regl = createREGL({
    canvas: canvas
  });

  const camera = createCamera(canvas);
  camera.lookAt([30, 0, 15], [0, 0, 0], [0, 1, 0]);

  const cub = drawSolid(cube, regl, camera, [0, 0, 0, 1]);

  regl.frame(() => {
    regl.clear({
      color: [1, 1, 1, 1]
    });

    cub();

    camera.tick();
    camera.rotate([0.01, 0], [0.0, 0]);
  });

  return canvas;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## tetrahedron`
)});
  main.variable(observer("canvas")).define("canvas", ["DOM","width","createREGL","createCamera","drawSolid","tetrahedron"], function(DOM,width,createREGL,createCamera,drawSolid,tetrahedron)
{
  const canvas = DOM.canvas(width, width / 1.5);

  const regl = createREGL({
    canvas: canvas
  });

  const camera = createCamera(canvas);
  camera.lookAt([30, 0, 15], [0, 0, 0], [0, 1, 0]);

  const tetra = drawSolid(tetrahedron, regl, camera, [0, 0, 0, 1]);

  regl.frame(() => {
    regl.clear({
      color: [1, 1, 1, 1]
    });

    tetra();

    camera.tick();
    camera.rotate([0.01, 0], [0.0, 0]);
  });

  return canvas;
}
);
  main.variable(observer("cubePos")).define("cubePos", function(){return(
function cubePos(scale) {
  return [
    [-1, -1, 1],
    [-1, 1, 1],
    [1, 1, 1],
    [1, -1, 1],
    [-1, -1, -1],
    [-1, 1, -1],
    [1, 1, -1],
    [1, -1, -1]
  ].map(([x, y, z]) => [x * scale, y * scale, z * scale]);
}
)});
  main.variable(observer("octaPos")).define("octaPos", function(){return(
function octaPos(scale) {
  return [
    [0, -1, 0],
    [0, 0, 1],
    [-1, 0, 0],
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0]
  ].map(([x, y, z]) => [x * scale, y * scale, z * scale]);
}
)});
  main.variable(observer("dodePos")).define("dodePos", ["phi","cubePos"], function(phi,cubePos){return(
function dodePos(scale) {
  const phiPoints = [
    // "front" and "back" points
    [0, -1 / phi, phi],
    [0, 1 / phi, phi],
    [0, -1 / phi, -phi],
    [0, 1 / phi, -phi],

    // "up" and "down" points
    [-1 / phi, phi, 0],
    [1 / phi, phi, 0],
    [-1 / phi, -phi, 0],
    [1 / phi, -phi, 0],

    // "left" and "right" points
    [-phi, 0, 1 / phi],
    [-phi, 0, -1 / phi],
    [phi, 0, 1 / phi],
    [phi, 0, -1 / phi]
  ].map(([x, y, z]) => [x * scale, y * scale, z * scale]);

  return [...cubePos(scale), ...phiPoints];
}
)});
  main.variable(observer("icoPos")).define("icoPos", ["phi"], function(phi){return(
function icoPos(scale) {
  return [
    [0, 1, phi],
    [1, phi, 0],
    [phi, 0, 1],
    [0, -1, phi],
    [-1, phi, 0],
    [phi, 0, -1],
    [0, 1, -phi],
    [1, -phi, 0],
    [-phi, 0, 1],
    [0, -1, -phi],
    [-1, -phi, 0],
    [-phi, 0, -1]
  ].map(([x, y, z]) => [x * scale, y * scale, z * scale]);
}
)});
  main.variable(observer("cube")).define("cube", ["cubePos"], function(cubePos){return(
function cube([x, y, z]) {
  const positions = cubePos(10).map(([px, py, pz]) => [px + x, py + y, pz + z]);
  const elements = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [0, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [7, 3],
    [6, 2],
    [5, 1]
  ];

  return [positions, elements];
}
)});
  main.variable(observer("tetrahedron")).define("tetrahedron", function(){return(
function tetrahedron([x, y, z]) {
  const positions = [
    [-10, -10, 10],
    [10, -10, 10],
    [0, -10, -10],
    [0, 10, 0]
  ].map(([px, py, pz]) => [px + x, py + y, pz + z]);
  const elements = [[0, 1], [1, 2], [0, 2], [0, 3], [1, 3], [2, 3]];

  return [positions, elements];
}
)});
  main.variable(observer("octahedron")).define("octahedron", ["octaPos"], function(octaPos){return(
function octahedron([x, y, z]) {
  const positions = octaPos(15).map(([px, py, pz]) => [px + x, py + y, pz + z]);
  const elements = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 2],
    [1, 3],
    [3, 4],
    [4, 2],
    [4, 5],
    [3, 5],
    [2, 5],
    [1, 5]
  ];
  return [positions, elements];
}
)});
  main.variable(observer("dodecahedron")).define("dodecahedron", ["dodePos"], function(dodePos){return(
function dodecahedron([x, y, z]) {
  const positions = dodePos(6).map(([px, py, pz]) => [px + x, py + y, pz + z]);
  const elements = [
    [0, 8],
    [3, 8],
    [8, 9],
    [1, 9],
    [2, 9],
    [4, 10],
    [7, 10],
    [10, 11],
    [5, 11],
    [6, 11],
    [1, 12],
    [5, 12],
    [12, 13],
    [2, 13],
    [6, 13],
    [0, 14],
    [4, 14],
    [14, 15],
    [3, 15],
    [7, 15],
    [0, 16],
    [1, 16],
    [16, 17],
    [5, 17],
    [4, 17],
    [3, 18],
    [2, 18],
    [18, 19],
    [7, 19],
    [6, 19]
  ];
  return [positions, elements];
}
)});
  main.variable(observer("icosahedron")).define("icosahedron", ["icoPos"], function(icoPos){return(
function icosahedron([x, y, z]) {
  const positions = icoPos(7).map(([px, py, pz]) => [px + x, py + y, pz + z]);
  const elements = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [2, 3],
    [0, 4],
    [1, 4],
    [1, 5],
    [2, 5],
    [1, 6],
    [5, 6],
    [4, 6],
    [2, 7],
    [3, 7],
    [5, 7],
    [3, 8],
    [0, 8],
    [4, 8],
    [5, 9],
    [6, 9],
    [7, 9],
    [7, 10],
    [9, 10],
    [10, 11],
    [9, 11],
    [4, 11],
    [6, 11],
    [8, 11],
    [3, 10],
    [8, 10]
  ];
  return [positions, elements];
}
)});
  main.variable(observer("drawSolid")).define("drawSolid", ["fragShader","vertShader","mat4"], function(fragShader,vertShader,mat4){return(
function drawSolid(f, regl, camera, color) {
  const [position, elements] = f([0, 0, 0]);
  return regl({
    frag: fragShader,
    vert: vertShader,

    attributes: {
      position: position
    },

    uniforms: {
      proj: ({ viewportWidth, viewportHeight }) =>
        mat4.perspective(
          [],
          Math.PI / 2,
          viewportWidth / viewportHeight,
          0.01,
          1000
        ),
      model: mat4.identity([]),
      view: () => camera.view(),
      color: color
    },

    elements: elements
  });
}
)});
  main.variable(observer("fragShader")).define("fragShader", function(){return(
`
    precision mediump float;

    uniform vec4 color;

    void main() {
      gl_FragColor = color;
    }
`
)});
  main.variable(observer("vertShader")).define("vertShader", function(){return(
`
    precision mediump float;
    
    uniform mat4 proj;
    uniform mat4 model;
    uniform mat4 view;

    attribute vec3 position;
    attribute vec3 normal;

    void main() {
      gl_Position = proj * view * model * vec4(position, 1);
    }
`
)});
  main.variable(observer("createREGL")).define("createREGL", ["require"], function(require){return(
require("regl")
)});
  main.variable(observer("createCamera")).define("createCamera", ["require"], function(require){return(
require("https://bundle.run/canvas-orbit-camera@1.0.2")
)});
  main.variable(observer("mat4")).define("mat4", ["require"], function(require){return(
require('https://bundle.run/gl-mat4@1.2.0')
)});
  main.variable(observer("phi")).define("phi", function(){return(
(1 + Math.sqrt(5)) / 2
)});
  return main;
}
