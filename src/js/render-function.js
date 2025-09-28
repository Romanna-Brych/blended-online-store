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

export function createModalMarkup({
  images,
  title,
  tags,
  description,
  shippingInformation,
  returnPolicy,
  price,
}) {
  return `
<img class="modal-product__img" src="${images[0]}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${
          tags?.map(tag => `<li>${tag}</li>`).join('') || ''
        }</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
`;
}
