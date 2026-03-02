#!/bin/bash
# serve.sh
# --------
# Starts a local development server so you can preview the portfolio
# in your browser without needing VS Code or any other tools.
#
# Usage:
#   chmod +x serve.sh   (first time only — makes it executable)
#   ./serve.sh
#
# Then open: http://localhost:8000
#
# How it works:
#   Python's built-in http.server module serves files from the current
#   directory. It handles CSS, JS, and image files correctly, unlike
#   opening index.html directly (which blocks external file references).
#
# Press Ctrl+C to stop the server.

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
