import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Leaf, Mail, Globe } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/onboarding');
    }
  };

  const handleGuest = () => {
    login('guest@ecosphere.app');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-700 flex flex-col items-center justify-center p-6 text-white max-w-lg mx-auto">
      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl animate-bounce">
        <Leaf size={48} className="text-emerald-600" />
      </div>
      
      <h1 className="text-4xl font-bold mb-2">EcoSphere</h1>
      <p className="text-emerald-100 text-center mb-10 max-w-xs">
        Join the movement. Save the planet, one action at a time.
      </p>

      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input 
            type="email"
            placeholder="Enter your email"
            className="w-full bg-white text-gray-800 py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 shadow-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
        >
          Sign In
        </button>
      </form>

      <div className="my-6 flex items-center w-full">
        <div className="h-px bg-emerald-400 flex-1"></div>
        <span className="px-3 text-emerald-200 text-sm">OR</span>
        <div className="h-px bg-emerald-400 flex-1"></div>
      </div>

      <button 
        onClick={handleLogin}
        className="w-full bg-white text-gray-700 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-md active:scale-95 mb-4"
      >
        <Globe size={20} className="text-blue-500" />
        Continue with Google
      </button>

      <button 
        onClick={handleGuest}
        className="text-emerald-100 hover:text-white text-sm font-medium underline underline-offset-4"
      >
        Continue as Guest (View Only)
      </button>
    </div>
  );
};

export default Login;