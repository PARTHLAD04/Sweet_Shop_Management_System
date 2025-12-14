import { useState } from 'react';

export default function SweetCard({
  sweet,
  onPurchase,
  onAddStock,
  onUpdate,
  onDelete,
  isAdmin = false,
}) {
  const [showStockModal, setShowStockModal] = useState(false);
  const [newStock, setNewStock] = useState(sweet.quantity);

  // Handle Stock Update
  const handleStockUpdate = () => {
    if (!newStock || Number(newStock) < sweet.quantity)
      return alert('Enter a quantity greater than current stock');
    onAddStock && onAddStock(sweet._id, Number(newStock));
    setShowStockModal(false);
  };

  return (
    <>
      <div className="w-full max-w-xs bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition relative">
        {/* TITLE */}
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{sweet.name}</h3>

        {/* CATEGORY */}
        <p className="text-sm text-gray-500 mb-2">{sweet.category}</p>

        {/* PRICE */}
        <p className="text-lg font-bold text-purple-600 mb-1">₹{sweet.price}</p>

        {/* STOCK */}
        <p className="text-sm text-gray-700 mb-4">
          Stock:{' '}
          <span className={`font-semibold ${sweet.quantity === 0 ? 'text-red-500' : 'text-green-600'}`}>
            {sweet.quantity}
          </span>
        </p>

        {/* USER BUTTON */}
        {!isAdmin && onPurchase && (
          <button
            disabled={sweet.quantity === 0}
            onClick={() => onPurchase(sweet)}
            className={`w-full py-2 rounded-lg text-white font-medium transition ${
              sweet.quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
          </button>
        )}

        {/* ADMIN BUTTONS */}
        {isAdmin && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => { setNewStock(sweet.quantity); setShowStockModal(true); }}
              className="py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Stock
            </button>

            <button
              onClick={() => onUpdate && onUpdate(sweet)}
              className="py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Update
            </button>

            <button
              onClick={() => onDelete && onDelete(sweet._id)}
              className="py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* ADD STOCK MODAL */}
      {showStockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Add Stock</h3>
            <div className="flex flex-col gap-3">
              <p className="text-gray-700">
                Current Stock: <span className="font-semibold">{sweet.quantity}</span>
              </p>
              <input
                type="number"
                value={newStock}
                min={sweet.quantity}
                onChange={(e) => setNewStock(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter new stock quantity"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowStockModal(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleStockUpdate}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
