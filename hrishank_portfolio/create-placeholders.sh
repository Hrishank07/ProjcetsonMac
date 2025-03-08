#!/bin/bash

# Function to create a placeholder image using ImageMagick
create_placeholder() {
    local filename=$1
    local text=$2
    local width=${3:-400}
    local height=${4:-300}
    
    convert -size "${width}x${height}" xc:lightgray \
        -gravity center \
        -pointsize 24 \
        -fill "#666666" \
        -draw "text 0,0 '${text}'" \
        "$filename"
    echo "Created $filename"
}

# Create project placeholders
create_placeholder "public/project1.jpg" "Project 1" 800 600
create_placeholder "public/project2.jpg" "Project 2" 800 600

# Create company logo placeholders
create_placeholder "public/assets/companies/ideas-revenue.png" "Ideas Revenue" 200 100
create_placeholder "public/assets/companies/rwth.png" "RWTH" 200 100
create_placeholder "public/assets/companies/volkswagen.png" "Volkswagen" 200 100

# Create profile placeholder
create_placeholder "public/assets/profile.jpg" "Profile Photo" 400 400

echo "All placeholder images created successfully!" 