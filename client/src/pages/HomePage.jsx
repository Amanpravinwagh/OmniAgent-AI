import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between">
      {/* Header Navbar */}
      <header className="border-b border-slate-800/60 bg-[#030712]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-cyan-500/20">
            OA
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            OmniAgent
          </span>
          <span className="text-xs bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 px-2 py-0.5 rounded-full font-medium">
            AI v2.4
          </span>
        </div>

        <nav className="flex items-center space-x-4">
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition"
          >
            Home
          </Link>
          <Link
            to="/chat"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
          >
            Agent Dashboard
          </Link>
          <Link
            to="/login"
            className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-indigo-500/20 transition"
          >
            Login / Register
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 flex flex-col items-center text-center justify-center">
        <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-950/30 px-4 py-1.5 rounded-full text-xs font-medium text-indigo-300 mb-8 backdrop-blur-sm">
          <span>Real-time Tool Orchestration & Multi-Modal Workflows</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-6">
          One Autonomous Agent for <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300">
            Every Complex Real-World Action
          </span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
          Book flight tickets with live arrival/departure parameters, evaluate hotel pricing,
          analyze heavy PDF contracts, automate link shopping carts, and receive instant email
          receipts—all in real time.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/chat"
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl glow-btn transition flex items-center justify-center gap-2"
          >
            Launch OmniAgent Dashboard &rarr;
          </Link>
          <a
            href="#capabilities"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-800/70 text-slate-300 font-semibold rounded-xl transition flex items-center justify-center"
          >
            Read Capabilities
          </a>
        </div>

        <div className="w-full border-t border-slate-800/80 my-20"></div>

        {/* Feature Grid */}
        <section id="capabilities" className="w-full">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">
              Multi-Tool Engine
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              Built for Real-World Automation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center mb-5 text-indigo-400 text-xl">
                  🏨
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Hotel & Flight Booking
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Searches global hotel inventories based on target rates and locks
                  real-time flight reservations with specific departure/arrival dates.
                </p>
              </div>
              <div className="text-xs text-indigo-400 font-medium">
                • Realtime Booking API
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-800/50 flex items-center justify-center mb-5 text-teal-400 text-xl">
                  📄
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  PDF RAG Intelligence
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Upload financial reports, policy guidelines, or invoices. The agent
                  parses vector context and answers targeted questions instantly.
                </p>
              </div>
              <div className="text-xs text-teal-400 font-medium">
                • Document Parsing & Q&A
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center mb-5 text-emerald-400 text-xl">
                  🛒
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Web & Cart Automation
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Provide any product URL or e-commerce link. OmniAgent navigates,
                  extracts attributes, and automatically adds items to cart.
                </p>
              </div>
              <div className="text-xs text-emerald-400 font-medium">
                • Playwright / Puppeteer Script
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-800/50 flex items-center justify-center mb-5 text-sky-400 text-xl">
                  ✉️
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Realtime Email Sync
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Every search result, ticket invoice, and cart confirmation is dispatched
                  straight to your email inbox via Nodemailer.
                </p>
              </div>
              <div className="text-xs text-sky-400 font-medium">
                • Nodemailer SMTP Sync
              </div>
            </div>
          </div>
        </section>

        {/* About Section Box */}
        <section className="w-full mt-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-left">
          <h3 className="text-xl font-bold text-white mb-3">
            About OmniAgent AI Platform
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            OmniAgent AI is an event-driven agentic framework built to bridge the gap between
            conversational AI and transactional business services. Unlike passive chatbots that
            only generate static text, OmniAgent uses specialized function callers to hit live endpoints.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Integrated with MongoDB session tracking, every user conversation, uploaded PDF document
            embedding, and reservation history is preserved across sessions so you never lose context.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} OmniAgent AI Platform. Built with React, Tailwind & Node.js.
      </footer>
    </div>
  );
};

export default Home;