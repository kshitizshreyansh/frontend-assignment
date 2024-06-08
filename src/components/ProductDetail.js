import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, editProduct } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { fetchProducts } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.selectedProduct);

  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
        fetchProducts().then(products => {
          const selectedProduct = products.find(p => p.id === parseInt(id));
          dispatch(fetchProductDetails(selectedProduct));
        });
      }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    }
  }, [product]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    dispatch(editProduct(editedProduct));
    setEditMode(false);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container product-detail">
      {editMode ? (
        <div>
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="price"
            value={editedProduct.price}
            onChange={handleEditChange}
          />
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleEditChange}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h1>{product.name}</h1>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
