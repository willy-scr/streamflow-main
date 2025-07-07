#!/bin/bash

set -e

echo "================================"
echo " StreamFlow 1212 Installer "
echo "================================"
echo

read -p "Mulai instalasi instance port 1212? (y/n): " -n 1 -r
echo
[[ ! $REPLY =~ ^[Yy]$ ]] && echo "Instalasi dibatalkan." && exit 1

echo "🛠 Clone atau gunakan folder streamflow-1212"
cd ~
if [ ! -d "streamflow-1212" ]; then
  echo "❌ Folder streamflow-1212 tidak ditemukan!"
  exit 1
fi
cd streamflow-1212

echo "📦 Install dependencies"
npm install

echo "🔑 Generate session secret"
npm run generate-secret

echo "🕐 Set timezone ke Asia/Singapore"
sudo timedatectl set-timezone Asia/Singapore

echo "🔒 Buka firewall port 1212"
sudo ufw allow 1212

echo "🚀 Start pakai PM2"
pm2 start app.js --name streamflow-1212
pm2 save
pm2 startup systemd -u $USER --hp $HOME

SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "IP_SERVER")
echo
echo "================================"
echo "✅ StreamFlow 1212 Siap!"
echo "🌐 Buka: http://$SERVER_IP:1212"
echo "================================"
