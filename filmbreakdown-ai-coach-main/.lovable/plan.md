

# Auto-redirect Elite Athletes to Portal After Login

## Problem
Elite athletes currently land on the homepage (`/`) after login, but they have no use for it — their workspace is the Portal (`/portal`).

## Solution
After successful login in `Login.tsx`, fetch the user's role from `user_roles` before navigating. If the role is `elite_athlete` and there's no explicit `?redirect=` param set, navigate to `/portal` instead of `/`.

## Changes

### `src/pages/Login.tsx`
- After `signInWithPassword` succeeds, query `user_roles` for the logged-in user's role
- If role is `elite_athlete` AND `redirectTo` is the default `/`, navigate to `/portal`
- Otherwise, navigate to `redirectTo` as before (preserving explicit redirects)

### No other files need changes
The `AuthContext` already fetches the role — but Login needs the role immediately after sign-in (before context updates), so it will do a quick inline query.

