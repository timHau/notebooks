// https://observablehq.com/@liuyao12/sidenotes@407
import define1 from "./b7e8a4b07f92c05b@30.js";
import define2 from "./d229a22b4a9fdc4b@148.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Sidenotes

[Forum post](https://talk.observablehq.com/t/sidenotes-in-markdown/2725/2)  (Thank you, Jed Fox and Andy Pan!)`
)});
  main.variable(observer()).define(["sn","note","tex"], function(sn,note,tex){return(
sn`## Demo

Consequatur ut maxime minima doloremque vel culpa. Laudantium eligendi quia voluptatibus cupiditate dolore. Sequi harum odio reiciendis quia esse soluta culpa.

Beatae qui est similique quos iusto blanditiis quaerat. ${note`Et pariatur ea magnam nostrum optio omnis iste quia. ${tex`x = \frac{-b\pm\sqrt{b^2-4ac}}{2a}`}`} Ut aliquam quam inventore. Officia consequatur cum voluptates nobis corrupti eos molestiae recusandae. Officiis animi ad officia et quas veritatis aut.

Debitis corrupti quos rerum ut. Enim deserunt id doloremque mollitia. A laboriosam in maxime corporis ipsum neque animi autem. Nisi provident consectetur ut impedit dolor et perferendis.

Occaecati id perspiciatis consequatur facilis aut. ${note`Nemo qui nobis voluptatum at distinctio rem tempore.`} Exercitationem perferendis totam praesentium at qui voluptate illo ea. Architecto dolor facere dolores totam doloribus omnis. Est maxime nisi architecto voluptas nobis voluptatem. Et facere tenetur voluptatem odit error veritatis.

Est eos eos et ut. Consequatur modi iure laborum esse aut. Inventore et nisi voluptatum. Nisi at deleniti quibusdam dignissimos a ut. Molestiae labore rerum dolorem neque.`
)});
  main.variable(observer("sn")).define("sn", ["mutable counter","html","viewof style","style","md"], function($0,html,$1,style,md){return(
(...args) => {
  $0.value = 1;
  return html`
    <div class="wrapper">
      ${$1.parentNode ? [] : style}
      ${md(...args)}
    </div>
  `;
}
)});
  main.variable(observer("note")).define("note", ["mutable counter","html","md","tippy","isDesktop"], function($0,html,md,tippy,isDesktop){return(
(...args) => {
  const id = $0.value;
  $0.value += 1;
  const trigger = html`<button class="ref subtle">${id}</button>`;
  const extract = md(...args);
  tippy.default(trigger, {
    content: extract,
    ignoreAttributes: true,
    interactive: true,
    trigger: 'click',
    theme: 'light-border',
    placement: 'bottom',
    animation: 'shift-away',
    maxWidth: 354
  });
  return isDesktop ? html`<div class="extract"><font size=2>${extract}</font>` : trigger;
}
)});
  main.define("initial counter", function(){return(
1
)});
  main.variable(observer("mutable counter")).define("mutable counter", ["Mutable", "initial counter"], (M, _) => new M(_));
  main.variable(observer("counter")).define("counter", ["mutable counter"], _ => _.generator);
  main.variable(observer("isDesktop")).define("isDesktop", ["createVariable","addEventListener","removeEventListener"], function(createVariable,addEventListener,removeEventListener){return(
createVariable({
  get: () => document.body.clientWidth > 700,
  attach: cb => addEventListener("resize", cb),
  detach: cb => removeEventListener("resize", cb)
})
)});
  main.variable(observer("viewof style")).define("viewof style", ["isDesktop","collapsedCSS","tippyPrefix"], function(isDesktop,collapsedCSS,tippyPrefix){return(
isDesktop
  ? collapsedCSS('CSS')`
.wrapper {
   max-width: calc(100vw - 340px)
}
.extract {
  right: 0;
  width: 300px;
  position: absolute;
  margin-top: -1.5em;
}
.extract p:first-of-type {
  margin-top: 0;
}
.extract p:last-of-type {
  margin-bottom: 0;
}
.ref {
  visibility: hidden;
  position: absolute;
}
`
  : collapsedCSS('CSS (Mobile)')`
@import url('${tippyPrefix}/dist/tippy.css');
@import url('${tippyPrefix}/themes/light-border.css');
@import url('${tippyPrefix}/animations/shift-away.css');

.tippy-tooltip.light-border-theme {
  font-size: 1em;
  border-radius: 0.5em;
  box-shadow: 4px 4px 14px -2px rgba(0, 8, 16, .15);
}

.tippy-content {
  padding: 0.75em;
}
.tippy-content p:first-of-type {
  margin-top: 0;
}
.tippy-content p:last-of-type {
  margin-bottom: 0;
}

.ref {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: #ddd;
  color: black;

  position: relative;
  bottom: 1px;
  width: 1.5em;
  height: 1.5em;

  border: none;
  border-radius: 0.75em;

  font-size: 0.75em;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
}
.ref:focus,
.ref[aria-expanded="true"] {
  background: steelblue;
  color: white;
  outline: none;
}
`
)});
  main.variable(observer("style")).define("style", ["Generators", "viewof style"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("createVariable", child1);
  const child2 = runtime.module(define2);
  main.import("collapsedCSS", child2);
  main.variable(observer("tippyPrefix")).define("tippyPrefix", function(){return(
'https://unpkg.com/tippy.js@5.1.3'
)});
  main.variable(observer("tippy")).define("tippy", ["globalThis","tippyPrefix"], function(globalThis,tippyPrefix)
{
  globalThis.process = { env: { NODE_ENV: 'development' } };
  return import(tippyPrefix + '?module');
}
);
  return main;
}
