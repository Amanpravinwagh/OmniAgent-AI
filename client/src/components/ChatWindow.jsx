import React, { useRef, useEffect } from 'react';

export default function ChatWindow({ 
  messages, 
  inputMessage, 
  setInputMessage, 
  selectedFile, 
  setSelectedFile, 
  onSendMessage, 
  loading 
}) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-4 md:p-6 h-[calc(100vh-80px)]">
      {/* CHAT MESSAGES DISPLAY */}
      <div className="flex-1 bg-slate-800/80 rounded-2xl p-4 md:p-6 overflow-y-auto space-y-4 border border-slate-700/80 backdrop-blur-sm shadow-inner">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-lg font-bold text-slate-300 mb-1">OmniAgent Active & Ready</h3>
            <p className="text-sm max-w-md">Try asking: "Search hotels in New York under $200", "Book flight from JFK to LHR on 2026-10-15", or upload a PDF for analysis.</p>
          </div>
        ) : (
          messages.map((m, index) => (
            <div key={index} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                m.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-slate-700/90 text-slate-100 border border-slate-600/50 rounded-bl-none whitespace-pre-wrap'
              }`}>
                <div className="font-semibold text-xs opacity-60 mb-1">
                  {m.sender === 'user' ? 'You' : 'OmniAgent'}
                </div>
                <div>{m.text}</div>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-700/50 text-slate-300 border border-slate-600 px-4 py-3 rounded-2xl text-sm flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
              <span>Agent processing request, running tool actions & syncing history...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT CONTAINER */}
      <form onSubmit={onSendMessage} className="mt-4 bg-slate-800 p-2.5 rounded-2xl border border-slate-700 flex items-center gap-3 shadow-xl">
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
              : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
          }`}
        >
          📎 {selectedFile ? selectedFile.name.slice(0, 12) + '...' : 'Attach PDF'}
        </label>

        <input
          type="text"
          placeholder="Ask anything (hotels, flight booking, e-commerce links, PDF questions)..."
          className="flex-1 bg-transparent text-sm text-slate-100 focus:outline-none px-2"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />

        <button 
          type="submit" 
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}