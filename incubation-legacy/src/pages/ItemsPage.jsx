import { useEffect } from 'react';
import CustomerItemsCard from '../ProductComponents/CustomerItemsCard';
import Cart from '../CartComponents/Cart';
import '../CSS/ItemsPage.css';
import '../CSS/ItemCard.css';
import useCart from '../CartComponents/UseCart';

const ItemsPage = () => {
    const { items, cart, setItems, addToCart, setCart } = useCart();

    useEffect(() => {
        fetch('http://localhost:5000/items')
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch(error => console.error('Failed to load items', error));
    }, [setItems]);

    return (
        <div className="main-container">
            <div className="cart-container card">
                <Cart cart={cart} setCart={setCart} items={items} setItems={setItems} />
            </div>
            
            <div className="card">
                <CustomerItemsCard items={items} setItems={setItems} addToCart={addToCart} />
            </div>
        </div>
    );
};

export default ItemsPage;
