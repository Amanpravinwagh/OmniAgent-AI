import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 1. Standard Sign In Handler
  const handleStandardLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  // 2. Direct Redirect to Google Login Page
  const handleGoogleRedirect = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`);
    const scope = encodeURIComponent('openid profile email');
    
    // Redirects browser directly to Google Sign-In UI
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=select_account`;
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center px-4 font-sans text-slate-100">
      <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-2xl">
        {/* Title Section matching UI image 1 */}
        <h2 className="mb-1 text-3xl font-extrabold text-white">Sign in</h2>
        <p className="mb-6 text-sm text-slate-400">
          Welcome back! Please sign in with your email address and password or Google account.
        </p>

        {error && (
          <div className="mb-4 text-xs bg-red-950/60 border border-red-800 text-red-300 p-2.5 rounded-lg">
            {error}
          </div>
        )}

        {/* Input Form matching UI image 1 */}
        <form onSubmit={handleStandardLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1e293b]/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1e293b]/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2d3748] hover:bg-[#3a475c] text-slate-200 font-medium rounded-lg text-sm transition"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <span className="relative text-xs text-slate-400 bg-[#111827] px-3">or</span>
        </div>

        {/* Continue with Google Button matching image 2 */}
        <button
          type="button"
          onClick={handleGoogleRedirect}
          className="flex items-center justify-center w-full gap-3 py-3 text-sm font-medium transition bg-transparent border border-slate-700/80 hover:bg-slate-800/40 text-slate-200 rounded-xl"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-xs text-center text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;