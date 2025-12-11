# Deployment Guide

## Docker Setup

### Prerequisites
- Docker installed on your system
- Docker Compose (optional, for easier local testing)

### Building the Docker Image

```bash
# Build the image
docker build -t react-voting-app .

# Run the container
docker run -d -p 3000:80 react-voting-app
```

Access the application at `http://localhost:3000`

### Using Docker Compose

```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f
```

## GitHub Actions CI/CD Setup

### Required GitHub Secrets

To enable the CI/CD pipeline, add these secrets to your GitHub repository:

1. **DOCKER_USERNAME**: Your Docker Hub username
2. **DOCKER_PASSWORD**: Your Docker Hub password or access token

#### How to Add Secrets:
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret with its corresponding value

### CI/CD Pipeline Workflow

The pipeline consists of three jobs:

1. **Test Job**
   - Runs on every push and pull request
   - Installs dependencies
   - Runs ESLint
   - Builds the application
   - Uploads build artifacts

2. **Docker Job**
   - Runs only on push to main branch
   - Builds Docker image
   - Pushes to Docker Hub
   - Uses layer caching for faster builds

3. **Deploy Job**
   - Runs only on push to main branch
   - Placeholder for deployment steps
   - Customize based on your infrastructure

### Deployment Options

#### Option 1: Deploy to AWS ECS
Uncomment and configure the AWS deployment steps in the workflow file.

#### Option 2: Deploy to a VPS via SSH
Add these additional secrets:
- `SERVER_HOST`: Your server IP or domain
- `SERVER_USER`: SSH username
- `SERVER_SSH_KEY`: Private SSH key

Uncomment the SSH deployment step in the workflow.

#### Option 3: Deploy to Kubernetes
Add kubectl configuration and deployment manifests.

#### Option 4: Deploy to Vercel/Netlify
Use their respective GitHub Actions.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Production Considerations

1. **Environment Variables**: Add `.env` support if needed
2. **API Configuration**: Update base URLs for production APIs
3. **SSL/HTTPS**: Configure reverse proxy (Nginx/Traefik) with SSL certificates
4. **Monitoring**: Add application monitoring (e.g., Sentry, LogRocket)
5. **CDN**: Consider using a CDN for static assets
6. **Scaling**: Use orchestration tools (Kubernetes, Docker Swarm) for scaling

## Troubleshooting

### Docker Build Issues
```bash
# Clear Docker cache
docker builder prune -a

# Rebuild without cache
docker build --no-cache -t react-voting-app .
```

### GitHub Actions Issues
- Check the Actions tab in your repository for detailed logs
- Verify all required secrets are set correctly
- Ensure Docker Hub credentials are valid

## Security Notes

- Never commit sensitive data (API keys, passwords) to the repository
- Use environment variables for configuration
- Regularly update dependencies for security patches
- Use Docker security scanning tools
