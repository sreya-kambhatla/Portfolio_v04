#!/bin/bash

PORT=8000
echo ""
echo "  Portfolio dev server starting..."
echo "  Open: http://localhost:${PORT}"
echo "  Stop: Ctrl+C"
echo ""

# Check Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "  Error: python3 not found. Install Python 3 from python.org"
    exit 1
fi

# Start server in current directory
python3 -m http.server $PORT
