import { useState } from 'react';

const useCart = (initialItems = []) => {
  const [items, setItems] = useState(initialItems);
  const [cart, setCart] = useState([]);

  const updateItemStockInDatabase = (item) => {
    // API call to update item stock in the database
    fetch('http://localhost:8765/product-service/products/' + item.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Item stock updated:', data);
    })
    .catch(error => console.error('Failed to update item stock:', error));
  };

  const addToCartDatabase = (cartItem) => {
    // API call to add item to cart in the database
    fetch('http://localhost:8765/cart-service/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Cart item added:', data);
    })
    .catch(error => console.error('Failed to add item to cart:', error));
  };

  const addToCart = (item) => {
    const itemIndex = items.findIndex(i => i.id === item.id);
    if (itemIndex !== -1 && items[itemIndex].inStock > 0) {
      // Update stock locally
      const updatedItems = [...items];
      updatedItems[itemIndex].inStock -= 1;
      if (updatedItems[itemIndex].inStock === 0) {
        updatedItems.splice(itemIndex, 1);
      }
      setItems(updatedItems);

      // Update item stock in the database
      updateItemStockInDatabase({ ...updatedItems[itemIndex], inStock: updatedItems[itemIndex]?.inStock || 0 });

      // Update cart locally
      const cartIndex = cart.findIndex(i => i.id === item.id);
      if (cartIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[cartIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        const newCartItem = { ...item, quantity: 1 };
        setCart([...cart, newCartItem]);

        // Add item to cart in the database
        addToCartDatabase(newCartItem);
      }
    }
  };

  return {
    items,
    cart,
    setItems,
    setCart,
    addToCart,
  };
};

export default useCart;
