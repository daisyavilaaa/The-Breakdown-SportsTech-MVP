Elite athlete onboarding flow for football — 9-step guided form at /onboarding/elite

## Steps
1. Basic Identity (name, position)
2. Public Title (auto-suggested, editable, 60 char max)
3. Credibility Badges (level, experience type, achievements up to 3)
4. Areas of Expertise (position-specific skills, up to 5)
5. Recommended Clip Types (up to 4)
6. Example Questions (position-specific, up to 4)
7. Signature Value Statement (120 char max)
8. Submission Guide Preferences (toggles)
9. Profile Image Upload

## Key Files
- `src/data/footballPositions.ts` — all position data, skills, questions, clip types
- `src/pages/EliteOnboarding.tsx` — main onboarding page
- `src/components/onboarding/ProfilePreview.tsx` — live card preview
- `src/components/onboarding/ChipSelect.tsx` — reusable chip selector
- `src/components/onboarding/AddCustomField.tsx` — "add your own" input

## DB
- Table: `elite_profiles` — stores all onboarding data
- Images uploaded to `library-videos` bucket under `profile-images/` path

## Design
- Position-aware: skills, questions, title suggestions all change based on selected position
- Custom entries visually differentiated (italic) from curated options
- Live preview card on desktop right panel
- No auth required yet — public insert RLS
