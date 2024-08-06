import React from 'react';

const Cart = ({ cart, setCart, items, setItems }) => {

  const updateCartItemInDatabase = (cartItem) => {
    fetch(`/api/cart/${cartItem.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem),
    })
    .then(response => response.json())
    .then(data => console.log('Cart item updated:', data))
    .catch(error => console.error('Failed to update cart item:', error));
  };

  const deleteCartItemInDatabase = (cartItemId) => {
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE'
    })
    .then(() => console.log('Cart item deleted'))
    .catch(error => console.error('Failed to delete cart item:', error));
  };

  const updateQuantity = (item, delta) => {
    const cartIndex = cart.findIndex(i => i.id === item.id);
    const itemIndex = items.findIndex(i => i.id === item.id);

    if (cartIndex !== -1) {
      const updatedCart = [...cart];
      const updatedItems = [...items];
      const cartItem = updatedCart[cartIndex];

      // Update quantity in cart
      if (delta === -1 && cartItem.quantity === 1) {
        updatedCart.splice(cartIndex, 1);
        deleteCartItemInDatabase(cartItem.id);
      } else {
        cartItem.quantity += delta;
        updateCartItemInDatabase(cartItem);
      }

      // Update stock in items
      if (itemIndex !== -1) {
        updatedItems[itemIndex].inStock -= delta;
        if (updatedItems[itemIndex].inStock < 0) {
          updatedItems[itemIndex].inStock = 0;
        }
      } else if (delta === 1) {
        // Item not found in stock, do not allow incrementing
        return;
      }

      // Remove item from items if stock goes to 0
      if (updatedItems[itemIndex] && updatedItems[itemIndex].inStock === 0) {
        updatedItems.splice(itemIndex, 1);
      }

      setCart(updatedCart);
      setItems(updatedItems);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  return (
    <div>
      <h2>Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => updateQuantity(item, 1)}>+</button>
                <button onClick={() => updateQuantity(item, -1)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Total Items: {totalItems}</h3>
        <h3>Total Price: {totalPrice}</h3>
      </div>
    </div>
  );
};

export default Cart;
