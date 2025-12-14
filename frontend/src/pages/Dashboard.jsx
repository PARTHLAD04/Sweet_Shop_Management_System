import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';

export default function Dashboard() {
    const [sweets, setSweets] = useState([]);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        fetchSweets();
    }, []);

    // Fetch all sweets
    const fetchSweets = async () => {
        const data = await apiRequest('/sweets');
        setSweets(data.response);
    };

    // 🔍 Advanced Search
    const handleSearch = async () => {
        const params = new URLSearchParams();

        if (name) params.append('name', name);
        if (category) params.append('category', category);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);

        const data = await apiRequest(`/sweets/search?${params.toString()}`);
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
        fetchSweets();
    };

    // Reset filters
    const resetFilters = () => {
        setName('');
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        fetchSweets();
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Dashboard</h2>

            {/* 🔍 SEARCH & FILTERS */}
            <div style={{ marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
                <input
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />

                <button onClick={handleSearch}>Search</button>
                <button onClick={resetFilters} style={{ marginLeft: 5 }}>
                    Reset
                </button>
            </div>

            {sweets.length === 0 && <p>No sweets found</p>}

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
                    <p>Category: {s.category}</p>
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
