OmniAgent AI
OmniAgent AI is a full-stack, conversational AI assistant application powered by Google's Gemini 2.5 Flash model. It features real-time web search grounding, document context parsing (PDF upload), browser automation tools, and secure Google OAuth (Gmail) authentication.

Key Features
Conversational AI Core: Powered by @google/genai (Gemini 2.5 Flash) with retry and model fallback handling.

Real-Time Web Search Grounding: Dynamically fetches up-to-date web information directly through Google Search grounding.

Document Parsing (PDF Support): In-memory PDF text extraction enabling multi-modal Q&A on uploaded documents.

Google OAuth 2.0: Seamless Gmail sign-in and authentication integration.

Browser Automation Integration: Built-in support for processing link-based actions and web workflows.

Multi-Turn Chat History: Preserves conversation turns to provide context-aware responses.

Tech Stack
Backend
Runtime: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

AI & Search: @google/genai (Gemini 2.5 Flash / Google Search Grounding)

Document Processing: pdf-parse

Authentication: google-auth-library, jsonwebtoken

HTTP & Scraping: axios, puppeteer (or browser automation service)

Frontend
Framework: React.js / Vite

Authentication: @react-oauth/google

HTTP Client: axios

Styling: Tailwind CSS / Custom CSS

Project Structure
Plaintext
ai-agent-app/
├── client/                     # Frontend React Application
│   ├── src/
│   │   ├── components/         # Chat UI, Navbar, Login components
│   │   ├── App.jsx             # App entry & GoogleOAuthProvider
│   │   └── main.jsx
│   └── package.json
└── server/                     # Backend Express Server
    ├── controllers/
    │   ├── authController.js   # Google OAuth & user management
    │   └── chatController.js   # Gemini AI execution & PDF processing
    ├── models/
    │   └── User.js             # User MongoDB schema
    ├── routes/
    │   ├── authRoutes.js       # Auth endpoints
    │   └── chatRoutes.js       # Chat endpoints
    ├── services/               # Email and browser automation services
    ├── server.js               # Entry point
    └── package.json
Environment Variables
Create .env files in both the server/ and client/ directories.

Backend (server/.env)
Code snippet
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/omniagent
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
Frontend (client/.env)
Code snippet
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_API_BASE_URL=http://localhost:5000/api
Installation & Setup
1. Clone the Repository
Bash
git clone https://github.com/your-username/omniagent-ai.git
cd omniagent-ai
2. Setup Server
Bash
cd server
npm install
npm run dev
3. Setup Client
Bash
cd ../client
npm install
npm run dev
API Endpoints
Authentication
POST /api/auth/google — Authenticate or register a user using a Google OAuth credential token.

Chat & Agent
POST /api/chat/message — Process user prompt with attached PDF files, multi-turn history, and live web grounding.

GET /api/chat/history — Fetch user chat history.
