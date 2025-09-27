import"./assets/styles-JE8YjOlG.js";import{a as r}from"./assets/vendor-CWxt7QI6.js";r.defaults.baseURL="https://dummyjson.com";let g=1;async function m(){return(await r("/products/category-list?")).data}async function c(){return(await r("products?",{params:{limit:12,skip:`${(g-1)*12}`}})).data}async function _(t){return(await r("/products/category/"+t,{params:{limit:12}})).data}function y(t){return t.map(s=>`
  <li class="categories__item">
   <button class="categories__btn" type="button">${s}</button>
 </li>`).join("")}function n(t){return t.map(({id:s,images:o,description:e,title:a,category:l,price:d,brand:p})=>`
  <li class="products__item" data-id="${s}">
    <img class="products__image" src="${o[0]}" alt="${e}"/>
    <p class="products__title">${a}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${p}</span></p>
    <p class="products__category">Category: ${l} </p>
    <p class="products__price">Price: ${d}$</p>
 </li>
`).join("")}async function f(t){if(t.target.nodeName!=="BUTTON")return;const s=t.target.textContent,o=document.querySelector("div.not-found");try{let e;if(s==="All")e=await c();else if(e=await _(s),e.products.length===0){o.classList.add("not-found--visible");return}o.classList.remove("not-found--visible"),u.innerHTML=n(e.products),document.querySelectorAll(".categories__btn").forEach(a=>a.classList.remove("categories__btn--active")),t.target.classList.add("categories__btn--active")}catch(e){console.log(e)}finally{}}const i=document.querySelector("ul.categories"),u=document.querySelector("ul.products");i.addEventListener("click",f);m().then(t=>{const s=["All",...t];i.innerHTML=y(s)});c().then(t=>{console.log(t),u.innerHTML=n(t.products)});
//# sourceMappingURL=index.js.map
