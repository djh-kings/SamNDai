# Sam ND AI - Neurodivergent Adaptations Tool

A web-based tool for adapting lesson plans and assessments for pupils with autism and PDA profiles.

## Quick Start

### Option 1: Deploy to Vercel (Recommended - 5 minutes)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign up/in with GitHub
   - Click "Add New Project"
   - Select your `SamNDai` repository
   - Click "Deploy"
   - Done! Your site will be live at `https://your-project-name.vercel.app`

3. **Use the tool:**
   - Visit your Vercel URL
   - Enter your Anthropic API key
   - Upload a lesson plan
   - Get adapted versions

### Option 2: GitHub Pages + Separate Backend (More Complex)

If you want to use GitHub Pages, you'll need to:
1. Deploy the HTML to GitHub Pages
2. Deploy the backend separately (Replit, Railway, etc.)
3. Update the `fetch('/api/claude')` call in `index.html` to point to your backend URL

## Repository Structure

```
SamNDai/
├── index.html          # Main application (frontend)
├── api/
│   └── claude.js       # Serverless function (Vercel backend)
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## Files to Upload

1. **index.html** - The main application file
2. **api/claude.js** - Serverless function for API proxy
3. **vercel.json** - Configuration for Vercel
4. **README.md** - Documentation

## How It Works

1. User uploads lesson plan in browser
2. Browser sends to `/api/claude` (Vercel serverless function)
3. Serverless function proxies to Anthropic API
4. Response returns through browser
5. User downloads adapted versions

## Why Vercel?

- ✅ Free tier is generous
- ✅ Automatic HTTPS
- ✅ GitHub integration (auto-deploy on push)
- ✅ Serverless functions included
- ✅ No server maintenance
- ✅ Fast global CDN

## Development

To test locally:
```bash
npm install -g vercel
vercel dev
```

## Cost

- Vercel hosting: Free
- Anthropic API: ~£0.05-0.10 per adaptation

## Security Notes

- API keys are sent from browser to your Vercel function only
- Keys are not stored server-side
- Keys are stored in browser localStorage for convenience
- SSL/HTTPS automatic via Vercel

## Support

For issues, contact the project maintainer.

## License

For educational use only.
