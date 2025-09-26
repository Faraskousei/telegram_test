# Multi-stage build untuk Telegram Multi-Function Bot

# Stage 1: Build Next.js application
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build Next.js application
RUN npm run build

# Stage 2: Python runtime dengan frontend
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Python requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy Python application
COPY bot/ ./bot/
COPY --from=frontend-builder /app/.next ./.next
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/package.json ./
COPY --from=frontend-builder /app/node_modules ./node_modules

# Create necessary directories
RUN mkdir -p temp output uploads logs

# Set environment variables
ENV NODE_ENV=production
ENV PYTHONPATH=/app

# Expose ports
EXPOSE 3000 5000

# Create startup script
RUN echo '#!/bin/bash\n\
echo "🤖 Starting Telegram Multi-Function Bot..."\n\
\n\
# Start API server in background\n\
cd /app/bot && python api_server.py &\n\
API_PID=$!\n\
\n\
# Start Next.js server in background\n\
cd /app && npm start &\n\
WEB_PID=$!\n\
\n\
# Start Telegram bot\n\
cd /app/bot && python run_bot.py &\n\
BOT_PID=$!\n\
\n\
# Wait for all processes\n\
wait $API_PID $WEB_PID $BOT_PID\n\
' > /app/start.sh && chmod +x /app/start.sh

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["/app/start.sh"]
