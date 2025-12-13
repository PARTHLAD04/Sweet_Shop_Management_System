import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
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
    if (!form.name || !form.category || !form.price || !form.quantity) {
      return alert('All fields are required');
    }

    await apiRequest('/sweets', {
      method: 'POST',
      body: JSON.stringify({
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
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
      <h2>Admin Panel</h2>

      {/* CREATE FORM */}
      <div style={{ marginBottom: 20 }}>
        <h3>Add Sweet</h3>
        <input
          name="name"
          placeholder="Name"
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
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <button onClick={createSweet}>Add Sweet</button>
      </div>

      {/* SWEETS LIST */}
      {sweets.map((s) => (
        <div
          key={s._id}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h4>{s.name}</h4>
          <p>Category: {s.category}</p>
          <p>Price: ₹{s.price}</p>
          <p>Stock: {s.quantity}</p>

          <button onClick={() => updateSweet(s)}>Update</button>
          <button onClick={() => deleteSweet(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
