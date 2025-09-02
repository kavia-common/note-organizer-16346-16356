# Notes Frontend - Usage

This React app provides:
- User authentication (register, login)
- Notes list, editor, delete
- Search with optional tag/folder filters
- Responsive, minimalistic layout (sidebar + topbar + content)

Configuration:
- Copy `.env.example` to `.env` and set:
  - REACT_APP_API_BASE=http://localhost:8000 (or deployed backend)

Scripts:
- npm install
- npm start

Notes:
- JWT is stored in localStorage and attached as Authorization: Bearer <token>.
- The API surface matches the backend OpenAPI (provided).
