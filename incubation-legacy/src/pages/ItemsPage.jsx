import { useEffect } from 'react';
import CustomerItemsTable from '../ProductComponents/CustomerItemsTable';
import CustomerItemsCard from '../ProductComponents/CustomerItemsCard';
import Cart from '../CartComponents/Cart';
import '../CSS/ItemsPage.css';
import '../CSS/ItemCard.css';
import useCart from '../CartComponents/UseCart';

const ItemsPage = () => {
    const { items, cart, setItems, addToCart } = useCart();

    useEffect(() => {
        // Fetch items from an API
        fetch('http://localhost:8765/PRODUCT-SERVICE/product/listAll')
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch(error => console.error('Failed to load items', error));
    }, [setItems]);

    return (
        <div className="main-container">
            <div className="cart-container card">
                <Cart cart={cart} setCart={setItems} items={items} setItems={setItems} />
            </div>
            
            <div className="card">
                <CustomerItemsCard items={items} addToCart={addToCart} />
            </div>
        </div>
    );
};

export default ItemsPage;
