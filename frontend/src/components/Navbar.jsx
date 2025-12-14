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
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      {/* 🍬 SHOP NAME */}
      <h2 className="text-2xl font-bold tracking-wide text-yellow-400">
        Sweet Shop 🍬
      </h2>

      {/* NAV LINKS */}
      <div className="flex items-center gap-5">
        
        {token && (
          <Link
            to={role === 'admin' ? '/admin' : '/dashboard'}
            className="hover:text-yellow-400 transition font-medium"
          >
            Home
          </Link>
        )}

        {!token && (
          <>
            <Link
              to="/login"
              className="hover:text-yellow-400 transition font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Sign Up
            </Link>
          </>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1.5 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
