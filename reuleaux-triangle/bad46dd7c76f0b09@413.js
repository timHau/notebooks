// https://observablehq.com/@timhau/reuleaux-triangle@413
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Reuleaux Triangle

Inspired by [this Mathologer video](https://www.youtube.com/watch?v=-eQaF6OmWKw), you can also read more [here](http://www.qedcat.com/articles/waterwheel1.pdf) or explore [this notebook](https://beta.observablehq.com/@fil/oronce-fines-triangle-projection) by [@fil](https://beta.observablehq.com/@fil)`
)});
  main.variable(observer()).define(["d3","width","height","triangles","r"], function(d3,width,height,triangles,r)
{
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`);

  svg
    .selectAll("path")
    .data(triangles)
    .enter()
    .append("path")
    .attr("fill", "#fff")
    .attr("stroke", "#000")
    .attr("stroke-width", 1)
    .attr(
      "d",
      triangle =>
        `
        M${triangle[1]}
        A${r} ${r} 0 0 1 ${triangle[2]}
        A${r} ${r} 0 0 1 ${triangle[0]}
        A${r} ${r} 0 0 1 ${triangle[1]}
        Z
      `
    )
    .attr("fill-opacity", 1);

  return svg.node();
}
);
  main.variable(observer("height")).define("height", function(){return(
540
)});
  main.variable(observer("radius")).define("radius", ["width","height"], function(width,height){return(
Math.min(width, height) / 5
)});
  main.variable(observer("r")).define("r", ["radius"], function(radius){return(
radius * Math.sqrt(3)
)});
  main.variable(observer("angle")).define("angle", function*()
{
  let angle = 0;
  while (true) {
    yield (angle += 0.01);
  }
}
);
  main.variable(observer("triangleCoords")).define("triangleCoords", ["radius","angle"], function(radius,angle){return(
function triangleCoords(i, [offsetX, offsetY]) {
  return [
    offsetX + radius * Math.cos((i / 3) * 2 * Math.PI - (Math.PI / 2) * angle),
    offsetY + radius * Math.sin((i / 3) * 2 * Math.PI - (Math.PI / 2) * angle)
  ];
}
)});
  main.variable(observer("triangle")).define("triangle", ["offset","triangleCoords"], function(offset,triangleCoords){return(
function triangle(n) {
  const rowOffset = offset(n);
  return Array.from({ length: 3 }, (_, i) => triangleCoords(i, rowOffset));
}
)});
  main.variable(observer("offset")).define("offset", ["radius","numTriangles","angle"], function(radius,numTriangles,angle){return(
function offset(n) {
  // only works for 5 triangles
  const rowR = radius + radius / 2 - 2;
  const alpha = (2 * Math.PI) / numTriangles;
  return [
    rowR * Math.cos(n * alpha + angle),
    rowR * Math.sin(n * alpha + angle)
  ];
}
)});
  main.variable(observer("numTriangles")).define("numTriangles", function(){return(
5
)});
  main.variable(observer("triangles")).define("triangles", ["numTriangles","triangle"], function(numTriangles,triangle){return(
Array.from({ length: numTriangles }, (_, i) => triangle(i))
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
