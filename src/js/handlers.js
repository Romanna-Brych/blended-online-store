import { getCategoryByValue, getProducts } from './products-api';
import { createProductsMarkup } from './render-function';
import { productsList } from '../home';

export async function handleCategoryClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  const value = event.target.textContent;
  const notFoundEl = document.querySelector('div.not-found');

  try {
    let res;
    if (value === 'All') {
      res = await getProducts();
    } else {
      res = await getCategoryByValue(value);
      if (res.products.length === 0) {
        notFoundEl.classList.add('not-found--visible');
        return;
      }
    }

    notFoundEl.classList.remove('not-found--visible');
    productsList.innerHTML = createProductsMarkup(res.products);

    document
      .querySelectorAll('.categories__btn')
      .forEach(btn => btn.classList.remove('categories__btn--active'));
    event.target.classList.add('categories__btn--active');
  } catch (error) {
    console.log(error);
  } finally {
  }
}
