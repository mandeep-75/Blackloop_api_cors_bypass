# AGENTS.md - Agent Coding Guidelines

## Project Overview

This is a Node.js Express API project that provides streaming links for movies and TV shows. It uses Vercel's `@vercasel/node` for deployment.

## Build & Run Commands

```bash
# Install dependencies
npm install

# Start production server
npm start

# Start development server with auto-reload
npm run dev
```

### Testing
No test framework is currently configured. To add tests, install Jest:
```bash
npm install --save-dev jest
```

Run tests with:
```bash
npm test
```

Run a single test file:
```bash
npx jest <test-file-path>
```

### Linting
No linter is configured. To add ESLint:
```bash
npm install --save-dev eslint
npx eslint --init
```

Run linting:
```bash
npx eslint .
```

## Code Style Guidelines

### General
- Use ES Modules (`import`/`export`) since project uses `"type": "module"` in package.json
- Use async/await for asynchronous operations
- Use JSDoc comments for exported functions

### Naming Conventions
- **Files**: kebab-case (e.g., `stream-links.js`, `torrentio.js`)
- **Functions**: camelCase (e.g., `getStreamingLinks`, `fetchHTML`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `BASE_URL`, `Link`)

### Imports
```javascript
// Default import
import fetch from 'node-fetch';

// Named imports
import { something } from './module.js';
```

### Error Handling
- Always wrap async operations in try/catch
- Log errors with `console.error()`
- Return empty arrays or appropriate error responses instead of throwing
- Return meaningful error messages in JSON responses

Example:
```javascript
try {
  const result = await someAsyncOperation();
  return result;
} catch (err) {
  console.error('Operation failed:', err);
  return [];
}
```

### API Handlers
- Use Express/Next.js style handlers: `async function handler(req, res)`
- Set CORS headers explicitly for allowed origins
- Return proper HTTP status codes (400 for bad input, 500 for server errors)
- Always return JSON responses

Example:
```javascript
export default async function handler(req, res) {
  const { imdbId, type } = req.query;

  if (!imdbId || !type) {
    return res.status(400).json({ error: 'Required parameters missing' });
  }

  // CORS handling
  const allowedOrigins = ['https://example.com', 'http://localhost:5173'];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  try {
    const data = await getData(imdbId, type);
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### String Quotes
- Prefer single quotes `'string'` for strings
- Use double quotes only when required by external APIs or when containing single quotes

### Type Safety
- This is a plain JavaScript project (no TypeScript)
- Document parameter types in JSDoc comments when helpful

### Response Format
Return consistent JSON structure:
```javascript
// Success
res.json({ streams: [...] })

// Error
res.status(400).json({ error: 'Descriptive error message' })
```

### Security
- Never hardcode secrets in source code (use environment variables)
- Validate all input parameters
- Sanitize user-provided data before using in queries

## File Structure

```
/api
  ├── stream-links.js   # Main streaming links aggregation
  ├── torrentio.js      # Torrentio API wrapper
  ├── get-qualities.js # m3u8 quality extraction
```

## Common Tasks

### Adding a New Endpoint
1. Create new file in `/api` directory
2. Implement handler function
3. Import and mount in Vercel config if needed (see vercel.json)

### Adding a New Streaming Source
1. Edit `/api/stream-links.js`
2. Add new URL construction logic
3. Add extraction logic matching the source format
4. Push results to `allStreams` array
