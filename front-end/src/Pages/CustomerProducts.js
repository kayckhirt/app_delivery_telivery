import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';

import api from '../services/api';

function CustomerProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <NavBar />
      <h3>CustomerProducts</h3>
      {products.map(({ id, price, image, title }) => (
        <ProductCard
          key={ `${title}${id}` }
          id={ id }
          price={ price }
          image={ image }
          title={ title }
        />))}
    </>
  );
}
export default CustomerProducts;
