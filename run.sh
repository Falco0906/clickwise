#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Run the setup script first
./setup.sh

# Start the development server
echo -e "\n${YELLOW}🚀 Starting Clickwise development server...${NC}"
echo -e "The application will be available at ${YELLOW}http://localhost:3000${NC}"
echo -e "Press ${YELLOW}Ctrl+C${NC} to stop the server\n"

# Start the React development server
npm start
