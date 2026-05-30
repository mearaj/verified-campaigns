# Project TODO List (Derived From Discussion)

## 1. Project Purpose
- Build a **public website** that lists **verified fundraising campaigns** for Gaza families.
- The website **does not collect donations**.
- Each campaign links **directly to the original fundraising platform**.
- The website acts as a **neutral, transparent campaign index / compendium**.
- The project exists as an **alternative/complement** to platforms such as:
  - lifeline4gaza
  - LiveGaza
  - Viva Community
  - Other platform-curated or influencer-driven listings

---

## 2. Motivation / Context (Why This Is Needed)
- Existing platforms (e.g. LiveGaza, Viva, Radio Watermelon–verified lists) have:
  - Inconsistent or inaccurate verification
  - Platform or influencer bias
  - Exclusion of valid campaigns despite organizer verification
- Families should not be disadvantaged due to:
  - Lack of platform approval
  - Lack of social media influence
- This project aims to ensure **equality, fairness, and transparency**.

---

## 3. Core Principles (Must Be Preserved)
- Verification is **organizer-based**, not platform-based.
- No dependence on LiveGaza, Viva, Radio Watermelon, or similar platforms for legitimacy.
- Equality and fairness: **no discrimination due to influence or popularity**.
- Manual control over visibility and ordering.
- Transparency for donors.
- Ability to prevent scams.

---

## 4. Website Scope (What the Site Must Do)

### Public (Donors / Visitors)
- Display a list of fundraising campaigns.
- Show **stunted campaigns first**, followed by others (similar to lifeline4gaza behavior).
- For each campaign, display:
  - Family name
  - Organizer name
  - Short family story
  - Verification status (internal/organizer-based)
  - Priority label (e.g. stunted / urgent)
  - Screenshot(s) showing fundraising progress
  - External link to the original fundraiser (donation happens off-site)
- Allow users to open a **campaign detail page** with more information.

---

### Admin / Organizers (Internal Use)
- Sign in with **Google** (Gmail) — no passwords
- First sign-in bootstraps admin; later users invited by Gmail address
- Verify organizers (manual process).
- Add campaigns under organizers.
- Verify campaigns independently of LiveGaza / Viva / Radio Watermelon.
- Set campaign priority (stunted / urgent / normal).
- Upload or update fundraiser progress screenshots.
- Remove or disable campaigns or organizers if scams are detected.

---

## 5. Data & Structure Requirements
- Maintain a **central database** of:
  - Organizers
  - Families / campaigns
- Structure follows a **tree model**:
  - Organizer → multiple family campaigns
- Database is the foundation (can start spreadsheet-like).

---

## 6. Verification Requirements
- Organizers are verified manually by trusted people.
- Families are verified through organizers.
- Campaigns may be listed even if:
  - They are not verified by LiveGaza
  - They are not verified by Radio Watermelon
  - They are not included in Viva Community
- Unknown organizers can apply but must be reviewed before inclusion.

---

## 7. Visibility & Ordering Rules
- No algorithm based on likes, shares, or social media influence.
- Campaign order is **manually controlled**.
- “Stunted” campaigns must be highlighted and shown first.
- Visibility decisions must not be affected by:
  - Platform affiliation
  - Influencer promotion
  - External verification labels

---

## 8. Transparency for Donors
- Show visual proof of fundraising progress (screenshots).
- Clearly indicate:
  - Who organized the campaign
  - That verification is internal and organizer-based
- Avoid misleading claims tied to external platforms.

---

## 9. Promotion (Out of System Logic)
- Ambassadors or high-follower accounts may promote campaigns externally.
- Promotion **does not affect verification or ordering** on the website.
- Social media influence must not control inclusion or visibility.

---

## 10. Explicitly Out of Scope
- No on-site donation processing.
- No donor accounts.
- No comments, likes, or social features.
- No automatic or algorithmic verification.
- No ranking based on popularity or engagement.
- No dependency on LiveGaza, Viva, Radio Watermelon, or fundraising platform APIs.

---

## 11. Long-Term Intent (Not Required Immediately)
- Ability to onboard more organizers over time.
- Ability to guide and train new organizers.
- Maintain trust, fairness, and equality as the system grows.
