import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#222',
        color: '#fff',
      }}
    >
      {/* SHOP NAME */}
      <h2>Sweets Shop 🍬</h2>

      {/* NAV LINKS */}
      <div>
        {token && (
          <Link
            to={role === 'admin' ? '/admin' : '/dashboard'}
            style={{ color: '#fff', marginRight: 15 }}
          >
            Home
          </Link>
        )}

        {!token && (
          <>
            <Link to="/login" style={{ color: '#fff', marginRight: 15 }}>
              Login
            </Link>
            <Link to="/register" style={{ color: '#fff' }}>
              Sign Up
            </Link>
          </>
        )}

        {token && (
          <button
            onClick={handleLogout}
            style={{
              marginLeft: 15,
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
