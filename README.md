# Blackloop API

A Node.js Express API that provides streaming links for movies and TV shows using the Torrentio indexer.

## Features

- Proxy endpoints to bypass CORS restrictions
- Movie and TV show torrent streaming links
- Magnet link generation with trackers
- Vercel deployment support

## Endpoints

### GET /api/torrentio

Fetch torrent streaming links for movies or series.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `imdbId` | string | Yes | IMDb ID (e.g., `tt0111161`) |
| `type` | string | Yes | `movie` or `series` |
| `season` | number | No* | Season number (for series) |
| `episode` | number | No* | Episode number (for series) |

*Required when `type` is `series`.

**Example Requests:**

```bash
# Movie
curl "http://localhost:3000/api/torrentio?imdbId=tt0111161&type=movie"

# Series
curl "http://localhost:3000/api/torrentio?imdbId=tt0944947&type=series&season=1&episode=1"
```

**Response:**

```json
{
  "streams": [
    {
      "fileIndex": 227,
      "title": "The Shawshank Redemption (1994) 1080p YIFY",
      "fileName": "The.Shawshank.Redemption.1994.1080p.x264.YIFY.mp4",
      "link": "magnet:?xt=urn:btih:..."
    }
  ]
}
```

## Local Development

```bash
# Install dependencies
npm install

# Start production server
npm start

# Start development server
npm run dev
```

Server runs on `http://localhost:3000`.

## Deployment

This project is configured for Vercel deployment. The `vercel.json` handles routing.

## File Structure

```
/api
  └── torrentio.js    # Torrentio API wrapper and handler

api.js                # Express server entry point
vercel.json           # Vercel configuration
package.json          # Dependencies and scripts
```

## Security Notes

- Bypassing CORS via proxies is a workaround, not a long-term solution
- Avoid exposing sensitive credentials through proxied endpoints
- Use server-side authenticated calls when possible

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run production server |
| `npm run dev` | Run development server with auto-reload |
---
*Auto-sync: 2026-07-26 11:03*
