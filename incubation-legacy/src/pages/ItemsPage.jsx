import { useEffect, useState } from 'react';
import CustomerItemsTable from '../ProductComponents/CustomerItemsTable';
import CustomerItemsCard from '../ProductComponents/CustomerItemsCard';
import Cart from '../CartComponents/Cart';
import '../CSS/ItemsPage.css';
import '../CSS/ItemCard.css';


const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Fetch items from an API
        fetch('/items.json')
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch(error => console.error('Failed to load items', error));
    }, []);

    return (
        <div className="main-container">
            <div className="cart-container card">
                <Cart cart={cart} />
            </div>
            
            <div className="card">
                <CustomerItemsCard items={items} />
            </div>
        </div>
    );
};

export default ItemsPage;