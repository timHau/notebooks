// https://observablehq.com/@timhau/clifford-torus@847
import define1 from "./6bc3c08c4545a7e2@3591.js";
import define2 from "./e93997d5089d7165@2227.js";
import define3 from "./7dfec509126263f5@298.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`# Clifford torus

The [clifford torus](https://en.wikipedia.org/wiki/Clifford_torus) is the cartesian product of two Circles (${tex`S_{a}^1 \times S_{b}^1`}) which is a set of vectors in ${tex`\R^4`}. This is a "natural" definition of the torus, as you can think of it as a circle that "goes along the path of another circle" (very unprecise i know...). To see what is going on we need to project this set of vectors back into ${tex`\R^3`}, which can be done via [stereographic projection](https://en.wikipedia.org/wiki/Stereographic_projection).

__note:__ i am just a random person on the internet. not an expert. Expect mistakes and please feel free to send suggestions.`
)});
  main.variable(observer("viewof values")).define("viewof values", ["inputsGroup","slider","sliderConfig","checkbox"], function(inputsGroup,slider,sliderConfig,checkbox){return(
inputsGroup([
  [
    slider({
      value: 40,
      min: 2,
      max: 100,
      step: 1,
      title: "radius of first circle",
      ...sliderConfig
    }),
    slider({
      value: 30,
      min: 2,
      max: 100,
      step: 1,
      title: "radius of second circle",
      ...sliderConfig
    }),
    slider({
      value: 30,
      min: 10,
      max: 100,
      step: 1,
      title: "slices",
      ...sliderConfig
    })
  ],
  [
    checkbox({
      options: [{ value: 'on', label: 'rotate around XW axis' }],
      value: 'on'
    }),
    checkbox({
      options: [{ value: 'on', label: 'rotate around YW axis' }],
      value: 'on'
    }),
    checkbox({
      options: [{ value: 'on', label: 'rotate around ZW axis' }],
      value: 'on'
    })
  ],
  [
    checkbox({
      options: [{ value: 'on', label: 'show (normal) material' }],
      value: 'on'
    }),
    checkbox({
      options: [{ value: 'on', label: 'show mesh' }],
      value: 'on'
    })
  ]
])
)});
  main.variable(observer("values")).define("values", ["Generators", "viewof values"], (G, _) => G.input(_));
  main.variable(observer()).define(["THREE","camera","renderer","scene"], function*(THREE,camera,renderer,scene)
{
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  renderer.render(scene, camera);
  yield renderer.domElement;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
### credits

check also [this notebook by scott vorthmann](https://observablehq.com/@vorth/clif4d-a-track-torus)  and [this one by torben jansen](https://observablehq.com/@toja/4d-hypercube).

Also thanks to [@j-f1](https://observablehq.com/@j-f1), [@jrus](https://observablehq.com/@jrus) and [@toja](https://observablehq.com/@toja) for helping me :) 
`
)});
  main.variable(observer("theta")).define("theta", ["Promises"], async function*(Promises)
{
  let res = 0;
  while (true) {
    await Promises.delay(10);
    res += 0.005;
    yield res;
  }
}
);
  main.variable(observer("rotateXW")).define("rotateXW", ["THREE"], function(THREE)
{
  const m = new THREE.Matrix4();
  return theta =>
    // prettier-ignore
    m.set(
      Math.cos(theta), 0, 0, -Math.sin(theta),
      0, 1, 0, 0,
      0, 0, 1, 0,
      Math.sin(theta), 0, 0, Math.cos(theta)
    );
}
);
  main.variable(observer("rotateYW")).define("rotateYW", ["THREE"], function(THREE)
{
  const m = new THREE.Matrix4();
  return theta =>
    // prettier-ignore
    m.set(
      1, 0, 0, 0,
      0, Math.cos(theta), 0, -Math.sin(theta),
      0, 0, 1, 0,
      0, Math.sin(theta), 0, Math.cos(theta)
    );
}
);
  main.variable(observer("rotateZW")).define("rotateZW", ["THREE"], function(THREE)
{
  const m = new THREE.Matrix4();
  return theta =>
    // prettier-ignore
    m.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, Math.cos(theta), -Math.sin(theta),
      0, 0, Math.sin(theta), Math.cos(theta)
    );
}
);
  main.variable(observer("cliffordTorus")).define("cliffordTorus", ["values","THREE"], function(values,THREE){return(
function cliffordTorus(u, v) {
  const [[r1, r2]] = values;
  return new THREE.Vector4(
    r1 * Math.cos(u) * (Math.PI / 180),
    r1 * Math.sin(u) * (Math.PI / 180),
    r2 * Math.cos(v) * (Math.PI / 180),
    r2 * Math.sin(v) * (Math.PI / 180)
  );
}
)});
  main.variable(observer("project")).define("project", ["THREE"], function(THREE){return(
function project(v) {
  const denom = 1 - v.w;
  return new THREE.Vector3(v.x / denom, v.y / denom, v.z / denom);
}
)});
  main.variable(observer("toEq")).define("toEq", ["cliffordTorus","values","rotateXW","rotateYW","rotateZW","project"], function(cliffordTorus,values,rotateXW,rotateYW,rotateZW,project){return(
function toEq(theta) {
  return (u_, v_, target) => {
    const u = u_ * 2 * Math.PI;
    const v = v_ * 2 * Math.PI;

    const torus = cliffordTorus(u, v);
    const [[], [rx, ry, rz]] = values;

    if (rx) {
      const rotXW = rotateXW(theta);
      torus.applyMatrix4(rotXW);
    }
    if (ry) {
      const rotYW = rotateYW(theta);
      torus.applyMatrix4(rotYW);
    }
    if (rz) {
      const rotZW = rotateZW(theta);
      torus.applyMatrix4(rotZW);
    }

    const projected = project(torus);
    target.set(projected.x, projected.z, projected.y);
  };
}
)});
  main.variable(observer("geometry")).define("geometry", ["values","THREE","toEq"], function(values,THREE,toEq){return(
theta => {
  const slices = values[0][2];
  return new THREE.ParametricBufferGeometry(toEq(theta), slices, slices);
}
)});
  main.variable(observer("projected")).define("projected", ["THREE"], function(THREE)
{
  return geometry => {
    const material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.4
    });
    return new THREE.Mesh(geometry, material);
  };
}
);
  main.variable(observer("projectedOutline")).define("projectedOutline", ["THREE"], function(THREE)
{
  return geometry => {
    const material = new THREE.MeshBasicMaterial({
      color: '#101010',
      wireframe: true
    });
    return new THREE.Mesh(geometry, material);
  };
}
);
  main.variable(observer("renderer")).define("renderer", ["THREE","width","height"], function(THREE,width,height)
{
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(devicePixelRatio);
  return renderer;
}
);
  main.variable(observer("scene")).define("scene", ["THREE","geometry","theta","values","projected","projectedOutline"], function(THREE,geometry,theta,values,projected,projectedOutline)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const geom = geometry(theta);

  const showMat = values[2][0];
  showMat && scene.add(projected(geom));
  const showMesh = values[2][1];
  showMesh && scene.add(projectedOutline(geom));

  return scene;
}
);
  main.variable(observer("camera")).define("camera", ["width","height","THREE","scene"], function(width,height,THREE,scene)
{
  const fov = 75;
  const aspect = width / height;
  const near = 0.001;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.lookAt(scene.position);
  camera.position.set(2, -1, -1);
  return camera;
}
);
  main.variable(observer("THREE")).define("THREE", ["require"], async function(require)
{
  const THREE = (window.THREE = await require("three@0.99.0/build/three.min.js"));
  await require("three@0.99.0/examples/js/controls/OrbitControls.js").catch(
    () => {}
  );
  return THREE;
}
);
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width / 1.5
)});
  main.variable(observer("scale")).define("scale", function(){return(
400
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define2);
  main.import("checkbox", child2);
  const child3 = runtime.module(define3);
  main.import("inputsGroup", child3);
  main.variable(observer("sliderConfig")).define("sliderConfig", function()
{
  return {
    theme: 'default-round',
    background: {
      type: 'double',
      colors: ['#7295FF', '#efefef']
    }
  };
}
);
  return main;
}
