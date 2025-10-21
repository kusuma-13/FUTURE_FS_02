// src/utils/validators.js

export const validateField = (value) => {
    return value.trim() !== '';
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateForm = (formData) => {
    const errors = {};

    if (!validateField(formData.name)) {
        errors.name = 'Name is required.';
    }
    if (!validateField(formData.address)) {
        errors.address = 'Shipping address is required.';
    }
    if (!validateField(formData.email) || !validateEmail(formData.email)) {
        errors.email = 'A valid email address is required.';
    }

    return errors;
};