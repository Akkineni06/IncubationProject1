import React, { useEffect, useState } from 'react';
import CustomerItemsTable from '../ProductComponents/CustomerItemsTable';
import Cart from '../CartComponents/Cart';
import AddNewItem from '../ProductComponents/AddNewItem';
import AdminItemsTable from '../ProductComponents/AdminItemsTable';
import '../CSS/ItemsPage.css';


const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Fetch items from an API
        fetch('http://localhost:8765/PRODUCT-SERVICE/product/listAll')
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
                <CustomerItemsTable items={items} />
            </div>
            <div className="card">
                <AdminItemsTable items={items} setItems={setItems} />
            </div>
            <AddNewItem items={items} setItems={setItems} />
        </div>
    );
};

export default ItemsPage;