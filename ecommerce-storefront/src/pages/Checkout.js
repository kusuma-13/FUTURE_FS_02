// src/pages/Checkout.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { validateForm } from '../utils/validators';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';

function Checkout() {
    const { cartItems, getTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const finalTotal = getTotal(); 

    if (cartItems.length === 0 && !isSubmitted) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>Checkout Not Available</h2>
                <p>Your cart is empty. Please add items before proceeding to checkout.</p>
                <button onClick={() => navigate('/')}>Back to Store</button>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // --- Checkout Simulation ---
            console.log('Order Submitted:', {
                ...formData,
                items: cartItems,
                total: formatCurrency(finalTotal)
            });

            clearCart();
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div style={{ 
                padding: '40px', 
                backgroundColor: '#e9ffe9', 
                border: '3px solid #00a000', 
                borderRadius: '8px', 
                margin: '20px auto', 
                width: '80%' 
            }}>
                <h2>🎉 Order Placed Successfully!</h2>
                <p>Thank you for your simulated purchase, **{formData.name}**!</p>
                <p>Your order total was **{formatCurrency(finalTotal)}**.</p>
                <p>A confirmation email has been sent to **{formData.email}**.</p>
                <button onClick={() => navigate('/')} style={{ padding: '10px 20px', backgroundColor: 'darkblue', color: 'white', border: 'none', cursor: 'pointer', marginTop: '15px', borderRadius: '3px' }}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Checkout Details</h2>
            <h3>Order Total: {formatCurrency(finalTotal)}</h3>
            
            <form onSubmit={handleSubmit} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '15px', 
                width: '400px', 
                marginTop: '20px',
                padding: '20px',
                border: '1px solid #ccc', 
                borderRadius: '5px'
            }}>
                
                {['name', 'email', 'address'].map(field => (
                    <div key={field}>
                        <input
                            type={field === 'email' ? 'email' : 'text'}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('Address', ' Address')}
                            value={formData[field]}
                            onChange={handleChange}
                            style={{ padding: '10px', width: '100%', border: errors[field] ? '2px solid red' : '1px solid #ccc', borderRadius: '3px' }}
                        />
                        {errors[field] && <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '0.8em' }}>{errors[field]}</p>}
                    </div>
                ))}
                
                <button type="submit" style={{ padding: '12px 20px', backgroundColor: 'darkorange', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px', borderRadius: '3px' }}>
                    Place Simulated Order
                </button>
            </form>
        </div>
    );
}

export default Checkout;