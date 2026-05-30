# verifiedcampaigns.org

Public verified campaign directory for Gaza fundraisers — donors browse here and donate on Chuffed / GoFundMe / etc.

## Stack

Vite + React + TypeScript + Tailwind · Firebase (Hosting, Firestore, Storage, Auth)

## Docs

| File | Purpose |
|------|---------|
| [SETUP.md](./SETUP.md) | Organizer sign-in, developer setup, deploy |
| [GOAL.md](./GOAL.md) | Product requirements from group discussion |

## Commands

```bash
npm install
npm run dev              # local dev (Firebase production project)
npm run dev:emulator     # dev + Firestore/Storage emulators
npm run emulators        # emulators only
npm run build
npm run lint
firebase deploy --only firestore:rules,storage,hosting
```

## Admin

`/admin` — Google sign-in · first sign-in bootstraps admin · invite others by Gmail

## Public routes

- `/` — campaign grid
- `/how-we-verify` — donor-facing verification explanation
