# Organizer guide

Plain steps for campaign managers — share as needed.

## Sign in

1. Open **https://verifiedcampaigns.org/admin**
2. Tap **Continue with Google** — use the Gmail address you were invited with
3. No password or email verification step

**First Google sign-in** on a new site becomes administrator automatically.

**Later accounts** need an invite: an existing admin enters your Gmail under **Invite organizer**, then you sign in with that same Google account.

## Add a campaign

1. Click **+ New campaign**
2. **Title** — as on Chuffed
3. **Donate link** — full Chuffed/GoFundMe URL
4. **Amount raised** — number from the page (slow fundraisers show first)
5. **Progress screenshot** — photo of the fundraiser page
6. **Organizer** — pick your name
7. Leave **Published** checked → **Save**

Update **amount raised** periodically so the contribution timeline on public cards stays accurate.

Optional: receipts and verification videos (private, for your records).

## Full guide in the app

After login: **Admin → Guide**

Public explanation for donors: **Verify** in the site header → `/how-we-verify`

---

# Developer setup

## 1. Enable Firebase services

In [Firebase Console](https://console.firebase.google.com/) for the project:

- **Authentication** → **Sign-in method** → **Google** → Enable  
  - Set support email if prompted  
  - Add `verifiedcampaigns.org` (and `localhost` for dev) to **Authorized domains** if needed
- **Firestore** → Create database (production mode)
- **Storage** → Get started

Use **Firestore**, not SQL Connect.

## 2. Deploy rules + hosting

```bash
cd verifiedcampaigns
firebase deploy --only firestore:rules,storage,hosting
```

## 3. Admin access

No manual UID copying.

- **First Google sign-in** → automatic admin (site bootstrap).
- **Invite others** → Admin → **Invite organizer** (Gmail address) → they sign in with Google.

Invites match on the Google account email (stored lowercase in `adminGrants/{email}`).

### Stuck on “Access pending”?

This screen means Google sign-in worked, but Firestore has no `admins/{your-uid}` document yet.

**Quick fix (you, as site owner):**

1. [Firebase Console](https://console.firebase.google.com/) → **Authentication** → Users → click your Google user → copy **User UID**
2. **Firestore** → collection **`admins`** → **Add document**
   - Document ID = that UID
   - Field: `email` (string) = your Gmail (e.g. `mearajbhagad@gmail.com`)
3. Return to `/admin/pending` → **Check again** → you should enter the dashboard

**If the site was never set up correctly** (bootstrap failed): Firestore may have `settings/site` but no admin. Either add `admins/{uid}` as above, or delete **`settings/site`** only (if no real admins exist), redeploy the app, sign in again — first Google sign-in should become admin.

Deploy updated rules after code changes: `firebase deploy --only firestore:rules,storage,hosting`

## Local emulators

```bash
npm run emulators          # terminal 1
npm run dev:emulator       # terminal 2
```

Google sign-in against emulators requires extra Auth emulator setup; for local admin work you can use the production Auth project with `npm run dev` or configure the Auth emulator in Firebase Console docs.

## Public site features (current)

- Lifeline-inspired dark campaign grid with progress screenshots
- **Contribution timeline** on each card (older left → newer right)
- Toolbar: sort order, date range (7/14/30/90 days, all time, custom), organizer, platform, verification, screenshots, search
- Default sort: **stunted first**; mock data when Firestore is empty

See `GOAL.md` for product principles derived from group discussion.
