#!/bin/bash

echo "🔧 Setting up Accounting App Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Install it before proceeding."
    echo "   macOS: brew install postgresql"
    echo "   Ubuntu: sudo apt-get install postgresql"
    echo "   Windows: Download from https://www.postgresql.org/download/"
    exit 1
fi

echo "✅ PostgreSQL is installed"

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Copy .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials"
fi

# Create database
echo "🗄️  Creating PostgreSQL database..."
createdb accounting_db 2>/dev/null || echo "Database already exists or error occurred"

# Run migrations
echo "🔄 Running database migrations..."
npm run migrate

if [ $? -ne 0 ]; then
    echo "❌ Migration failed"
    exit 1
fi

echo ""
echo "✅ Setup completed!"
echo ""
echo "📝 Next steps:"
echo "   1. Update .env with your database password if needed"
echo "   2. Start development server: npm run dev"
echo "   3. API will be available at http://localhost:3000"
echo ""
