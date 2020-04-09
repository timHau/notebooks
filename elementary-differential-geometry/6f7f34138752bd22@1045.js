// https://observablehq.com/@timhau/elementary-differential-geometry@1045
import define1 from "./e93997d5089d7165@2227.js";
import define2 from "./6f35a89e3f4ac2aa@480.js";
import define3 from "./4d2b38d13eef7c4d@407.js";
import define4 from "./7dfec509126263f5@298.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Elementary Differential Geometry

As usual short disclaimer, I am just an amateur in all of this, so chances are you know much more about differentlial geometry than i do. If so just send me a suggestion and tell me my mistakes :)

If you are looking for an excellent online course, i would recommend 
[this course by Claudio Arezzo](https://www.youtube.com/watch?v=tKnBj7B2PSg&list=PLLq_gUfXAnkl5JArcktbOrIUeR5rra-Gz) which is completely on youtube.`
)});
  main.variable(observer()).define(["sn","tex","note"], function(sn,tex,note){return(
sn`## Curves in ${tex`\R^n`}

Most of us intuitively know what a curve is. It's some sort of bended thing in some space (e.g. on a sheet of paper or in a 3d room). Mathematically it is defined as

*__Definition 1__:* Let ${tex`I \subset \R`} be an Intervall. A parametric curve is an infinitely differentiable (often called smooth) function ${tex`c : I \to \R^n`}. We call a curve regular, if its derivative never vanishes, ${tex`c'(t) \neq 0`} for all ${tex`t \in I`} 

${note`often the derivative ${tex`c'(t)`} is also called the velocity vector. Imagine a car driving along the curve. ${tex`c'(t)`} would meassure the velocity and direction of the car at position ${tex`t`}`}

*Example 1:* A fairly simple example is a straight line 
${tex.block`c : \R \to \R^2, \quad c(t) = c_0 + t \cdot v`}
where ${tex`c_0, v \in \R^2`}`
)});
  main.variable(observer("example1")).define("example1", ["DOM","Promises","line","circle"], async function*(DOM,Promises,line,circle)
{
  const w = 400;
  const context = DOM.context2d(w, w);
  context.translate(w / 2, w / 2);

  const scale = 20;
  const g = t => [1 + t * 3, 1 + t * -3].map(v => v * scale);

  let t = -1;
  yield context.canvas;
  while (true) {
    await Promises.delay(10);
    context.clearRect(-w / 2, -w / 2, w, w);

    line(g(-2), g(2), context);
    circle([...g(-1), 2.5], context, { color: 'blue' });
    circle([...g(1), 2.5], context, { color: 'blue' });

    circle([...g(t), 2.5], context, { color: 'red' });
    t += 0.02;
    if (t > 1) t = -1;
  }
}
);
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`*Example 2:* Another not so obvious example is given by a 3 dimensional spiral
${tex.block`c : \R \to \R^3, \quad c(t) = \begin{pmatrix} r \sin(t) \\ r \cos(t) \\ ht \end{pmatrix}`}
where ${tex`r,t \in \R, r > 0, t>0`}.

Feel free to drag around:`
)});
  main.variable(observer("example2")).define("example2", ["THREE","spiralCamera","invalidation","spiralScene","width","Promises","spiral","spiralMaxT"], async function*(THREE,spiralCamera,invalidation,spiralScene,width,Promises,spiral,spiralMaxT)
{
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new THREE.OrbitControls(spiralCamera, renderer.domElement);
  invalidation.then(() => (controls.dispose(), renderer.dispose()));

  const sphereGeo = new THREE.SphereBufferGeometry(0.18, 20, 20);
  const sphereMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  spiralScene.add(sphere);

  renderer.setSize(width, 500);
  renderer.setPixelRatio(devicePixelRatio);
  controls.addEventListener("change", () =>
    renderer.render(spiralScene, spiralCamera)
  );

  yield renderer.domElement;
  let t = 0;
  while (true) {
    await Promises.delay(10);
    sphere.position.set(...spiral(t));
    t = (t + 0.025) % spiralMaxT;
    renderer.render(spiralScene, spiralCamera);
  }
}
);
  main.variable(observer()).define(["sn","tex","note"], function(sn,tex,note){return(
sn`## Length of a curve

Let ${tex`\gamma : [a,b] \to \R^n`} a curve. Then the length of ${tex`\gamma`} is defined as 

${tex.block`\int_a^b\|\gamma'(t)\|\;dt`} 
${note`where ${tex`\| \cdot \|`} is the [euclidean norm](https://en.wikipedia.org/wiki/Euclidean_distance)`}

which was really confusing to me when i first heard it. Why is there an integral? It makes sense if you start by first considering the discrete case, where one could try to approximate a curve through line segments (which is actually what a computer is doing)
`
)});
  main.variable(observer("viewof approxN")).define("viewof approxN", ["slider"], function(slider){return(
slider({
  value: 3,
  min: 1,
  max: 50,
  step: 1,
  description: "How precise do you want to approximate the curve"
})
)});
  main.variable(observer("approxN")).define("approxN", ["Generators", "viewof approxN"], (G, _) => G.input(_));
  main.variable(observer("example3")).define("example3", ["DOM","width","height","line","approxN","circle"], function*(DOM,width,height,line,approxN,circle)
{
  const context = DOM.context2d(width, height);
  context.translate(width / 2, height / 2);

  const points = [];
  const scale = 40;
  const f = x => [scale * x ** 3, scale * 2 * x];

  // in mathematics this would go to infinity
  for (let i = -2; i <= 2; i += 0.005) {
    points.push(f(i));
  }

  for (let i = 0; i < points.length - 1; ++i) {
    line(points[i], points[i + 1], context, { color: 'rgb(100, 100, 100)' });
  }

  const approx = [];
  for (let i = 0; i <= approxN; ++i) {
    const v = -2 + (i / approxN) * 4;
    const p = f(v);
    circle([...p, 1.8], context, { color: 'blue' });
    approx.push(p);
  }

  for (let i = 0; i < approx.length - 1; ++i) {
    line(approx[i], approx[i + 1], context, { color: 'red' });
  }

  yield context.canvas;
}
);
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`then it would be natural to calculate the length of the linear approximation as the sum over the length of the segments. So if ${tex`v_{k},v_{k+1} \in \R^n`} the length of the ${tex`i`}-th line segment which starts in ${tex`v_{k}`} and ends in ${tex`v_{k+1}`} would be calculated as ${tex`\|v_{k+1} - v_{k}\|`}. So to calculate the whole length of the approximation consisting of ${tex`n+1`} points ${tex`\{ v_0, \dots v_n \}`} you would use

${tex.block`\sum_{k=0}^{n-1} \| v_{k+1} - v_k \|`}

And if you send n ${tex`\to \infty`} the sum gets replaced by an Integral (simply speaking). I guess for most of you this is fairly obvious, as the Integral is defined as an infinitesimal sum, but for me this small example which i found in [this book](https://www.zvab.com/9783110224580/Elementare-Differentialgeometrie-Gruyter-Lehrbuch-German-3110224585/plp) was an eye opener, as i simply accepted the Integral without asking during my calculus course.`
)});
  main.variable(observer()).define(["sn","tex","note"], function(sn,tex,note){return(
sn`## unit speed / parametrization by arc length

So if we want to calculate the length of a curve we have to solve an integral, which can be tricky and it would be nice to have a simpler way. If ${tex`c'(t) = 1`} for all ${tex`t`} then the length of a curve would simply be the difference between the intervall end and starting point (*).

${note`(*) as the length of a curve is invariant under re-parametrization.`}

Luckily there is a way to change the parametrization of a curve by composing it with another parametrization ${tex`\psi : I \to \R^n`} such that ${tex`\|(c \circ \psi)'(t)\| = 1`}. We call this parametrization the __unit speed parametrization__ or the __parameterization by arc length__.

Below you can see an ellipse that is not parametrized by arc length. Notice how the length of the velocity vector is changing. You can adjust the sliders below such that the values are the same, which results in a circle that is parametrized by arc length.`
)});
  main.variable(observer("viewof ellipsValues")).define("viewof ellipsValues", ["inputsGroup","slider"], function(inputsGroup,slider){return(
inputsGroup([
  [
    slider({
      value: 250,
      min: 2,
      max: 350,
      step: 1,
      description: "ellipse factor a"
    }),
    slider({
      value: 50,
      min: 2,
      max: 350,
      step: 1,
      description: "ellipse factor b"
    })
  ]
])
)});
  main.variable(observer("ellipsValues")).define("ellipsValues", ["Generators", "viewof ellipsValues"], (G, _) => G.input(_));
  main.variable(observer("example4")).define("example4", ["DOM","width","height","ellipsValues","approxDerivRtoR2","circle","line"], function*(DOM,width,height,ellipsValues,approxDerivRtoR2,circle,line)
{
  const context = DOM.context2d(width, height);
  context.translate(width / 2, height / 2);

  const [ellipsA, ellipsB] = ellipsValues[0];

  const f = x => [ellipsA * Math.sin(x), ellipsB * Math.cos(x)];

  const d = approxDerivRtoR2(f);
  let t = 0;
  const timeStep = 0.02;

  while (true) {
    context.clearRect(-width / 2, -height / 2, width, height);

    const resStep = Math.PI / 80;
    const shape = [];
    for (let i = 0; i < 2 * Math.PI; i += resStep) {
      const p = f(i);
      circle([...p, 2], context, { color: 'rgb(100,100,100)' });
      shape.push(p);
    }

    for (let i = 0; i < shape.length - 1; ++i) {
      line(shape[i], shape[i + 1], context, { color: 'rgb(150,150,150)' });
    }
    line(shape[shape.length - 1], shape[0], context, {
      color: 'rgb(150,150,150)'
    });

    const s = d(t);
    const p = [-f(t)[0] + s[0], -f(t)[1] + s[1]];
    line(s, p, context, { color: 'red«' });
    circle([...s, 3], context, { color: 'red' });
    circle([...p, 2], context, { color: 'blue' });

    t += timeStep;

    yield context.canvas;
  }
}
);
  main.variable(observer()).define(["sn","tex","note"], function(sn,tex,note){return(
sn`if i understand it correct, it is not always easy to find a parametrization that transforms to arc length. But for every regular parametric curve there exists one such parametrization by arc length. Let ${tex`c : I \to \R^n`} be such a regular parametric curve, ${tex`t_0 \in I`} and

${tex.block`\psi(s) := \int_{t_0}^s \|c'(t)\| dt`}

Then ${tex`\psi^{-1} : J \subset \R^n \to I`} is the desired parametrization. 

Proof: Because the first derivative of ${tex`\psi^{-1}`} is given by

${tex.block`\frac{d}{dt}\psi^{-1}(t) = \frac{1}{ \psi'(\psi^{-1}(t)) } \overset{(*)}{=} \frac{1}{\| c'(\psi^{-1}(t)) \|}`}

${note`(*) here we used that ${tex`\psi(t)' = \|c'(t)\|`}, which follows from the [fundamental theorem of calculus](https://en.wikipedia.org/wiki/Fundamental_theorem_of_calculus) `}

If we now use the chain rule we get

${tex.block`\|(c \circ \psi^{-1})'(t)\| = \|c(\psi^{-1})' \cdot \psi^{-1}(t)'\| = \bigg\| \frac{c'(\psi^{-1}(t))}{\|c'(\psi^{-1}(t))\|} \bigg\| = 1`}

So ${tex`c \circ \psi^{-1}`} is parametrized by arc length.`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`## normal field

*__Definition 2__:* Given a planar curve ${tex`c : I \subset \R \to \R^2`} that is parametrized by arc length, then we define 

${tex.block`n(t) := \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} \dot{c}(t)`}

and call it the normal field. In other words we rotate the velocity vector by ${tex`90`} degrees, so the normalvektor at a point is always orthogonal to the velocity vector at that point. Another observation we can do is that the second derivative ${tex`c(t)''`} is a multiple of ${tex`n(t)`}. More precise, there exists a function ${tex`\kappa : I \to \R`}, such that

${tex.block`c'' = \kappa(t) \cdot n(t)`}

this function ${tex`\kappa`} is called the __curvature__ of c.`
)});
  main.variable(observer("approxDeriv")).define("approxDeriv", function(){return(
function approxDeriv(f, h = 0.00000001) {
  return x => (f(x + h) - f(x)) / h;
}
)});
  main.variable(observer("approxDerivRtoR2")).define("approxDerivRtoR2", function(){return(
function approxDerivRtoR2(f, h = 0.00000001) {
  const dx = x => (f(x + h)[0] - f(x)[0]) / h;
  const dy = x => (f(x + h)[1] - f(x)[1]) / h;
  return x => [dx(x), dy(x)];
}
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width/2
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Spiral Example`
)});
  main.variable(observer("spiralCamera")).define("spiralCamera", ["THREE"], function*(THREE)
{
  const fov = 25;
  const near = 0.1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, 1, near, far);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.position.set(60, 50, 35);

  yield camera;
}
);
  main.variable(observer("spiralMaxT")).define("spiralMaxT", function(){return(
18
)});
  main.variable(observer("spiral")).define("spiral", function(){return(
function spiral(t) {
  const r = 5;
    const h = 1;
    const x = r * Math.sin(t);
    const y = r * Math.cos(t);
    const z = h * t;
    return [x, z, y];
}
)});
  main.variable(observer("spiralScene")).define("spiralScene", ["THREE","spiralMaxT","spiral"], function*(THREE,spiralMaxT,spiral)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const positions = [];
  const colors = [];
  for (let i = 0; i < spiralMaxT; i += 0.1) {
    positions.push(...spiral(i));
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.addAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  );
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x000000
  });
  const line = new THREE.Line(lineGeo, lineMat);
  scene.add(line);

  const gridHelper = new THREE.GridHelper(30, 1);
  scene.add(gridHelper);

  yield scene;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## imports `
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define2);
  main.import("circle", child2);
  main.import("line", child2);
  main.import("triangle", child2);
  main.import("coordsFromDeg", child2);
  const child3 = runtime.module(define3);
  main.import("sn", child3);
  main.import("note", child3);
  const child4 = runtime.module(define4);
  main.import("inputsGroup", child4);
  main.variable(observer("THREE")).define("THREE", ["require"], async function(require)
{
  const THREE = (window.THREE = await require("three@0.99.0/build/three.min.js"));
  await require("three@0.99.0/examples/js/controls/OrbitControls.js").catch(
    () => {}
  );
  return THREE;
}
);
  return main;
}
