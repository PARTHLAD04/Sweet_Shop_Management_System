import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/api';

export default function Register() {
    const navigate = useNavigate();
    // Form state
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle Registration
    const handleRegister = async () => {
        try {
            const data = await apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify(form),
            });

            // Save token and role
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.response.role);

            alert('Registration successful');
            if (data.response.role === 'admin') {
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
                    Sign Up
                </h2>

                <div className="space-y-5">

                    <input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    {/* Role Selector */}
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        onClick={handleRegister}
                        className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Register
                    </button>
                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/login')}
                        className="text-purple-600 font-medium cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}
