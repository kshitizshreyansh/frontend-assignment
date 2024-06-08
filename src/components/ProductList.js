import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchQuery } from '../actions/productActions';
import { fetchProducts as fetchProductsAPI } from '../services/api';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const searchQuery = useSelector(state => state.searchQuery);

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;

  useEffect(() => {
    fetchProductsAPI().then(products => {
      dispatch(fetchProducts(products));
    });
  }, [dispatch]);

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {currentProducts.map(product => (
          <li key={product.id}>
            <div className="product-item">
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <Link to={`/products/${product.id}`}>View Details</Link>
            </div>
          </li>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default ProductList;
