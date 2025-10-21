// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';
import { products } from '../data/products'; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext); 

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (productId) => {
        const existingItem = cartItems.find(item => item.id === productId);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            const productToAdd = products.find(p => p.id === productId);
            if (productToAdd) {
                // IMPORTANT: Spreads all product details (name, price, etc.)
                setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]); 
            }
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const decreaseQuantity = (productId) => {
        setCartItems(cartItems => 
            cartItems.map(item => {
                if (item.id === productId) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                }
                return item;
            })
            .filter(item => item.quantity > 0) 
        );
    };

    const clearCart = () => setCartItems([]);

    const getTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.price || 0; 
            return total + price * (item.quantity || 0);
        }, 0); 
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotal, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};