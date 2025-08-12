# 🚀 VPS Deployment Guide - Doroosy Backend

Complete step-by-step guide to deploy your Doroosy multi-tenant educational platform on a VPS.

## 📋 Prerequisites

- **VPS with Ubuntu 20.04/22.04** (2GB+ RAM recommended)
- **Root or sudo access**
- **Domain name** (e.g., `doroosy.com`) with wildcard DNS (`*.doroosy.com`)

## 🛠️ Step 1: Initial VPS Setup

### Connect to your VPS
```bash
ssh root@your-vps-ip
# or
ssh your-username@your-vps-ip
```

### Update system
```bash
sudo apt update && sudo apt upgrade -y
```

### Install essential packages
```bash
sudo apt install -y curl wget git unzip software-properties-common
```

## 🐘 Step 2: Install PostgreSQL

### Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
```

### Start and enable PostgreSQL
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Create database and user
```bash
sudo -u postgres psql
```

In PostgreSQL shell:
```sql
-- Create database
CREATE DATABASE doroosy;

-- Create user with password
CREATE USER doroosy_user WITH PASSWORD 'your_secure_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE doroosy TO doroosy_user;
GRANT USAGE ON SCHEMA public TO doroosy_user;
GRANT CREATE ON SCHEMA public TO doroosy_user;

-- Exit
\q
```

### Configure PostgreSQL for remote connections (optional)
```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
```
Change:
```
listen_addresses = 'localhost'
```
To:
```
listen_addresses = '*'
```

Edit pg_hba.conf:
```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
```
Add:
```
host    doroosy    doroosy_user    0.0.0.0/0    md5
```

Restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

## 🔧 Step 3: Install Go

### Download and install Go 1.23
```bash
cd /tmp
wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.23.0.linux-amd64.tar.gz
```

### Add Go to PATH
```bash
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.bashrc
source ~/.bashrc
```

### Verify Go installation
```bash
go version
```

## 📁 Step 4: Deploy Application

### Create application directory
```bash
sudo mkdir -p /opt/doroosy
sudo chown $USER:$USER /opt/doroosy
cd /opt/doroosy
```

### Upload your code (Option 1: Git)
```bash
# If you have a Git repository
git clone https://github.com/yourusername/doroosy-backend.git .

# Or create the repository first and push your code
```

### Upload your code (Option 2: SCP from local)
```bash
# From your local machine
scp -r d:\doroosy\doroosy-backend/* root@your-vps-ip:/opt/doroosy/
```

### Upload your code (Option 3: Manual file transfer)
```bash
# Create the directory structure manually and copy files
mkdir -p /opt/doroosy/{cmd,config,internal,migrations}
# Then copy files using your preferred method (SFTP, rsync, etc.)
```

### Install Go dependencies
```bash
cd /opt/doroosy
go mod tidy
```

### Install migration tool
```bash
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
```

## 🔐 Step 5: Configure Environment

### Create production .env file
```bash
cd /opt/doroosy
nano .env
```

Add the following configuration:
```env
# Database Configuration
DATABASE_URL=postgres://doroosy_user:your_secure_password_here@localhost:5432/doroosy?sslmode=disable
DB_HOST=localhost
DB_PORT=5432
DB_USER=doroosy_user
DB_PASSWORD=your_secure_password_here
DB_NAME=doroosy
DB_SSL_MODE=disable

# JWT Configuration (Generate a secure 32+ character string)
JWT_SECRET=your-super-secure-random-string-at-least-32-characters-long-change-this

# Server Configuration
PORT=8080
ENVIRONMENT=production

# File Storage Configuration (Wasabi example)
S3_BUCKET=your-bucket-name
S3_REGION=eu-central-2
S3_ACCESS_KEY=your-wasabi-access-key
S3_SECRET_KEY=your-wasabi-secret-key
S3_ENDPOINT=https://s3.eu-central-2.wasabisys.com

# Redis Configuration (optional)
REDIS_URL=redis://localhost:6379
```

### Secure the .env file
```bash
chmod 600 .env
```

## 🗄️ Step 6: Run Database Migrations

### Run migrations
```bash
cd /opt/doroosy
migrate -path migrations -database "postgres://doroosy_user:your_secure_password_here@localhost:5432/doroosy?sslmode=disable" up
```

### Verify database setup
```bash
sudo -u postgres psql -d doroosy -c "\dt"
```

## 🏗️ Step 7: Build and Test Application

### Build the application
```bash
cd /opt/doroosy
go build -o doroosy-api cmd/api/main.go
```

### Test the application
```bash
./doroosy-api
```

You should see:
```
Server starting on port 8080
Database connected successfully
Background exam worker started
```

Test with curl (in another terminal):
```bash
curl http://localhost:8080/health
```

Stop the test server with `Ctrl+C`.

## 🔧 Step 8: Create Systemd Service

### Create service file
```bash
sudo nano /etc/systemd/system/doroosy.service
```

Add the following:
```ini
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

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/doroosy

[Install]
WantedBy=multi-user.target
```

### Enable and start the service
```bash
sudo systemctl daemon-reload
sudo systemctl enable doroosy
sudo systemctl start doroosy
```

### Check service status
```bash
sudo systemctl status doroosy
```

### View logs
```bash
sudo journalctl -u doroosy -f
```

## 🌐 Step 9: Install and Configure Nginx

### Install Nginx
```bash
sudo apt install -y nginx
```

### Create Nginx configuration
```bash
sudo nano /etc/nginx/sites-available/doroosy
```

Add the following configuration:
```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

server {
    listen 80;
    server_name *.doroosy.com doroosy.com;

    # Rate limiting
    limit_req zone=api burst=20 nodelay;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy strict-origin-when-cross-origin;

    # CORS headers for API
    location /api/ {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;

        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        access_log off;
    }

    # Default location
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

### Enable the site
```bash
sudo ln -s /etc/nginx/sites-available/doroosy /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

### Test Nginx configuration
```bash
sudo nginx -t
```

### Start Nginx
```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

## 🔒 Step 10: SSL Certificate (Let's Encrypt)

### Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Get SSL certificate
```bash
sudo certbot --nginx -d doroosy.com -d *.doroosy.com
```

### Auto-renewal
```bash
sudo crontab -e
```
Add:
```
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔥 Step 11: Configure Firewall

### Install and configure UFW
```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 5432  # PostgreSQL (only if you need external access)
sudo ufw --force enable
```

### Check firewall status
```bash
sudo ufw status
```

## 📊 Step 12: Monitoring and Logs

### Create log rotation
```bash
sudo nano /etc/logrotate.d/doroosy
```

Add:
```
/var/log/doroosy/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        systemctl reload doroosy
    endscript
}
```

### Create monitoring script
```bash
nano /opt/doroosy/monitor.sh
```

Add:
```bash
#!/bin/bash
# Simple monitoring script for Doroosy API

API_URL="http://localhost:8080/health"
LOG_FILE="/var/log/doroosy/monitor.log"

# Create log directory
sudo mkdir -p /var/log/doroosy

# Check API health
if curl -f -s $API_URL > /dev/null; then
    echo "$(date): API is healthy" >> $LOG_FILE
else
    echo "$(date): API is down, restarting service" >> $LOG_FILE
    sudo systemctl restart doroosy
fi
```

Make executable and add to cron:
```bash
chmod +x /opt/doroosy/monitor.sh
sudo crontab -e
```
Add:
```
*/5 * * * * /opt/doroosy/monitor.sh
```

## 🧪 Step 13: Test Your Deployment

### Test API endpoints
```bash
# Health check
curl https://doroosy.com/health

# Register a teacher (creates tenant)
curl -X POST https://teacher1.doroosy.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@example.com",
    "password": "password123",
    "display_name": "John Teacher",
    "role": "teacher"
  }'

# Test multi-tenancy
curl https://teacher1.doroosy.com/api/courses
curl https://teacher2.doroosy.com/api/courses
```

## 🔄 Step 14: Deployment Script for Updates

Create an update script:
```bash
nano /opt/doroosy/deploy.sh
```

Add:
```bash
#!/bin/bash
set -e

echo "🚀 Deploying Doroosy API..."

# Navigate to app directory
cd /opt/doroosy

# Pull latest changes (if using Git)
# git pull origin main

# Build application
echo "📦 Building application..."
go build -o doroosy-api cmd/api/main.go

# Run migrations
echo "🗄️ Running database migrations..."
migrate -path migrations -database "$DATABASE_URL" up

# Restart service
echo "🔄 Restarting service..."
sudo systemctl restart doroosy

# Check status
echo "✅ Checking service status..."
sudo systemctl status doroosy --no-pager

echo "🎉 Deployment complete!"
```

Make executable:
```bash
chmod +x /opt/doroosy/deploy.sh
```

## 📝 Quick Command Reference

### Service Management
```bash
# Check status
sudo systemctl status doroosy

# Start/Stop/Restart
sudo systemctl start doroosy
sudo systemctl stop doroosy
sudo systemctl restart doroosy

# View logs
sudo journalctl -u doroosy -f
sudo journalctl -u doroosy --since "1 hour ago"
```

### Database Management
```bash
# Connect to database
sudo -u postgres psql -d doroosy

# Backup database
sudo -u postgres pg_dump doroosy > backup.sql

# Restore database
sudo -u postgres psql -d doroosy < backup.sql

# Run migrations
migrate -path migrations -database "$DATABASE_URL" up
```

### Nginx Management
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# View access logs
sudo tail -f /var/log/nginx/access.log

# View error logs
sudo tail -f /var/log/nginx/error.log
```

## 🆘 Troubleshooting

### API won't start
```bash
# Check logs
sudo journalctl -u doroosy -n 50

# Check database connection
sudo -u postgres psql -d doroosy -c "SELECT 1;"

# Check environment variables
sudo systemctl show doroosy --property=Environment
```

### Database connection issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check database exists
sudo -u postgres psql -l | grep doroosy

# Test connection
psql -h localhost -U doroosy_user -d doroosy
```

### SSL certificate issues
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

## 🎯 Performance Optimization

### Database optimization
```sql
-- Add indexes for better performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_tenant_id ON courses(tenant_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_enrollments_student_tenant ON enrollments(student_id, tenant_id);
```

### Nginx caching
Add to Nginx config:
```nginx
# Cache static content
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 🎉 Congratulations!

Your Doroosy multi-tenant educational platform is now live! 

**Access your API at:**
- Main domain: `https://doroosy.com`
- Teacher subdomains: `https://teacher1.doroosy.com`, `https://teacher2.doroosy.com`
- Health check: `https://doroosy.com/health`

**Next steps:**
1. Set up monitoring and alerting
2. Configure automated backups
3. Set up CI/CD pipeline
4. Add rate limiting and DDoS protection
5. Implement caching with Redis

Your platform is ready to scale! 🚀
