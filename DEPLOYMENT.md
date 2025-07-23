# Weather App Deployment Guide

## Deploy to Netlify (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings will be auto-detected from `netlify.toml`

3. **Set Environment Variables:**
   - In Netlify dashboard: Site settings → Environment variables
   - Add: `REACT_APP_API_KEY` = `your_openweather_api_key`

4. **Deploy:**
   - Click "Deploy site"
   - Your app will be live at a Netlify URL

## Alternative: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set Environment Variables:**
   ```bash
   vercel env add REACT_APP_API_KEY
   ```

## Alternative: Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   "homepage": "https://yourusername.github.io/weather-app",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Environment Variables for Deployment

Make sure to set this environment variable in your deployment platform:
- `REACT_APP_API_KEY` = Your OpenWeather API key

## Build Command
```bash
npm run build
```

## Troubleshooting

- **API Key undefined**: Make sure environment variables are set in your deployment platform
- **Build fails**: Check that all dependencies are in `package.json`
- **Routes don't work**: Make sure redirects are configured (handled by `netlify.toml`)
