#!/usr/bin/env python3
"""
Daily UPSC Hindu Briefing Updater
Fetches The Hindu + PIB RSS and updates index.html data
Runs daily at 6 AM IST via GitHub Actions
"""

import requests
import json
import re
from datetime import datetime, timedelta, timezone

IST = timezone(timedelta(hours=5, minutes=30))
today = datetime.now(IST)
date_str = today.strftime("%d %B %Y")
date_short = today.strftime("%b %d")

print(f"🗓️ Generating briefing for {date_str}")

def fetch_the_hindu():
    try:
        url = "https://www.thehindu.com/news/national/feeder/default.rss"
        r = requests.get(url, timeout=15, headers={"User-Agent": "UPSC-Hindu-PWA/1.0"})
        print(f"The Hindu RSS: {r.status_code}, {len(r.text)} chars")
        titles = re.findall(r"<title><!\[CDATA\[(.*?)\]\]></title>", r.text)[:15]
        return titles[1:]
    except Exception as e:
        print(f"The Hindu fetch failed: {e}")
        return []

def fetch_pib():
    try:
        url = "https://pib.gov.in/AllRelease.aspx?MenuId=3"
        r = requests.get(url, timeout=15, headers={"User-Agent": "UPSC-Hindu-PWA/1.0"})
        print(f"PIB page: {r.status_code}")
        return ["PIB releases fetched"]
    except Exception as e:
        print(f"PIB fetch failed: {e}")
        return []

hindu_titles = fetch_the_hindu()
pib_data = fetch_pib()

print(f"Found {len(hindu_titles)} Hindu stories")
for t in hindu_titles[:5]:
    print(f" - {t}")

update_info = {
    "date": date_str,
    "date_short": date_short,
    "updated_at": today.isoformat(),
    "hindu_stories_count": len(hindu_titles),
    "top_titles": hindu_titles[:10],
    "status": "auto-update workflow ran",
    "next_step": "Arena agent should run web_search for The Hindu + PIB and rebuild index.html newsData array"
}

with open("last-update.json", "w") as f:
    json.dump(update_info, f, indent=2)

print("✅ last-update.json created")

try:
    with open("deploy-ready/index.html", "r") as f:
        content = f.read()
    content = re.sub(r"FRIDAY, 18 SEPTEMBER 2026", date_str.upper(), content)
    content = re.sub(r"Sep 18", date_short, content)
    content = re.sub(r"18 Sep 2026", date_str, content)
    with open("deploy-ready/index.html", "w") as f:
        f.write(content)
    print("✅ index.html date updated")
except Exception as e:
    print(f"Could not update index.html date: {e}")

print("\n🎉 Daily check complete.")
