export default function SweetCard({
  sweet,
  onPurchase,
  onAddStock,
  onUpdate,
  onDelete,
  isAdmin = false
}) {
  return (
    <div
      style={{
        width: 250,
        borderRadius: 10,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        padding: 15,
        backgroundColor: '#fff',
      }}
    >
      <h3 style={{ marginBottom: 5 }}>{sweet.name}</h3>
      <p style={{ color: '#777' }}>{sweet.category}</p>

      <p><strong>₹{sweet.price}</strong></p>
      <p>Stock: {sweet.quantity}</p>

      {/* USER BUTTON */}
      {!isAdmin && (
        <button
          disabled={sweet.quantity === 0}
          onClick={() => onPurchase(sweet._id)}
          style={{
            width: '100%',
            padding: 8,
            backgroundColor: sweet.quantity === 0 ? '#ccc' : '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer'
          }}
        >
          Purchase
        </button>
      )}

      {/* ADMIN BUTTONS */}
      {isAdmin && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <button onClick={() => onAddStock(sweet._id)}>Add Stock</button>
          <button onClick={() => onUpdate(sweet)}>Update</button>
          <button onClick={() => onDelete(sweet._id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
