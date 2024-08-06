import React, { useEffect, useState } from 'react';
import CustomerItemsTable from '../ProductComponents/CustomerItemsTable';
import Cart from '../CartComponents/Cart';
import AddNewItem from '../ProductComponents/AddNewItem';
import AdminItemsTable from '../ProductComponents/AdminItemsTable';

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Fetch items from an API
        fetch('/api/items')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Failed to load items', error));
    }, []);

    return (
        <div>
            <h1>Items</h1>
            <CustomerItemsTable items={items} />
            <AdminItemsTable items={items} setItems={setItems} />
            <Cart cart={cart} />
            <AddNewItem items={items} setItems={setItems} />
        </div>
    );
};

export default ItemsPage;
