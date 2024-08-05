
const AdminItemsTable = ({ items, addToCart }) => {
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
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.inStock}</td>
            <td>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminItemsTable;
