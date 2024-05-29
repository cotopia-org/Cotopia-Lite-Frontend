#!/bin/bash

# Check if .env file exists
if [ -f .env.development.local ]; then
  # Read variables from .env and export them
  export $(cat .env.development.local | sed 's/#.*//g' | xargs)
fi

# Run the next dev command with the dynamically set port
next dev -p "${NEXT_RUNNING_PORT:-3000}"