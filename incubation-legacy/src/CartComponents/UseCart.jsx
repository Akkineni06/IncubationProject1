import { useState } from 'react';

const useCart = (initialItems = []) => {
  const [items, setItems] = useState(initialItems);
  const [cart, setCart] = useState([]);

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

  return {
    items,
    cart,
    setItems,
    setCart,
    addToCart,
  };
};

export default useCart;
