import { createModalMarkup } from './render-function';
import { addToCart, removeFromCart } from '../cart';
import { updateCountItems } from './helpers';
import { getCart, getWishlist } from './storage';
import { addToWishlist, removeFromWishlist } from '../wishlist';

const modalEl = document.querySelector('.modal');
const modalProductEl = document.querySelector('.modal-product');
const modalCloseBtn = document.querySelector('.modal__close-btn');
const cartBtn = modalEl.querySelector('.modal-product__btn--cart');
const wishlistBtn = modalEl.querySelector('.modal-product__btn--wishlist');

modalCloseBtn.addEventListener('click', closeModal);

export function showModal(obj) {
  modalProductEl.innerHTML = createModalMarkup(obj);
  modalEl.classList.add('modal--is-open');
  setupCartButton(obj.id, cartBtn);
  setupWishlistButton(obj.id, wishlistBtn);
}

export function closeModal() {
  modalEl.classList.remove('modal--is-open');
  modalProductEl.innerHTML = '';
}

modalEl.addEventListener('click', e => {
  if (e.target === modalEl) {
    closeModal();
  }
});

function setupCartButton(productId, buttonEl) {
  buttonEl.textContent = getCart().includes(productId)
    ? 'Remove from Cart'
    : 'Add to Cart';
  buttonEl.onclick = () => {
    if (getCart().includes(productId)) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
    buttonEl.textContent = getCart().includes(productId)
      ? 'Remove from Cart'
      : 'Add to Cart';
  };
}

function setupWishlistButton(productId, buttonEl) {
  buttonEl.textContent = getWishlist().includes(productId)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';
  buttonEl.onclick = () => {
    if (getWishlist().includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    buttonEl.textContent = getWishlist().includes(productId)
      ? 'Remove from Wishlist'
      : 'Add to Wishlist';
  };
}
