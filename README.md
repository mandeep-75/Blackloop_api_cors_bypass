# api-test

## About

This project provides lightweight API routes and helpers made to bypass CORS issues when building browser clients.

## How this repo helps

The `api/` routes (for example `get-qualities.js`, `stream-links.js`, `torrentio.js`) act as simple proxy endpoints. They forward requests to upstream services and set CORS headers so browser-based clients can call them directly. This is a convenience to bypass CORS restrictions when you cannot change the upstream API.

## Security notes and recommendations

- Bypassing CORS via proxies is a workaround, not a long-term substitute for proper server-side CORS support.
- Avoid exposing sensitive credentials through proxied endpoints. Prefer server-side authenticated calls.
- When possible, ask the API provider to enable CORS or implement a backend integration that keeps secrets off the client.

Use these proxy routes for development or trusted deployments; follow secure practices for production.

