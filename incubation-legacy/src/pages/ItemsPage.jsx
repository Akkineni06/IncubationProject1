import React, { useEffect, useState } from 'react';
import Cart from '../components/Cart';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('/items.json')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div>
      <h1>Items</h1>
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
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.inStock}</td>
              <td>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Cart cart={cart} />
    </div>
  );
};

export default ItemsPage;
