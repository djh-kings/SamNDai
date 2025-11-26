# Deployment Checklist

Print this or keep it open while you work!

## Before You Start

- [ ] I have a GitHub account
- [ ] I have a Vercel account (free signup at vercel.com)
- [ ] I have my Anthropic API key ready (from console.anthropic.com)

---

## Part 1: GitHub (5 min)

- [ ] Created new repo called `SamNDai`
- [ ] Uploaded all files (index.html, vercel.json, README.md, api folder)
- [ ] Verified files are in correct locations:
  - [ ] index.html in root
  - [ ] vercel.json in root
  - [ ] api/index.py exists
  - [ ] api/requirements.txt exists

---

## Part 2: Vercel (5 min)

- [ ] Connected GitHub repo to Vercel
- [ ] Clicked "Deploy" (first deployment)
- [ ] Deployment succeeded (green checkmark)
- [ ] Added environment variable `ANTHROPIC_API_KEY`
- [ ] Checked all 3 environment boxes
- [ ] Clicked "Save"
- [ ] Redeployed after adding API key
- [ ] Second deployment succeeded

---

## Part 3: Testing (2 min)

- [ ] Tested `/api/health` endpoint → Got "ok" response
- [ ] Loaded main page → Saw Sam interface
- [ ] Uploaded test lesson plan
- [ ] Clicked "Start Adaptation"
- [ ] Sam responded (no "Failed to fetch" error)

---

## All Done! ✅

If all boxes are checked, you're ready to:
- Share the URL with colleagues
- Start the pilot
- Gather feedback

---

## My Deployment Info

**GitHub Repo URL:**  
https://github.com/____________/SamNDai

**Vercel URL:**  
https://__________________________________.vercel.app

**API Key Added:** ☐ Yes ☐ No

**Working:** ☐ Yes ☐ No

**Date Deployed:** ___________________
