import { createModalMarkup } from './render-function';

const modalEl = document.querySelector('.modal');
const modalProductEl = document.querySelector('.modal-product');
const modalCloseBtn = document.querySelector('.modal__close-btn');

modalCloseBtn.addEventListener('click', closeModal);

export function showModal(obj) {
  modalProductEl.innerHTML = createModalMarkup(obj);
  modalEl.classList.add('modal--is-open');
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
