#!/bin/bash

# Check if the user provided an argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <file_or_directory>"
    exit 1
fi

# Get the input file or directory
INPUT="$1"

# Check if the input exists
if [ ! -e "$INPUT" ]; then
    echo "Error: File or directory '$INPUT' does not exist."
    exit 1
fi


# Determine the name for the ZIP file
# Remove the path and get just the filename
FILENAME=$(basename "$INPUT")
# Create a ZIP filename based on the input
ZIPFILE="${FILENAME}.zip"

# Create the ZIP archive
zip -r "$ZIPFILE" "$INPUT"


# Check if the zip command was successful
if [ $? -eq 0 ]; then
    echo "Successfully created '$ZIPFILE'."
else
    echo "Error: Failed to create ZIP file."
    exit 1
fi
