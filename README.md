# THE UPSC HINDU — PWA

Daily Current Affairs for UPSC, trusted like The Hindu. Now as installable Mobile PWA.

**Live today:** 18 Sep 2026 briefing with 12 real stories from The Hindu + PIB

## Features
- 📱 Installable PWA (Android + iOS)
- 🔌 Offline reading via Service Worker
- 📰 12 daily stories with GS mapping, Prelims traps, Mains angle
- 📝 Editorial Deep Dive (BRICS, UPI MDR)
- 🏛️ PIB & Schemes
- ❓ 10 Qs Prelims Quiz
- 📚 Revision Vault (localStorage)
- 🔍 Search + GS filter
- Bottom nav for thumb use

## Deploy in 30 seconds

### Option 1: Netlify Drop (Easiest - No account needed initially)
1. Go to https://app.netlify.com/drop
2. Drag and drop the entire folder containing `index.html`, `manifest.json`, `sw.js`, `icon-*.png`
3. You get a permanent URL like `https://upsc-hindu-123.netlify.app`
4. Open on phone → Install

### Option 2: Vercel (1 command)
```bash
npm i -g vercel
vercel --prod
# Follow prompts, choose current folder
```

### Option 3: GitHub Pages
```bash
git init
git add .
git commit -m "UPSC Hindu PWA"
# Create repo on GitHub, then:
git remote add origin YOUR_REPO_URL
git push -u origin main
# Enable Pages in repo settings -> Deploy from main branch
```

## Local Test
```bash
python3 -m http.server 8000
# Open http://localhost:8000
# Check PWA: DevTools > Application > Manifest
```

## Daily Update Workflow
To update for next day, ask your AI agent:
"Update my briefing for 19 Sep 2026"

It will re-search The Hindu + PIB and rebuild index.html, keeping your vault.

## PWA Checklist ✓
- [x] manifest.json with icons 192/512 maskable
- [x] sw.js with cache-first strategy
- [x] theme-color #b91c1c
- [x] apple-touch-icon
- [x] standalone display
- [x] offline fallback
- [x] install prompt handling
- [x] bottom nav safe-area

Built for UPSC 2027 aspirant, Kolkata.
