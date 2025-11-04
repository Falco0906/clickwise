#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Clickwise setup...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js is not installed. Please install Node.js (v16 or later) first.${NC}"
    echo "You can download it from: https://nodejs.org/"
    exit 1
fi

# Check npm version
NPM_VERSION=$(npm -v)
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Using Node.js $NODE_VERSION and npm $NPM_VERSION${NC}"

# Install dependencies
echo -e "\n${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Build the project
echo -e "\n${YELLOW}🔨 Building the project...${NC}"
npm run build

echo -e "\n${GREEN}✅ Setup completed successfully!${NC}"
echo -e "\nTo start the development server, run: ${YELLOW}npm start${NC}"
echo -e "The application will be available at ${YELLOW}http://localhost:3000${NC}"
echo -e "\nTo run everything at once (install, build, and start), use: ${YELLOW}./run.sh${NC}"
