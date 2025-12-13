import { apiRequest } from '../api/api';

export default function SweetCard({ sweet, refreshSweets, isAdmin }) {
  const handlePurchase = async () => {
    await apiRequest(`/sweets/${sweet._id}/purchase`, { method: 'POST', body: JSON.stringify({ quantity: 1 }) });
    alert('Purchased!');
    refreshSweets();
  };

  const handleDelete = async () => {
    await apiRequest(`/sweets/${sweet._id}`, { method: 'DELETE' });
    refreshSweets();
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, margin: 10 }}>
      <h3>{sweet.name}</h3>
      <p>Price: ₹{sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>

      <button onClick={handlePurchase} disabled={sweet.quantity === 0}>Purchase</button>

      {isAdmin && (
        <>
          <button onClick={handleDelete} style={{ marginLeft: 10 }}>Delete</button>
        </>
      )}
    </div>
  );
}
