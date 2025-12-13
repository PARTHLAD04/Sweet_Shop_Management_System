import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';

export default function Dashboard() {
    const [sweets, setSweets] = useState([]);

    useEffect(() => {
        fetchSweets();
    }, []);

    const fetchSweets = async () => {
        const data = await apiRequest('/sweets');
        setSweets(data.response);
    };

    // USER PURCHASE
    const purchaseSweet = async (id) => {
        const qty = prompt('Enter quantity to purchase');

        if (!qty || qty <= 0) return alert('Invalid quantity');

        await apiRequest(`/sweets/${id}/purchase`, {
            method: 'POST',
            body: JSON.stringify({ quantity: Number(qty) }),
        });

        alert('Purchase successful');
        fetchSweets(); // Refresh the list
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Dashboard</h2>

            {sweets.map((s) => (
                <div
                    key={s._id}
                    style={{
                        border: '1px solid #ccc',
                        padding: 10,
                        marginBottom: 10,
                    }}
                >
                    <h3>{s.name}</h3>
                    <p>Price: ₹{s.price}</p>
                    <p>Stock: {s.quantity}</p>

                    <button
                        disabled={s.quantity === 0}
                        onClick={() => purchaseSweet(s._id)}
                    >
                        Purchase
                    </button>
                </div>
            ))}
        </div>
    );
}
