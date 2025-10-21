// src/utils/formatters.js

export const formatCurrency = (amount) => {
    // Formats amount to Indian Rupees (INR) with Indian numbering style
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2, 
    }).format(amount);
};