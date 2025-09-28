import axios from 'axios';

axios.defaults.baseURL = 'https://dummyjson.com';

export async function getCategoryList() {
  const respons = await axios(`/products/category-list?`);
  return respons.data;
}

export async function getProducts(page = 1) {
  const respons = await axios('products?', {
    params: {
      limit: 12,
      skip: (page - 1) * 12,
    },
  });
  return respons.data;
}

export async function getCategoryByValue(endPoint, page = 1) {
  const respons = await axios('/products/category/' + endPoint, {
    params: {
      limit: 12,
      skip: (page - 1) * 12,
    },
  });
  return respons.data;
}

export async function getOneProductById(id) {
  const respons = await axios(`/products/${id}`);
  return respons.data;
}

export async function getSearchCategory(value, page = 1) {
  const respons = await axios(`/products/search?q=${value}`, {
    params: {
      limit: 12,
      skip: (page - 1) * 12,
    },
  });
  return respons.data;
}
