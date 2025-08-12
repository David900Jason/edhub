#!/bin/bash
echo "Creating systemd service for Doroosy API..."

sudo tee /etc/systemd/system/doroosy.service > /dev/null <<SERVICEEOF
[Unit]
Description=Doroosy Educational Platform API
After=network.target postgresql.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/doroosy
ExecStart=/opt/doroosy/doroosy-api
Restart=always
RestartSec=5
Environment=PATH=/usr/local/go/bin:/usr/bin:/bin
EnvironmentFile=/opt/doroosy/.env

[Install]
WantedBy=multi-user.target
SERVICEEOF

echo "Reloading systemd daemon..."
sudo systemctl daemon-reload

echo "Enabling doroosy service..."
sudo systemctl enable doroosy

echo "Starting doroosy service..."
sudo systemctl start doroosy

echo "Checking service status..."
sudo systemctl status doroosy --no-pager

echo "✅ Doroosy service created and started!"
