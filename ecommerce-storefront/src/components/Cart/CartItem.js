// src/components/Cart/CartItem.js
import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';

function CartItem({ item }) {
    const { removeFromCart, addToCart, decreaseQuantity } = useCart();
    
    if (!item || !item.price || !item.quantity) {
        return null; 
    }

    const itemTotal = item.price * item.quantity;

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderBottom: '1px dashed #ddd', 
            padding: '10px 0',
            gap: '10px'
        }}>
            <span style={{ flex: 2, fontWeight: '500' }}>
                {item.name || 'Unknown Product'} 
            </span>
            
            <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <button 
                    onClick={() => decreaseQuantity(item.id)} 
                    style={{ padding: '3px 8px', border: '1px solid #ccc', cursor: 'pointer' }}
                >
                    -
                </button>
                <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button 
                    onClick={() => addToCart(item.id)} 
                    style={{ padding: '3px 8px', border: '1px solid #ccc', cursor: 'pointer' }}
                >
                    +
                </button>
            </span>

            <span style={{ flex: 1, fontWeight: 'bold' }}>
                {formatCurrency(itemTotal)}
            </span> 
            
            <button 
                onClick={() => removeFromCart(item.id)} 
                style={{ backgroundColor: 'darkred', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}
            >
                Remove
            </button>
        </div>
    );
}

export default CartItem;