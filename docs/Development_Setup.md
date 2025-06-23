# RIMSS E-Commerce Platform - Development Setup Guide

## Prerequisites

- Node.js (v16.x or higher)
- MongoDB (v5.0 or higher)
- Redis (v6.0 or higher)
- Git
- VS Code (recommended)

## Initial Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd shopingapp
```

### 2. Environment Setup

#### Client Environment (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
REACT_APP_GA_TRACKING_ID=your_ga_tracking_id
```

#### Server Environment (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rimss
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
REDIS_URL=redis://localhost:6379
```

### 3. Installation

#### Using Installation Scripts
Windows:
```bash
.\install.bat
```

Linux/Mac:
```bash
chmod +x install.sh
./install.sh
```

#### Manual Installation
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

## Development Workflow

### 1. Starting Development Servers

#### Client (Port 3000)
```bash
cd client
npm start
```

#### Server (Port 5000)
```bash
cd server
npm run dev
```

### 2. Database Setup
```bash
# Start MongoDB
mongod

# Seed database (from server directory)
npm run seed
```

### 3. Testing

#### Running Tests
```bash
# Client tests
cd client
npm test

# Server tests
cd server
npm test
```

#### Coverage Reports
```bash
# Client coverage
cd client
npm run test:coverage

# Server coverage
cd server
npm run test:coverage
```

## Code Quality Tools

### 1. ESLint
```bash
# Client linting
cd client
npm run lint

# Server linting
cd server
npm run lint
```

### 2. Prettier
```bash
# Format client code
cd client
npm run format

# Format server code
cd server
npm run format
```

## Building for Production

### 1. Client Build
```bash
cd client
npm run build
```

### 2. Server Build
```bash
cd server
npm run build
```

## Common Issues & Solutions

### 1. Node Module Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### 2. Port Conflicts
- Check if ports 3000 or 5000 are in use
- Kill existing processes or change ports in .env files

### 3. MongoDB Connection
- Ensure MongoDB service is running
- Check connection string in .env
- Verify network connectivity

## VS Code Extensions

### Recommended Extensions
- ESLint
- Prettier
- GitLens
- MongoDB for VS Code
- Thunder Client
- React Developer Tools

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Git Workflow

### 1. Branch Naming Convention
- feature/feature-name
- bugfix/bug-description
- hotfix/issue-description
- release/version-number

### 2. Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

### 3. Pull Request Process
1. Create feature branch
2. Make changes
3. Run tests and linting
4. Create pull request
5. Code review
6. Merge to development

## Deployment

### 1. Staging Deployment
```bash
# Build and deploy to staging
npm run deploy:staging
```

### 2. Production Deployment
```bash
# Build and deploy to production
npm run deploy:prod
```

## Monitoring & Debugging

### 1. Logging
- Client: Browser Console
- Server: Winston Logs
- Production: CloudWatch

### 2. Performance Monitoring
- React DevTools
- MongoDB Compass
- Redis Commander

## Security Guidelines

### 1. API Security
- Use environment variables
- Implement rate limiting
- Validate all inputs
- Use HTTPS in production

### 2. Authentication
- Implement JWT properly
- Use secure password hashing
- Enable 2FA where needed

## Documentation

### 1. API Documentation
- Available at: http://localhost:5000/api-docs
- Update Swagger annotations

### 2. Component Documentation
- Use JSDoc comments
- Update README files
- Maintain changelog

## Support

### 1. Internal Support
- Team chat: Discord/Slack
- Documentation: Confluence/Notion
- Issue tracking: JIRA

### 2. External Resources
- React docs: https://reactjs.org
- Express docs: https://expressjs.com
- MongoDB docs: https://docs.mongodb.com 