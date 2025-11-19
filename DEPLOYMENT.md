# Deployment Guide - Sam ND AI Tool

## Files to Upload to GitHub

Upload these 6 files to your repository: https://github.com/djh-kings/SamNDai.git

### 1. File Structure

Create this folder structure:
```
SamNDai/
├── index.html
├── api/
│   └── claude.js
├── vercel.json
├── package.json
├── .gitignore
└── README.md
```

### 2. Upload Each File

**In GitHub web interface:**

1. Go to https://github.com/djh-kings/SamNDai
2. Click "Add file" → "Upload files"
3. Upload these files:
   - `index.html` (rename `index-for-github.html` to `index.html`)
   - `vercel.json`
   - `package.json`
   - `.gitignore`
   - `README.md`
   
4. Click "Create new file" → name it `api/claude.js`
   - Copy contents of `claude.js` into it
   - Commit the file

**Or using Git command line:**

```bash
cd /path/to/your/local/folder
git clone https://github.com/djh-kings/SamNDai.git
cd SamNDai

# Copy all files here
# Then:
git add .
git commit -m "Initial deployment"
git push origin main
```

---

## Deploy to Vercel (5 minutes)

### Step 1: Sign up for Vercel
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorise Vercel to access your GitHub

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Find `SamNDai` in your repository list
3. Click "Import"

### Step 3: Configure (leave defaults)
- Framework Preset: Other
- Build Command: (leave blank)
- Output Directory: (leave blank)
- Click "Deploy"

### Step 4: Wait for deployment
- Takes 1-2 minutes
- You'll see a success screen with your URL
- Example: `https://sam-nd-ai.vercel.app`

### Step 5: Test It
1. Visit your Vercel URL
2. Enter your Anthropic API key (from https://console.anthropic.com)
3. Upload a lesson plan
4. Should work perfectly!

---

## What Vercel Does

1. **Hosts your HTML** - Serves `index.html` globally via CDN
2. **Runs serverless function** - The `api/claude.js` function proxies API calls
3. **Automatic HTTPS** - SSL certificate included
4. **Auto-deploy** - Every time you push to GitHub, Vercel redeploys
5. **Free tier** - Plenty of capacity for your pilot

---

## Troubleshooting

### "Failed to fetch" error
- Check the Vercel function logs (Vercel dashboard → your project → Functions tab)
- Make sure you're using the right API key

### Model errors
- Ensure your Anthropic API key has access to Claude Sonnet 4
- Check https://console.anthropic.com → Settings → Plan

### Files not uploading
- Make sure the `api` folder exists
- `claude.js` must be in `api/claude.js` (not root)

---

## Updating the Tool

When you want to make changes:

1. Edit files locally or on GitHub
2. Push to GitHub (`git push`)
3. Vercel automatically redeploys
4. Changes live in ~30 seconds

---

## Cost Breakdown

- **Vercel hosting**: £0 (free tier: 100GB bandwidth/month, plenty for pilot)
- **Vercel serverless**: £0 (free tier: 100,000 invocations/month)
- **Anthropic API**: ~£0.05-0.10 per adaptation

**Total for 50 adaptations**: ~£2.50-5.00/month

---

## Next Steps

1. ✅ Upload files to GitHub
2. ✅ Deploy to Vercel
3. ✅ Test with one lesson plan
4. ✅ Send to your 2 pilot testers
5. ✅ Monitor usage in Anthropic console

---

## For Your Pilot Testers

Once deployed, send them:
1. **The Vercel URL** (e.g., `https://sam-nd-ai.vercel.app`)
2. **The shared API key** (in separate email)
3. **The Pilot Setup Guide** (already created)

They just:
- Visit the URL
- Paste API key
- Upload lesson plan
- Download adapted versions

No installation, no Python, no Replit - just a URL!

---

## Support

If something goes wrong:
- Check Vercel logs (dashboard → your project → Logs)
- Check Anthropic console for API errors
- Check browser console (F12) for JavaScript errors

---

**Ready to deploy!**
