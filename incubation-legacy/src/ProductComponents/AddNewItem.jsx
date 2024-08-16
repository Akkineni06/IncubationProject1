import { useState } from 'react';

const AddNewItem = ({ items, setItems }) => {
  const [name, setItemName] = useState('');
  const [price, setItemPrice] = useState('');
  const [quantity, setItemQuantity] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Item Name is required';
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0)
      newErrors.price = 'Valid Item Price is required';
    if (!quantity || isNaN(parseInt(quantity, 10)) || parseInt(quantity, 10) <= 0)
      newErrors.quantity = 'Valid Quantity is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddNewItem = () => {
    if (!validateFields()) return;

    const newItem = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      name: name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    saveItemsToJsonFile(updatedItems);
  };

  const saveItemsToJsonFile = (updatedItems) => {
    fetch('http://localhost:5000/update-items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItems),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update items');
      }
      return response.json();
    })
    .then(() => {
      setItemName('');
      setItemPrice('');
      setItemQuantity('');
      setErrors({});
    })
    .catch(error => {
      console.error('Failed to add new item:', error);
      setErrors({ submit: 'Failed to add new item. Please try again.' });
    });
  };

  return (
    <div className="add-new-item-card">
      <h2>Add Item to Stock</h2>
      <div className="form-field">
        <label>Item Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setItemName(e.target.value)}
          style={{ borderColor: errors.name ? 'red' : '' }}
        />
      </div>
      {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      <div className="form-field">
        <label>Item Price (£):</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setItemPrice(e.target.value)}
          style={{ borderColor: errors.price ? 'red' : '' }}
        />
      </div>
      {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
      <div className="form-field">
        <label>Quantity to Add:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setItemQuantity(e.target.value)}
          style={{ borderColor: errors.quantity ? 'red' : '' }}
        />
      </div>
      {errors.quantity && <span style={{ color: 'red' }}>{errors.quantity}</span>}
      {errors.submit && <span style={{ color: 'red' }}>{errors.submit}</span>}
      <button onClick={handleAddNewItem} className="add-item-button">
        Add Item
      </button>
    </div>
  );
};

export default AddNewItem;
