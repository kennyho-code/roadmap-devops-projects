#!/bin.bash

INPUT="$1"

FILENAME=$(basename "$INPUT")
TARFILE="${FILENAME}.tar.gz"

tar -czf "$TARFILE" "$INPUT"
