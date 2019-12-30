// https://observablehq.com/@bumbeishvili/input-groups@297
import define1 from "./e93997d5089d7165@2209.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Inputs in grid `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Just a quick wrapper around [jashkenas/inputs](https://observablehq.com/@jashkenas/inputs) , so it's possible to position inputs in a grid.

Does not work for all inputs (multi checkboxes and canvas based inputs, like location coordinate picker ) , but it's enough for my needs for now.

We get result as array, which has additional properties attached for naming convenience (if you pass names array as a second parameter)
`
)});
  main.variable(observer()).define(["values"], function(values){return(
values
)});
  main.variable(observer("viewof values")).define("viewof values", ["inputsGroup","slider","width","select"], function(inputsGroup,slider,width,select){return(
inputsGroup(
  
[
  [
   slider({'title':'test',name:'name',description:'description'}),
   slider({'title':'test',name:'name',description:'description'}),
   slider({'title':'test',name:'name',description:'description'}),
  ],
  [
   slider({'title':'test',name:'name',description:'description'}),
   slider({'title':'test',name:'name',description:'description'}),
   slider({'title':'test',name:'name',description:'description'}),
  ],
  [ 
   `<div style="height:50px;width:${width/2-100}px"></div>`,  //  Just a trick, to make select element centered
    select(['test','name']),
  ]
],
                            
[
  ['first-input','second-input','third-slider'],
  ['4-th','5-th','6-th'],
  ['','select']
]
                           
)
)});
  main.variable(observer("values")).define("values", ["Generators", "viewof values"], (G, _) => G.input(_));
  main.variable(observer("inputsGroup")).define("inputsGroup", ["html"], function(html){return(
function inputsGroup(views,names){
  const form = html`<div>${
    views.map(row => html`<div>${
      row.map(input => html`<div style="display:inline-block;min-width:300px">${input}</div>`)
    }</div>`)
  }</div>`;
  
  form.oninput = () => {
    form.value = views.map(row => row.map(input => input.value))
    if(names){
      names.forEach((row,i)=>row.forEach((c,j)=> form.value[i][j] && (form.value[c]=form.value[i][j])))
    }
  };
  form.oninput();
  return form;
}
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("select", child1);
  return main;
}
