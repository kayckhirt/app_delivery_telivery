const TOKEN_KEY = 'delivery';

export const getToken = () => localStorage.getItem(TOKEN_KEY) || undefined;

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const clearSessionStorage = () => localStorage.removeItem(TOKEN_KEY);
