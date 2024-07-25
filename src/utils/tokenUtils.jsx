// tokenUtils.js

import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: 1 }); // Expires in 1 day
};

export const getToken = () => {
    return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
    Cookies.remove(TOKEN_KEY);
};

export const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true; // No token means expired
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.exp < Date.now() / 1000; // Check if token expiration time is past current time
    } catch (error) {
        return true; // Token is invalid or cannot be decoded, treat as expired
    }
};
