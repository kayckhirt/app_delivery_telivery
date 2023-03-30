import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CartContext from './CartContext';
import api from '../services/api';
import { getCart, saveOnCart } from '../utils/localStorage';

export default function CartProvider({ children }) {
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalCartValue, setTotalCartValue] = useState(0);

  const updateCartValue = () => {
    const cart = getCart();
    const cartValue = cart
      .reduce((acc, { subTotal }) => Number(subTotal) + acc, 0);
    setTotalCartValue(cartValue);
  };

  const updateCart = useCallback((productsArray) => {
    const filteredProducts = productsArray.filter(({ quantity }) => quantity > 0);
    saveOnCart(filteredProducts);
    updateCartValue();
  }, []);

  const getCartItem = (searchProductId) => {
    const cart = getCart();
    const item = cart.find(({ productId }) => searchProductId === productId);
    const cartIndex = cart.findIndex(({ productId }) => searchProductId === productId);
    return { item, cartIndex };
  };

  const getQuantity = useCallback((productId) => {
    const productOnCart = getCartItem(productId);
    return (productOnCart?.item?.quantity) ? productOnCart.item.quantity : 0;
  }, []);

  const generateProductList = (productOnCart, productToUpdate) => {
    const NOT_FOUND_POSITION = -1;
    const newProductList = productOnCart;
    if (productToUpdate.cartIndex > NOT_FOUND_POSITION) {
      newProductList[productToUpdate.cartIndex] = productToUpdate.item;
    } else {
      newProductList.push(productToUpdate.item);
    }

    return newProductList;
  };

  const updateQuantity = useCallback((product, newQuantity) => {
    const productsOnCart = getCart();
    const { cartIndex } = getCartItem(product.id);

    const productToUpdate = { item: {
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: newQuantity,
      subTotal: parseFloat(Number(product.price) * newQuantity, 2),
    },
    cartIndex };

    const newProductList = generateProductList(productsOnCart, productToUpdate);
    updateCart(newProductList);
  }, [updateCart]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      const { data } = await api.get('/products');
      setProducts(data);
      updateCartValue();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const contextValue = useMemo(
    () => ({
      loadingProducts,
      products,
      fetchProducts,
      getQuantity,
      updateCart,
      updateQuantity,
      totalCartValue }),
    [fetchProducts,
      totalCartValue,
      getQuantity,
      loadingProducts,
      products,
      updateCart,
      updateQuantity],
  );
  return (
    <CartContext.Provider
      value={ contextValue }
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;
