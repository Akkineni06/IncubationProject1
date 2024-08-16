import { useEffect, useState } from 'react';

const AdminItemsTable = ({ items, setItems }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    // Fetch items from the backend
    fetch('http://localhost:8765/product-service/product/listAll')
      .then(response => response.json())
      .then(data => {
        setItems(data); // Set the fetched items in state
      })
      .catch(error => console.error('Failed to load items:', error));
  }, [setItems]); // Dependency array ensures this runs once when component mounts

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

    // API call to update the item in the database
    fetch(`http://localhost:8765/product-service/product/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editItem),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Item updated:', data);
      })
      .catch(error => console.error('Failed to update item:', error));
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);

    // API call to delete the item from the database
    fetch(`http://localhost:8765/product-service/product/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Item deleted:', data);
      })
      .catch(error => console.error('Failed to delete item:', error));
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
