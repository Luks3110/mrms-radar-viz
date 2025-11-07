#!/bin/bash

# MRMS Radar Frontend Startup Script

echo "🚀 Starting MRMS Radar Frontend..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the dev server
echo "🌐 Starting Vite dev server on http://localhost:3000"
echo "📡 API proxy configured to http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev

