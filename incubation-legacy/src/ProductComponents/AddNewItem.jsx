import React, { useState } from 'react';

const AddNewItem = ({ items, setItems }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!itemName) newErrors.itemName = 'Item Name is required';
    if (!itemPrice || isNaN(itemPrice) || parseFloat(itemPrice) < 0) newErrors.itemPrice = 'Valid Item Price is required';
    if (!itemQuantity || isNaN(itemQuantity) || parseInt(itemQuantity) < 0 || !Number.isInteger(parseFloat(itemQuantity))) newErrors.itemQuantity = 'Valid Quantity is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddNewItem = () => {
    if (!validateFields()) return;

    const newItem = {
      id: items.length + 1, // Assuming IDs are sequential. In real apps, use a better unique ID generator.
      name: itemName,
      price: parseFloat(itemPrice).toFixed(2), // Ensure price is a float with two decimal places
      inStock: parseInt(itemQuantity, 10), // Ensure quantity is an integer
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    // Reset form fields
    setItemName('');
    setItemPrice('');
    setItemQuantity('');
    setErrors({});

    // Simulate writing to items.json by logging to the console
    console.log('New item added:', newItem);
    console.log('Updated items list:', updatedItems);
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <div>
        <label>
          Item Name:
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={{ borderColor: errors.itemName ? 'red' : '' }}
          />
        </label>
        {errors.itemName && <span style={{ color: 'red' }}>{errors.itemName}</span>}
      </div>
      <div>
        <label>
          Item Price:
          <input
            type="number"
            step="0.01"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            style={{ borderColor: errors.itemPrice ? 'red' : '' }}
          />
        </label>
        {errors.itemPrice && <span style={{ color: 'red' }}>{errors.itemPrice}</span>}
      </div>
      <div>
        <label>
          Quantity to Add:
          <input
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            style={{ borderColor: errors.itemQuantity ? 'red' : '' }}
          />
        </label>
        {errors.itemQuantity && <span style={{ color: 'red' }}>{errors.itemQuantity}</span>}
      </div>
      <button onClick={handleAddNewItem}>Add New Item</button>
    </div>
  );
};

export default AddNewItem;
