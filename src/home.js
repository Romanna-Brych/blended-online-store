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
import {
  handleCategoryClick,
  handleProductClick,
  onLoadMore,
  hendleSearchSubmit,
  handleSearchClear,
} from './js/handlers';
import { updateCountItems, updateWishlistCount } from './js/helpers';
import { getCart, getWishlist } from './js/storage';
import { productsList, loadMoreBtn, state } from './js/constants';

const categoriesList = document.querySelector('ul.categories');
const searchFormEl = document.querySelector('.search-form');
const clearBtnEl = document.querySelector('button.search-form__btn-clear');

categoriesList.addEventListener('click', handleCategoryClick);
productsList.addEventListener('click', handleProductClick);
loadMoreBtn.addEventListener('click', onLoadMore);
searchFormEl.addEventListener('submit', hendleSearchSubmit);
clearBtnEl.addEventListener('click', handleSearchClear);
updateCountItems(getCart());
updateWishlistCount(getWishlist());

getCategoryList()
  .then(res => {
    const markup = ['All', ...res];
    categoriesList.innerHTML = createCategoryMarkup(markup);
  })
  .catch(error => {
    console.log(error.message);
  });

getProducts(state.currentPage)
  .then(res => {
    const { products, total } = res;
    state.totalPages = Math.ceil(total / state.limit);
    productsList.innerHTML = createProductsMarkup(products);
    if (state.totalPages > state.limit) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  })
  .catch(error => {
    console.log(error.message);
  });
