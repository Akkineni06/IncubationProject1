import React, { useState } from 'react';

const AdminItemsTable = ({ items, setItems }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({
    name: '',
    price: '',
    inStock: '',
  });

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditItem({
      name: items[index].name,
      price: items[index].price,
      inStock: items[index].inStock,
    });
  };

  const handleSave = (id) => {
    fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editItem),
    })
      .then(response => response.json())
      .then(updatedItem => {
        const updatedItems = items.map(item => item.id === id ? updatedItem : item);
        setItems(updatedItems);
        setEditIndex(null);
        setEditItem({ name: '', price: '', inStock: '' });
      })
      .catch(error => console.error('Error updating item:', error));
  };

  const handleDelete = (id) => {
    fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Admin Table Item ID</th>
          <th>Item Name</th>
          <th>Item Price</th>
          <th>Currently In Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  name="name"
                  value={editItem.name}
                  onChange={handleInputChange}
                />
              ) : (
                item.name
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  name="price"
                  value={editItem.price}
                  onChange={handleInputChange}
                />
              ) : (
                `$${item.price.toFixed(2)}`
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  name="inStock"
                  value={editItem.inStock}
                  onChange={handleInputChange}
                />
              ) : (
                item.inStock
              )}
            </td>
            <td>
              {editIndex === index ? (
                <button onClick={() => handleSave(item.id)}>Save</button>
              ) : (
                <button onClick={() => handleEdit(index)}>Edit</button>
              )}
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminItemsTable;
