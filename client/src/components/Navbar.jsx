import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="border-b border-slate-800/80 bg-[#0f172a]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* Brand Title with Logo on the Right */}
        <Link to="/" className="flex items-center space-x-3 group">
          {/* Title First */}
          <span className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300">
            OmniAgent AI
          </span>

          {/* Logo Badge on Right */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-cyan-400 to-teal-300 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-cyan-500/30 transition">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                OA
              </span>
            </div>
          </div>
        </Link>

        {/* Navigation Links & User Profile */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="transition text-slate-300 hover:text-white">
            Home
          </Link>
          <Link to="/about" className="transition text-slate-300 hover:text-white">
            About
          </Link>
          <Link to="/chat" className="transition text-slate-300 hover:text-white">
            Agent Console
          </Link>

          {user ? (
            <div className="flex items-center pl-4 space-x-3 border-l border-slate-700/60">
              <span className="text-sm font-semibold text-indigo-300">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600/80 hover:bg-red-600 rounded-lg shadow transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-semibold text-white transition bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;