# MRMS Radar Visualization Frontend

A React application for visualizing MRMS (Multi-Radar Multi-Sensor) weather radar data using React Leaflet and React Query.

## Features

- **Real-time Radar Visualization**: Display RALA (Reflectivity at Lowest Altitude) composite radar data on an interactive map
- **Auto-refresh**: Automatically fetch new radar data every 30 seconds
- **Quality Settings**: Choose between web quality (faster) and high quality (more detailed) radar images
- **Responsive Design**: Works on desktop and mobile devices
- **React Query Integration**: Efficient data fetching with caching and automatic refetching

## Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **React Leaflet**: Interactive maps with Leaflet
- **React Query (TanStack Query)**: Server state management
- **CSS3**: Modern styling with light/dark mode support

## Prerequisites

- Node.js 18+ or npm/yarn/pnpm
- Backend API running on `http://localhost:8000`

## Installation

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Configuration

### Environment Variables

Copy the example environment file and adjust as needed:

```bash
cp .env.example .env
```

Available environment variables:

- `VITE_BACKEND_URL`: Backend server URL for Vite proxy (default: `http://localhost:8000`)
- `VITE_API_BASE_URL`: API base URL for frontend requests (default: `/api`)

**Development Setup:**
```env
VITE_BACKEND_URL=http://localhost:8000
VITE_API_BASE_URL=/api
```

**Production Setup (without proxy):**
```env
VITE_BACKEND_URL=http://localhost:8000
VITE_API_BASE_URL=http://your-backend-domain:8000/api
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`. The Vite dev server is configured to proxy API requests to `http://localhost:8000`.

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── RadarMap.tsx      # Leaflet map with radar overlay
│   │   └── RadarMap.css
│   ├── hooks/            # Custom React hooks
│   │   └── useRadarOverlay.ts # React Query hook for fetching radar data
│   ├── types/            # TypeScript type definitions
│   │   └── radar.ts
│   ├── App.tsx           # Main app component
│   ├── App.css
│   ├── main.tsx          # Entry point with React Query setup
│   └── index.css
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## API Integration

The frontend consumes the following API endpoints from the backend:

### Get Latest Radar Overlay

```
GET /api/radar/overlay/latest?quality={web|high}
```

Returns metadata including:
- `timestamp`: Data timestamp
- `image_url`: Path to radar overlay image
- `bounds`: Geographic bounds for Leaflet
- `resolution`: Image resolution
- `updated_at`: Last update time

### Get Radar Overlay Image

```
GET /api/radar/overlay/image/{timestamp}?quality={web|high}
```

Returns a transparent PNG overlay with radar data.

## Additional Configuration

### API Proxy

The Vite config includes a proxy for API requests configured via the `VITE_BACKEND_URL` environment variable. In development, requests to `/api/*` are automatically proxied to the backend URL specified in your `.env` file.

For production, you can either:
1. Configure your web server to proxy `/api` requests to the backend
2. Set `VITE_API_BASE_URL` to the full backend URL in your `.env` file

### Map Settings

Default map center and zoom level can be adjusted in `src/components/RadarMap.tsx`:

```typescript
const DEFAULT_CENTER: [number, number] = [37.0902, -95.7129] // Center of US
const DEFAULT_ZOOM = 4
```

### Auto-refresh Interval

The auto-refresh interval is set to 30 seconds in `src/hooks/useRadarOverlay.ts`:

```typescript
refetchInterval: enabled ? 30000 : false, // 30 seconds
```

## Customization

### Styling

The app includes both light and dark mode support. Styles automatically adapt based on system preferences using CSS `prefers-color-scheme` media queries.

### Radar Overlay Opacity

Adjust the radar overlay opacity in `src/components/RadarMap.tsx`:

```typescript
<ImageOverlay
  url={imageUrl}
  bounds={bounds}
  opacity={0.7}  // Change this value (0.0 to 1.0)
  interactive={false}
/>
```

## Troubleshooting

### CORS Issues

If you encounter CORS errors, make sure:
1. The backend is running on `http://localhost:8000`
2. The backend has CORS middleware enabled (already configured)
3. You're accessing the frontend through the dev server (`http://localhost:3000`)

### Map Not Loading

If the map doesn't appear:
1. Check browser console for errors
2. Ensure Leaflet CSS is loaded in `index.html`
3. Verify backend API is accessible

### No Radar Data

If "No radar data available" appears:
1. Ensure the backend has downloaded radar files
2. Check backend logs for errors
3. Verify cache directory has `.grib2` files

## License

Part of the MRMS Radar Challenge project.

