// src/pages/Cart.js
import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/Cart/CartItem';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters'; 

function Cart() {
    const { cartItems, getTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div style={{ padding: '20px', border: '1px dashed #ccc', borderRadius: '5px' }}>
                <h2 style={{ color: '#555' }}>Your shopping cart is empty.</h2>
                <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>Go shopping!</Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px' }}>
            <h2>Your Shopping Cart ({cartItems.length} Items)</h2>
            <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '10px' }}>
                    <span style={{ flex: 2 }}>Product Name</span>
                    <span style={{ flex: 1, textAlign: 'center' }}>Quantity</span>
                    <span style={{ flex: 1, textAlign: 'right' }}>Subtotal</span>
                    <span style={{ flex: 0.5 }}></span> 
                </div>

                {cartItems.map(item => (
                    <CartItem key={item.id} item={item} /> 
                ))}
            </div>

            <h3 style={{ marginTop: '30px', textAlign: 'right', paddingRight: '15px', borderTop: '2px solid #333', paddingTop: '15px' }}>
                Grand Total: {formatCurrency(getTotal())}
            </h3>
            
            <Link 
                to="/checkout" 
                style={{ 
                    display: 'block', 
                    padding: '12px 20px', 
                    backgroundColor: 'darkgreen', 
                    color: 'white', 
                    textDecoration: 'none', 
                    marginTop: '15px', 
                    textAlign: 'center',
                    borderRadius: '5px'
                }}
            >
                Proceed to Checkout ({formatCurrency(getTotal())})
            </Link>
        </div>
    );
}

export default Cart;