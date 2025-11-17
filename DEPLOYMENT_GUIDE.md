# Deployment Configuration Guide

## Changes Made

### 1. Spring Boot Configuration Updates
- Updated `application.properties` to use environment variables for deployment
- Added support for configurable database, JWT, Stripe, and email settings
- Added CORS configuration for production

### 2. Environment Files Created
- `.env.production` - Template for production environment variables
- `reactapp/.env.production` - Production API URL configuration
- `reactapp/.env.local` - Local development API URL configuration

## Deployment Steps

### Backend Deployment (Railway/Render)

1. **Set Environment Variables** in your deployment platform:
   ```
   DATABASE_URL=jdbc:mysql://your-production-db:3306/biophilic_db
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   JWT_SECRET=your_256bit_secret_key
   STRIPE_SECRET_KEY=sk_live_your_stripe_key
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   MAIL_HOST=smtp.gmail.com
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   ```

2. **Deploy using existing configuration**:
   - Railway: Uses `railway.json` with Dockerfile
   - Render: Uses Dockerfile directly

### Frontend Deployment (Vercel)

1. **Environment Variables** in Vercel:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api/v1
   ```

2. **Deploy using existing configuration**:
   - Uses `vercel.json` configuration
   - Builds from `reactapp` directory

## Current Deployment URLs
- Backend: https://biophilic-backend.onrender.com
- Frontend: Will be deployed to Vercel

## Local Development
- Backend runs on: http://localhost:8080
- Frontend runs on: http://localhost:3000
- Uses local MySQL database with your current credentials

## Security Notes
- Never commit real production secrets to version control
- Use strong, unique JWT secrets for production
- Use live Stripe keys only in production
- Configure proper CORS origins for your domains