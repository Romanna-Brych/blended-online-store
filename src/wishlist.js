import { updateCountItems, updateWishlistCount } from './js/helpers';
import { getOneProductById } from './js/products-api';
import { createProductsMarkup } from './js/render-function';
import { getCart, getWishlist, saveWishlist } from './js/storage';
import { handleProductClick } from './js/handlers';

const productsWishlistEl = document.querySelector('ul.products');
const notFoundEl = document.querySelector('.js-not-found-whishlist');

if (productsWishlistEl && notFoundEl) {
  productsWishlistEl.addEventListener('click', handleProductClick);
  document.addEventListener('wish-updated', getProductsWishlist);
  updateWishlistCount(getWishlist());
  updateCountItems(getCart());
  getProductsWishlist();
}

export function addToWishlist(id) {
  const wishlist = getWishlist();
  if (!wishlist.includes(id)) {
    wishlist.push(id);
    saveWishlist(wishlist);
    updateWishlistCount(wishlist);
    document.dispatchEvent(new Event('wish-updated'));
  }
}

export function removeFromWishlist(id) {
  const wishlist = getWishlist().filter(wishId => wishId !== id);
  saveWishlist(wishlist);
  updateWishlistCount(wishlist);
  document.dispatchEvent(new Event('wish-updated'));
}

async function getProductsWishlist() {
  notFoundEl.classList.remove('not-found--visible');
  const wishlist = getWishlist();
  if (wishlist.length > 0) {
    try {
      const data = await Promise.all(wishlist.map(id => getOneProductById(id)));
      productsWishlistEl.innerHTML = createProductsMarkup(data);
    } catch (error) {
      console.log(error);
    }
  } else {
    notFoundEl.classList.add('not-found--visible');
    productsWishlistEl.innerHTML = '';
  }
}
