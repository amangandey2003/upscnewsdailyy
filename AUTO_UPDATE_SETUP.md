# 🚀 Auto-Update Setup for extraordinary-empanada-1661c9.netlify.app

Your site is live! Now make it auto-update daily at 6 AM IST.

## Option A: Easiest (Recommended) - GitHub → Netlify Auto-Deploy

This makes your Netlify site update automatically whenever GitHub repo updates.

### Step 1: Create GitHub Repo
1. Go to https://github.com/new
2. Name: `upsc-hindu-pwa`
3. Make Public (for free Netlify link)
4. Don't initialize with README
5. Click Create

### Step 2: Push your code to GitHub
In your terminal, inside the `deploy-ready` folder:

```bash
git init
git add .
git commit -m "Initial UPSC Hindu PWA - Sep 18 briefing"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/upsc-hindu-pwa.git
git push -u origin main
```

Replace YOUR_USERNAME with your GitHub username.

### Step 3: Link Netlify to GitHub
1. Go to your Netlify project: https://app.netlify.com/projects/extraordinary-empanada-1661c9/configuration
2. Click **"Link to GitHub"** or **"Connect to Git"**
3. Select your `upsc-hindu-pwa` repo
4. Build settings: Leave empty (it's static), Publish directory: `.` or `deploy-ready`
5. Save

Now, whenever you push to GitHub, Netlify auto-deploys in 30 seconds!

### Step 4: Enable Daily Auto-Update Workflow
1. In your GitHub repo, go to **Actions** tab → Enable workflows
2. The file `.github/workflows/daily-update.yml` will run daily at 6 AM IST automatically
3. You can also run it manually: Actions → Daily UPSC Briefing Auto-Update → Run workflow

### Step 5: Daily Workflow (2 options)

**Option 1: Fully Automatic (RSS-based)**
- The workflow runs `scripts/update_briefing.py` which fetches The Hindu RSS
- It updates `last-update.json` and commits
- Netlify auto-deploys

**Option 2: AI-Powered (Best Quality) - Recommended**
- Every morning, come to Arena and say: "Update my briefing for today for extraordinary-empanada-1661c9"
- I will search The Hindu + PIB with web_search, rebuild index.html with fresh GS-mapped data
- I will push to your GitHub → Netlify auto-deploys
- This gives you The Hindu-quality analysis, not just RSS titles

---

## Option B: Netlify API Token (No GitHub link needed)

If you don't want to link GitHub:

1. Get Netlify token: https://app.netlify.com/user/applications#personal-access-tokens → New access token
2. Get Site ID: Project overview → Site ID (copy)
3. In GitHub repo → Settings → Secrets → New secret:
   - `NETLIFY_AUTH_TOKEN` = your token
   - `NETLIFY_SITE_ID` = your site ID
4. Workflow will trigger deploy via API

---

## Push Notifications for Daily Alert

The workflow also sends push via free ntfy.sh:

1. Install **ntfy** app on phone (Android/iOS)
2. Subscribe to topic: `upsc-hindu-YOUR_GITHUB_USERNAME`
3. You'll get push at 6 AM: "Your briefing is ready"

Or enable in-app notifications: Open https://extraordinary-empanada-1661c9.netlify.app → Click "Enable 6 AM Alert"

---

## Test Auto-Deploy Now

1. In GitHub repo → Actions → Daily UPSC Briefing Auto-Update → Run workflow
2. Check Netlify Deploys tab → Should show new deploy in 1 min
3. Open your site → Should show updated date

---

## Daily Routine After Setup

**Morning (Automatic):**
- 6:00 AM IST: GitHub Action runs → Netlify deploys → You get push notification
- Open https://extraordinary-empanada-1661c9.netlify.app → Fresh briefing

**Evening (Optional, for best quality):**
- Come to Arena: "Update briefing for today"
- I rebuild with full The Hindu editorial analysis + quiz
- Push to GitHub → Live in 30 sec

Your site will never say "sandbox not found" again — it's permanent and auto-updating!

---

Questions? Ask in Arena.
