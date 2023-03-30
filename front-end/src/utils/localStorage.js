const TOKEN_KEY = 'user';
const CART_KEY = 'cart';
const CLIENT_KEY = 'client';

export const getToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY)) || undefined;

export const saveToken = (token) => localStorage
  .setItem(TOKEN_KEY, JSON.stringify(token));

export const saveClient = (client) => localStorage.setItem(CLIENT_KEY, client);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const getCart = () => JSON.parse(localStorage.getItem(CART_KEY)) || [];

export const saveOnCart = (cartItems) => localStorage
  .setItem(CART_KEY, JSON.stringify(cartItems));

export const clearCart = () => localStorage.removeItem(CART_KEY);

export const clearSession = () => {
  clearToken();
  clearCart();
};
