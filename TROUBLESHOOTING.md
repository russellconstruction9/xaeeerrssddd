# Troubleshooting Netlify Deployment

## Blank Screen Issue

If you're seeing a blank screen after deploying to Netlify, try these fixes:

### 1. Clear Browser Cache and Service Worker

The service worker might be caching a broken version. Clear it:

1. Open browser DevTools (F12)
2. Go to **Application** tab → **Service Workers**
3. Click **Unregister** for any registered service workers
4. Go to **Application** tab → **Storage** → **Clear site data**
5. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### 2. Check Build Logs

1. Go to Netlify dashboard → Your site → **Deploys**
2. Click on the latest deploy
3. Check the build logs for errors
4. Look for:
   - Missing dependencies
   - Build failures
   - Environment variable issues

### 3. Verify Environment Variables

1. Go to Netlify dashboard → Your site → **Site settings** → **Environment variables**
2. Verify `GEMINI_API_KEY` is set correctly
3. Make sure there are no extra spaces or quotes
4. Redeploy after adding/changing environment variables

### 4. Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for JavaScript errors
4. Common issues:
   - `Failed to fetch` - API/CORS issue
   - `process.env.API_KEY is undefined` - Environment variable not set
   - Module not found errors - Build issue

### 5. Verify Build Output

Make sure the build completes successfully:
- Check that `dist` folder contains:
  - `index.html`
  - `assets/` folder with JavaScript files
  - `manifest.json`
  - `icon.svg`
  - `service-worker.js`

### 6. Check Netlify Configuration

Verify `netlify.toml` exists and has:
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### 7. Force Rebuild

1. Go to Netlify dashboard → Your site → **Deploys**
2. Click **Trigger deploy** → **Clear cache and deploy site**

### 8. Check Node Version

Make sure Netlify is using Node 18:
- Check `netlify.toml` has `NODE_VERSION = "18"`
- Or set in Netlify dashboard: **Site settings** → **Build & deploy** → **Build environment**

### 9. Common Errors

**Error: "Cannot find module"**
- Solution: Make sure `node_modules` is committed or dependencies are in `package.json`

**Error: "process.env.API_KEY is undefined"**
- Solution: Set `GEMINI_API_KEY` in Netlify environment variables

**Error: "404 on routes"**
- Solution: Check that `public/_redirects` exists with `/* /index.html 200`

**Blank screen but no errors**
- Check browser console for JavaScript errors
- Verify assets are loading (check Network tab)
- Try disabling service worker temporarily

### 10. Test Locally First

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

If it works locally but not on Netlify, it's likely an environment variable or build configuration issue.

### 11. Get Help

If none of these work:
1. Check Netlify build logs for specific errors
2. Check browser console for JavaScript errors
3. Verify all files are committed to Git
4. Try creating a new Netlify site to test

