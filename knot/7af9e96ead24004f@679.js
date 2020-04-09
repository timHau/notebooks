// https://observablehq.com/@timhau/knot@679
import define1 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# knot 

Total inefficient way to draw a knot in js. But that was not my focus with this one. I just wanted to explore some trigonometry and a possibility of a third dimension. 

[Ref](http://paulbourke.net/geometry/knots/)`
)});
  main.variable(observer("viewof n")).define("viewof n", ["slider"], function(slider){return(
slider({
  title: "n",
  min: 0,
  max: 1000,
  step: 10,
  value: 350
})
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("viewof sphereSize")).define("viewof sphereSize", ["slider"], function(slider){return(
slider({
  title: "sphereSize",
  min: 0.1,
  max: 2,
  step: 0.01,
  value: 0.2
})
)});
  main.variable(observer("sphereSize")).define("sphereSize", ["Generators", "viewof sphereSize"], (G, _) => G.input(_));
  main.variable(observer("viewof w")).define("viewof w", ["slider"], function(slider){return(
slider({
  title: "w",
  min: 1,
  max: 20,
  step: 1,
  value: 10
})
)});
  main.variable(observer("w")).define("w", ["Generators", "viewof w"], (G, _) => G.input(_));
  main.variable(observer("viewof c")).define("viewof c", ["slider"], function(slider){return(
slider({
  title: "c",
  min: 1,
  max: 10,
  step: 1,
  value: 3
})
)});
  main.variable(observer("c")).define("c", ["Generators", "viewof c"], (G, _) => G.input(_));
  main.variable(observer("viewof d")).define("viewof d", ["slider"], function(slider){return(
slider({
  title: "d",
  min: 1,
  max: 30,
  step: 1,
  value: 3
})
)});
  main.variable(observer("d")).define("d", ["Generators", "viewof d"], (G, _) => G.input(_));
  main.variable(observer("viewof e")).define("viewof e", ["slider"], function(slider){return(
slider({
  title: "e",
  min: 1,
  max: 30,
  step: 1,
  value: 4
})
)});
  main.variable(observer("e")).define("e", ["Generators", "viewof e"], (G, _) => G.input(_));
  main.variable(observer()).define(["THREE","invalidation","width","scene"], function*(THREE,invalidation,width,scene)
{
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const camera = new THREE.PerspectiveCamera(90, 1, 0.1, 10000);
  camera.position.set(0, 30, 10);
  camera.lookAt(0, 0, 0);
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  invalidation.then(() => (controls.dispose(), renderer.dispose()));
  renderer.setSize(width, width);
  renderer.setPixelRatio(devicePixelRatio);
  controls.addEventListener("change", () => renderer.render(scene, camera));

  renderer.render(scene, camera);
  yield renderer.domElement;
}
);
  main.variable(observer("scene")).define("scene", ["THREE","n","sphereSize","w","c","d","e"], function*(THREE,n,sphereSize,w,c,d,e)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  for (let i = 0; i < n; ++i) {
    const material = new THREE.MeshNormalMaterial();
    const geometry = new THREE.SphereGeometry(sphereSize, 8, 8);
    const sphere = new THREE.Mesh(geometry, material);

    const tau = 2 * Math.PI;
    const mu = (i * tau) / n;

    const x =
      w * (Math.cos(mu) + Math.cos(c * mu)) +
      Math.cos(d * mu) +
      Math.cos(e * mu);
    const y = 6 * Math.sin(mu) + w * Math.sin(3 * mu);
    const z =
      4 * Math.sin(3 * mu) * Math.sin((5 * mu) / 2) +
      4 * Math.sin(4 * mu) -
      2 * Math.sin(6 * mu);

    sphere.position.set(x, y, z);
    scene.add(sphere);
  }
  yield scene;
}
);
  main.variable(observer("THREE")).define("THREE", ["require"], async function(require)
{
  const THREE = window.THREE = await require("three@0.99.0/build/three.min.js");
  await require("three@0.99.0/examples/js/controls/OrbitControls.js").catch(() => {});
  return THREE;
}
);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  return main;
}
