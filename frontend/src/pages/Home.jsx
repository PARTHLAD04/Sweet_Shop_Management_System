import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-center px-4">
      
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide drop-shadow-md">
        🍬 Sweet Shop Management
      </h1>

      <p className="text-lg md:text-xl mb-12 text-white/90 max-w-xl">
        Buy delicious sweets online and manage inventory effortlessly
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => navigate('/login')}
          className="px-8 py-3 text-lg font-semibold rounded-xl bg-white text-purple-600 shadow-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300"
        >
          Login
        </button>

        <button
          onClick={() => navigate('/register')}
          className="px-8 py-3 text-lg font-semibold rounded-xl bg-purple-700 text-white shadow-lg hover:bg-purple-800 hover:scale-105 transition-all duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
