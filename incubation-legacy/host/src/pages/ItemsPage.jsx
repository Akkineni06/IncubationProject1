import React, { useEffect, useState } from 'react';
import AddNewItem from '../ProductComponents/AddNewItem';
import AdminItemsTable from '../ProductComponents/AdminItemsTable';
import ItemCard from '../ProductComponents/ItemCard'; 
import '../CSS/Host.css';
import Cart from 'CartModule/Cart';


const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Fetch items via API
        fetch('/api/items')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Failed to load items', error));
    }, []);

    const addToCart = (item) => {
        console.log('Adding to cart:', item);
        // Implement adding to cart logic /update the cart / API call
    };

    return (
        <div className="main-container">
            <div className="cart-container card">
                <Cart cart={cart} />
            </div>
            
            {/* Render Item Cards directly */}
            {items.map(item => (
                <ItemCard key={item.id} item={item} addToCart={addToCart} />
            ))}

            <div className="card">
                <AdminItemsTable items={items} setItems={setItems} />
            </div>
            <AddNewItem items={items} setItems={setItems} />

            <div><Cart /></div>
        </div>
    );
};

export default ItemsPage;
