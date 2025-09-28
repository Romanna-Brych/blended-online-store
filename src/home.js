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

// let currentPage = 1;
// const limit = 12;
export const state = {
  currentPage: 1,
  currentCategory: 'All',
  limit: 12,
  totalPages: 1,
  currentSearch: '',
};

const categoriesList = document.querySelector('ul.categories');
export const loadMoreBtn = document.querySelector('.load-more-btn');
export const productsList = document.querySelector('ul.products');
const searchFormEl = document.querySelector('.search-form');
const clearBtnEl = document.querySelector('button.search-form__btn-clear');

categoriesList.addEventListener('click', handleCategoryClick);
productsList.addEventListener('click', handleProductClick);
loadMoreBtn.addEventListener('click', onLoadMore);
searchFormEl.addEventListener('submit', hendleSearchSubmit);
clearBtnEl.addEventListener('click', handleSearchClear);

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
