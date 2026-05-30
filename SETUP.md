# Getting started (Asje & organizers)

## 1. Enable Firebase services

In [Firebase Console](https://console.firebase.google.com/) for project `verifiedcampaigns-3f468`:

- **Authentication** → Email/Password → Enable
- **Firestore** → Create database (production mode)
- **Storage** → Get started

## 2. Deploy rules

```bash
cd verifiedcampaigns
firebase deploy --only firestore:rules,storage
```

## 3. Create admin account

1. Authentication → Users → Add user (Asje’s email + password)
2. Copy the user’s **UID**
3. Firestore → Start collection `admins` → document ID = that UID → field `email` (optional)

Repeat for each organizer who needs admin access.

## 4. Load campaigns

1. Sign in at https://verifiedcampaigns.org/admin
2. Click **Load sample data** (optional — demo campaigns)
3. Or **+ New campaign** → fill form → Save → Edit to upload screenshots/receipts/videos

## 5. Public site

Published campaigns appear on the home page, sorted **stunted first**. Donors click through to Chuffed/GoFundMe — no payments on this site.

## Local development with emulators

```bash
npm run emulators          # terminal 1
npm run dev:emulator       # terminal 2
```

Emulator UI: http://127.0.0.1:4000
