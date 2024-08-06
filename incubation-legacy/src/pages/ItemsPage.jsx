import React, { useEffect } from 'react';
import Cart from '../CartComponents/Cart';
import CustomerItemsTable from '../ProductComponents/CustomerItemsTable';
import AddNewItem from '../ProductComponents/AddNewItem';
import useCart from '../CartComponents/UseCart';
import fetchItems from '../ProductComponents/FetchItems';

const ItemsPage = () => {
  const { items, setItems, cart, setCart, addToCart } = useCart();

  useEffect(() => {
    fetchItems()
      .then(data => setItems(data))
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [setItems]);

  return (
    <div>
      <h1>Items</h1>
      <CustomerItemsTable items={items} addToCart={addToCart} />
      <AddNewItem items={items} setItems={setItems} />
      <Cart cart={cart} setCart={setCart} items={items} setItems={setItems} />
    </div>
  );
};

export default ItemsPage;
