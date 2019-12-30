// https://observablehq.com/@timhau/parametric-surfaces@1426
import define1 from "./e93997d5089d7165@2209.js";
import define2 from "./7dfec509126263f5@297.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`# parametric surfaces

Given two parameters ${tex`u,v`} one can write a function ${tex`f:\R^2 \to \R^3`} which is a parametrization of a surface when ploted in ${tex`\R^3`}.

Most of the functions are taken from [this book on differential geometry](https://books.google.de/books?id=-LRumtTimYgC&pg=PA961&lpg=PA961&dq), which i sadly did **not** read, although it looks really interesting so you should read it if you have time and also [this german webpage](http://www.3d-meier.de/tut3/Seite178.html), which was __really__ helpful and has even some surfaces that i did not include here. So chances are that you know more about the subject than I do, if so please let me know if you find mistakes / want to add things.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Note:** the default values are random so if you select a surfaces another time, the result might differ. Simply adjust the sliders to the same values and you get the same surfaces back. Some surfaces are also scaled so that they fit.

p.s. you can drag the plot`
)});
  main.variable(observer("viewof eq")).define("viewof eq", ["html","eqData"], function(html,eqData){return(
html`
<select id="equations">
  ${eqData.map((eq, i) => `<option value=${i}>${eq.name}</option>`)}
</select>
`
)});
  main.variable(observer("eq")).define("eq", ["Generators", "viewof eq"], (G, _) => G.input(_));
  main.variable(observer("viewof values")).define("viewof values", ["inputsGroup","eqData","eq","slider"], function(inputsGroup,eqData,eq,slider){return(
inputsGroup([
  eqData[parseFloat(eq)].params.map(p =>
    slider({
      min: 1,
      max: 40,
      step: 1,
      value: p === 'n' ? 3 : 2 + Math.floor(Math.random() * 38),
      title: p
    })
  )
])
)});
  main.variable(observer("values")).define("values", ["Generators", "viewof values"], (G, _) => G.input(_));
  main.variable(observer()).define(["THREE","width","height","camera","invalidation","scene","Promises"], async function*(THREE,width,height,camera,invalidation,scene,Promises)
{
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(devicePixelRatio);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  invalidation.then(() => (controls.dispose(), renderer.dispose()));
  controls.addEventListener("change", () => renderer.render(scene, camera));

  while (true) {
    await Promises.delay(100);
    renderer.render(scene, camera);
    yield renderer.domElement;
  }
}
);
  main.variable(observer("viewof slices")).define("viewof slices", ["slider"], function(slider){return(
slider({
  value: 150,
  min: 1,
  max: 300,
  step: 1,
  description: "slices"
})
)});
  main.variable(observer("slices")).define("slices", ["Generators", "viewof slices"], (G, _) => G.input(_));
  main.variable(observer("wireframe")).define("wireframe", function(){return(
false
)});
  main.variable(observer("breather")).define("breather", function(){return(
function breather(u_, v_, target) {
  const a = 0.4;
  const w = 20;
  const u = -13.2 + u_ * 26.4;
  const v = -37.4 + v_ * 2 * 37.4;

  const r = 1 - a ** 2;
  const l = Math.sqrt(r);
  const d = a * ((l * Math.cosh(a * u)) ** 2 + (a * Math.sin(l * v)) ** 2);
  const x = -u + (2 * r * Math.cosh(a * u) * Math.sinh(a * u)) / d;
  const y =
    (2 *
      l *
      Math.cosh(a * u) *
      (-(l * Math.cos(v) * Math.cos(l * v)) - Math.sin(v) * Math.sin(l * v))) /
    d;
  const z =
    (2 *
      l *
      Math.cosh(a * u) *
      (-(l * Math.sin(v) * Math.cos(l * v)) + Math.cos(v) * Math.sin(l * v))) /
    d;

  target.set(x * w, z * w, y * w);
}
)});
  main.variable(observer("bonanJeenerKlein")).define("bonanJeenerKlein", ["a"], function(a){return(
function bonanJeenerKlein(u_, v_, target) {
  const u = 2 * Math.PI * u_;
  const v = 2 * Math.PI * v_;

  const w = 15;
  const t = 2;

  const k = Math.sin((a - 1) * u) + t;
  const x =
    a * Math.cos(u) -
    Math.cos(a * u) -
    ((a - 1) / a) * k * Math.sin(((a + 1) * u) / 2) * Math.cos(v);
  const y = k * Math.sin(v);
  const z =
    a * Math.sin(u) -
    Math.sin(a * u) +
    ((a - 1) / a) * k * Math.cos(((a + 1) * u) / 2) * Math.cos(v);

  target.set(x * w, y * w, z * w);
}
)});
  main.variable(observer("triaxialHexatorus")).define("triaxialHexatorus", function(){return(
function triaxialHexatorus(u_, v_, target) {
  const w = 100;
  const u = 2 * Math.PI * u_;
  const v = 2 * Math.PI * v_;

  const x = Math.sin(u) / (Math.sqrt(2) + Math.cos(v));
  const y =
    Math.sin(u + (2 * Math.PI) / 3) /
    (Math.sqrt(2) + Math.cos(v + (2 * Math.PI) / 3));
  const z =
    Math.cos(u - (2 * Math.PI) / 3) /
    (Math.sqrt(2) + Math.cos(v - (2 * Math.PI) / 3));

  target.set(x * w, y * w, z * w);
}
)});
  main.variable(observer("kleinCycloid")).define("kleinCycloid", ["a"], function(a){return(
function kleinCycloid(u_, v_, target) {
  const w = 10;
  const c = 2;
  const b = 5;
  const u = u_ * 2 * b * c * Math.PI;
  const v = v_ * 4 * Math.PI;

  const x =
    Math.cos(u / c) * Math.cos(u / b) * (a + Math.cos(v)) +
    Math.sin(u / b) * Math.sin(v) * Math.cos(v);
  const y =
    Math.sin(u / c) * Math.cos(u / b) * (a + Math.cos(v)) +
    Math.sin(u / b) * Math.sin(v) * Math.cos(v);
  const z =
    -Math.sin(u / b) * (a + Math.cos(v)) +
    Math.cos(u / b) * Math.sin(v) * Math.cos(v);

  target.set(x * w, z * w, y * w);
}
)});
  main.variable(observer("braidedTorus")).define("braidedTorus", ["a","b","c"], function(a,b,c){return(
function braidedTorus(u_, v_, target) {
  const w = 50;
  const u = u_ * 8 * Math.PI;
  const v = v_ * 2 * Math.PI;

  const r = a / 50;
  const R = b / 10;
  const n = c / 10;

  const x =
    r * Math.cos(v) * Math.cos(u) +
    R * Math.cos(u) * (1 + (1 / 2) * Math.cos(n * u));
  const y = 2.5 * (r * Math.sin(v) + (1 / 2) * Math.sin(n * u));
  const z =
    r * Math.cos(v) * Math.sin(u) +
    R * Math.sin(u) * (1 + (1 / 2) * Math.cos(n * u));

  target.set(x * w, y * w, z * w);
}
)});
  main.variable(observer("tranguloidTrefoil")).define("tranguloidTrefoil", function(){return(
function tranguloidTrefoil(u_, v_, target) {
  const w = 30;
  const u = -Math.PI + u_ * 2 * Math.PI;
  const v = -Math.PI + v_ * 2 * Math.PI;

  const x = (2 * Math.sin(3 * u)) / (2 + Math.cos(v));
  const y =
    (2 * (Math.sin(u) + 2 * Math.sin(2 * u))) /
    (2 + Math.cos(v + (2 * Math.PI) / 3));
  const z =
    ((Math.cos(u) - 2 * Math.cos(2 * u)) *
      (2 + Math.cos(v)) *
      (2 + Math.cos(v + (2 * Math.PI) / 3))) /
    4;

  target.set(x * w, z * w, y * w);
}
)});
  main.variable(observer("hyperbolicHelicoid")).define("hyperbolicHelicoid", ["a"], function(a){return(
function hyperbolicHelicoid(u_, v_, target) {
  const w = 150;
  const u = -4 + u_ * 8;
  const v = -4 + v_ * 8;
  const k = 3 + a / 20;

  const x =
    (Math.sinh(v) * Math.cos(k * u)) / (1 + Math.cosh(u) * Math.cosh(v));
  const y =
    (Math.sinh(v) * Math.sin(k * u)) / (1 + Math.cosh(u) * Math.cosh(v));
  const z = (Math.cosh(v) * Math.sinh(u)) / (1 + Math.cosh(u) * Math.cosh(v));

  target.set(x * w, z * w, y * w);
}
)});
  main.variable(observer("monkeySaddle")).define("monkeySaddle", function(){return(
function monkeySaddle(u_, v_, target) {
  const w = 150;
  const u = -1 + u_ * 2;
  const v = -1 + v_ * 2;

  const x = u;
  const y = v;
  const z = u ** 3 - 3 * u * v ** 2;

  target.set(x * w, z * w, y * w);
}
)});
  main.variable(observer("snail")).define("snail", ["b","a"], function(b,a){return(
function snail(u_, v_, target) {
  const w = 10;
  const u = u_ * 6 * Math.PI;
  const v = v_ * 2 * Math.PI;

  const d = b / 15;

  const h = Math.E ** (u / (6 * Math.PI));
  const x =
    a * (1 - h) * Math.cos(u) * Math.cos((1 / 2) * v) * Math.cos((1 / 2) * v);
  const y = 1 - Math.E ** (u / (d * Math.PI) - Math.sin(v) + h * Math.sin(v));
  const z =
    a * (h - 1) * Math.sin(u) * Math.cos((1 / 2) * v) * Math.cos((1 / 2) * v);

  target.set(x * w, -200 - y * w, z * w);
}
)});
  main.variable(observer("sievert")).define("sievert", ["a","tan","sin","cos"], function(a,tan,sin,cos){return(
function sievert(u_, v_, target) {
  const w = 60;
  const u = -Math.PI / 2 + u_ * (Math.PI / (100 - a * 2));
  const v = 0.105 + v_ * 1;
  const k = 0.5;

  const p = -u / Math.sqrt(k + 1) + Math.atan(tan(u) * Math.sqrt(k + 1));
  const l = 2 / (k + 1 - k * sin(v) * sin(v) * cos(u) * cos(u));
  const r =
    (l * Math.sqrt((k + 1) * (1 + k * sin(u) * sin(u))) * sin(v)) /
    Math.sqrt(k);

  const x = r * cos(p);
  const y = r * sin(p);
  const z = (Math.log(tan(v / 2)) + l * (k + 1) * cos(v)) / Math.sqrt(k);

  target.set(x * w, z * w, y * w);
}
)});
  main.variable(observer("roman")).define("roman", ["sin","cos"], function(sin,cos){return(
function roman(u, v, target) {
  const a = 20
  const x = (a ** 2 / 4) * sin(2 * u) * cos(v) ** 2;
  const y = (a ** 2 / 4) * sin(u) * sin(2 * v);
  const z = (a ** 2 / 4) * cos(u) * sin(2 * v);

  target.set(x, z, y);
}
)});
  main.variable(observer("richmond")).define("richmond", ["a","b"], function(a,b){return(
function richmond(u, v, target) {
  const w = 500;
  const r = u;
  const theta = v * 2 * Math.PI;

  const n = a;
  const t = b;

  const x =
    -Math.cos(t + theta) / (2 * r) -
    (r ** (2 * n + 1) * Math.cos(t - (2 * n + 1) * theta)) / (4 * n + 2);
  const y =
    -Math.sin(t + theta) / (2 * r) +
    (r ** (2 * n + 1) * Math.sin(b - (2 * n + 1) * theta)) / (4 * n + 2);
  const z = (r ** n * Math.cos(b - n * theta)) / n;

  target.set(x * w, z * w, y * w);
}
)});
  main.variable(observer("pseudosphere")).define("pseudosphere", ["a","cos","sin","tan"], function(a,cos,sin,tan){return(
function pseudosphere(u, v, target) {
  const w = 10;

  const x = a * cos(u) * sin(v) * w;
  const y = a * sin(u) * sin(v) * w;
  const z = a * (cos(v) + Math.log(tan(v / 2))) * w;

  target.set(x, z, y);
}
)});
  main.variable(observer("helicoid")).define("helicoid", ["a","cos","sin","b"], function(a,cos,sin,b){return(
function helicoid(u, v, target) {
  const w = 50;
  const x = (a / 5) * v * cos(u) * w;
  const y = (a / 5) * v * sin(u) * w;
  const z = (b / 2) * (-w / 2 + u * w);

  target.set(x, z, y);
}
)});
  main.variable(observer("plucker")).define("plucker", ["cos","sin","a"], function(cos,sin,a){return(
function plucker(u, v, target) {
  const w = 150;
  const x = u * cos(v) * w;
  const y = u * sin(v) * w;
  const z = sin((a / 5) * v) * w;

  target.set(x, z, y);
}
)});
  main.variable(observer("heart")).define("heart", ["a","cos","sin"], function(a,cos,sin){return(
function heart(u, v, target) {
  const w = 3;
  const x = a * cos(u) * (1.2 + cos(v)) * sin(v) * w;
  const y = a * (1 + cos(v)) * sin(u) * sin(v) * w;
  const z = 50 + -a * cos(v) * (1 / 2 + cos(v)) * w;

  target.set(x, z, y);
}
)});
  main.variable(observer("experiment")).define("experiment", ["a","cos","sin"], function(a,cos,sin){return(
function experiment(u, v, target) {
  const w = 5;
  const x = 2 * a * cos(u) * (1 + cos(v)) * sin(v) * w;
  const y = 2 * a * (1 + cos(v)) * sin(u) * sin(v) * w;
  const z = -2 * a * cos(v) * (1 + cos(2 * v)) * w;

  target.set(x, z, y);
}
)});
  main.variable(observer("octahedron")).define("octahedron", ["n","a","cos","sin"], function(n,a,cos,sin){return(
function octahedron(u, v, target) {
  const w = n ** (n / 10) * 10;
  const x =
    a * cos(u) * cos(v) * Math.sqrt(cos(u) ** 2 * cos(v) ** 2) ** (n - 1) * w;
  const y =
    a * sin(u) * cos(v) * Math.sqrt(sin(u) ** 2 * cos(v) ** 2) ** (n - 1) * w;
  const z = a * sin(v) * Math.sqrt(sin(v) ** 2) ** (n - 1) * w;

  target.set(x, z, y);
}
)});
  main.variable(observer("hyperbolicParaboloid")).define("hyperbolicParaboloid", ["a","b"], function(a,b){return(
function hyperbolicParaboloid(u_, v_, target) {
  const w = 20;
  const u = -w + u_ * 2 * w;
  const v = -w + v_ * 2 * w;

  const x = a * u;
  const y = b * v;
  // scaled down
  const z = (1 / 3) * (u ** 2 - 2 * u * v);

  target.set(x, z, y);
}
)});
  main.variable(observer("enneper")).define("enneper", function(){return(
function enneper(u_, v_, target) {
  const w = 15;
  const u = u_ * 2 * Math.PI;
  const v = v_ * 2.5;

  const s = v * Math.cos(u);
  const t = v * Math.sin(u);

  const x = s * (1 - (1 / 3) * s ** 2 + t ** 2) * w;
  const y = t * (1 - (1 / 3) * t ** 2 + s ** 2) * w;
  const z = (s ** 2 - t ** 2) * w;

  target.set(x, z, y);
}
)});
  main.variable(observer("cyclideOfDupin")).define("cyclideOfDupin", ["a","b","c","cos","sin"], function(a,b,c,cos,sin){return(
function cyclideOfDupin(u, v, target) {
  if (a === b) return;

  const w = 8;
  const k = c / Math.PI;
  const x =
    ((b * (k - b * cos(u)) + a * cos(u) * (a - k * cos(v))) /
      (a - b * cos(u) * cos(v))) *
    w;
  const y =
    ((Math.sqrt(a ** 2 - b ** 2) * (a - k * cos(v)) * sin(u)) /
      (a - b * cos(u) * cos(v))) *
    w;
  const z =
    ((Math.sqrt(a ** 2 - b ** 2) * (k - b * cos(u)) * sin(v)) /
      (a - b * cos(u) * cos(v))) *
    w;

  target.set(x, z, y);
}
)});
  main.variable(observer("eight")).define("eight", ["cos","sin"], function(cos,sin){return(
function eight(u, v_, target) {
  const v = -Math.PI / 2 + v_ * Math.PI;
  const w = 150;
  const x = cos(u) * Math.sin(2 * v) * w;
  const y = sin(u) * Math.sin(2 * v) * w;
  const z = Math.sin(v) * w;

  target.set(x, z, y);
}
)});
  main.variable(observer("dinit")).define("dinit", ["a","b"], function(a,b){return(
function dinit(u_, v_, target) {
  const u = u_ * Math.PI * 4;
  const v = v_ * 1;
  const w = 10;

  const x = w * a * Math.cos(u) * Math.sin(v);
  const y = w * a * Math.sin(u) * Math.sin(v);
  const z = w * a * (Math.cos(u) + Math.log(Math.tan(v / 2))) + b * u;

  target.set(x, z, y);
}
)});
  main.variable(observer("catenoid")).define("catenoid", ["a"], function(a){return(
function catenoid(u, v, target) {
  const r = 250;
  const t = -40 + v * 80;
  const x = a * Math.cos(-Math.PI + u * 2 * Math.PI) * Math.cosh(t / a);
  const y = a * Math.sin(-Math.PI + u * 2 * Math.PI) * Math.cosh(t / a);
  const z = -r / 2 + v * r;

  target.set(x, z, y);
}
)});
  main.variable(observer("catalan")).define("catalan", function(){return(
function catalan(u_, v_, target) {
  const w = 10;
  const u = -2 * Math.PI + u_ * 4 * Math.PI;
  const v = -3 + v_ * 6;

  const x = 4 * u - Math.cosh(v) * Math.sin(u);
  const y = 10 - Math.cos(u) * Math.cosh(v);
  const z = -6 * Math.sin(u / 2) * Math.sinh(v / 2);

  target.set(x * w, z * w, y * w);
}
)});
  main.variable(observer("boy")).define("boy", ["Complex","cos","sin"], function(Complex,cos,sin){return(
function boy(u, v, target) {
  const r = 110;
  const c = new Complex(u * cos(v), u * sin(v));

  const g1 =
    -(3 / 2) *
    new Complex(
      c.mul(new Complex(1, 0).sub(c.pow(4))).mul(
        c
          .pow(6)
          .add(c.pow(3).mul(Math.sqrt(5)))
          .sub(1)
          .inverse()
      )
    ).im;

  const g2 =
    -(3 / 2) *
    new Complex(
      c.mul(new Complex(1, 0).add(c.pow(4))).mul(
        c
          .pow(6)
          .add(c.pow(3).mul(Math.sqrt(5)))
          .sub(1)
          .inverse()
      )
    ).re;

  const g3 =
    -1 / 2 +
    new Complex(
      new Complex(1, 0).add(c.pow(6)).mul(
        c
          .pow(6)
          .add(c.pow(3).mul(Math.sqrt(5)))
          .sub(1)
          .inverse()
      )
    ).im;

  const x = (1 / (g1 ** 2 + g2 ** 2 + g3 ** 2)) * g1 * r;
  const y = (1 / (g1 ** 2 + g2 ** 2 + g3 ** 2)) * g2 * r;
  const z = (1 / (g1 ** 2 + g2 ** 2 + g3 ** 2)) * g3 * r;

  target.set(x, z, y);
}
)});
  main.variable(observer("bour")).define("bour", function(){return(
function bour(u, v, target) {
  const r = u * 15;
  const theta = 4 * Math.PI * v;

  const x = r * Math.cos(theta) - (1 / 2) * r ** 2 * Math.cos(2 * theta);
  const y = -r * Math.sin(theta) * (r * Math.cos(theta) + 1);
  const z = (4 / 3) * r ** (3 / 2) * Math.cos((3 * theta) / 2);

  target.set(x, z, y);
}
)});
  main.variable(observer("bohdom")).define("bohdom", ["a","cos","sin","b","c"], function(a,cos,sin,b,c){return(
function bohdom(u, v, target) {
  const w = 10;
  const x = a * cos(u) * w;
  const y = (a * sin(u) + b * cos(v)) * w;
  const z = c * sin(v) * w;

  target.set(x, z, y);
}
)});
  main.variable(observer("astell")).define("astell", ["a","cos","b","sin","c"], function(a,cos,b,sin,c){return(
function astell(u, v, target) {
  const w = 5;
  const x = a * cos(u) * cos(v) * w;
  const y = b * sin(u) * cos(v) * w;
  const z = c * sin(v) ** 3 * w;

  target.set(x, z, y);
}
)});
  main.variable(observer("agnesirev")).define("agnesirev", ["a","cos","sin","tan"], function(a,cos,sin,tan){return(
function agnesirev(u, v, target) {
  const w = 4;
  const x = -2 * a * cos(u) * cos(v) ** 2 * w;
  const y = -2 * a * cos(v) ** 2 * sin(u) * w;
  const z = 2 * a * tan(v) * w;

  target.set(x, z, y);
}
)});
  main.variable(observer("hyperboloid")).define("hyperboloid", ["a","cosh","cos","sin","b","sinh"], function(a,cosh,cos,sin,b,sinh){return(
function hyperboloid(u, v, target) {
  const x = a * cosh(-1 / 2 + v) * cos(-1 / 2 + u);
  const y = a * cosh(-1 / 2 + v) * sin(-1 / 2 + u);
  const z = b * sinh(-1 / 2 + v);

  target.set(x, z, y);
}
)});
  main.variable(observer("parametricObj")).define("parametricObj", ["THREE","equations","eq","slices","wireframe"], function(THREE,equations,eq,slices,wireframe)
{
  const geometry = new THREE.ParametricBufferGeometry(
    equations[parseInt(eq)],
    slices,
    slices
  );
  const material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide,
    wireframe
  });
  return new THREE.Mesh(geometry, material);
}
);
  main.variable(observer("scene")).define("scene", ["THREE","parametricObj","axis"], function(THREE,parametricObj,axis)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  scene.add(parametricObj);
  axis(scene);
  return scene;
}
);
  main.variable(observer("line")).define("line", ["THREE"], function(THREE){return(
function line([x1, y1, z1], [x2, y2, z2], color = 0x000000) {
  const geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(x1, y1, z1));
  geometry.vertices.push(new THREE.Vector3(x2, y2, z2));
  const material = new THREE.LineBasicMaterial({ color });
  return new THREE.Line(geometry, material);
}
)});
  main.variable(observer("arrow")).define("arrow", ["THREE"], function(THREE){return(
function arrow([x, y, z], [rx, ry, rz]) {
  const geometry = new THREE.ConeBufferGeometry(5, 25, 25);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const cone = new THREE.Mesh(geometry, material);
  cone.position.set(x, y, z);
  cone.rotation.set(rx,ry,rz)
  return cone;
}
)});
  main.variable(observer("axis")).define("axis", ["arrow","line"], function(arrow,line){return(
function axis(scene) {
  const w = 300;
  const axis = [
    [
      [-w, 0, 0],
      [w, 0, 0],
      [(1 / 2) * Math.PI, 0, (1 / 2) * Math.PI],
      [-(1 / 2) * Math.PI, 0, -(1 / 2) * Math.PI]
    ],
    [[0, -w, 0], [0, w, 0], [Math.PI, 0, 0], [0, -Math.PI, 0]],
    [
      [0, 0, -w],
      [0, 0, w],
      [(1 / 2) * Math.PI, 0, Math.PI],
      [-(1 / 2) * Math.PI, 0, Math.PI]
    ]
  ].map(([from, to, rotFrom, rotTo]) => {
    scene.add(arrow(from, rotFrom));
    scene.add(arrow(to, rotTo));
    scene.add(line(from, to));
  });
}
)});
  main.variable(observer("eqData")).define("eqData", function(){return(
[
  { name: "hyperbolicHelicoid", params: ["a"] },
  { name: "tranguloidTrefoil", params: [] },
  { name: "breather", params: [] },
  { name: "kleinCycloid", params: ["a"] },
  { name: "trialxialHexatorus", params: [] },
  { name: "monkeySaddle", params: [] },
  { name: "boy", params: [] },
  { name: "braidedTorus", params: ["a", "b", "c"] },
  { name: "roman", params: [] },
  { name: "bonanJeenerKlein", params: ["a"] },
  { name: "snail", params: ["a", "b"] },
  { name: "helicoid", params: ["a", "b"] },
  { name: "hyperboloid", params: ["a", "b"] },
  { name: "cyclideOfDupin", params: ["a", "b", "c"] },
  { name: "eight", params: [] },
  { name: "dinit", params: ["a", "b"] },
  { name: "catenoid", params: ["a"] },
  { name: "richmond", params: ["a", "b"] },
  { name: "bour", params: [] },
  { name: "bohdom", params: ["a", "b", "c"] },
  { name: "astell", params: ["a", "b", "c"] },
  { name: "agnesirev", params: ["a"] },
  { name: "enneper", params: [] },
  { name: "hyperbolicParaboloid", params: ["a", "b"] },
  { name: "octahedron", params: ["a", "b", "c", "n"] },
  { name: "experiment", params: ["a"] },
  { name: "sievert", params: ["a"] },
  { name: "heart", params: ["a"] },
  { name: "plucker", params: ["a"] },
  { name: "pseudosphere", params: ["a"] },
  { name: "catalan", params: ["a"] }
]
)});
  main.variable(observer("equations")).define("equations", ["hyperbolicHelicoid","tranguloidTrefoil","breather","kleinCycloid","triaxialHexatorus","monkeySaddle","boy","braidedTorus","roman","bonanJeenerKlein","snail","helicoid","hyperboloid","cyclideOfDupin","eight","dinit","catenoid","richmond","bour","bohdom","astell","agnesirev","enneper","hyperbolicParaboloid","octahedron","experiment","sievert","heart","plucker","pseudosphere","catalan"], function(hyperbolicHelicoid,tranguloidTrefoil,breather,kleinCycloid,triaxialHexatorus,monkeySaddle,boy,braidedTorus,roman,bonanJeenerKlein,snail,helicoid,hyperboloid,cyclideOfDupin,eight,dinit,catenoid,richmond,bour,bohdom,astell,agnesirev,enneper,hyperbolicParaboloid,octahedron,experiment,sievert,heart,plucker,pseudosphere,catalan){return(
[
  hyperbolicHelicoid,
  tranguloidTrefoil,
  breather,
  kleinCycloid,
  triaxialHexatorus,
  monkeySaddle,
  boy,
  braidedTorus,
  roman,
  bonanJeenerKlein,
  snail,
  helicoid,
  hyperboloid,
  cyclideOfDupin,
  eight,
  dinit,
  catenoid,
  richmond,
  bour,
  bohdom,
  astell,
  agnesirev,
  enneper,
  hyperbolicParaboloid,
  octahedron,
  experiment,
  sievert,
  heart,
  plucker,
  pseudosphere,
  catalan
]
)});
  main.variable(observer("camera")).define("camera", ["width","height","THREE"], function(width,height,THREE)
{
  const fov = 45;
  const aspect = width / height;
  const near = 0.01;
  const far = 100000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(200, 400, -700);
  return camera;
}
);
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("cos")).define("cos", function(){return(
t => Math.cos(2 * Math.PI * t)
)});
  main.variable(observer("cosh")).define("cosh", function(){return(
t => Math.cosh(2 * Math.PI * t)
)});
  main.variable(observer("sin")).define("sin", function(){return(
t => Math.sin(2 * Math.PI * t)
)});
  main.variable(observer("sinh")).define("sinh", function(){return(
t => Math.sinh(2 * Math.PI * t)
)});
  main.variable(observer("tan")).define("tan", function(){return(
t => Math.tan(2 * Math.PI * t)
)});
  main.variable(observer("tanh")).define("tanh", function(){return(
t => Math.tanh(2 * Math.PI * t)
)});
  main.variable(observer("a")).define("a", ["values"], function(values){return(
values[0].length > 0 && values[0][0]
)});
  main.variable(observer("b")).define("b", ["values"], function(values){return(
values[0].length > 1 && values[0][1]
)});
  main.variable(observer("c")).define("c", ["values"], function(values){return(
values[0].length > 2 && values[0][2]
)});
  main.variable(observer("n")).define("n", ["values"], function(values){return(
values[0].length > 3 && values[0][3]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
## imports`
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define2);
  main.import("inputsGroup", child2);
  main.variable(observer("Complex")).define("Complex", ["require"], function(require){return(
require('https://bundle.run/complex.js@2.0.11')
)});
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
