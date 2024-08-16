import { useEffect, useState } from 'react';
import AddNewItem from '../ProductComponents/AddNewItem';
import AdminItemsTable from '../ProductComponents/AdminItemsTable';
import '../CSS/ItemsPage.css';
import '../CSS/AdminItemsTable.css';
import '../CSS/AddNewItem.css';

const AdminPage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/items')
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch(error => console.error('Failed to load items', error));
    }, []);

    return (
        <div className="main-container">
            <div className="card">
                <AdminItemsTable items={items} setItems={setItems} />
            </div>
            <div className="card">
                <AddNewItem items={items} setItems={setItems} />
            </div>
        </div>
    );
};

export default AdminPage;
