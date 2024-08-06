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
        return Object.keys(newErrors).length === 0;
    };

    const handleAddNewItem = () => {
        if (!validateFields()) return;

        // Check if items is initialized
        if (!items) {
            console.error("Items array is undefined or not passed correctly.");
            return; // Early return if items is not initialized
        }

        const newItem = {
            id: items.length + 1, // Use the length of items to assign a new ID
            name: itemName,
            price: parseFloat(itemPrice).toFixed(2),
            inStock: parseInt(itemQuantity, 10)
        };

        setItems([...items, newItem]);

        // Reset form fields after adding the new item
        setItemName('');
        setItemPrice('');
        setItemQuantity('');
        setErrors({});
    };

    return (
        <div>
            <h2>Add New Item</h2>
            <div>
                <label>
                    Item Name:
                    <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} style={{ borderColor: errors.itemName ? 'red' : '' }} />
                </label>
                {errors.itemName && <span style={{ color: 'red' }}>{errors.itemName}</span>}
            </div>
            <div>
                <label>
                    Item Price:
                    <input type="number" step="0.01" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} style={{ borderColor: errors.itemPrice ? 'red' : '' }} />
                </label>
                {errors.itemPrice && <span style={{ color: 'red' }}>{errors.itemPrice}</span>}
            </div>
            <div>
                <label>
                    Quantity to Add:
                    <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} style={{ borderColor: errors.itemQuantity ? 'red' : '' }} />
                </label>
                {errors.itemQuantity && <span style={{ color: 'red' }}>{errors.itemQuantity}</span>}
            </div>
            <button onClick={handleAddNewItem}>Add New Item</button>
        </div>
    );
};

export default AddNewItem;
