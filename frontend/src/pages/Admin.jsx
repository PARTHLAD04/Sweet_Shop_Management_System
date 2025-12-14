import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';
import SweetCard from '../components/SweetCard';

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });

  // Current sweet being updated or restocked
  const [currentSweetId, setCurrentSweetId] = useState(null);
  const [currentStock, setCurrentStock] = useState(0);

  useEffect(() => {
    fetchSweets();
  }, []);

  // Fetch all sweets
  const fetchSweets = async () => {
    const data = await apiRequest('/sweets');
    setSweets(data.response || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE Sweet
  const createSweet = async () => {
    const { name, category, price, quantity } = form;
    if (!name || !category || !price || !quantity)
      return alert('All fields are required');

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
    setShowAddModal(false);
    fetchSweets();
  };

  // UPDATE Sweet
  const openUpdateModal = (sweet) => {
    setCurrentSweetId(sweet._id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
    setShowUpdateModal(true);
  };

  const updateSweet = async () => {
    const { name, category, price, quantity } = form;
    if (!name || !category || !price || !quantity)
      return alert('All fields are required');

    await apiRequest(`/sweets/${currentSweetId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
      }),
    });

    alert('Sweet updated successfully');
    setForm({ name: '', category: '', price: '', quantity: '' });
    setShowUpdateModal(false);
    fetchSweets();
  };

  // DELETE Sweet
  const deleteSweet = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;

    await apiRequest(`/sweets/${id}`, { method: 'DELETE' });
    alert('Sweet deleted successfully');
    fetchSweets();
  };

  // ADD STOCK
  const openStockModal = (sweet) => {
    setCurrentSweetId(sweet._id);
    setCurrentStock(sweet.quantity);
    setForm({ quantity: sweet.quantity }); // prefill current stock
    setShowStockModal(true);
  };

  const addStock = async () => {
    const { quantity } = form;
    if (!quantity || Number(quantity) <= currentStock)
      return alert('Enter a quantity greater than current stock');

    await apiRequest(`/sweets/${currentSweetId}/restock`, {
      method: 'POST',
      body: JSON.stringify({ quantity: Number(quantity) }),
    });

    alert('Stock updated successfully');
    setForm({ quantity: '' });
    setShowStockModal(false);
    fetchSweets();
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-lg shadow"
        >
          + Add New Sweet
        </button>
      </div>

      {/* SWEETS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            isAdmin={true}
            onUpdate={() => openUpdateModal(sweet)}
            onDelete={() => deleteSweet(sweet._id)}
            onAddStock={() => openStockModal(sweet)}
          />
        ))}
      </div>

      {/* ADD SWEET MODAL */}
      {showAddModal && (
        <Modal
          title="Add New Sweet"
          onClose={() => {
            setForm({ name: '', category: '', price: '', quantity: '' });
            setShowAddModal(false);
          }}
        >
          <SweetForm
            form={form}
            handleChange={handleChange}
            onSubmit={createSweet}
            onCancel={() => {
              setForm({ name: '', category: '', price: '', quantity: '' });
              setShowAddModal(false);
            }}
          />
        </Modal>
      )}

      {/* UPDATE SWEET MODAL */}
      {showUpdateModal && (
        <Modal
          title="Update Sweet"
          onClose={() => {
            setForm({ name: '', category: '', price: '', quantity: '' });
            setShowUpdateModal(false);
          }}
        >
          <SweetForm
            form={form}
            handleChange={handleChange}
            onSubmit={updateSweet}
            onCancel={() => {
              setForm({ name: '', category: '', price: '', quantity: '' });
              setShowUpdateModal(false);
            }}
          />
        </Modal>
      )}

      {/* ADD STOCK MODAL */}
      {showStockModal && (
        <Modal
          title="Add Stock"
          onClose={() => setShowStockModal(false)}
        >
          <div className="flex flex-col gap-3">
            <p className="text-gray-700">
              Current Stock: <span className="font-semibold">{currentStock}</span>
            </p>
            <input
              type="number"
              name="quantity"
              placeholder="Enter new stock quantity"
              value={form.quantity}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => setShowStockModal(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={addStock}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Update Stock
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Reusable Modal component
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fadeIn">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">{title}</h3>
        {children}
      </div>
    </div>
  );
}

// Reusable Sweet Form for Add/Update
function SweetForm({ form, handleChange, onSubmit, onCancel }) {
  return (
    <div className="flex flex-col gap-3">
      <input
        name="name"
        placeholder="Sweet Name"
        value={form.name}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
      />
      <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  );
}
