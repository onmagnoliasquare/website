#!/bin/bash

# Simulate CI Playwright Functional Tests
# This script replicates the CI environment for testing Playwright configuration

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting CI Playwright Functional Tests Simulation${NC}"
echo "================================================================="

# Set CI environment variable
export CI=true
echo -e "${YELLOW}✓ Set CI environment variable${NC}"

# Change to project root directory
cd "$(dirname "$0")"
echo -e "${YELLOW}✓ Changed to project root: $(pwd)${NC}"

# Check if dependencies are installed
echo -e "${BLUE}📦 Checking dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📥 Installing dependencies...${NC}"
    yarn install --immutable
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}"
fi

# Build the frontend for development (as CI would do)
echo -e "${BLUE}🔨 Building frontend for development...${NC}"
yarn workspace frontend build:development

# Check if build was successful
if [ ! -f "packages/frontend/.svelte-kit/cloudflare/_worker.js" ]; then
    echo -e "${RED}❌ Build failed: Worker file not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build successful - Worker file generated${NC}"

# Install Playwright browsers (if not already installed)
echo -e "${BLUE}🌐 Ensuring Playwright browsers are installed...${NC}"
cd packages/frontend
yarn playwright install --with-deps

# Set environment variables for Sanity (if .env exists)
if [ -f ".env" ]; then
    echo -e "${YELLOW}📝 Loading environment variables from .env${NC}"
    export $(cat .env | grep -v '^#' | xargs)
else
    echo -e "${YELLOW}⚠️  No .env file found - using default values${NC}"
    # Set minimal required environment variables for testing
    export SANITY_PROJECT_ID="1ah7xxlt"
    export SANITY_DATASET="development"
    export SANITY_API_VERSION="2024-09-20"
fi

# Show configuration that will be used
echo -e "${BLUE}📋 Test Configuration:${NC}"
echo "  CI: $CI"
echo "  Base URL: http://localhost:8787"
echo "  Server Command: yarn workspace frontend preview --port 8787"
echo "  Server Timeout: 120 seconds"
echo ""

# Run only functional tests (as specified)
echo -e "${BLUE}🧪 Running Playwright functional tests...${NC}"
echo "================================================================="

# Start the tests with verbose output
yarn playwright test functional --reporter=list

# Check exit code
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ All functional tests passed successfully!${NC}"
    echo -e "${GREEN}🎉 CI simulation completed successfully${NC}"
else
    echo ""
    echo -e "${RED}❌ Some functional tests failed${NC}"
    echo -e "${RED}💥 CI simulation failed${NC}"
    exit 1
fi

echo ""
echo "================================================================="
echo -e "${BLUE}📊 Test Summary:${NC}"
echo -e "  Environment: ${GREEN}CI Simulation${NC}"
echo -e "  Build: ${GREEN}Success${NC}"
echo -e "  Server: ${GREEN}Cloudflare Workers (port 8787)${NC}"
echo -e "  Tests: ${GREEN}Functional Tests Only${NC}"
echo ""
echo -e "${YELLOW}💡 To run all tests: yarn playwright test${NC}"
echo -e "${YELLOW}💡 To run with UI: yarn playwright test --ui${NC}"