import React from 'react';
import './CSS/Cart.css';
import Cart from './CartComponents/Cart';
import useCart from './CartComponents/UseCart'; // Assuming UseCart is a custom hook

function App() {
  const { items, cart, addToCart } = useCart([]); // Initialize with an empty array or appropriate default

  return (
    <div className="App">
      <Cart cart={cart} items={items} addToCart={addToCart} />
      {/* Render other components that might use cart data here */}
    </div>
  );
}

export default App;
