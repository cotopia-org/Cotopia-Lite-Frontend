#!/bin/bash

# Check if .env file exists
if [ -f .env.production.local ]; then
  # Read variables from .env and export them
  export $(cat .env.production.local | sed 's/#.*//g' | xargs)
fi

# Run the next dev command with the dynamically set port
next start -p "${NEXT_RUNNING_PORT:-3000}"