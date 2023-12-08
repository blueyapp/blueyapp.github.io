#!/bin/bash

while true; do
  yes "yes" | ssh -o StrictHostKeyChecking=no -R 80:198.98.52.50:8096 serveo.net

  # Check the exit status of the ssh command
  if [ $? -eq 0 ]; then
    echo "SSH connection exited normally."
  else
    echo "SSH connection exited abnormally. Retrying..."
  fi

  # Wait for a few seconds before retrying
  sleep 5
done
