// https://observablehq.com/d/b7e8a4b07f92c05b@30
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Custom Variable`
)});
  main.variable(observer()).define(["foo"], function(foo){return(
foo
)});
  main.variable(observer("viewof foo")).define("viewof foo", ["html","createVariable"], function(html,createVariable)
{
  const view = html`<div><input type="range">`;
  const input = view.querySelector('input');
  view.value = createVariable({
    get: event => {
      event && event.stopPropagation();
      return Math.round(input.value / 10) * 10;
    },
    attach: cb => input.addEventListener('input', cb),
    detach: cb => input.removeEventListener('input', cb)
  });
  return view;
}
);
  main.variable(observer("foo")).define("foo", ["Generators", "viewof foo"], (G, _) => G.input(_));
  main.variable(observer("createVariable")).define("createVariable", ["Generators"], function(Generators){return(
({ get, attach, detach }) =>
  Generators.observe(notify => {
    let value = notify(get());
    function observer(...args) {
      const newValue = get(...args);
      if (newValue !== value) value = notify(newValue);
    }
    attach(observer);
    return () => detach(observer);
  })
)});
  return main;
}
