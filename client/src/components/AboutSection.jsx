import React from 'react';

export default function AboutSection() {
  return (
    <div id="about" className="mt-24 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 hover:border-indigo-500/50 transition">
        <div className="text-3xl mb-3">✈️</div>
        <h3 className="text-xl font-bold mb-2 text-indigo-400">Real-Time Travel Booking</h3>
        <p className="text-sm text-slate-400">
          Search hotels with budget constraints, reserve flights by departure/arrival dates, and receive automated email receipts in real time.
        </p>
      </div>
      <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 hover:border-indigo-500/50 transition">
        <div className="text-3xl mb-3">📄</div>
        <h3 className="text-xl font-bold mb-2 text-indigo-400">PDF RAG Analytics</h3>
        <p className="text-sm text-slate-400">
          Upload PDF documents directly into the chat. The agent extracts, embeds, and answers exact questions grounded in document context.
        </p>
      </div>
      <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 hover:border-indigo-500/50 transition">
        <div className="text-3xl mb-3">🛒</div>
        <h3 className="text-xl font-bold mb-2 text-indigo-400">E-Commerce Automation</h3>
        <p className="text-sm text-slate-400">
          Provide product URLs and let Playwright automate web actions like adding items directly to carts or extracting live pricing.
        </p>
      </div>
    </div>
  );
}