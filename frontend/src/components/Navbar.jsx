import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🍬 Sweet Shop</h2>
      <div style={styles.links}>
        {token ? (
          <>
            <Link style={styles.link} to="/dashboard">Dashboard</Link>
            {role === 'admin' && <Link style={styles.link} to="/add-sweet">Add Sweet</Link>}
            <button style={styles.button} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#1e293b', color: '#fff' },
  logo: { margin: 0 },
  links: { display: 'flex', gap: '15px', alignItems: 'center' },
  link: { color: '#fff', textDecoration: 'none' },
  button: { padding: '5px 10px', cursor: 'pointer' }
};
