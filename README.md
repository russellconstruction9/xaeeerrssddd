<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa70016-6eaf-4a85-adb2-6e31a0763ed6" />
</div>

# CustodyX.AI

A neutral co-parenting incident tracker powered by AI to help divorced or separated parents log and analyze incidents.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` environment variable:
   - Create a `.env.local` file in the root directory
   - Add: `GEMINI_API_KEY=your_gemini_api_key_here`
   - Get your API key from: https://makersuite.google.com/app/apikey

3. Run the app:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## Deploy to Netlify

The app is configured for easy deployment to Netlify.

### Option 1: Deploy via Netlify UI

1. **Push your code to GitHub, GitLab, or Bitbucket**

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider and repository

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - These are already configured in `netlify.toml`, so Netlify should auto-detect them

4. **Add Environment Variable:**
   - Go to Site settings → Build & deploy → Environment variables
   - Add: `GEMINI_API_KEY` = `your_gemini_api_key_here`

5. **Deploy:**
   - Click "Deploy site"
   - Netlify will build and deploy your app automatically

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize and deploy:**
   ```bash
   netlify init
   netlify env:set GEMINI_API_KEY your_gemini_api_key_here
   netlify deploy --prod
   ```

### Environment Variables

The following environment variable is required:

- `GEMINI_API_KEY` - Your Google Gemini API key (required)

You can add this in Netlify's dashboard under Site settings → Build & deploy → Environment variables.

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
├── components/          # React components
├── constants/           # Constants and prompts
├── services/           # AI service layer (Gemini API)
├── public/             # Static assets
│   ├── _redirects      # Netlify SPA redirect rules
│   ├── manifest.json   # PWA manifest
│   ├── service-worker.js
│   └── icon.svg
├── App.tsx            # Main app component
├── vite.config.ts     # Vite configuration
└── netlify.toml       # Netlify deployment config
```

## Features

- 📝 **Incident Reporting** - AI-guided conversation to document co-parenting incidents
- 📊 **Pattern Analysis** - Identify recurring themes in incidents
- 🔍 **Deep Analysis** - Forensic analysis of individual incidents
- ⚖️ **Legal Assistant** - Ask questions and draft legal documents
- 📦 **Evidence Package Builder** - Create formal declarations for court
- 📚 **Document Library** - Store and organize legal documents
- 📅 **Calendar & Timeline** - Visualize incidents over time

## License

Private project
