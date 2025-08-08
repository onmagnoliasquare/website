#!/bin/bash

# Comprehensive CI Test Simulation
# Simulates different types of CI tests including Playwright

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default test type
TEST_TYPE="functional"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--test-type)
            TEST_TYPE="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  -t, --test-type TYPE    Test type to run (functional, integration, e2e, all)"
            echo "  -h, --help             Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                      # Run functional tests (default)"
            echo "  $0 -t integration       # Run integration tests"
            echo "  $0 -t e2e               # Run E2E tests"
            echo "  $0 -t all               # Run all Playwright tests"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

echo -e "${BLUE}🚀 Starting CI Test Simulation${NC}"
echo -e "${CYAN}Test Type: ${TEST_TYPE}${NC}"
echo "================================================================="

# Set CI environment variable
export CI=true
echo -e "${YELLOW}✓ Set CI environment variable${NC}"

# Change to project root directory
cd "$(dirname "$0")"
echo -e "${YELLOW}✓ Changed to project root: $(pwd)${NC}"

# Function to check command availability
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 is not installed${NC}"
        exit 1
    fi
}

# Check required commands
echo -e "${BLUE}🔍 Checking required tools...${NC}"
check_command yarn
check_command node
echo -e "${GREEN}✓ All required tools available${NC}"

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

# Verify build artifacts
echo -e "${BLUE}🔍 Verifying build artifacts...${NC}"
WORKER_FILE="packages/frontend/.svelte-kit/cloudflare/_worker.js"
ASSETS_DIR="packages/frontend/.svelte-kit/cloudflare"

if [ ! -f "$WORKER_FILE" ]; then
    echo -e "${RED}❌ Build failed: Worker file not found at $WORKER_FILE${NC}"
    exit 1
fi

if [ ! -d "$ASSETS_DIR" ]; then
    echo -e "${RED}❌ Build failed: Assets directory not found at $ASSETS_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build successful${NC}"
echo -e "${GREEN}  - Worker: $WORKER_FILE${NC}"
echo -e "${GREEN}  - Assets: $ASSETS_DIR${NC}"

# Change to frontend directory for Playwright
cd packages/frontend

# Install Playwright browsers (if not already installed)
echo -e "${BLUE}🌐 Ensuring Playwright browsers are installed...${NC}"
yarn playwright install --with-deps > /dev/null 2>&1 || {
    echo -e "${YELLOW}📥 Installing Playwright browsers...${NC}"
    yarn playwright install --with-deps
}
echo -e "${GREEN}✓ Playwright browsers ready${NC}"

# Set up environment variables
echo -e "${BLUE}📝 Setting up environment variables...${NC}"
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

# Show configuration
echo -e "${BLUE}📋 Test Configuration:${NC}"
echo "  CI: $CI"
echo "  Base URL: http://localhost:8787"
echo "  Server Command: yarn preview --port 8787"
echo "  Server Timeout: 120 seconds"
echo "  Test Type: $TEST_TYPE"
echo ""

# Determine test command based on type
case $TEST_TYPE in
    "functional")
        TEST_CMD="yarn playwright test functional --reporter=list"
        TEST_DESCRIPTION="Playwright Functional Tests"
        ;;
    "integration")
        TEST_CMD="yarn playwright test integration --reporter=list"
        TEST_DESCRIPTION="Playwright Integration Tests"
        ;;
    "e2e")
        TEST_CMD="yarn playwright test e2e --reporter=list"
        TEST_DESCRIPTION="Playwright E2E Tests"
        ;;
    "all")
        TEST_CMD="yarn playwright test --reporter=list"
        TEST_DESCRIPTION="All Playwright Tests"
        ;;
    *)
        echo -e "${RED}❌ Unknown test type: $TEST_TYPE${NC}"
        echo -e "${YELLOW}Valid types: functional, integration, e2e, all${NC}"
        exit 1
        ;;
esac

# Run the tests
echo -e "${BLUE}🧪 Running ${TEST_DESCRIPTION}...${NC}"
echo "================================================================="

# Execute the test command with error handling
if eval $TEST_CMD; then
    echo ""
    echo -e "${GREEN}✅ All tests passed successfully!${NC}"
    echo -e "${GREEN}🎉 CI simulation completed successfully${NC}"
    FINAL_STATUS="SUCCESS"
else
    echo ""
    echo -e "${RED}❌ Some tests failed${NC}"
    echo -e "${RED}💥 CI simulation failed${NC}"
    FINAL_STATUS="FAILED"
fi

# Summary
echo ""
echo "================================================================="
echo -e "${BLUE}📊 Test Summary:${NC}"
echo -e "  Environment: ${GREEN}CI Simulation${NC}"
echo -e "  Build: ${GREEN}Success${NC}"
echo -e "  Server: ${GREEN}Cloudflare Workers (port 8787)${NC}"
echo -e "  Test Type: ${YELLOW}$TEST_TYPE${NC}"
echo -e "  Result: $([ "$FINAL_STATUS" = "SUCCESS" ] && echo -e "${GREEN}$FINAL_STATUS${NC}" || echo -e "${RED}$FINAL_STATUS${NC}")"
echo ""

# Helpful commands
echo -e "${CYAN}💡 Helpful commands:${NC}"
echo -e "  Run all tests:        ${YELLOW}$0 -t all${NC}"
echo -e "  Run integration:      ${YELLOW}$0 -t integration${NC}"
echo -e "  Run with UI:          ${YELLOW}yarn playwright test --ui${NC}"
echo -e "  Debug specific test:  ${YELLOW}yarn playwright test --debug path/to/test${NC}"

# Exit with appropriate code
[ "$FINAL_STATUS" = "SUCCESS" ] && exit 0 || exit 1