import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';
import SweetCard from '../components/SweetCard';

export default function Admin() {
    const [sweets, setSweets] = useState([]);
    const [form, setForm] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
    });

    useEffect(() => {
        fetchSweets();
    }, []);

    // Fetch all sweets
    const fetchSweets = async () => {
        const data = await apiRequest('/sweets');
        setSweets(data.response);
    };

    // Handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // CREATE Sweet
    const createSweet = async () => {
        const { name, category, price, quantity } = form;

        if (!name || !category || !price || !quantity) {
            return alert('All fields are required');
        }

        await apiRequest('/sweets', {
            method: 'POST',
            body: JSON.stringify({
                name,
                category,
                price: Number(price),
                quantity: Number(quantity),
            }),
        });

        alert('Sweet created successfully');
        setForm({ name: '', category: '', price: '', quantity: '' });
        fetchSweets();
    };

    // UPDATE Sweet
    const updateSweet = async (sweet) => {
        const name = prompt('Enter name', sweet.name);
        const category = prompt('Enter category', sweet.category);
        const price = prompt('Enter price', sweet.price);
        const quantity = prompt('Enter quantity', sweet.quantity);

        if (!name || !category || !price || !quantity) return;

        await apiRequest(`/sweets/${sweet._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                category,
                price: Number(price),
                quantity: Number(quantity),
            }),
        });

        alert('Sweet updated successfully');
        fetchSweets();
    };

    // DELETE Sweet
    const deleteSweet = async (id) => {
        if (!window.confirm('Are you sure you want to delete this sweet?')) return;

        await apiRequest(`/sweets/${id}`, {
            method: 'DELETE',
        });

        alert('Sweet deleted successfully');
        fetchSweets();
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Admin Dashboard</h2>

            {/* CREATE SWEET FORM */}
            <div
                style={{
                    marginBottom: 30,
                    padding: 15,
                    borderRadius: 8,
                    background: '#f5f5f5',
                    maxWidth: 500,
                }}
            >
                <h3>Add New Sweet</h3>

                <input
                    name="name"
                    placeholder="Sweet Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={handleChange}
                />

                <button onClick={createSweet} style={{ marginTop: 10 }}>
                    Create Sweet
                </button>
            </div>

            {/* SWEET CARDS */}
            {sweets.length === 0 && <p>No sweets available</p>}

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
                        isAdmin={true}
                        onUpdate={() => updateSweet(sweet)}
                        onDelete={() => deleteSweet(sweet._id)}
                    />
                ))}
            </div>
        </div>
    );
}
