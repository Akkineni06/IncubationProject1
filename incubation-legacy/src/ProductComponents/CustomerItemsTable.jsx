
const CustomerItemsTable = ({ items, addToCart }) => {
  return (
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
        {items.map(item => {
          console.log('Item:', item);
          console.log('Item Price Type:', typeof item.price);
          const price = parseFloat(item.price).toFixed(2); // Ensure price is a float with two decimal places
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>£{price}</td>
              <td>{item.inStock}</td>
              <td>
                <button onClick={() => addToCart(item)} className="add-to-cart-button">Add to Cart</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerItemsTable;
