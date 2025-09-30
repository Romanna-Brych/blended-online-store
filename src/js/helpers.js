export function updateCountItems(cart) {
  const navCountEl = document.querySelector('span.nav__count[data-cart-count]');
  navCountEl.textContent = cart.length;
}

export function updateWishlistCount(wishlist) {
  const navWishlistEl = document.querySelector(
    'span.nav__count[data-wishlist-count]'
  );
  navWishlistEl.textContent = wishlist.length;
}
