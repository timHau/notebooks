// https://observablehq.com/@timhau/3d-flocking@737
import define1 from "./7dfec509126263f5@298.js";
import define2 from "./e93997d5089d7165@2227.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# 3D Flocking

I adapted [this processing code](https://processing.org/examples/flocking.html) from [Daniel Shiffman](https://twitter.com/shiffman) to 3D. 
Feel free to change some settings below the canvas and as always don't hesitate to notice me if you find my mistakes or ways to improve my code :)`
)});
  main.variable(observer()).define(["THREE","width","camera","invalidation","addLight","showArea","areaValues","boidValues","Boid","Promises"], function*(THREE,width,camera,invalidation,addLight,showArea,areaValues,boidValues,Boid,Promises)
{
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(width, width / 1.4);
  renderer.setPixelRatio(devicePixelRatio);

  const scene = new THREE.Scene();

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  invalidation.then(() => (controls.dispose(), renderer.dispose()));
  controls.addEventListener("change", () => renderer.render(scene, camera));

  addLight(scene);

  // AREA
  if (showArea) {
    const area = areaValues[0][0];
    const areaGeo = new THREE.BoxBufferGeometry(area, area, area);
    const areaMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });
    const areaMesh = new THREE.Mesh(areaGeo, areaMat);
    areaMesh.position.set(area / 2, area / 2, area / 2);
    scene.add(areaMesh);
  }

  const points = [];
  const n = boidValues[0][0];
  const area = areaValues[0][0];
  for (let i = 0; i < n; ++i) {
    points.push(
      new Boid(
        [Math.random() * area, Math.random() * area, Math.random() * area],
        scene
      )
    );
  }

  let counter = 0;
  while (true) {
    yield Promises.delay(10).then(() => {
      counter += 1;
      points.forEach(p => p.run(points, scene, counter));
      renderer.render(scene, camera);
      return renderer.domElement;
    });
  }
}
);
  main.variable(observer("viewof boidValues")).define("viewof boidValues", ["inputsGroup","slider"], function(inputsGroup,slider){return(
inputsGroup([
  [
    slider({
      value: 1200,
      min: 1,
      max: 2000,
      step: 1,
      description: "Number of Boids"
    }),
    slider({
      value: 0.7,
      min: 0.1,
      max: 3,
      step: 0.1,
      description: "Radius of one Boid"
    }),
    slider({
      value: 4,
      min: 0.1,
      max: 8,
      step: 0.1,
      description: "Max speed"
    }),
    slider({
      value: 0.06,
      min: 0.01,
      max: 0.1,
      step: 0.01,
      description: "Max Force"
    }),
    slider({
      value: 1,
      min: 1,
      max: 10,
      step: 1,
      description: "Mass"
    })
  ]
])
)});
  main.variable(observer("boidValues")).define("boidValues", ["Generators", "viewof boidValues"], (G, _) => G.input(_));
  main.variable(observer("viewof behaviorValues")).define("viewof behaviorValues", ["inputsGroup","slider"], function(inputsGroup,slider){return(
inputsGroup([
  [
    slider({
      value: 1.1,
      min: 0.01,
      max: 5,
      step: 0.01,
      description: "Weight for seperation"
    }),
    slider({
      value: 1.3,
      min: 0.01,
      max: 5,
      step: 0.01,
      description: "Weight for alignment"
    }),
    slider({
      value: 1.2,
      min: 0.01,
      max: 5,
      step: 0.01,
      description: "Weight for cohesion"
    }),
    slider({
      value: 15,
      min: 1,
      max: 50,
      step: 1,
      description: "Distance for seperation"
    }),
    slider({
      value: 20,
      min: 1,
      max: 50,
      step: 1,
      description: "Distance for alignment"
    }),
    slider({
      value: 15,
      min: 1,
      max: 50,
      step: 1,
      description: "Distance for cohesion"
    })
  ]
])
)});
  main.variable(observer("behaviorValues")).define("behaviorValues", ["Generators", "viewof behaviorValues"], (G, _) => G.input(_));
  main.variable(observer("viewof areaValues")).define("viewof areaValues", ["inputsGroup","slider"], function(inputsGroup,slider){return(
inputsGroup([
  [
    slider({
      value: 150,
      min: 10,
      max: 300,
      step: 10,
      description: "Area in which boids move"
    }),
    slider({
      value: 3.5,
      min: 0.1,
      max: 5,
      step: 0.1,
      description: "Light Intensity"
    })
  ]
])
)});
  main.variable(observer("areaValues")).define("areaValues", ["Generators", "viewof areaValues"], (G, _) => G.input(_));
  main.variable(observer("showArea")).define("showArea", function(){return(
false
)});
  main.variable(observer("Boid")).define("Boid", ["THREE","randomAngle","boidValues","behaviorValues","areaValues"], function(THREE,randomAngle,boidValues,behaviorValues,areaValues){return(
class Boid {
  constructor([x, y, z], scene) {
    this.position = new THREE.Vector3(x, y, z);
    this.acceleration = new THREE.Vector3(0, 0, 0);

    const angle = randomAngle();
    this.velocity = new THREE.Vector3(
      Math.cos(angle),
      Math.sin(angle),
      Math.sin(angle)
    );

    this.init(scene);
  }

  init(scene) {
    const { position } = this;

    const r = boidValues[0][1];
    const geometry = new THREE.BoxBufferGeometry(r, r, r);
    const material = new THREE.MeshPhongMaterial({
      color: `rgba(150,150,150, 1)`
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(...position.toArray());

    scene.add(cube);
    this.mesh = cube;
  }

  run(boids, scene, counter) {
    this.flock(boids);
    this.update(counter);
    this.borders();
  }

  applyForce(force) {
    const mass = boidValues[0][4];
    this.acceleration.add(force.divideScalar(mass));
  }

  flock(boids, scene) {
    const sep = this.separate(boids);
    const ali = this.align(boids, scene);
    const coh = this.cohesion(boids);

    sep.multiplyScalar(behaviorValues[0][0]);
    ali.multiplyScalar(behaviorValues[0][1]);
    coh.multiplyScalar(behaviorValues[0][2]);

    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  separate(boids) {
    const { position, velocity } = this;
    const steer = new THREE.Vector3(0, 0, 0);
    let count = 0;

    for (let boid of boids) {
      const d = position.distanceTo(boid.position);

      const neighborDistSeperate = behaviorValues[0][3];
      if (d > 0 && d < neighborDistSeperate) {
        const diff = new THREE.Vector3().subVectors(position, boid.position);
        diff.normalize();
        diff.divideScalar(d);
        steer.add(diff);
        count += 1;
      }
    }

    if (count > 0) {
      steer.divideScalar(count);
    }

    if (steer.length() > 0) {
      const maxSpeed = boidValues[0][2];
      const maxForce = boidValues[0][3];
      steer.setLength(maxSpeed);
      steer.sub(velocity);
      steer.clampLength(0, maxForce);
    }

    return steer;
  }

  align(boids) {
    const { position, velocity } = this;
    const sum = new THREE.Vector3(0, 0, 0);
    let count = 0;

    for (let boid of boids) {
      const d = position.distanceTo(boid.position);

      const neighborDistAlign = behaviorValues[0][4];
      if (d > 0 && d < neighborDistAlign) {
        sum.add(boid.velocity);
        count += 1;
      }
    }

    if (count > 0) {
      const maxSpeed = boidValues[0][2];
      const maxForce = boidValues[0][3];
      sum.divideScalar(count);
      sum.setLength(maxSpeed);
      const steer = new THREE.Vector3().subVectors(sum, velocity);
      steer.clampLength(0, maxForce);
      return steer;
    }
    return new THREE.Vector3(0, 0, 0);
  }

  cohesion(boids) {
    const { position } = this;
    const sum = new THREE.Vector3(0, 0, 0);
    let count = 0;

    for (let boid of boids) {
      const d = position.distanceTo(boid.position);

      const neighborDistCohesion = behaviorValues[0][5];
      if (d > 0 && d < neighborDistCohesion) {
        sum.add(boid.position);
        count += 1;
      }
    }

    if (count > 0) {
      sum.divideScalar(count);
      return this.seek(sum);
    }

    return new THREE.Vector3(0, 0, 0);
  }

  seek(target) {
    const { position, velocity } = this;
    const maxSpeed = boidValues[0][2];
    const maxForce = boidValues[0][3];

    const desired = new THREE.Vector3().subVectors(target, position);
    desired.setLength(maxSpeed);

    const steer = new THREE.Vector3().subVectors(desired, velocity);
    steer.clampLength(0, maxForce);

    return steer;
  }

  borders() {
    const { position } = this;
    const area = areaValues[0][0];
    const r = boidValues[0][1];

    if (position.x < -r) position.x = area + r;
    if (position.y < -r) position.y = area + r;
    if (position.z < -r) position.z = area + r;
    if (position.x > area + r) position.x = -r;
    if (position.y > area + r) position.y = -r;
    if (position.z > area + r) position.z = -r;
  }

  update(counter) {
    const { position, velocity, acceleration, mesh, color } = this;

    const maxSpeed = boidValues[0][2];
    velocity.add(acceleration);
    velocity.clampLength(0, maxSpeed);
    position.add(velocity);
    acceleration.multiplyScalar(0);
    mesh.position.set(...position.toArray());
  }
}
)});
  main.variable(observer("randomAngle")).define("randomAngle", function(){return(
function randomAngle() {
  return Math.random() * 2 * Math.PI;
}
)});
  main.variable(observer("addLight")).define("addLight", ["THREE","areaValues"], function(THREE,areaValues){return(
function addLight(scene) {
  const ambi = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambi);

  const area = areaValues[0][0];
  const positions = [
    [0, 0, 0],
    [0, area, 0],
    [0, 0, area],
    [area, 0, 0],
    [0, area, area],
    [area, 0, area],
    [area, area, 0]
  ];

  const lightIntensity = areaValues[0][1];
  positions.forEach(pos => {
    const light = new THREE.PointLight(0xffffff, lightIntensity, 100);
    light.position.set(...pos);
    light.castShadow = true;
    scene.add(light);
  });

  const light = new THREE.PointLight(0xffffff, 6 * lightIntensity, 100);
  light.position.set(area / 2, area / 2, area / 2);
  light.castShadow = true;
  scene.add(light);
}
)});
  main.variable(observer("camera")).define("camera", ["THREE","areaValues"], function*(THREE,areaValues)
{
  const fov = 60;
  const near = 1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, 1, near, far);
  const area = areaValues[0][0];
  camera.position.set(area + 20, area - 30, area + 70);
  yield camera;
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
  const child1 = runtime.module(define1);
  main.import("inputsGroup", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  return main;
}
