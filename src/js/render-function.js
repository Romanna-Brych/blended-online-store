export function createCategoryMarkup(arr) {
  return arr
    .map(
      item => `
  <li class="categories__item">
   <button class="categories__btn" type="button">${item}</button>
 </li>`
    )
    .join('');
}
export function createProductsMarkup(arr) {
  return arr
    .map(
      ({ id, images, description, title, category, price, brand }) => `
  <li class="products__item" data-id="${id}">
    <img class="products__image" src="${images[0]}" alt="${description}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
    <p class="products__category">Category: ${category} </p>
    <p class="products__price">Price: ${price}$</p>
 </li>
`
    )
    .join('');
}
