const CustomerItemsCard = ({ items, addToCart }) => {
    return (
      <div className="item-cards-container">
        {items.map(item => {
          const price = parseFloat(item.price).toFixed(2); // Ensure price is a float with two decimal places
          return (
            <div className="item-card" key={item.id}>
              <div className="item-card-content">
                <h3>{item.name}</h3>
                <p>Price: £{price}</p>
                <p>In Stock: {item.inStock}</p>
                <button onClick={() => addToCart(item)} className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default CustomerItemsCard;
  