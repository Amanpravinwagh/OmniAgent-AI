import React, { useState } from 'react';

export default function AuthModal({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Calls parent handler with formData and login flag
    onAuthSuccess(formData, isLogin, setError);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-extrabold mb-2 text-center">{isLogin ? 'Sign In' : 'Create Account'}</h2>
        <p className="text-slate-400 text-sm text-center mb-6">
          {isLogin ? 'Access your AI session history' : 'Start executing autonomous workflows today'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/30 transition mt-2"
          >
            {isLogin ? 'Sign In' : 'Register Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-indigo-400 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}