// src/components/Products/ProductCard.js
import React from 'react';
import { useCart } from '../../context/CartContext'; 
import { formatCurrency } from '../../utils/formatters';

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            margin: '10px', 
            width: '250px', 
            borderRadius: '8px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
        }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3 style={{ margin: '10px 0 5px 0' }}>{product.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#007bff' }}>{formatCurrency(product.price)}</p> 
            <p style={{ fontSize: '0.8em', color: '#555', height: '40px', overflow: 'hidden' }}>{product.description}</p>
            <button 
                onClick={() => addToCart(product.id)} 
                style={{ 
                    padding: '10px 15px', 
                    backgroundColor: '#00c49a', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: '4px',
                    marginTop: '10px'
                }}
            >
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;