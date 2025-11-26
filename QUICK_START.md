# Sam Tool - One Page Setup Guide

## 📦 What You Downloaded

A ZIP file with everything you need:
- Website (HTML)
- Backend (Python)
- Configuration files
- Instructions

---

## 🚀 Three Steps to Deploy

### STEP 1: GitHub (5 min)
```
Extract ZIP → Upload to GitHub → Done
```

1. **Extract** the ZIP file you downloaded
2. Go to **github.com** → Click **+** → **New repository**
3. Name it: `SamNDai`
4. Click **"uploading an existing file"**
5. **Drag ALL files** from the extracted folder
6. Click **Commit**

### STEP 2: Vercel (5 min)
```
Connect GitHub → Deploy → Add API Key → Redeploy
```

1. Go to **vercel.com/dashboard**
2. Click **"Add New" → "Project"**
3. Find your `SamNDai` repo → Click **Import** → Click **Deploy**
4. After success → **Settings** → **Environment Variables**
5. Add: `ANTHROPIC_API_KEY` = your key
6. Check all 3 boxes → **Save**
7. **Deployments** → Click ⋯ → **Redeploy**

### STEP 3: Test (2 min)
```
Open URL → Try it → Done!
```

1. Open: `https://your-project.vercel.app/api/health`
2. Should see: `{"status":"ok"}`
3. Open: `https://your-project.vercel.app`
4. Upload lesson plan → Click Start → Sam responds!

---

## ✅ Success Looks Like

- `/api/health` shows OK
- Main page loads without errors
- Sam responds when you upload a lesson plan
- No "Failed to fetch" errors

---

## 🆘 If Something's Wrong

**"Failed to fetch"**
→ API key not set or wrong
→ Vercel Settings → Environment Variables → Add key → Redeploy

**Build fails**
→ Files in wrong location
→ Check GitHub repo has `api` folder with both files

**API health shows error**
→ Check Vercel Runtime Logs tab
→ Usually API key issue

---

## 📋 Need More Help?

Open these files from the ZIP:
- `SETUP.md` - Detailed step-by-step with screenshots
- `CHECKLIST.md` - Print this and tick boxes as you go

---

## 🎯 Your URLs

After deployment, write them here:

**GitHub:** https://github.com/_____________/SamNDai

**Vercel:** https://_________________________.vercel.app

**Share this Vercel URL with colleagues!**

---

## ⏱️ Time Needed

- GitHub upload: 5 minutes
- Vercel setup: 5 minutes  
- Testing: 2 minutes
- **Total: ~15 minutes**

---

## 🎉 You're Done!

Once tested and working:
1. Share URL with pilot colleagues
2. Gather feedback
3. Monitor usage in Anthropic dashboard

---

**Questions?** Open SETUP.md for full instructions with troubleshooting.
