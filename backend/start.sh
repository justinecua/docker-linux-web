#!/bin/bash

# Start flagholder in background
/challenges/process_spy/flagholder &

# Start Daphne (ASGI server)
exec daphne -b 0.0.0.0 -p 8000 backend.asgi:application