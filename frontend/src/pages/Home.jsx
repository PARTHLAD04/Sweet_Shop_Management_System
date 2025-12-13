import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍬 Sweet Shop Management</h1>
      <p style={styles.subtitle}>
        Buy sweets online & manage inventory easily
      </p>

      <div style={styles.buttons}>
        <button style={styles.loginBtn} onClick={() => navigate('/login')}>
          Login
        </button>

        <button style={styles.signupBtn} onClick={() => navigate('/register')}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: '40px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '30px',
  },
  buttons: {
    display: 'flex',
    gap: '20px',
  },
  loginBtn: {
    padding: '10px 25px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  signupBtn: {
    padding: '10px 25px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#1f2937',
    color: '#fff',
  },
};
