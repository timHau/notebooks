// https://observablehq.com/@timhau/introduction-to-tropical-geometry@4670
import define1 from "./c7507a0c289058a6@760.js";
import define2 from "./6f35a89e3f4ac2aa@480.js";
import define3 from "./e93997d5089d7165@2209.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Introduction to tropical geometry`
)});
  main.variable(observer()).define(["header"], function(header){return(
header()
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`
__Disclaimer__: I am not an expert in all of this, so if you find mistakes please tell me about it either via an suggestion (click on the three dots in the left of this cell) or via [twitter](https://twitter.com/_timhau)

I recently found [this paper by Ralph Morrison](https://arxiv.org/pdf/1908.07012.pdf), which i definitly recommend reading as it is really nicely written and also contains much more details than my naive writing. Turns out [tropical geometry](https://en.wikipedia.org/wiki/Tropical_geometry) has nothing to do with palms and sun... it's actually named to honour the work of the brazilian mathematician [Imre Simon](https://en.wikipedia.org/wiki/Imre_Simon). Tropical geometry is subbranch of [algebraic geometry](https://en.wikipedia.org/wiki/Algebraic_geometry), which simply put, studies the geometric shapes that arise from polynomial equations. Tropical geometry does the same, except that it redefines the operations addition and multiplication. In tropical geometry addition is replaced with taking the maximum and multiplication is replaced by addition. Also the notation is slightly different to indicate that the operations aren't the same. Tropical addition uses the symbol ${tex`\oplus`} and tropical multiplication the symbol ${tex`\odot`}. (Small aside, there is also a variation of tropical geometry where addition is replaced by taking the minimum instead of the maximum. But you have to pick one and i decided to go with the maximum convention).`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**_example (1):_** \ 
Here is an example of an expression in tropical notation and what it represents in conventional notation`
)});
  main.variable(observer()).define(["tex"], function(tex){return(
tex`(2 \odot x) \oplus (3 \odot y^2) \oplus -7 \quad \Leftrightarrow \quad \max\{ 2 + x,\; 3 + 2y,\; -7 \}`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`Note that ${tex`y^2 = y \odot y \Leftrightarrow y + y = 2y`}`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`## tropical polynomials in 2 variables

To make it simpler we will look at tropical polynomials in 2 variables, which we name ${tex`x,y`}. A tropical polynomial is an expression of the following form, where ${tex`S`} is the set of all ${tex`(i,j) \in \Z`} which appear as exponents.`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`${tex`\underset{(i,j)\in S}{\bigoplus} (c_{i,j} \odot x^{i} \odot y^{j}) \quad`} where ${tex`x,y,c \in \R,\quad c \neq -\infty`}`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`which might look daunting at first but if you break it down it is not. The weird symbol ${tex`\underset{(i,j)\in S}{\bigoplus} `} simply means the tropical sum over all tuples ${tex`(i,j)`} in the whole numbers. The expressions that get (tropical) summed are a (tropical) product of some coefficient ${tex`c_{i,j} \in \R`} and two variables. `
)});
  main.variable(observer()).define(["html"], function(html){return(
html`
<div class="example">
  <span>example (2):</span>
  Here are some examples of polynomials and its translation into conventional notation.
</div>`
)});
  main.variable(observer()).define(["tex"], function(tex){return(
tex`
\begin{aligned}
0 \oplus x \oplus y \quad &\Leftrightarrow \quad \max\{ x,\; y,\; 0\} \\
(3 \odot y) \oplus x \oplus (-5 \odot x^3) \quad &\Leftrightarrow \quad \max\{ 3 + y,\; x,\; -5 + 3x\} \\
(0 \odot x \odot y) \oplus (3 \odot x^2) \oplus (5 \odot x^3 \odot y^2) \quad &\Leftrightarrow \quad \max\{ x + y,\; 3 + 2x,\; 5 + 3x + 2y \}
\end{aligned}`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`One Question we might ask is when the maximum will be achieved. If we take the first polynomial from the example above ${tex`0 \oplus x \oplus y`} we can see that the maximum is achieved when ${tex`x = y, \; x = 0 \text{ or } y = 0`}. If we would draw it in a 2-dimensional coordinate system it would look as follows:`
)});
  main.variable(observer()).define(["drawExamplePolynomialCurve"], function(drawExamplePolynomialCurve){return(
drawExamplePolynomialCurve()
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`the arrows indicate that the line goes on up to infinity. We want to call lines like this rays. We can also see that the ray that goes to the left corresponds to all solutions where ${tex`y = 0`}, the ray that goes to the bottom corresponds to all solutions where ${tex`x = 0`} and the diagonal ray corresponds to the solutions where ${tex`x = y`}. We call this figure the * tropical curve * of the polynomial ${tex`p = 0 \oplus x \oplus y`} and we will write it as ${tex`\mathscr{T(p)}`}. For a much more satisfying definition I want to refer again to the [original paper](https://arxiv.org/pdf/1908.07012.pdf).

But how do we find the tropical curve of a tropical polynomial?

## Newton Polygon and Triangulation

If we plot the set of all tuples of exponents that appear in the tropical polynomial (recall this is the set ${tex`S \in \Z^2`} we used earlier in our definition for the tropical polynomial), we will see that they form a set of Points in ${tex`\R^2`}. The Newton Polygon is defined as the [convex hull](https://observablehq.com/@timhau/convex-hull) of those points. More formally it is defined as (see [original paper ](https://arxiv.org/pdf/1908.07012.pdf))`
)});
  main.variable(observer()).define(["tex"], function(tex){return(
tex`Newt(p) = conv(\{ (i,j) \in \Z^2 \mid x^i \odot y^i \text{ appears in } p(x,y) \text{ with } c_{i,j} \neq - \infty \})`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`Where ${tex`conv`} denotes the convex hull and ${tex`p(x,y)`} is the tropical polynomial in 2 variables.

**_example(3)_**: \t
here is an example of the convex hull / the Newton Polygon.`
)});
  main.variable(observer()).define(["DOM","width","drawGrid2D","points","circle","convexHull2D"], function(DOM,width,drawGrid2D,points,circle,convexHull2D)
{
  const height = 500;
  const context = DOM.context2d(width, height);
  context.translate(width / 2 - 10, height / 2 + 10);
  context.scale(1, -1);
  const gridStep = 55;
  drawGrid2D(context, gridStep);

  const pointsScaled = points.map(v => {
    const p = [v[0] * gridStep, v[1] * gridStep];
    circle([...p, 3], context);
    return p;
  });
  const hull2D = convexHull2D(pointsScaled);

  const hl = hull2D.length;
  context.beginPath();
  context.moveTo(...hull2D[0]);
  for (let i = 1; i < hl; ++i) {
    context.lineTo(...hull2D[i]);
  }
  context.fillStyle = "rgba(180,180,180,0.5)";
  context.fill();

  return context.canvas;
}
);
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`But how do we get an tropical curve from the Newton Polygon? 

First we have to subdivide the Newton Polygon into triangles where each lattice point is a point of some triangle. In other words we have to triangulate the Newton Polygon. There are several ways to triangulate, but we want to determine a tropical curve based on our triangulation. So the way to do this is actually really nice (in my opinion). We start by assigning each lattice point of the Newton triangle a height. Remember that each lattice point corresponds to a pair of exponents. So a "natural" height to use is the constant term. So for example if we have a term like this ${tex`3 \odot x^1 \odot y^2`} in our polynomial then the corresponding lattice point would be ${tex`(1, 2)`} and it would have the height ${tex`3`}. Now we can use this height information as our third coordinate and draw the resulting points in ${tex`\R^3`}. 

So now we have a set of points in ${tex`\R^3`}. We continue by taking the convex hull (3D) of those points and get an polytope. Which is the 3D shape that consists of points, lines connecting those points and faces between those lines. The triangulation we are looking for are exactly those faces that are visible if we look from above straight down.

Here is the triangulation in shorter words:
- project points in 3D (using constant term as height)
- take convex hull of those points
- faces visible from above are the triangulation`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<div class="note"> Note: </div>Click on a polynom in the box below to change the view (only one is selected)`
)});
  main.variable(observer("viewof currentPolynom")).define("viewof currentPolynom", ["select","polynom1","polynom2","polynom3","polynom4","polynom5","headerPolynom"], function(select,polynom1,polynom2,polynom3,polynom4,polynom5,headerPolynom){return(
select({
  description: "Select a polynom to display",
  options: [polynom1, polynom2, polynom3, polynom4, polynom5, headerPolynom],
  multiple: true,
  value: polynom4
})
)});
  main.variable(observer("currentPolynom")).define("currentPolynom", ["Generators", "viewof currentPolynom"], (G, _) => G.input(_));
  main.variable(observer()).define(["html"], function(html){return(
html`<div class="note"> Note: </div> click and drag to navigate`
)});
  main.variable(observer()).define(["THREE","camera","invalidation","width","scene"], function*(THREE,camera,invalidation,width,scene)
{
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  invalidation.then(() => (controls.dispose(), renderer.dispose()));

  renderer.setSize(width, width);
  renderer.setPixelRatio(devicePixelRatio);
  controls.addEventListener("change", () => renderer.render(scene, camera));
  renderer.render(scene, camera);

  yield renderer.domElement;
}
);
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`*Small aside*: calculting this took me some time but was actually really fun. I start by looking at the normal vectors of each face. I use a buildin function from three.js but you could also use the cross product of two vectors from the face to figure it out. Then I look at the angle between the normal vector and one axis. If the angle is bigger than ${tex`\frac{\pi}{2}`} i know that the face is visible from above. If you find a mistake in my reasoning or an even better solution to this just send me an suggestion (clicking on the three dots to the left of this cell and the comment)`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`So now we know the triangulation of our Newton polygon. To find the tropical curve corresponding to the polynomial we now have to look at the equations. Each vertex of a smaller triangle in the triangulation corresponds to a term in the polynomial. This gives us exactly three terms per triangle. We know want to find the "root" of those terms. The root of a tropical polynomial is a point where the maximum is realised at least two times (again [original paper for a correct definition](https://arxiv.org/pdf/1908.07012.pdf))`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`**_example(4):_** \t
three such terms could be ${tex`2 \odot x^2 \odot y, \; 1 \odot x, \; y`} which is ${tex`2 + 2x + y, \; 1 + x, \; y`} in conventional notation. To find the tropical root we have to find a point ${tex`(x,y) \in \R^2`} where ${tex`2 + 2x + y = 1 + x = y`}. After rearraning the terms we can obtain a system of two equations in two variables which can be solved using the [famous gauss algorihm](https://en.wikipedia.org/wiki/Gaussian_elimination). 

Note that sometimes multiple equations can have the same solution. In those cases the points of the tropical line collide.`
)});
  main.variable(observer()).define(["DOM","width","drawGrid2D","newtonTriangulation2D","points","drawNewtonTriangulation2D"], function(DOM,width,drawGrid2D,newtonTriangulation2D,points,drawNewtonTriangulation2D)
{
  const context = DOM.context2d(width, width);
  context.translate(width / 2 + 30, width / 2 - 30);
  context.scale(1, -1);
  drawGrid2D(context, 40);

  const gridStep = 40;
  const triangulation = newtonTriangulation2D(points, { gridStep });
  drawNewtonTriangulation2D(triangulation, context, { gridStep });

  return context.canvas;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`So we can now calulate a tropical root for all equations that correspond to a triangle in the subdivision. If the roots not collide it can be seen that every point of the tropical curve is dual to a face of the triangulation and that every solution of the polynomial lies either on a line connecting two such points or on a ray that is emited by a point. A ray on the other hand is dual to an bounding edge of the triangulation and a connecting line between two points is dual to the line of a triangle that connects two faces (it is actually perpendicular to that line). Now we can calulate the neighbors and the corresponding angles in our triangulation and are now able to draw the tropical curve.`
)});
  main.variable(observer()).define(["DOM","width","findNewtonTriangulation","points","drawTropicalCurve","poly"], function(DOM,width,findNewtonTriangulation,points,drawTropicalCurve,poly)
{
  const context = DOM.context2d(width, width);
  context.translate(width / 2 + 30, width / 2 - 30);
  context.scale(1, -1);

  const triangulation = findNewtonTriangulation(points);
  drawTropicalCurve(triangulation, poly, context, { gridStep: 50 });

  return context.canvas;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Motivation

**So we do people care about tropical geometry?** \t

I care because it was a fun challenge with beatiful shapes and for me that is motivation enough. But as I understood it has also other applications. First due to the nature of the equations you could use this kind of reasoning for some optimization tasks. On the other hand and probably more important you could use the much simpler world of linear equations to study general algebraic geometry. As it turns out a lot of theorems that hold in algebraic geometry are also true in tropical geometry and the other way around. If you want to know more about those and a lot other topics I did not touch on check out the papers below.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Further reading:

[The original Paper that inspired me by Ralph Morrison](https://arxiv.org/pdf/0808.2383.pdf)
[This paper by Erwan Brugallé and Kristin Shaw](https://arxiv.org/pdf/1311.2360.pdf) \t

worth noting:

If you are looking for actually calculating, this tool might help: [polymake](https://polymake.org/doku.php)

---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Code`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## example polynomials`
)});
  main.variable(observer("polynom1")).define("polynom1", function(){return(
"3 + 2*x + 2*y + 3*x*y + x^2 + y^2"
)});
  main.variable(observer("polynom2")).define("polynom2", function(){return(
"1 * x^2 + 1 * y^2 + 2 * x * y + 2 * x + 2 * y + 1"
)});
  main.variable(observer("polynom3")).define("polynom3", function(){return(
"5 + (5 * x) + (6 * y) + (6 * x * y) + (4 * x^2) + (4 * y^2) + (4 * x^2 * y) + (1 * x^3) + (1 * y^3) + (3 * x * y^2)"
)});
  main.variable(observer("polynom4")).define("polynom4", function(){return(
"11 + (10 * x) + (10 * y) + (10 * x * y) + (7 * x^2) + (7 * y^2) + (10 * x^-1) + (10 * y^-1) + (10 * x^-1 * y^-1) + (9 * x * y^-1) + (9 * x^-1 * y) + (7 * x^-2) + (7 * y^-2) + (4 * x^2 * y^-2) + (6 * x^-2 * y^-2) + (4 * x^-2 * y^2) + (6 * x^2 * y^2) + (3 * x^3) + (3 * x^-3) + (3 * y^3) + (3 * y^-3)"
)});
  main.variable(observer("polynom5")).define("polynom5", function(){return(
"11 + (5 * x) + (10 * y) + (10 * x * y) + (8 * x^2) + (8 * y^2) + (8 * x^2 * y) + (5 * x^3) + (5 * y^3) + (7 * x * y^2) + (5 * x^-1) + (9 * y^-1) + (10 * x^-1 * y^1) + (8 * x^-1 * y^2) + (8 * x^-2) + (8 * x^-2 * y) + (5 * x^-3) + (7 * x^-1 * y^-1) + (5 * x^-2 * y^-1) + (7 * x * y^-1) + (5 * x^2 * y^-1) + (5 * y^-2) + (2 * y^-3) + (4 * x * y^-2) + (4 * x^-1 * y^-2)"
)});
  main.variable(observer("headerPolynom")).define("headerPolynom", function(){return(
"(14.5 * x^2 * y^-1) + (14.65 * x * y) + (12.1 * y^2) + (15 * x) + (13.9 * y) + 1 + (3.9 * x^2 * y^2) + (12.4 * x^-1) + (14 * y^-1) + (4.5 * x^4 * y^2) + (8.5 * x^5 * y^-1) + (14.4 * x^3 * y) + (8.8 * x * y^3) + (-1.8 * x^-4 * y^3) + (7 * x^-2 * y^2) + (10 * x^2 * y^-3) + (12.7 * y^-2) + (14.5 * x^3) + (8 * x^-3) + (7.9 * x^-1 * y^3) + (9 * x^4 * y^-3) + (10.4 * x^-2 * y^-1) + (4.9 * x^-4 * y) + (10.3 * x^-2 * y) + (-0.2 * x^-2 * y^4) + (2 * x^-4 * y^-1) + (-2 * x^7) + (8.6 * x^-2 * y^-3) + (12.5 * x^4) + (10 * x^3 * y^3) + (8 * x^5 * y) + (1 * x^3 * y^5) + (-7 * x^-5) + (5.5 * y^-4) + (-6 * x^-5 * y^3) + (-3 * x^-5 * y^2) + (-3.5 * x^-4 * y^-3) + (-2 * y^5)"
)});
  main.variable(observer("poly")).define("poly", ["buildPoly","currentPolynom"], function(buildPoly,currentPolynom){return(
buildPoly(...currentPolynom)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## solving equations
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`First parse the terms, meaning strip all the variables and just use the coefficients. The Format is [x,y,c] where x is the x coefficient, y the y coefficient and c the constant term.`
)});
  main.variable(observer("solveEquation")).define("solveEquation", ["parseTerm","gauss"], function(parseTerm,gauss){return(
function solveEquation(terms) {
  const parsed = terms
    .slice()
    .sort()
    .map(t => parseTerm(t));

  const [x1, y1, c1] = parsed[0];
  const [x2, y2, c2] = parsed[1];
  const [x3, y3, c3] = parsed[2];

  return gauss([[x2 - x1, y2 - y1], [x3 - x2, y3 - y2]], [c1 - c2, c2 - c3]);
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`gauss algorithm is borrowed from [here](https://github.com/itsravenous/gaussian-elimination/blob/master/gauss.js). For more information i recommend a introduction book about linear algebra.`
)});
  main.variable(observer("gauss")).define("gauss", ["abs","array_fill"], function(abs,array_fill){return(
function gauss(A, x) {
  // thanks to https://github.com/itsravenous/gaussian-elimination/blob/master/gauss.js
  var i, k, j;

  // Just make a single matrix
  for (i = 0; i < A.length; i++) {
    A[i].push(x[i]);
  }
  var n = A.length;

  for (i = 0; i < n; i++) {
    // Search for maximum in this column
    var maxEl = abs(A[i][i]),
      maxRow = i;
    for (k = i + 1; k < n; k++) {
      if (abs(A[k][i]) > maxEl) {
        maxEl = abs(A[k][i]);
        maxRow = k;
      }
    }

    // Swap maximum row with current row (column by column)
    for (k = i; k < n + 1; k++) {
      var tmp = A[maxRow][k];
      A[maxRow][k] = A[i][k];
      A[i][k] = tmp;
    }

    // Make all rows below this one 0 in current column
    for (k = i + 1; k < n; k++) {
      var c = -A[k][i] / A[i][i];
      for (j = i; j < n + 1; j++) {
        if (i === j) {
          A[k][j] = 0;
        } else {
          A[k][j] += c * A[i][j];
        }
      }
    }
  }

  // Solve equation Ax=b for an upper triangular matrix A
  x = array_fill(0, n, 0);
  for (i = n - 1; i > -1; i--) {
    x[i] = A[i][n] / A[i][i];
    for (k = i - 1; k > -1; k--) {
      A[k][n] -= A[k][i] * x[i];
    }
  }

  return x;
}
)});
  main.variable(observer("array_fill")).define("array_fill", function(){return(
function array_fill(i, n, v) {
  var a = [];
  for (; i < n; i++) {
    a.push(v);
  }
  return a;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## draw functions`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Draw a 2D representation of the newton triangulation in 3D space. It is drawn 0.5 steps above the highest coefficient to make the connection between 3D convex hull and triangulation clear.`
)});
  main.variable(observer("drawNewtonTriangulation3D")).define("drawNewtonTriangulation3D", ["maxCoeff","addFace"], function(maxCoeff,addFace){return(
function drawNewtonTriangulation3D(triangulation, scene) {
  triangulation.forEach(face => {
    const projectedUp = face.map(v =>
      v.map((k, i) => (i === 2 ? maxCoeff + 0.5 : k))
    );
    addFace(projectedUp, scene, { wireframe: true });
  });
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Draw the triangulation to an 2D canvas context.`
)});
  main.variable(observer("drawNewtonTriangulation2D")).define("drawNewtonTriangulation2D", ["gridStep","triangle","points","circle"], function(gridStep,triangle,points,circle){return(
function drawNewtonTriangulation2D(triangulation, context, options) {
  const opts = Object.assign({ gridStep: gridStep }, options);

  for (let i = 0; i < triangulation.length; ++i) {
    const t = triangulation[i];
    triangle(t, context, { color: "gray", lineWidth: 3 });
  }

  points.forEach(p =>
    circle([p[0] * opts.gridStep, p[1] * opts.gridStep, 4], context)
  );
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`*known Issue*: 

I connect the "inner" points more than once. If a is a neighbor of b i connect a with b and b with a.

First find all points, all the neighbors for each face and meassure the angle for each line in each face. Then draw the points and connect the neighbors with corresponding angles. If no neighbor is present use an big step to draw a ray. `
)});
  main.variable(observer("drawTropicalCurve")).define("drawTropicalCurve", ["gridStep","findTropicalPoints","findAngles","findNeighbors","circle","coordsFromDeg","line"], function(gridStep,findTropicalPoints,findAngles,findNeighbors,circle,coordsFromDeg,line){return(
function drawTropicalCurve(triangulation, polynom, context, options) {
  const opts = Object.assign({ gridStep: gridStep, r: 4 }, options);
  const tropicalPoints = findTropicalPoints(
    triangulation,
    polynom,
    opts.gridStep
  );
  const angles = findAngles(triangulation);
  const neighbors = findNeighbors(triangulation);

  tropicalPoints.forEach((p, i) => {
    circle([...p, opts.r], context);

    neighbors[i].forEach((n, j) => {
      if (n !== 0 && !n) {
        const inf = coordsFromDeg(angles[i][j] - 90, 1000, p);
        line(p, inf, context);
      } else {
        const neigbor = tropicalPoints[n];
        line(p, neigbor, context);
      }
    });
  });
}
)});
  main.variable(observer("draw3DHull")).define("draw3DHull", ["points","randomColor","addFace"], function(points,randomColor,addFace){return(
function draw3DHull(hull, scene) {

  for (let [i1, i2, i3] of hull) {
    const face = [points[i1], points[i2], points[i3]];
    const color = randomColor();
    addFace(face, scene, { color });
  }
}
)});
  main.variable(observer("drawGrid2D")).define("drawGrid2D", ["gridStep","gridSize","line"], function(gridStep,gridSize,line){return(
function drawGrid2D(context, gs = gridStep) {
  for (let i = -gridSize; i < gridSize; ++i) {
    for (let j = -gridSize; j < gridSize; ++j) {
      const color = "rgba(200, 200, 200, 1)";
      line([i * gs, 0], [i * gs, j * gs], context, { color });
      line([0, i * gs], [j * gs, i * gs], context, { color });
    }
  }
}
)});
  main.variable(observer("drawExamplePolynomialCurve")).define("drawExamplePolynomialCurve", ["DOM","circle","textAt","line"], function(DOM,circle,textAt,line){return(
function drawExamplePolynomialCurve() {
  const context = DOM.context2d(300, 300);
  context.translate(150, 150);

  circle([0, 0, 3], context);
  textAt([5, 15], "(0,0)", 11, context);
  line([0, 0], [-300, 0], context);
  line([0, 0], [0, 300], context);
  line([0, 0], [300, -300], context);

  // arrows
  context.moveTo(-149, 0);
  context.lineTo(-139, 5);
  context.lineTo(-139, -5);
  context.fill();

  context.moveTo(0, 149);
  context.lineTo(5, 139);
  context.lineTo(-5, 139);
  context.fill();

  context.moveTo(149, -149);
  context.lineTo(135, -141);
  context.lineTo(142, -133);
  context.fill();

  return context.canvas;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## find stuff`
)});
  main.variable(observer("findNeighbor")).define("findNeighbor", ["dist2D"], function(dist2D){return(
function findNeighbor([l1, l2], faceIndex, triangulation) {
  let neighbor = false;

  for (let i = 0; i < triangulation.length; ++i) {
    if (i === faceIndex) continue;

    const [p1, p2, p3] = triangulation[i];
    const lines = [[p1, p2], [p2, p3], [p3, p1]];
    lines.forEach(([p1, p2]) => {
      const p1Match = dist2D(p1, l1) === 0 || dist2D(p1, l2) === 0;
      const p2Match = dist2D(p2, l1) === 0 || dist2D(p2, l2) === 0;
      if (p1Match && p2Match) {
        neighbor = i;
      }
    });
  }

  return neighbor;
}
)});
  main.variable(observer("findAngles")).define("findAngles", ["getAlphaBetweenPoints"], function(getAlphaBetweenPoints){return(
function findAngles(triangulation) {
  const res = [];

  triangulation.forEach(([p1, p2, p3]) => {
    res.push([
      getAlphaBetweenPoints(p1, p2),
      getAlphaBetweenPoints(p2, p3),
      getAlphaBetweenPoints(p3, p1)
    ]);
  });

  return res;
}
)});
  main.variable(observer("findNeighbors")).define("findNeighbors", ["findNeighbor"], function(findNeighbor){return(
function findNeighbors(triangulation) {
  const res = [];

  for (let i = 0; i < triangulation.length; ++i) {
    const [p1, p2, p3] = triangulation[i];
    const lines = [[p1, p2], [p2, p3], [p3, p1]];

    const neighbors = [];
    for (let l of lines) {
      neighbors.push(findNeighbor(l, i, triangulation));
    }
    res.push(neighbors);
  }

  return res;
}
)});
  main.variable(observer("findTropicalPoints")).define("findTropicalPoints", ["gridStep","findTermsFromPoints","solveEquation"], function(gridStep,findTermsFromPoints,solveEquation){return(
function findTropicalPoints(triangulation, poly, gs = gridStep) {
  const res = [];

  triangulation.forEach((t, i) => {
    const term = findTermsFromPoints(t, poly);
    const p = solveEquation(term).map(v => v * gs);
    res.push(p);
  });

  return res;
}
)});
  main.variable(observer("findTermsFromPoints")).define("findTermsFromPoints", function(){return(
function findTermsFromPoints(points, poly) {
  const res = [];

  for (let [x, y, z] of points) {
    poly.forEach(({ point, term }, i) => {
      const [px, py, pz] = point;
      if (px === x && py === y && pz === z) res.push(term);
    });
  }

  return res;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## triangulation`
)});
  main.variable(observer("findNewtonTriangulation")).define("findNewtonTriangulation", ["qh3D","makeFace","THREE","areaTriangle"], function(qh3D,makeFace,THREE,areaTriangle){return(
function findNewtonTriangulation(p) {
  const hull = qh3D(p);
  const hullUpperFaces = [];

  for (let [i1, i2, i3] of hull) {
    const face = [p[i1], p[i2], p[i3]];
    const [f, _] = makeFace(face);
    const normals = f.normal;
    const isUpper = normals.angleTo(new THREE.Vector3(0, 1, 0)) >= Math.PI / 2;
    const areaNotNull = areaTriangle(...face) > 0;
    if (isUpper && areaNotNull) {
      hullUpperFaces.push(face);
    }
  }

  return hullUpperFaces;
}
)});
  main.variable(observer("newtonTriangulation2D")).define("newtonTriangulation2D", ["gridStep","findNewtonTriangulation","projectTo2D","areaTriangle"], function(gridStep,findNewtonTriangulation,projectTo2D,areaTriangle){return(
function newtonTriangulation2D(points, options) {
   const opts = Object.assign({ gridStep: gridStep }, options);

  const triangulation = findNewtonTriangulation(points);
  const projected = projectTo2D(triangulation, opts);

  // filter triangles that are colinear
  const res = [];
  for (let i = 0; i < projected.length; ++i) {
    if (areaTriangle(...projected[i]) > 0) {
      res.push(projected[i]);
    }
  }

  return res;
}
)});
  main.variable(observer("projectTo2D")).define("projectTo2D", ["gridStep"], function(gridStep){return(
function projectTo2D(faces, options) {
  const opts = Object.assign({ gridStep: gridStep }, options);
  return faces.map(f =>
    f.map(v => [v[0] * opts.gridStep, v[1] * opts.gridStep])
  );
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## three.js helpers`
)});
  main.variable(observer("addCube")).define("addCube", ["THREE","gridStep"], function(THREE,gridStep){return(
function addCube([x, z, y], scene, options) {
  const opts = Object.assign({ color: 0x000000, r: 2 }, options);

  const geometry = new THREE.BoxBufferGeometry(opts.r, opts.r, opts.r);
  const material = new THREE.MeshBasicMaterial({ color: opts.color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x * gridStep, y * gridStep, z * gridStep);
  scene.add(cube);
}
)});
  main.variable(observer("addLine")).define("addLine", ["THREE","gridStep"], function(THREE,gridStep){return(
function addLine([[x1, z1, y1], [x2, z2, y2]], scene, options) {
  const opts = Object.assign(
    { color: "rgba(100,100,100,1)", linewidth: 2 },
    options
  );

  const geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(x1 * gridStep, y1 * gridStep, z1 * gridStep),
    new THREE.Vector3(x2 * gridStep, y2 * gridStep, z2 * gridStep)
  );
  const material = new THREE.LineBasicMaterial({
    color: opts.color,
    linewidth: opts.linewidth
  });
  const line = new THREE.Line(geometry, material);

  scene.add(line);
}
)});
  main.variable(observer("addPolygon")).define("addPolygon", ["THREE","gridStep"], function(THREE,gridStep){return(
function addPolygon(p, scene) {
  const points = p.slice().sort(([x1, y1], [x2, y2]) => x1 - x2);
  const geometry = new THREE.Geometry();

  // const pl = points.length;
  for (let i = 0; i < points.length; ++i) {
    const [x, z, y] = points[i];
    geometry.vertices.push(
      new THREE.Vector3(x * gridStep, y * gridStep, z * gridStep)
    );
    if (i >= 2) {
      geometry.faces.push(new THREE.Face3(i - 2, i - 1, i));
    }
  }

  const material = new THREE.MeshBasicMaterial({
    color: "rgba(200, 200, 200, 1)",
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
)});
  main.variable(observer("addFace")).define("addFace", ["makeFace","THREE"], function(makeFace,THREE){return(
function addFace(points, scene, options) {
  const opts = Object.assign({ color: 0x000000, wireframe: false }, options);

  const [face, geometry] = makeFace(points);

  const material = new THREE.MeshBasicMaterial({
    color: opts.color,
    wireframe: opts.wireframe,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
}
)});
  main.variable(observer("addGrid")).define("addGrid", ["addLine"], function(addLine){return(
function addGrid([x, y], scene, options) {
  const opts = Object.assign({ color: 0x000000 }, options);
  const points = [];

  let counter = 0;
  for (let i = -x; i < x; ++i) {
    for (let j = -y; j < y; ++j) {
      const c = [i, j, 0];
      points.push(c);

      if (points.length > 1 && j !== -x) {
        addLine([points[counter - 1], c], scene);
      }
      counter += 1;

      if (i > -x) {
        addLine([points[counter - 1], points[counter - y - x - 1]], scene);
      }
    }
  }
}
)});
  main.variable(observer("makeFace")).define("makeFace", ["THREE","gridStep"], function(THREE,gridStep){return(
function makeFace(points) {
  const geometry = new THREE.Geometry();

  for (let i = 0; i < 3; ++i) {
    geometry.vertices.push(
      new THREE.Vector3(
        points[i][0] * gridStep,
        points[i][2] * gridStep,
        points[i][1] * gridStep
      )
    );
  }

  const face = new THREE.Face3(0, 1, 2);
  geometry.faces.push(face);

  geometry.computeBoundingSphere();
  geometry.computeFaceNormals();

  return [face, geometry];
}
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
  main.variable(observer("scene")).define("scene", ["THREE","addGrid","gridSize","convexHull2D","poly","addPolygon","addCube","addLine","qh3D","points","draw3DHull","findNewtonTriangulation","drawNewtonTriangulation3D"], function*(THREE,addGrid,gridSize,convexHull2D,poly,addPolygon,addCube,addLine,qh3D,points,draw3DHull,findNewtonTriangulation,drawNewtonTriangulation3D)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  addGrid([gridSize, gridSize], scene);

  const hull2D = convexHull2D(poly.map(({ point }) => [point[0], point[1]]));
  addPolygon(hull2D, scene);

  poly.forEach(({ point }) => {
    addCube(point, scene, { color: "red", r: 5 });
    addLine([point, [point[0], point[1], 0]], scene);
    addCube([point[0], point[1], 0], scene, { r: 4 });
  });

  const hull = qh3D(points);
  draw3DHull(hull, scene);
  const triangulation = findNewtonTriangulation(points);
  drawNewtonTriangulation3D(triangulation, scene);

  yield scene;
}
);
  main.variable(observer("camera")).define("camera", ["THREE"], function*(THREE)
{
  const fov = 50;
  const near = 0.1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, 1, near, far);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.position.set(500, 1800, 1500);

  yield camera;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## utils `
)});
  main.variable(observer("randomColor")).define("randomColor", function(){return(
function randomColor() {
  return `rgba(${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)},
                    ${Math.floor(Math.random() * 255)},1)`;
}
)});
  main.variable(observer("buildPoly")).define("buildPoly", ["toConventionalNotation","parseTerm"], function(toConventionalNotation,parseTerm){return(
function buildPoly(polynom) {
  const terms = toConventionalNotation(polynom);
  const points = terms.map(t => parseTerm(t));
  const res = [];

  for (let i = 0; i < points.length; ++i) {
    res.push({ point: points[i], term: terms[i] });
  }

  return res;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`parsing the polynomial could definitly be improved..`
)});
  main.variable(observer("toConventionalNotation")).define("toConventionalNotation", function(){return(
function toConventionalNotation(polynom) {
  const splited = polynom.split("+");

  const prodAsSum = splited.map(term => {
    const asSum = term.replace(/(\(|\))/g, "").replace(/\*/g, "+");
    const sumTerms = asSum.split("+");
    const withExponent = sumTerms.map(t => {
      const [base, exp] = t.split("^");
      return exp ? `${exp}${base}` : t;
    });
    return withExponent.join("+").replace(/\s/g, "");
  });

  return prodAsSum;
}
)});
  main.variable(observer("parseTerm")).define("parseTerm", ["cleanUpTerm"], function(cleanUpTerm){return(
function parseTerm(t) {
  const term = t.replace(/\s/g, "");

  let xTerm = term.match(/\(?-?\d*\/?\d*\)?\*?x/g) || ["0"];
  let yTerm = term.match(/\(?-?\d*\/?\d*\)?\*?y/g) || ["0"];
  let constantTerm = term.split("+").filter(v => !v.match(/(x|y)/g));

  // defaults
  if (constantTerm.length === 0) constantTerm = ["0"];
  if (xTerm[0] === "x") xTerm = ["1"];
  if (xTerm[0] === "-x") xTerm = ["-1"];
  if (yTerm[0] === "y") yTerm = ["1"];
  if (yTerm[0] === "-y") yTerm = ["-1"];

  // cleanup
  xTerm = xTerm.map(v => cleanUpTerm(v))[0];
  yTerm = yTerm.map(v => cleanUpTerm(v))[0];
  constantTerm = constantTerm.map(v => cleanUpTerm(v))[0];

  return [xTerm, yTerm, constantTerm];
}
)});
  main.variable(observer("cleanUpTerm")).define("cleanUpTerm", function(){return(
function cleanUpTerm(term) {
  // first time ever i use eval ... not sure if evil or right...
  return eval(term.replace(/(\(|\)|\*|x|y)/g, ""));
}
)});
  main.variable(observer("maxCoeff")).define("maxCoeff", ["points"], function(points){return(
points.reduce(
  (acc, curr) => (curr[2] >= acc ? curr[2] : acc),
  points[0][2]
)
)});
  main.variable(observer("points")).define("points", ["poly"], function(poly){return(
poly.map(({ point }) => point)
)});
  main.variable(observer("abs")).define("abs", function(){return(
Math.abs
)});
  main.variable(observer("header")).define("header", ["DOM","width","buildPoly","headerPolynom","findNewtonTriangulation","drawTropicalCurve"], function(DOM,width,buildPoly,headerPolynom,findNewtonTriangulation,drawTropicalCurve){return(
function header() {
  const context = DOM.context2d(width, width / 2);
  context.translate(width / 2 - 5, width / 3 - 30);
  context.scale(1, -1);

  const headerPoly = buildPoly(headerPolynom);
  const headerPoints = headerPoly.map(({ point }) => point);

  const triangulation = findNewtonTriangulation(headerPoints);
  drawTropicalCurve(triangulation, headerPoly, context, {
    gridStep: 30,
    r: 2.3
  });

  return context.canvas;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## imports
`
)});
  const child1 = runtime.module(define1);
  main.import("convexHull2D", child1);
  const child2 = runtime.module(define2);
  main.import("line", child2);
  main.import("circle", child2);
  main.import("triangle", child2);
  main.import("areaTriangle", child2);
  main.import("textAt", child2);
  main.import("dist2D", child2);
  main.import("getAlphaBetweenPoints", child2);
  main.import("coordsFromDeg", child2);
  main.variable(observer()).define(["md"], function(md){return(
md`I would really like to understand how one can calulate the convex hull in 3D but I haven't found a source that I understand so I have to use this module. If you happen to know a good resource that explains it so that I can understand it I would be happy to know!`
)});
  main.variable(observer("qh3D")).define("qh3D", ["require"], function(require){return(
require("https://bundle.run/quickhull3d@2.0.4")
)});
  const child3 = runtime.module(define3);
  main.import("select", child3);
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer("gridStep")).define("gridStep", function(){return(
70
)});
  main.variable(observer("gridSize")).define("gridSize", function(){return(
10
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
.note {
  color: rgb(80, 80, 80);
  display: inline;
  font-family: sans-serif;
  font-weight: 100;
  font-size: 1.25rem;
  letter-spacing: 0.03rem;
  margin-right: 0.2rem;
}

select {
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
  background-color: rgb(244, 244, 244);
  overflow: -moz-scrollbars-none;
  font-family: sans-serif;
  font-size: 1rem;
  height: 10rem;
  width: 100%;
  border: black 1px solid;
  padding: 0.5rem;
}

select option {
  margin: 0.2rem 0;
}

select:focus {
  outline: none;
}

select::-webkit-scrollbar { 
  display: none; 
} 
</style>`
)});
  return main;
}
