import React, { useState } from 'react';

const AddNewItem = ({ items, setItems }) => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        if (!itemName) newErrors.itemName = 'Item Name is required';
        if (!itemPrice || isNaN(parseFloat(itemPrice)) || parseFloat(itemPrice) <= 0) newErrors.itemPrice = 'Valid Item Price is required';
        if (!itemQuantity || isNaN(parseInt(itemQuantity, 10)) || parseInt(itemQuantity, 10) <= 0) newErrors.itemQuantity = 'Valid Quantity is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length == 0;
    };

    const handleAddNewItem = () => {
        if (!validateFields()) return;

        const newItem = {
            id: items.length + 1,
            name: itemName,
            price: parseFloat(itemPrice).toFixed(2),
            inStock: parseInt(itemQuantity, 10)
        };

        setItems([...items, newItem]);

        setItemName('');
        setItemPrice('');
        setItemQuantity('');
        setErrors({});
    };

    return (
        <div className="add-new-item-card">
            <h2>Add Item to Stock</h2>
            <div className="form-field">
                <label>Item Name:</label>
                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} style={{ borderColor: errors.itemName ? 'red' : '' }} />
            </div>
            {errors.itemName && <span style={{ color: 'red' }}>{errors.itemName}</span>}
            <div className="form-field">
                <label>Item Price (£):</label>
                <input type="number" step="0.01" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} style={{ borderColor: errors.itemPrice ? 'red' : '' }} />
            </div>
            {errors.itemPrice && <span style={{ color: 'red' }}>{errors.itemPrice}</span>}
            <div className="form-field">
                <label>Quantity to Add:</label>
                <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} style={{ borderColor: errors.itemQuantity ? 'red' : '' }} />
            </div>
            {errors.itemQuantity && <span style={{ color: 'red' }}>{errors.itemQuantity}</span>}
            <button onClick={handleAddNewItem}>Add Item </button>
        </div>
    );
};

export default AddNewItem;
