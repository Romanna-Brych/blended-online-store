import {
  getCategoryByValue,
  getProducts,
  getOneProductById,
  getSearchCategory,
} from './products-api';
import { createProductsMarkup } from './render-function';
import { productsList, state, loadMoreBtn } from '../home';
import { showModal } from './modal';
import axios from 'axios';

const notFoundEl = document.querySelector('div.not-found');

export async function handleCategoryClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  const category = event.target.textContent;

  state.currentCategory = category;
  state.currentPage = 1;
  loadMoreBtn.disabled = true;

  try {
    let res;
    if (category === 'All') {
      res = await getProducts(state.currentPage);
    } else {
      res = await getCategoryByValue(category, state.currentPage);
      if (res.products.length === 0) {
        notFoundEl.classList.add('not-found--visible');
        productsList.innerHTML = '';
        loadMoreBtn.classList.add('is-hidden');
        return;
      }
    }

    productsList.innerHTML = createProductsMarkup(res.products);
    updateLoadMoreBtn(res.total);

    notFoundEl.classList.remove('not-found--visible');

    document
      .querySelectorAll('.categories__btn')
      .forEach(btn => btn.classList.remove('categories__btn--active'));
    event.target.classList.add('categories__btn--active');
  } catch (error) {
    console.log(error);
  } finally {
    loadMoreBtn.disabled = false;
    state.currentSearch = '';
  }
}

export async function handleProductClick(event) {
  if (event.target === event.currentTarget) {
    return;
  }
  const currentProduct = event.target.closest('.products__item');
  const id = currentProduct.dataset.id;
  try {
    const data = await getOneProductById(id);
    showModal(data);
  } catch (error) {
    console.log(error);
  }
}

export async function onLoadMore() {
  state.currentPage += 1;
  let res;
  try {
    if (state.currentSearch) {
      res = await getSearchCategory(state.currentSearch, state.currentPage);
    } else if (state.currentCategory === 'All') {
      res = await getProducts(state.currentPage);
      state.currentSearch = '';
    } else {
      res = await getCategoryByValue(state.currentCategory, state.currentPage);
    }

    productsList.insertAdjacentHTML(
      'beforeend',
      createProductsMarkup(res.products)
    );
    updateLoadMoreBtn(res.total);
  } catch (error) {
    console.log(error);
  }
}

function updateLoadMoreBtn(total) {
  state.totalPages = Math.ceil(total / state.limit);
  loadMoreBtn.classList.toggle(
    'is-hidden',
    state.currentPage >= state.totalPages
  );
}

export async function hendleSearchSubmit(event) {
  event.preventDefault();
  state.currentPage = 1;

  const value = event.target.elements.searchValue.value.trim();
  if (value === '') {
    return;
  }
  try {
    const data = await getSearchCategory(value, state.currentPage);
    state.currentSearch = value;
    if (data.products.length === 0) {
      console.log('noting');
      productsList.innerHTML = '';
      notFoundEl.classList.add('not-found--visible');
      return;
    }
    productsList.innerHTML = createProductsMarkup(data.products);
    updateLoadMoreBtn(data.total);
    notFoundEl.classList.remove('not-found--visible');
  } catch (error) {
    console.log(error);
  } finally {
    event.target.reset();
  }
}

export async function handleSearchClear() {
  const input = document.querySelector('.search-form__input');
  input.value = '';
  state.currentSearch = '';
  state.currentPage = 1;
  try {
    const res = await getProducts(state.currentPage);
    productsList.innerHTML = createProductsMarkup(res.products);
    updateLoadMoreBtn(res.total);
    notFoundEl.classList.remove('not-found--visible');
  } catch (error) {
    console.log(error);
  }
}
