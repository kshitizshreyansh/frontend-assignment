export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCT_DETAILS = 'FETCH_PRODUCT_DETAILS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  payload: products,
});

export const fetchProductDetails = (product) => ({
  type: FETCH_PRODUCT_DETAILS,
  payload: product,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product,
});

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});
