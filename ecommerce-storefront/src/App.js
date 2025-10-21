// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { useCart } from './context/CartContext'; 

// Component to show the cart icon and item count
const CartIcon = () => {
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <Link to="/cart" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1.2em', marginRight: '5px' }}>🛒</span>
            <span>Cart</span>
            {totalItems > 0 && (
                <span style={{ 
                    marginLeft: '8px', 
                    padding: '2px 8px', 
                    backgroundColor: 'red', 
                    borderRadius: '50%', 
                    color: 'white', 
                    fontSize: '0.8em',
                    fontWeight: 'bold'
                }}>
                    {totalItems}
                </span>
            )}
        </Link>
    );
};


function App() {
    return (
        <Router>
            <header style={{ 
                backgroundColor: '#333', 
                color: 'white', 
                padding: '15px 25px',
                borderBottom: '3px solid #00c49a' 
            }}>
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5em', fontWeight: 'bold' }}>
                            Future Store
                        </Link>
                    </div>
                    <CartIcon />
                </nav>
            </header>
            
            <div className="container" style={{ 
                padding: '20px', 
                backgroundColor: '#f8f8f8' // Global Background Color
            }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;