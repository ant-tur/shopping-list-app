import axios from 'axios';

const baseUrl = 'http://localhost:3001/products';

const getAllProduct = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const createProduct = newProduct => {
  return axios.post(baseUrl, newProduct).then(response => response.data);
};

const updateProduct = (id, newProduct) => {
  return axios
    .put(`${baseUrl}/${id}`, newProduct)
    .then(response => response.data);
};

const removeProduct = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
};

export default {
  getAllProduct,
  createProduct,
  updateProduct,
  removeProduct,
};
