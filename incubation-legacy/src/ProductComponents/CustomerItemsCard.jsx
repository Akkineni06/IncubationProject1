import { useEffect } from 'react';

const CustomerItemsCard = ({ items, setItems, addToCart }) => {
  
  useEffect(() => {
    // Fetch items from the backend
    fetch('http://localhost:8765/product-service/product/listAll')
      .then(response => response.json())
      .then(data => {
        setItems(data); // Set the fetched items in state
      })
      .catch(error => console.error('Failed to load items:', error));
  }, [setItems]); // Dependency array ensures this runs once when component mounts

  return (
    <div className="item-cards-container">
      {items.map(item => {
        const price = parseFloat(item.price).toFixed(2); // Ensure price is a float with two decimal places
        return (
          <div className="item-card" key={item.id}>
            <div className="item-card-content">
              <h3>{item.name}</h3>
              <p>Price: £{price}</p>
              <p>In Stock: {item.quantity}</p>
              <button onClick={() => addToCart(item)} className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerItemsCard;
