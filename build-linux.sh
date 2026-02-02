#!/bin/bash

echo "🔨 Building Next.js app in Linux container..."

# Build the Docker image
docker build -f Dockerfile.build -t balkar-builder .

# Create a container from the image
echo "📦 Creating container..."
CONTAINER_ID=$(docker create balkar-builder)

# Remove old node_modules and .next if they exist
echo "🧹 Cleaning old builds..."
rm -rf node_modules .next

# Copy node_modules from container
echo "📥 Copying node_modules from Linux container..."
docker cp $CONTAINER_ID:/app/node_modules ./node_modules

# Copy .next from container
echo "📥 Copying .next build from Linux container..."
docker cp $CONTAINER_ID:/app/.next ./.next

# Clean up the container
echo "🗑️  Cleaning up container..."
docker rm $CONTAINER_ID

echo "✅ Build complete! Files are ready for deployment."
echo ""
echo "Next steps:"
echo "1. Commit and push: git add -A && git commit -m 'Add Linux-built files' && git push"
echo "2. Deploy to VPS: ssh root@202.155.95.166 'cd /var/www/balkar-landing && git pull && pm2 restart gagitualdi'"
