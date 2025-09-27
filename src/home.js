//Логіка сторінки Home
import {
  getCategoryList,
  getProducts,
  getCategoryByValue,
} from './js/products-api';
import {
  createCategoryMarkup,
  createProductsMarkup,
} from './js/render-function';
import { handleCategoryClick } from './js/handlers';

const categoriesList = document.querySelector('ul.categories');
export const productsList = document.querySelector('ul.products');

categoriesList.addEventListener('click', handleCategoryClick);

getCategoryList().then(res => {
  const markup = ['All', ...res];
  categoriesList.innerHTML = createCategoryMarkup(markup);
});

getProducts().then(res => {
  console.log(res);
  productsList.innerHTML = createProductsMarkup(res.products);
});
