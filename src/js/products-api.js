import axios from 'axios';

axios.defaults.baseURL = 'https://dummyjson.com';

let currentPage = 1;

export async function getCategoryList() {
  const respons = await axios(`/products/category-list?`);
  return respons.data;
}

export async function getProducts() {
  const respons = await axios('products?', {
    params: {
      limit: 12,
      skip: `${(currentPage - 1) * 12}`,
    },
  });
  return respons.data;
}

export async function getCategoryByValue(endPoint) {
  const respons = await axios('/products/category/' + endPoint, {
    params: {
      limit: 12,
    },
  });
  return respons.data;
}
