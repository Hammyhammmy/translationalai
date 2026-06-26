---
name: deploy
description: Stage selected changes, commit, push to main, then purge the Cloudflare cache for translational.ca. Use when shipping site updates live.
user_invocable: true
---

# Deploy

Ship current site changes to production (GitHub → translational.ca via Cloudflare).

## Steps

1. **Survey the working tree.**
   - `git status --short`
   - `git diff --stat`
   - `git log --oneline -5` to match the project's commit style.

2. **Decide what to ship.** Show the user a short list:
   - Modified site files (`*.html`, `*.css`, `nav.js`, `favicon.svg`, `assets/*`).
   - Untracked files to add (new assets, new pages, new files under `.claude/skills/`).
   - Files that should **not** be staged: scratch notes at repo root (`*_tips.md`, `may*.md`, anything that looks like working notes), screenshots not used by the site, anything in `urology_clinic/` unless that's the intended target of the deploy.

3. **Draft a commit message** from the actual diff. Match recent commit tone (short imperative subject, ~50 chars, no body unless the change warrants one). Examples from this repo: `Fix privacy framework, scope stats, and label studies distinctly`, `Add OntarioMD 2026 talk to team page`.

4. **Confirm with the user** before committing. Show:
   - The exact file list to be staged
   - The draft commit message
   Wait for approval.

5. **Stage and commit.** Stage files by name — never `git add -A`, `git add .`, or `git commit -a`. Use a HEREDOC for the commit message:
   ```bash
   git commit -m "$(cat <<'EOF'
   <subject line>

   Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
   EOF
   )"
   ```

6. **Push.** `git push origin main`. This is the live deploy trigger.
   - If push is rejected (non-fast-forward), **stop** and ask. Do not force.

7. **Purge the Cloudflare cache.** Invoke the `purge-cache` skill — do not duplicate the curl logic here. The cache must be purged or the user won't see the change.

8. **Report.** Give the user:
   - The new commit hash
   - Confirmation cache purge succeeded
   - The live URL of the most relevant changed page so they can verify

## Safety

- **Never** stage `cloudflare_tokens.json` (gitignored, but verify before `git add`).
- **Never** use `git add -A`, `git add .`, `git commit -a`, `--no-verify`, `--force`, or `git reset --hard` without explicit user confirmation.
- If something looks like a secret (`.env`, `*_tokens.json`, `*.pem`), stop and flag it before staging.
- If the deploy includes a change to `urology_clinic/` or any subdirectory site, confirm that's intended — those are separate deploys.
