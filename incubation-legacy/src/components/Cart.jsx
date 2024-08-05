import React from 'react';

const Cart = ({ cart }) => {
  const getTotalItems = () => {
    return cart.length;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      <h2>Cart</h2>
      <p>Total Items: {getTotalItems()}</p>
      <p>Total Price: ${getTotalPrice()}</p>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
