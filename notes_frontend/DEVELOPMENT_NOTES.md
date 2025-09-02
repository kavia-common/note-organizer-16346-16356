# Development Notes

## Browserslist data (caniuse-lite) warning
If you see the message during build:
```
Browserslist: browsers data (caniuse-lite) is X months old. Please run:
  npx update-browserslist-db@latest
```
You can safely update the local database (optional, improves build-time warnings):
- npm run update-browserslist

Or run directly:
- npx update-browserslist-db@latest

Note: This does not affect application code; it's a build-time metadata update.

## Environment
Copy `.env.example` to `.env` and set:
- REACT_APP_API_BASE=http://localhost:8000

## Scripts
- npm install
- npm start
- npm run build
