import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';
import SweetCard from '../components/SweetCard';

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [currentSweetId, setCurrentSweetId] = useState(null);
  const [purchaseQty, setPurchaseQty] = useState(1);

  useEffect(() => {
    fetchSweets();
  }, []);

  // Fetch all sweets
  const fetchSweets = async () => {
    const data = await apiRequest('/sweets');
    setSweets(data.response || []);
  };

  // 🔍 Search
  const handleSearch = async () => {
    const query = search.trim();
    if (!query) {
      fetchSweets();
      return;
    }
    const data = await apiRequest(`/sweets/search?q=${query}`);
    setSweets(data.response || []);
  };

  // Open Purchase Modal
  const openPurchaseModal = (sweet) => {
    setCurrentSweetId(sweet._id);
    setPurchaseQty(1);
    setShowPurchaseModal(true);
  };

  // Handle Purchase
  const handlePurchase = async () => {
    if (!purchaseQty || purchaseQty <= 0) return alert('Enter a valid quantity');

    await apiRequest(`/sweets/${currentSweetId}/purchase`, {
      method: 'POST',
      body: JSON.stringify({ quantity: Number(purchaseQty) }),
    });

    alert('Purchase successful!');
    setShowPurchaseModal(false);
    fetchSweets();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🍬 User Dashboard</h2>

      {/* SEARCH BAR */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by name, category or price"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Search
        </button>
        <button
          onClick={() => { setSearch(''); fetchSweets(); }}
          className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>

      {/* EMPTY STATE */}
      {sweets.length === 0 && (
        <p className="text-gray-500 text-center mt-10">No sweets found 🍭</p>
      )}

      {/* SWEETS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            onPurchase={openPurchaseModal}
          />
        ))}
      </div>

      {/* PURCHASE MODAL */}
      {showPurchaseModal && (
        <Modal title="Purchase Sweet" onClose={() => setShowPurchaseModal(false)}>
          <div className="flex flex-col gap-3">
            <input
              type="number"
              min="1"
              value={purchaseQty}
              onChange={(e) => setPurchaseQty(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter quantity"
            />
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Purchase
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Reusable Modal Component
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
