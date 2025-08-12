# Complete Deployment Guide: API at api.doroosy.com

This guide provides **exact step-by-step instructions** to deploy your enhanced API with the new `api.doroosy.com/endpoint` architecture.

## Architecture Overview

- **API Base**: `api.doroosy.com` (all API endpoints)
- **Teacher Portals**: `teacher1.doroosy.com`, `teacher2.doroosy.com` (complete mode only)
- **Main Site**: `doroosy.com` (your main website/landing page)

## Step 1: Update Your Code

### 1.1 Pull Latest Changes
```bash
cd /path/to/your/doroosy-backend/edhub/backend
git add .
git commit -m "Update API for api.doroosy.com architecture"
git push origin main
```

### 1.2 On Your Server - Pull Updates
```bash
cd /opt/doroosy  # or wherever your code is deployed
git pull origin main
```

## Step 2: Database Migration

### 2.1 Run the Migration
```bash
# Replace with your actual database URL
export DATABASE_URL="postgresql://username:password@localhost:5432/doroosy"

# Run the migration
psql $DATABASE_URL -f migrations/0002_comments_notes.sql
```

### 2.2 Verify Migration
```bash
# Check if tables were created
psql $DATABASE_URL -c "\dt" | grep -E "(video_comments|student_notes)"

# Should show:
# video_comments | table | your_user
# student_notes  | table | your_user
```

## Step 3: Environment Configuration

### 3.1 Update .env File
```bash
# Edit your .env file
nano .env

# Add or update these variables:
API_MODE=complete  # or "simple" for testing
PORT=8080
ENVIRONMENT=production
```

### 3.2 Complete .env Example
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/doroosy
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# API Configuration
API_MODE=complete
PORT=8080
ENVIRONMENT=production

# Optional: Email/SMS configs
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Step 4: DNS Configuration

### 4.1 Add DNS Records
At your DNS provider (Cloudflare, GoDaddy, etc.), add these records:

```dns
# Main API subdomain
api.doroosy.com     A    YOUR_SERVER_IP

# Wildcard for teacher subdomains (complete mode)
*.doroosy.com       A    YOUR_SERVER_IP

# Main domain (optional, for your website)
doroosy.com         A    YOUR_SERVER_IP
```

### 4.2 Verify DNS
```bash
# Test DNS resolution
nslookup api.doroosy.com
nslookup teacher1.doroosy.com

# Should both return your server IP
```

## Step 5: Nginx Configuration

### 5.1 Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/doroosy
```

### 5.2 Nginx Configuration File
```nginx
# API Subdomain Configuration
server {
    listen 80;
    server_name api.doroosy.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.doroosy.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/api.doroosy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.doroosy.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # API Proxy
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
}

# Teacher Subdomains (Complete Mode)
server {
    listen 80;
    server_name *.doroosy.com;
    
    # Exclude api subdomain
    if ($host = "api.doroosy.com") {
        return 444;
    }
    
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name *.doroosy.com;
    
    # Exclude api subdomain
    if ($host = "api.doroosy.com") {
        return 444;
    }
    
    # SSL Configuration (wildcard cert)
    ssl_certificate /etc/letsencrypt/live/doroosy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/doroosy.com/privkey.pem;
    
    # Serve your frontend for teacher portals
    root /var/www/doroosy-frontend;
    index index.html;
    
    # Try files first, then proxy API calls
    location / {
        try_files $uri $uri/ @frontend;
    }
    
    # API calls from teacher subdomains
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    @frontend {
        return 200 "Teacher Portal - $host";
        add_header Content-Type text/plain;
    }
}

# Main Domain (Optional)
server {
    listen 80;
    listen 443 ssl http2;
    server_name doroosy.com www.doroosy.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/doroosy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/doroosy.com/privkey.pem;
    
    # Your main website
    root /var/www/doroosy-main;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 5.3 Enable Site
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/doroosy /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

## Step 6: SSL Certificates

### 6.1 Install Certbot
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

### 6.2 Get Certificates
```bash
# For API subdomain
sudo certbot --nginx -d api.doroosy.com

# For wildcard (teacher subdomains) - requires DNS challenge
sudo certbot certonly --manual --preferred-challenges=dns -d "*.doroosy.com" -d "doroosy.com"

# Follow the instructions to add DNS TXT records
```

### 6.3 Auto-renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Add to crontab for auto-renewal
sudo crontab -e

# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Step 7: Application Deployment

### 7.1 Build Application
```bash
cd /opt/doroosy
go mod download
go mod tidy
go build -o doroosy-api cmd/api/main.go
```

### 7.2 Create Systemd Service
```bash
sudo nano /etc/systemd/system/doroosy-api.service
```

### 7.3 Service Configuration
```ini
[Unit]
Description=Doroosy API Server
After=network.target postgresql.service

[Service]
Type=simple
User=doroosy
Group=doroosy
WorkingDirectory=/opt/doroosy
ExecStart=/opt/doroosy/doroosy-api
Restart=always
RestartSec=5

# Environment
Environment=PATH=/usr/local/go/bin:/usr/bin:/bin
EnvironmentFile=/opt/doroosy/.env

# Security
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ReadWritePaths=/opt/doroosy/logs

[Install]
WantedBy=multi-user.target
```

### 7.4 Start Service
```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable doroosy-api

# Start service
sudo systemctl start doroosy-api

# Check status
sudo systemctl status doroosy-api
```

## Step 8: Testing Your Deployment

### 8.1 Test API Health
```bash
# Test API health endpoint
curl https://api.doroosy.com/health

# Expected response:
# {"status":"healthy","message":"Doroosy API is running"}
```

### 8.2 Test Authentication
```bash
# Test registration (Simple Mode)
curl -X POST https://api.doroosy.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "display_name": "Test User",
    "role": "student"
  }'

# Test registration (Complete Mode - with teacher slug)
curl -X POST https://api.doroosy.com/api/auth/register \
  -H "Content-Type: application/json" \
  -H "X-Teacher-Slug: ahmed" \
  -d '{
    "email": "student@example.com",
    "password": "password123",
    "display_name": "Student User",
    "role": "student"
  }'
```

### 8.3 Test Teacher Subdomains (Complete Mode)
```bash
# Test teacher subdomain access
curl https://ahmed.doroosy.com/api/health

# Should work and show teacher-specific context
```

### 8.4 Test New Features
```bash
# Test creating a note (requires authentication)
curl -X POST https://api.doroosy.com/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Note",
    "category": "Study",
    "color": "#4CAF50",
    "content": "This is a test note"
  }'

# Test getting notes
curl https://api.doroosy.com/api/notes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Step 9: Mode Switching

### 9.1 Switch to Simple Mode
```bash
# Update .env
sed -i 's/API_MODE=complete/API_MODE=simple/' /opt/doroosy/.env

# Restart API
sudo systemctl restart doroosy-api

# Test
curl https://api.doroosy.com/api/health
```

### 9.2 Switch to Complete Mode
```bash
# Update .env
sed -i 's/API_MODE=simple/API_MODE=complete/' /opt/doroosy/.env

# Restart API
sudo systemctl restart doroosy-api

# Test with teacher slug
curl -H "X-Teacher-Slug: ahmed" https://api.doroosy.com/api/courses
```

## Step 10: Monitoring & Logs

### 10.1 View Logs
```bash
# API logs
sudo journalctl -u doroosy-api -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 10.2 Health Monitoring
```bash
# Create a simple health check script
cat > /opt/doroosy/health-check.sh << 'EOF'
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" https://api.doroosy.com/health)
if [ $response -eq 200 ]; then
    echo "$(date): API is healthy"
else
    echo "$(date): API is down (HTTP $response)"
    sudo systemctl restart doroosy-api
fi
EOF

chmod +x /opt/doroosy/health-check.sh

# Add to crontab
echo "*/5 * * * * /opt/doroosy/health-check.sh >> /var/log/doroosy-health.log" | sudo crontab -
```

## Step 11: Frontend Integration

### 11.1 Update Frontend API Base URL

In your frontend application, update the API base URL:

```javascript
// Before
const API_BASE = 'https://doroosy.com/api';

// After
const API_BASE = 'https://api.doroosy.com/api';
```

### 11.2 Handle Teacher Context

```javascript
// For complete mode, detect teacher from subdomain
function getTeacherSlug() {
    const hostname = window.location.hostname;
    if (hostname.includes('.doroosy.com') && !hostname.startsWith('api.')) {
        return hostname.split('.')[0];
    }
    return null;
}

// Add teacher header for API calls
const teacherSlug = getTeacherSlug();
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

if (teacherSlug) {
    headers['X-Teacher-Slug'] = teacherSlug;
}
```

## Troubleshooting

### Common Issues:

1. **502 Bad Gateway**: API service not running
   ```bash
   sudo systemctl status doroosy-api
   sudo systemctl restart doroosy-api
   ```

2. **SSL Certificate Issues**: 
   ```bash
   sudo certbot renew
   sudo nginx -t && sudo systemctl reload nginx
   ```

3. **Database Connection Issues**:
   ```bash
   # Test database connection
   psql $DATABASE_URL -c "SELECT 1;"
   ```

4. **DNS Not Resolving**:
   ```bash
   # Check DNS propagation
   dig api.doroosy.com
   dig teacher1.doroosy.com
   ```

## Summary

After following this guide, you will have:

✅ **API running at**: `https://api.doroosy.com`  
✅ **Teacher portals at**: `https://teacher1.doroosy.com`, `https://teacher2.doroosy.com`  
✅ **Two operational modes**: Simple and Complete  
✅ **New features**: Video comments and student notes  
✅ **SSL certificates**: Automatic renewal  
✅ **Monitoring**: Health checks and logging  
✅ **Smooth mode switching**: No data loss  

Your API is now production-ready with the new architecture!
