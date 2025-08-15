# Docker Setup for Doctor Consultation App

## Quick Start

### Development Environment
```bash
# Start development environment
docker-compose up app-dev

# Start with all services (MongoDB, Redis)
docker-compose up

# Start in background
docker-compose up -d
```

### Production Environment
```bash
# Start production environment
docker-compose --profile production up

# Build and start production
docker-compose --profile production up --build
```

## Services

### App Services
- **app-dev**: Development server on port 6000
- **app-prod**: Production server on port 6001

### Database Services
- **mongodb**: MongoDB database on port 27017
- **redis**: Redis cache on port 6379

### Infrastructure
- **nginx**: Reverse proxy on ports 80/443 (production only)

## Docker Commands

### Development
```bash
# Start development
docker-compose up app-dev

# View logs
docker-compose logs -f app-dev

# Stop development
docker-compose stop app-dev

# Rebuild and restart
docker-compose up --build app-dev
```

### Production
```bash
# Start production stack
docker-compose --profile production up -d

# View all logs
docker-compose --profile production logs -f

# Stop production
docker-compose --profile production down
```

### Database
```bash
# Start only database services
docker-compose up mongodb redis

# Access MongoDB shell
docker exec -it doctor-consultation-mongodb mongosh

# Access Redis CLI
docker exec -it doctor-consultation-redis redis-cli
```

### Maintenance
```bash
# Remove all containers and volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Clean up unused resources
docker system prune -a
```

## Environment Variables

### Development
```env
NODE_ENV=development
PORT=6000
DEBUG=*
```

### Production
```env
NODE_ENV=production
PORT=6000
```

### MongoDB
```env
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123
MONGO_INITDB_DATABASE=doctor_consultation
```

## Ports

- **6000**: Development app
- **6001**: Production app
- **27017**: MongoDB
- **6379**: Redis
- **80**: Nginx HTTP (production)
- **443**: Nginx HTTPS (production)

## Volumes

- **mongodb_data**: Persistent MongoDB data
- **redis_data**: Persistent Redis data
- **./nginx/ssl**: SSL certificates for HTTPS

## Health Checks

The application includes health checks that run every 30 seconds:
- Checks `/api/health` endpoint
- 3 retries before marking unhealthy
- 5 second startup grace period

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   netstat -an | findstr :6000
   
   # Kill the process or change port in docker-compose.yml
   ```

2. **Permission denied**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Container won't start**
   ```bash
   # Check logs
   docker-compose logs app-dev
   
   # Rebuild
   docker-compose up --build app-dev
   ```

4. **Database connection issues**
   ```bash
   # Check if MongoDB is running
   docker-compose ps mongodb
   
   # Restart database
   docker-compose restart mongodb
   ```

### Debug Mode
```bash
# Enable debug logging
docker-compose up app-dev

# View detailed logs
docker-compose logs -f app-dev
```

## Production Deployment

### With SSL
1. Place SSL certificates in `./nginx/ssl/`
2. Update nginx configuration
3. Start production stack:
   ```bash
   docker-compose --profile production up -d
   ```

### Without SSL
1. Comment out nginx service in docker-compose.yml
2. Start production stack:
   ```bash
   docker-compose --profile production up -d
   ```

## Monitoring

### Container Status
```bash
docker-compose ps
```

### Resource Usage
```bash
docker stats
```

### Health Status
```bash
docker inspect doctor-consultation-dev | grep Health -A 10
``` 