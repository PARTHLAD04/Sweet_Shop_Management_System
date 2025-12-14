import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';
import SweetCard from '../components/SweetCard';

export default function Dashboard() {
    const [sweets, setSweets] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchSweets();
    }, []);

    // Fetch all sweets
    const fetchSweets = async () => {
        const data = await apiRequest('/sweets');
        setSweets(data.response || []);
    };

    // 🔍 UNIVERSAL SEARCH
    const handleSearch = async () => {
        const query = search.trim();

        if (!query) {
            fetchSweets();
            return;
        }

        const data = await apiRequest(`/sweets/search?q=${query}`);
        setSweets(data.response || []);
    };

    // USER PURCHASE
    const purchaseSweet = async (id) => {
        const qty = prompt('Enter quantity to purchase');

        if (!qty || Number(qty) <= 0) {
            return alert('Invalid quantity');
        }

        await apiRequest(`/sweets/${id}/purchase`, {
            method: 'POST',
            body: JSON.stringify({ quantity: Number(qty) }),
        });

        alert('Purchase successful');
        fetchSweets();
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>User Dashboard</h2>

            {/* 🔍 SINGLE SEARCH BAR */}
            <div style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Search by name, category or price"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    style={{
                        width: 280,
                        padding: 8,
                        marginRight: 10,
                    }}
                />

                <button onClick={handleSearch}>Search</button>

                <button
                    onClick={() => {
                        setSearch('');
                        fetchSweets();
                    }}
                    style={{ marginLeft: 5 }}
                >
                    Reset
                </button>
            </div>

            {sweets.length === 0 && <p>No sweets found</p>}

            {/* 🍬 SWEET CARDS */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: 20,
                }}
            >
                {sweets.map((sweet) => (
                    <SweetCard
                        key={sweet._id}
                        sweet={sweet}
                        onPurchase={purchaseSweet}
                    />
                ))}
            </div>
        </div>
    );
}
