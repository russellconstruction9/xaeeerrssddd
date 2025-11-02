# Netlify Deployment Guide

This guide will help you deploy CustodyX.AI to Netlify.

## Prerequisites

- A Netlify account ([Sign up here](https://app.netlify.com/signup))
- Your code pushed to GitHub, GitLab, or Bitbucket
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## Quick Deployment Steps

### 1. Connect Your Repository

1. Log in to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository

### 2. Configure Build Settings

Netlify will auto-detect settings from `netlify.toml`:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

If auto-detection doesn't work, manually set:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

### 3. Add Environment Variables

1. Go to **Site settings** → **Build & deploy** → **Environment variables**
2. Click **Add variable**
3. Add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key

### 4. Deploy

1. Click **Deploy site**
2. Wait for the build to complete
3. Your app will be live at `https://your-site-name.netlify.app`

## Post-Deployment

### Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Follow the DNS configuration instructions

### Continuous Deployment

- Every push to your main branch will trigger a new deployment
- Pull requests will create preview deployments

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Make sure `package.json` includes all dependencies
- Run `npm install` locally to verify

**Error: "GEMINI_API_KEY is not defined"**
- Verify the environment variable is set in Netlify
- Check that the variable name is exactly `GEMINI_API_KEY`

**Error: "404 on routes"**
- Verify `public/_redirects` file exists with `/* /index.html 200`
- Check that `netlify.toml` includes the redirects section

### Runtime Issues

**API calls failing:**
- Check that `GEMINI_API_KEY` is set correctly
- Verify the API key is valid and has quota remaining
- Check browser console for error messages

**Routes not working:**
- Ensure `_redirects` file is in the `public` folder
- Verify the redirect rule: `/* /index.html 200`

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Your Google Gemini API key |

## Support

For Netlify-specific issues, check:
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://answers.netlify.com/)

