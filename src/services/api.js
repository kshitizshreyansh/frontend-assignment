import axios from 'axios';

export const fetchProducts = () => {
  return axios.get('/mockData.json').then(response => response.data);
};
