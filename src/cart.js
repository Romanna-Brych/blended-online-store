//Логіка сторінки Cart
import { getCart, getWishlist, saveCart } from './js/storage';
import { updateCountItems, updateWishlistCount } from './js/helpers';
import { getOneProductById } from './js/products-api';
import { createProductsMarkup } from './js/render-function';
import { handleProductClick } from './js/handlers';

const productsCartlistEl = document.querySelector('ul.products');
const notFoundEl = document.querySelector('div.not-found');
const countItemsEl = document.querySelector('.cart-summary__value[data-count]');
const totalPriceEl = document.querySelector('.cart-summary__value[data-price]');

if (productsCartlistEl && countItemsEl && totalPriceEl) {
  productsCartlistEl.addEventListener('click', handleProductClick);
  document.addEventListener('cart-updated', getProductsCart);
  getProductsCart();
  updateCountItems(getCart());
  updateWishlistCount(getWishlist());
}

export function addToCart(id) {
  const cart = getCart();
  if (!cart.includes(id)) {
    cart.push(id);
    saveCart(cart);
    updateCountItems(cart);
    document.dispatchEvent(new Event('cart-updated'));
  }
}

export function removeFromCart(id) {
  const cart = getCart().filter(itemId => itemId !== id);
  saveCart(cart);
  updateCountItems(cart);
  document.dispatchEvent(new Event('cart-updated'));
}

async function getProductsCart() {
  notFoundEl.classList.remove('not-found--visible');
  const cart = getCart();
  if (cart.length > 0) {
    try {
      const data = await Promise.all(cart.map(id => getOneProductById(id)));
      productsCartlistEl.innerHTML = createProductsMarkup(data);
      updateCartSummary(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  } else {
    notFoundEl.classList.add('not-found--visible');
    productsCartlistEl.innerHTML = '';
    updateCartSummary([]);
  }
}

function updateCartSummary(data) {
  const itemCount = data ? data.length : 0;
  const totalPrice =
    data && data.length > 0
      ? data.reduce((acc, item) => item.price + acc, 0)
      : 0;
  countItemsEl.textContent = itemCount;
  totalPriceEl.textContent = Number(totalPrice.toFixed(2));
}
