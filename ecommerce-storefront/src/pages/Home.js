// src/pages/Home.js
import React, { useState } from 'react';
import ProductCard from '../components/Products/ProductCard';
import { products } from '../data/products';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Our Products</h1>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', margin: '20px 0', width: '300px', border: '1px solid #00c49a' }} 
            />
            
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '20px', 
                padding: '20px', 
                border: '1px solid #ddd', 
                borderRadius: '8px' 
            }}>
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Home;