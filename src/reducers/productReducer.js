import { FETCH_PRODUCTS, FETCH_PRODUCT_DETAILS, ADD_PRODUCT, EDIT_PRODUCT, SET_SEARCH_QUERY } from '../actions/productActions';

const initialState = {
  products: [],
  selectedProduct: null,
  searchQuery: '',
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    case FETCH_PRODUCT_DETAILS:
      return { ...state, selectedProduct: action.payload };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export default productReducer;
