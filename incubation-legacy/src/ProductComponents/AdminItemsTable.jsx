import { useEffect, useState } from 'react';

const AdminItemsTable = ({ items, setItems }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then(response => response.json())
      .then(data => {
        setItems(data);
      })
      .catch(error => console.error('Failed to load items:', error));
  }, [setItems]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditItem({
      name: items[index].name,
      price: items[index].price,
      quantity: items[index].quantity,
    });
  };

  const handleSave = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, name: editItem.name, price: parseFloat(editItem.price), quantity: parseInt(editItem.quantity, 10) } : item
    );
    setItems(updatedItems);
    setEditIndex(null);

    saveItemsToJsonFile(updatedItems);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
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
    .catch(error => console.error('Failed to update items:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  return (
    <div className="admin_items_table">
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
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
                  `£${item.price.toFixed(2)}`
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="quantity"
                    value={editItem.quantity}
                    onChange={handleInputChange}
                  />
                ) : (
                  item.quantity
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
    </div>
  );
};

export default AdminItemsTable;
