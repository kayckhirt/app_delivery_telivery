const TOKEN_KEY = 'delivery';
const CART_KEY = 'cart';

export const getToken = () => localStorage.getItem(TOKEN_KEY) || undefined;

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const getCart = () => JSON.parse(localStorage.getItem(CART_KEY)) || [];

export const saveOnCart = (cartItems) => (
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems)));

export const clearCart = () => localStorage.removeItem(CART_KEY);

export const clearSession = () => {
  clearToken();
  clearCart();
};
