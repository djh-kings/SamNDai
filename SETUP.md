# Setup Instructions - Super Simple

## What You Need

1. GitHub account
2. Vercel account (free) - sign up at https://vercel.com
3. Anthropic API key - get from https://console.anthropic.com/settings/keys

---

## Part 1: Create GitHub Repository (5 minutes)

### Step 1: Create New Repo

1. Go to https://github.com
2. Click the **+** button (top right) → "New repository"
3. Name it: `SamNDai`
4. Make it **Public**
5. **DO NOT** check "Add README" or any other boxes
6. Click "Create repository"

### Step 2: Upload All Files

1. On the next page, you'll see "Quick setup"
2. Click the link that says: **"uploading an existing file"**
3. Drag ALL the files from this folder into the upload area:
   - `index.html`
   - `vercel.json`
   - `README.md`
   - `api` folder (with both files inside)
4. In the commit message box, type: "Initial commit"
5. Click "Commit changes"

**Your repo should now have:**
```
SamNDai/
├── index.html
├── vercel.json
├── README.md
└── api/
    ├── index.py
    └── requirements.txt
```

---

## Part 2: Deploy to Vercel (5 minutes)

### Step 1: Connect GitHub to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Find your `SamNDai` repository in the list
4. Click "Import"
5. **Don't change any settings** - just click "Deploy"
6. Wait 1-2 minutes for deployment to finish

### Step 2: Add Your API Key

1. After deployment succeeds, click "Continue to Dashboard"
2. Click "Settings" tab (top of page)
3. Click "Environment Variables" (left sidebar)
4. Click "Add New" button
5. Fill in:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Paste your API key (starts with `sk-ant-api03-...`)
   - **Environments:** Check all 3 boxes
6. Click "Save"

### Step 3: Redeploy

1. Click "Deployments" tab (top)
2. Click the three dots ⋯ on the top deployment
3. Click "Redeploy"
4. Click "Redeploy" again to confirm
5. Wait for it to finish

---

## Part 3: Test It Works (2 minutes)

### Test 1: Check Backend

1. Open your browser
2. Go to: `https://your-project-name.vercel.app/api/health`
   (Replace `your-project-name` with your actual Vercel URL)
3. You should see:
   ```
   {"status":"ok","message":"Sam backend is running","version":"2.1"}
   ```

✅ **If you see this = It works!**

### Test 2: Try the Full App

1. Go to your main URL: `https://your-project-name.vercel.app`
2. Upload a sample lesson plan (or paste text)
3. Click "Start Adaptation"
4. Sam should respond with questions

✅ **If Sam responds = Everything works!**

---

## Troubleshooting

### Problem: "Failed to fetch" error

**Solution:**
1. Check you added the API key (Part 2, Step 2)
2. Check you redeployed after adding the key (Part 2, Step 3)
3. Check `/api/health` endpoint returns OK

### Problem: Can't upload api folder to GitHub

**Solution:**
1. Upload files one at a time:
   - First: `index.html`, `vercel.json`, `README.md`
   - Then: Click "Add file" → "Create new file"
   - Type: `api/index.py`
   - Paste contents from your `api/index.py` file
   - Commit
   - Repeat for `api/requirements.txt`

### Problem: Vercel build fails

**Solution:**
1. Vercel → Deployments → Click failed deployment
2. Look at the red error messages
3. Usually means files in wrong location or syntax error
4. Check your GitHub repo matches the structure above

### Problem: API health check shows error

**Solution:**
1. API key not set → Add it in Vercel Settings → Redeploy
2. API key wrong → Check it starts with `sk-ant-api03-`
3. Still broken → Check Vercel "Runtime Logs" tab for errors

---

## What's Your Vercel URL?

After deployment, Vercel gives you a URL like:
- `https://sam-n-dai.vercel.app`
- or `https://sam-n-dai-djh-kings.vercel.app`

This is your permanent URL to share with colleagues!

---

## That's It!

Three parts:
1. ✅ Upload to GitHub
2. ✅ Deploy to Vercel
3. ✅ Add API key

Total time: ~15 minutes

---

## Need Help?

If something doesn't work:
1. Check the troubleshooting section above
2. Screenshot the error
3. Check Vercel logs (Runtime Logs tab)
4. Contact Dave

---

**You're done!** Share your Vercel URL with colleagues and start piloting! 🎉
