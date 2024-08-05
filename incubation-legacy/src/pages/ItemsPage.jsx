import React, { useEffect, useState } from 'react';
import Cart from '../CartComponents/Cart';
import CustomerItemsTable from '../ProductComponents/CustomerItemsTable'

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('/items.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setItems(data))
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const addToCart = (item) => {
    const itemIndex = items.findIndex(i => i.id === item.id);
    if (itemIndex !== -1 && items[itemIndex].inStock > 0) {
      // Update stock
      const updatedItems = [...items];
      updatedItems[itemIndex].inStock -= 1;
      if (updatedItems[itemIndex].inStock === 0) {
        updatedItems.splice(itemIndex, 1);
      }
      setItems(updatedItems);

      // Update cart
      const cartIndex = cart.findIndex(i => i.id === item.id);
      if (cartIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[cartIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <CustomerItemsTable items={items} addToCart={addToCart} />
      <Cart cart={cart} setCart={setCart} items={items} setItems={setItems} />
    </div>
  );
};

export default ItemsPage;
