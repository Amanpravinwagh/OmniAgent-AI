const User = require('../models/User');
const pdfParse = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getUserId = (req) => {
  return req.userId || (req.user && (req.user.id || req.user._id));
};

exports.handleMessage = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }

    const { message = '', history = [] } = req.body;
    let pdfContext = '';

    // 1. Safe PDF Parsing
    if (req.file) {
      try {
        const originalWarn = console.warn;
        console.warn = () => {};

        const parse = typeof pdfParse === 'function' ? pdfParse : pdfParse.default;
        const pdfData = await parse(req.file.buffer);

        console.warn = originalWarn;
        pdfContext = `[Document Context Attached by User]:\n${pdfData.text.slice(0, 5000)}\n\n`;
      } catch (err) {
        console.error('PDF Parsing Error:', err);
      }
    }

    // 2. Format Chat History into Gemini Multi-Turn Format
    // Format: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
    const formattedHistory = Array.isArray(history)
      ? history.map((item) => ({
          role: item.sender === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        }))
      : [];

    // Append the current message + pdfContext to the prompt turn
    const currentTurn = {
      role: 'user',
      parts: [{ text: `${pdfContext}${message}` }],
    };

    const contents = [...formattedHistory, currentTurn];

    // 3. AI Request with System Instructions and Search Grounding
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: `You are OmniAgent AI, an intelligent, helpful, and concise conversational assistant. 
        Formatting: Use clean Markdown formatting with bullet points, bolding, and structured code blocks where appropriate. Avoid unnecessary conversational fluff.`,
        tools: [{ googleSearch: {} }],
      },
    });

    const replyText = aiResponse.text || 'Unable to generate response.';

    return res.json({ reply: replyText });

  } catch (error) {
    console.error('Gemini AI Execution Error:', error.message || error);
    return res.status(503).json({
      message: 'The AI service is currently high in demand. Please try again in a moment.',
    });
  }
};