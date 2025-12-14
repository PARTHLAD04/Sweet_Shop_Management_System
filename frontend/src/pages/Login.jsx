import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/api';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const data = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            // Save token
            localStorage.setItem('token', data.token);

            alert('Login successful');
            if (data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                    Login
                </h2>

                <div className="space-y-5">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Login
                    </button>
                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Don’t have an account?{' '}
                    <span
                        onClick={() => navigate('/register')}
                        className="text-purple-600 font-medium cursor-pointer hover:underline"
                    >
                        Sign Up
                    </span>
                </p>

            </div>
        </div>
    );
}
