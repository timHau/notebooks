// https://observablehq.com/@timhau/bernstein-poylnomial@212
import define1 from "./e93997d5089d7165@2209.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`# Bernstein poylnomial

A [bernstein polynomial](https://en.wikipedia.org/wiki/Bernstein_polynomial) is a polynomial that is not writen in the monomial basis ${tex`\{ t^0, t^1, t^2, \dots, t^n \}`} but in the Bernstein basis ${tex`\{ B_0^n(t), B_1^n(t), \dots, B_n^n(t) \}`}, where 

${tex.block`\begin{aligned}
  B_i^n(t) := \binom{n}{i}t^i(1-t)^{n-i}
\end{aligned}`}`
)});
  main.variable(observer("viewof n")).define("viewof n", ["slider"], function(slider){return(
slider({
  title: "n",
  min: 1,
  max: 20,
  value: 4,
  step: 1
})
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer()).define(["width","d3","DOM","n","bernstein_poly","randomColor"], function(width,d3,DOM,n,bernstein_poly,randomColor)
{
  const w = width / 2;
  const h = width / 2;
  const padding = 30;

  const pointNum = 500;

  let svg = d3.select(DOM.svg(w, h));

  let xScale = d3.scaleLinear([0, 1], [padding, w - padding]);
  let yScale = d3.scaleLinear([1, 0], [padding, h - padding]);

  let clipPath = svg
    .append('clipPath')
    .attr('id', 'chart-area')
    .append('rect')
    .attr('x', padding)
    .attr('y', padding)
    .attr('width', w - 2 * padding)
    .attr('height', h - 2 * padding);

  const curves = [];
  for (let i = 0; i <= n; ++i) {
    const bi_4 = [];
    for (let t = 0; t <= pointNum; t++) {
      bi_4.push([t / pointNum, bernstein_poly(i, n, t / pointNum)]);
    }
    curves.push(bi_4);
  }

  let line_log = d3
    .line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]));

  for (let curve of curves) {
    svg
      .append('path')
      .datum(curve)
      .attr("clip-path", "url(#chart-area)")
      .attr('fill', 'none')
      .attr('stroke', randomColor())
      .attr('stroke-width', 2)
      .attr('d', line_log);
  }

  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale);

  svg
    .append('g')
    .attr('transform', `translate(0,${h - padding})`)
    .call(xAxis);
  svg
    .append('g')
    .attr('transform', `translate(${padding},0)`)
    .call(yAxis);

  return svg.node();
}
);
  main.variable(observer("factorial")).define("factorial", function(){return(
function factorial(n) {
  let res = BigInt(1);
  for (let i = 1n; i <= n; i += 1n) res = res * i;
  return res;
}
)});
  main.variable(observer("binomial")).define("binomial", ["factorial"], function(factorial){return(
function binomial(n, k) {
  return Number(factorial(n) / (factorial(k) * factorial(n - k)));
}
)});
  main.variable(observer("bernstein_poly")).define("bernstein_poly", ["binomial"], function(binomial){return(
function bernstein_poly(i, n, t) {
  return binomial(n, i) * t ** i * (1 - t) ** (n - i);
}
)});
  main.variable(observer("randomColor")).define("randomColor", function(){return(
function randomColor() {
  const color = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  ].join(',');
  return `rgb(${color})`;
}
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3')
)});
  return main;
}
