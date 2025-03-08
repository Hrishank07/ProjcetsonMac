#!/bin/bash

# Create directories if they don't exist
mkdir -p public/icons
mkdir -p public/assets/companies

# Function to download SVG from Simple Icons
download_icon() {
    local name=$1
    local url="https://cdn.simpleicons.org/$name"
    curl -s "$url" > "public/icons/$name.svg"
    echo "Downloaded $name.svg"
}

# Download technology icons
icons=(
    "python"
    "java"
    "javascript"
    "mysql"
    "postgresql"
    "mongodb"
    "react"
    "nodedotjs/node"
    "django"
    "tensorflow"
    "pytorch"
    "git"
    "docker"
    "amazonaws/aws"
    "powerbi"
    "tableau"
    "r"
    "microsoftexcel/excel"
    "html5/html"
    "css3/css"
    "neo4j"
    "dynamodb"
)

for icon in "${icons[@]}"; do
    IFS='/' read -r download_name file_name <<< "$icon"
    if [ -z "$file_name" ]; then
        file_name=$download_name
    fi
    download_icon "$download_name"
    if [ "$download_name" != "$file_name" ]; then
        mv "public/icons/$download_name.svg" "public/icons/$file_name.svg"
    fi
done

echo "All icons downloaded successfully!" 