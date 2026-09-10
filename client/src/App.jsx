import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { loginUser, registerUser, sendChatMessage } from './services/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [view, setView] = useState('home'); // 'home' | 'auth' | 'chat'
  
  // Auth Form State
  const [isLogin, setIsLogin] = useState(true);
  const [authData, setAuthData] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Chat State (Transient memory only, not stored in DB)
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Google Login via @react-oauth/google hook
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/google', {
          code: codeResponse.code,
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.token);
        setUser(res.data.user);
        setView('chat');
      } catch (err) {
        console.error('Google Auth Handler Error:', err);
        setAuthError(err.response?.data?.message || 'Google authentication failed. Please try again.');
      }
    },
    onError: (errorResponse) => {
      console.error('Google Login Error:', errorResponse);
      setAuthError('Google login popup failed or was closed.');
    },
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = isLogin
        ? await loginUser({ email: authData.email, password: authData.password })
        : await registerUser(authData);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToken(res.data.token);
      setUser(res.data.user);
      setView('chat');
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Authentication failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
    setMessages([]);
    setView('home');
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !selectedFile) return;

    const userText = inputMessage;
    const fileToUpload = selectedFile;

    // Optimistic Update
    const userMsg = {
      sender: 'user',
      text: userText + (fileToUpload ? ` [Attached: ${fileToUpload.name}]` : ''),
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setSelectedFile(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('message', userText);
    if (fileToUpload) {
      formData.append('pdf', fileToUpload);
    }

    try {
      const res = await sendChatMessage(formData);
      
      // Extract response text or fallback to server output
      const botResponseText = res.data.reply || res.data.message || 'Query processed successfully.';
      
      setMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: botResponseText, timestamp: new Date() }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: 'Error executing your request. Please try again.', timestamp: new Date() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#111827]/80 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <div 
          className="text-2xl font-black text-transparent cursor-pointer bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text"
          onClick={() => setView('home')}
        >
          OmniAgent AI
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => setView('home')} className="font-medium transition hover:text-indigo-400">Home</button>
          <a href="#about" onClick={() => setView('home')} className="font-medium transition hover:text-indigo-400">About</a>
          {token ? (
            <>
              <button onClick={() => setView('chat')} className="font-medium transition hover:text-indigo-400">Agent Console</button>
              <div className="flex items-center gap-3 px-3 py-1.5 border rounded-lg bg-slate-800/80 border-slate-700">
                <span className="text-sm font-semibold text-indigo-300">{user?.name}</span>
                <button onClick={handleLogout} className="px-3 py-1 text-xs font-bold transition rounded bg-red-500/80 hover:bg-red-600">Logout</button>
              </div>
            </>
          ) : (
            <button 
              onClick={() => { setView('auth'); setIsLogin(true); }}
              className="px-5 py-2 text-sm font-bold transition bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 shadow-indigo-600/30"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* VIEW 1: HOME PAGE */}
      {view === 'home' && (
        <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
          <div className="max-w-4xl space-y-6">
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              Autonomous Realtime AI Workflows
            </span>
            <h1 className="text-5xl font-black leading-tight tracking-tight text-transparent md:text-6xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text">
              One Agent for Travel, Document Analysis & Web Actions
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-400 md:text-xl">
              Execute live flight bookings, find real-time hotel rates, process multi-page PDFs, and automate web actions with instant email notifications.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <button 
                onClick={() => setView(token ? 'chat' : 'auth')}
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-indigo-600/30 transition"
              >
                {token ? 'Launch AI Console' : 'Get Started Free'}
              </button>
            </div>
          </div>

          {/* ABOUT SECTION */}
          <div id="about" className="grid w-full max-w-5xl grid-cols-1 gap-8 mt-24 text-left md:grid-cols-3">
            <div className="p-6 transition border bg-slate-800/40 rounded-2xl border-slate-800 hover:border-indigo-500/50">
              <div className="mb-3 text-3xl">✈️</div>
              <h3 className="mb-2 text-xl font-bold text-indigo-400">Real-Time Travel Booking</h3>
              <p className="text-sm text-slate-400">Search hotels with budget constraints, reserve flights by departure/arrival dates, and receive automated email receipts in real time.</p>
            </div>
            <div className="p-6 transition border bg-slate-800/40 rounded-2xl border-slate-800 hover:border-indigo-500/50">
              <div className="mb-3 text-3xl">📄</div>
              <h3 className="mb-2 text-xl font-bold text-indigo-400">PDF RAG Analytics</h3>
              <p className="text-sm text-slate-400">Upload PDF documents directly into the chat. The agent extracts, embeds, and answers exact questions grounded in document context.</p>
            </div>
            <div className="p-6 transition border bg-slate-800/40 rounded-2xl border-slate-800 hover:border-indigo-500/50">
              <div className="mb-3 text-3xl">🛒</div>
              <h3 className="mb-2 text-xl font-bold text-indigo-400">E-Commerce Automation</h3>
              <p className="text-sm text-slate-400">Provide product URLs and let Playwright automate web actions like adding items directly to carts or extracting live pricing.</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: AUTHENTICATION */}
      {view === 'auth' && (
        <div className="flex items-center justify-center flex-1 p-6">
          <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-2xl text-left">
            <h2 className="mb-1 text-3xl font-extrabold text-white">
              {isLogin ? 'Sign in' : 'Create Account'}
            </h2>
            <p className="mb-6 text-sm text-slate-400">
              {isLogin 
                ? 'Welcome back! Please sign in with your email address and password or Google account.' 
                : 'Start executing autonomous workflows today.'}
            </p>

            {authError && (
              <div className="mb-4 text-xs bg-red-950/60 border border-red-800 text-red-300 p-2.5 rounded-lg">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full bg-[#1e293b]/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
                    value={authData.name}
                    onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
                  />
                </div>
              )}
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full bg-[#1e293b]/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
                  value={authData.email}
                  onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full bg-[#1e293b]/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
                  value={authData.password}
                  onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                />
              </div>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-[#2d3748] hover:bg-[#3a475c] text-slate-200 font-medium rounded-lg text-sm transition"
              >
                {isLogin ? 'Sign in' : 'Register'}
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <span className="relative text-xs text-slate-400 bg-[#111827] px-3">or</span>
            </div>

            <button
              type="button"
              onClick={() => googleLogin()}
              className="flex items-center justify-center w-full gap-3 py-3 text-sm font-medium transition bg-transparent border cursor-pointer border-slate-700/80 hover:bg-slate-800/40 text-slate-200 rounded-xl"
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

            <div className="mt-6 text-center">
              <button 
                onClick={() => { setIsLogin(!isLogin); setAuthError(''); }}
                className="text-xs text-indigo-400 hover:underline"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: CHAT / AGENT DASHBOARD */}
      {view === 'chat' && (
        <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-4 md:p-6 h-[calc(100vh-80px)]">
          <div className="flex-1 bg-[#111827]/90 rounded-2xl p-4 md:p-6 overflow-y-auto space-y-4 border border-slate-800 backdrop-blur-sm shadow-inner">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-500">
                <div className="mb-3 text-4xl">🤖</div>
                <h3 className="mb-1 text-lg font-bold text-slate-300">OmniAgent Active & Ready</h3>
                <p className="max-w-md text-sm">Try asking: "Search laptops under 1 Lakh on Amazon", "Book flight from JFK to LHR", or upload a PDF for analysis.</p>
              </div>
            ) : (
              messages.map((m, index) => (
                <div key={index} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-2xl px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                    m.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-100 border border-slate-700/80 rounded-bl-none whitespace-pre-wrap'
                  }`}>
                    <div className="mb-1 text-xs font-semibold opacity-60">
                      {m.sender === 'user' ? 'You' : 'OmniAgent'}
                    </div>
                    <div>{m.text}</div>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3 px-4 py-3 text-sm border bg-slate-800/80 text-slate-300 border-slate-700 rounded-2xl">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
                  <span>Agent processing request...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="mt-4 bg-[#111827] p-2.5 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-xl">
            <input
              type="file"
              accept="application/pdf"
              id="pdf-input"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0] || null)}
            />
            <label 
              htmlFor="pdf-input" 
              className={`cursor-pointer px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
                selectedFile 
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' 
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              📎 {selectedFile ? selectedFile.name.slice(0, 12) + '...' : 'Attach PDF'}
            </label>

            <input
              type="text"
              placeholder="Ask anything (hotels, flight booking, e-commerce links, PDF questions)..."
              className="flex-1 px-2 text-sm bg-transparent text-slate-100 focus:outline-none"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />

            {/* Clear Chat Button */}
            {messages.length > 0 && (
              <button 
                type="button" 
                onClick={handleClearHistory}
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition"
              >
                Clear
              </button>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2.5 text-sm font-bold transition bg-indigo-600 shadow-md hover:bg-indigo-700 disabled:opacity-50 rounded-xl text-white"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}