# /tdd — Test-Driven Development contract

# Usage
# /tdd <description of what you want to build>
# Example: /tdd add a "lock CPSO number" button that prevents changes after enrollment
# Example: /tdd fix the signal feed showing poster identity after expiry
#
# You can also say it naturally in conversation:
#   "I want to add an anonymity warning to the feed — /tdd it"
#   "Build the abuse cooldown override admin tool, make sure you /tdd it"
#
# This command tells Claude Code to follow strict TDD: write failing tests
# first, then implement until they pass. No implementation without a test.

You are working in TDD mode. Follow this contract strictly for every change.

---

## Step 0a: Open a tracked plan file

Before writing any test or code, create (or append to) a plan file at:

```
/Users/work/python-local/batsignal/active_features/plan_YYYY-MM-DD_<slug>.md
```

- `YYYY-MM-DD` is today's date (use the `currentDate` from the system reminder, not a guess).
- `<slug>` is a short kebab-case description of the work (e.g. `residency-workflow`, `mobile-case-entry`).
- If a plan file for the same work already exists from today, **append to it** — don't create a new one. If it's from a previous day and the work is continuing, create a new file and link back to the prior one at the top.

The plan file is the single source of truth for what you're doing under TDD. It must contain, and you must keep it updated as you go:

1. **Goal** — one paragraph: what behavior changes, why.
2. **Test layer(s) chosen** — backend / frontend / both, with reason (this is Step 0 below).
3. **Task list** — a checkbox list of slices, each small enough to be one red→green→refactor cycle. Example:
   - [ ] resident role can be created without an office link
   - [ ] medical-student role is blocked from POST /signals
   - [ ] mobile case-entry form renders procedure dropdown on viewport ≤ 480px
4. **Status log** — append a dated line every time you finish a slice, hit a blocker, or change direction. Keep it terse:
   - `2026-06-20 14:02 — slice 1 green (4 tests). moving to slice 2.`
   - `2026-06-20 14:31 — slice 2 blocked: residents table has FK to offices, needs migration. paused.`
5. **Out of scope** — anything you explicitly chose not to do this pass.

Mirror the task list into `TaskCreate` so progress shows in the live task tracker, but the plan file is the durable record. When a slice completes, check the box in the plan file **and** mark the TaskCreate task done.

Do not start Step 0 (classify) until the plan file exists and the task list is written.

---

## Step 0b: Coordination model — main chat orchestrates, sub-agents execute

For non-trivial work (more than one or two slices), the main chat is the orchestrator and sub-agents do the labor. This is not a workaround — it's the efficient mode for this codebase.

**Why this works.** The plan file + main chat already hold the cross-slice picture: dependencies, prior decisions, anonymity invariants, memory references, the user's running judgment calls. A sub-agent only needs the per-slice brief to do its slice well. Keeping orchestration in the main chat preserves the cross-slice context that would be expensive to repeat in every sub-agent prompt; pushing execution to sub-agents keeps the main chat's context window light and lets independent slices run in parallel.

**Inline vs. sub-agent — don't spin up agents needlessly, but don't conserve them either.** Choose by what actually fits the slice. Tokens and agent count are not the constraint — the right tool for the work is.

- **Inline (do it yourself in the main chat)** when:
  - The slice is small (a single-file edit, a tiny config tweak, a one-helper-plus-test change).
  - It needs heavy context already loaded in this chat (recent discussion, recent memory hits, recently-touched files).
  - The slice is the foundation everything else queues behind (a schema rename, a model addition that other slices read).
  - You'd spend more time briefing the agent than doing it yourself.

- **Background sub-agent** when:
  - The slice is independent of other in-flight slices (no shared files, no schema/contract dependency, no shared fixture pattern).
  - It can be briefed clearly with a test contract — no "go figure out" investigative work.
  - The slice is mechanically substantial but conceptually simple — e.g. a UI cleanup across N templates, a schema collapse with many call sites.
  - You have OTHER work to do in parallel (coordination, the user's next question, other slices to brief).

**The trap to avoid: needlessly spinning up agents.** Backgrounding a 30-line single-file edit because "I can" wastes context for both sides — the agent burns plan-read + re-grep just to do something the main chat could finish in two tool calls. If you find yourself writing a 40-line brief for a 30-line slice, do it inline.

**The opposite trap: artificially holding back when parallel makes sense.** If you have 4 truly independent slices ready to land (distinct files, no shared fixtures, all locked), kick 4 agents. Don't queue 2 of them for "later" out of caution — that's just slower for no reason.

**One agent, multiple slices — the underused pattern.** When 2–4 related slices share fixtures, helpers, or test seed patterns, ONE sequential agent doing all of them is usually faster than N parallel agents each re-discovering the shared context. Brief the single agent with the full slice list + the order; let it amortize the setup. (The R-series wave of 2026-06-21 — R.1+R.2+R.4 in one agent — was the right fit.)

**Verification cadence — match the rhythm to the work.** Per-slice TDD work needs pytest after each red→green→refactor cycle: each slice changes behavior, so you confirm before moving on. **But mechanical sweeps — cleanup, fixture catchup, mass renames, identical edits across N files — do NOT need per-file pytest.** When the brief is "do the same thing in 40 files," tell the agent to verify ONCE at the end of the sweep, not after every file. Per-file pytest in a mechanical sweep is mostly cold-import overhead (pytest startup ≫ test execution) and burns 10–15 min on what should be a one-shot final check. Concretely: in your brief, write "After all edits land, run the full suite once and report pre/post failure counts" — NOT "After editing each file, run that file's tests." (The 2026-06-22 specialty_id fixture sweep got this wrong — agent took ~15 min when 3–5 min was enough.)

**How to brief a sub-agent.** A sub-agent has zero conversation context. Its prompt must be self-contained. Include:

1. **The plan-file path** and which slice it owns. Tell it to read the plan first.
2. **The exact scope** — files in scope, files NOT to touch (the do-not-touch list from the plan).
3. **The test contract** — list the failing tests it must write FIRST, with test names and what each asserts.
4. **The commit format** — prefix, slice number, Co-Authored-By trailer.
5. **The discipline reminders** — venv path, test DB env var, dev cookie pattern, no-shims rule.
6. **The report format** — concise (≤200 words), with SHA + tests added + plan box checked.
7. **Parallel-collision warnings** — name the other in-flight slices and what files they touch, so the agent knows to leave those alone.

A good sub-agent brief reads like the slice spec in the plan file plus a few sentences of context. A bad one is "fix the thing" — that produces shallow work.

**Parallel safety — the file-overlap rule.** Never spawn two agents that write the same file. Even if their changes "should" be in different regions, working-tree races happen in this codebase (Group C absorbing Group B's uncommitted files has happened multiple times). The plan file's slice list should explicitly mark which slices share files; `/sequence` exists to map this when many slices are in flight.

**After a sub-agent completes.** Read the agent's REPORT (the final message it returns), not the JSONL transcript. The report tells you the commit SHA, the tests added, and any cross-agent collisions. Then:
- `git log -1` to verify the commit landed.
- Spot-check the diff if the report flagged anything unusual.
- Update the plan file's status log with a line referencing the sub-agent's SHA.
- Decide what to spawn next.

**When many slices are in flight.** Use `/sequence` to map dependencies and pick the parallel-safe set. The skill encodes the rules (schema-before-routes-before-templates, one agent per file, failed-fast over blocked-long).

**When the user asks "what's running right now?"** Use `/inflight` — it produces a tight digest of running agents + recently landed + queued + open plans. Designed for the case where the user can't easily phrase a more specific question.

**Caveat — the heredoc-commit collision pattern.** Sub-agents using heredoc-style `git commit -m "$(cat <<EOF ... EOF)"` sometimes absorb adjacent agents' uncommitted files into their commit. Mitigation: tell the sub-agent to use `git add <explicit-paths>` (never `git add .` or `git add -A`) and to `git status` before committing. Has happened multiple times in this repo; not a Claude bug, a working-tree race.

See also: memory `feedback_parallel_agents.md` (file-modified reminders may come from another agent in this repo), memory `feedback_no_compat_shims.md` (rip-and-repair, don't leave shims), the `/sequence` skill for cross-slice ordering.

---

## Step 0: Classify the work

Determine the test layer before writing anything:

- **Backend** (routes, services, models, Alembic migrations, APScheduler jobs, FCM senders, webhook delivery): use **pytest**
  - Place tests in `tests/` alongside existing test files
  - Use existing fixtures and patterns from the suite
  - Database tests hit real Postgres (`batsignal_dev` via the Cloud SQL Proxy) — see "No mocking the database" below
  - For background-job tests, use the APScheduler `BlockingScheduler` test pattern already in the suite

- **Frontend** (UI behavior, interactions, Vue components, HTMX swaps): use **Playwright via pytest**
  - Place tests in `tests/frontend/`
  - Use the `authed_page` fixture from `tests/frontend/conftest.py`
  - Requires dev server: `BATSIGNAL_DEV_MODE=true /Users/work/python-local/venv/bin/uvicorn batsignal.api.main:app --reload`
  - Run with: `pytest tests/frontend/ -v`

- **Both**: write tests in both layers (e.g., a new admin action with a backend route + UI button needs both)

State which layer(s) you chose and why before writing any code.

---

## Step 1: Write the failing test(s) FIRST

Write the test(s) that describe the desired behavior. The tests must:

- Be specific and assertive (exact status codes, exact UI states, exact values)
- Cover the happy path AND at least one edge case
- For anonymity-sensitive changes (anything touching `signals`, `matches`, feed serializers, push payloads): include an explicit test that asserts the poster identity does NOT leak in the response. See `batsignal-patterns.md` §4 (anonymity checklist).
- Be runnable immediately

Run the tests. They MUST fail. Paste the failure output.

If the tests pass before you've implemented anything, your tests are wrong — they're not testing the new behavior. Rewrite them.

---

## Step 2: Implement the minimum code to pass

Write only enough code to make the failing tests pass. Do not:

- Add features the tests don't cover
- Refactor unrelated code
- Add "nice to have" error handling
- Build abstractions beyond what the tests require

For backend changes: services never check auth — they receive `provider_id: int`. Auth/identity belongs in routes. (See `MEMORY.md` Important Patterns.)

For Alembic migrations driven by a model change: see `/postgres-migration`. The migration is part of the implementation — write the model + test + migration together.

**Apply the migration to BOTH databases before declaring done.** The conftest's `Base.metadata.create_all` will mint the new column in `batsignal_test` from the model alone — so tests can pass even if you forgot the migration. Production-parity requires running `alembic upgrade head` against `batsignal_dev` too, otherwise the running dev server will 500 the moment it queries the table:

```bash
# Test DB (covered by conftest, but run explicitly to surface a broken migration script):
BATSIGNAL_DATABASE_URL="postgresql+psycopg2://batsignal_user:<pw>@127.0.0.1:5432/batsignal_test" \
  /Users/work/python-local/venv/bin/alembic upgrade head

# Dev DB — the one the live uvicorn process queries:
BATSIGNAL_DATABASE_URL="postgresql+psycopg2://batsignal_user:<pw>@127.0.0.1:5432/batsignal_dev" \
  /Users/work/python-local/venv/bin/alembic upgrade head
```

Verify both with `alembic current` against each URL — both should report the same head revision before you commit the slice.

---

## Step 3: Run all tests, not just yours

```bash
# Backend
.venv/bin/pytest tests/<your_test_file>.py -v

# Frontend
.venv/bin/pytest tests/frontend/<your_test_file>.py -v

# Then the broader suite to check for regressions
.venv/bin/pytest tests/ -x --timeout=30 -q
```

Paste the output. All tests must pass — both new and existing. The current baseline is 149/149 (see `MEMORY.md`). If your change drops that number for any reason other than the new tests you added, something regressed.

---

## Step 4: Manual verification (if frontend)

If the change is user-facing, verify it in the browser:

1. Run the dev server: `BATSIGNAL_DEV_MODE=true .venv/bin/uvicorn batsignal.api.main:app --reload`
2. Act out the user flow in the browser (HTMX swap, Vue reactive update, page nav)
3. Describe what actually happened
4. If it doesn't match expectations — fix before continuing

For anonymity-sensitive UI changes (anything that displays signal data), open the responder view AND the poster view in two browser sessions. Confirm the responder cannot see the poster's identity until match acceptance.

---

## Step 5: Report

State clearly:
- How many tests were added
- How many pass
- What is NOT covered (edge cases, auth, production behavior, anonymity proof)
- Whether the broader test suite still passes (vs. the 149/149 baseline)
- **The path to the plan file** (`active_features/plan_YYYY-MM-DD_<slug>.md`) and which boxes are now checked.

Before ending the turn, update the plan file's status log with a final line for this session (what was finished, what's next).

---

## Rules

- **Ask confirmation questions in plain English.** When the plan file's "Lock before /tdd" step (or any mid-slice decision point) presents the user with options, write them the way you'd explain them to a clinician, not a code reviewer. Specifically:
  - **No engineering jargon as the surface word.** Use the verb-of-the-thing ("debounced", "boolean flag", "column nullable") only AFTER the plain-English version, never as the only framing. Bad: "Cap `notes` at 280 chars or unlimited?" Good: "How long can the note be — tweet-shaped (~280 chars), or as long as the user wants?"
  - **One concrete example per option.** "Cap at 280 chars" → "tweet-shaped, e.g. 'prefer texts after 4pm — Dr. Lin's assistant'". Hypothetical → concrete makes the choice obvious in seconds.
  - **State your default at the end of each question.** The user shouldn't have to opine on every knob — they confirm or override. Bad: "What length should we use?" Good: "My default: 280 chars. Override?"
  - **Group into a numbered list with max 3–4 items.** If a slice has 7 knobs, you haven't scoped tightly enough — re-bundle into one or two decisions and defer the rest to the slice's "Out of scope" section.
  - **When the user signals brain-fry** ("too much brain fry", "ask in laymans terms", "in plain English") — restate the open questions in shorter words, with a concrete example for each option, and your default for each. Don't make them re-read the original list.

- **Never write implementation before a failing test.** If you catch yourself doing it, stop, delete the implementation, write the test first.
- **One test file per feature.** Don't scatter new tests across existing files.
- **Test names describe behavior, not implementation.** `test_feed_does_not_expose_poster_provider_id` not `test_fix_bug_123`.
- **No mocking the database.** Tests hit the real `batsignal_dev` Postgres via the Cloud SQL Proxy. Mocked DB tests give false confidence on schema and migration changes (chartprep got burned this way 2026-05-27 — see `/postgres-migration`). Only mock the DB for code that genuinely cannot touch Postgres (e.g., unit-testing a pure function).
- **Migrate BOTH `batsignal_test` AND `batsignal_dev` before declaring done.** The test DB schema is minted from model metadata by conftest's `create_all`, so a passing test suite does NOT prove the migration applies cleanly. The dev DB only updates via `alembic upgrade head`. Skip it and the live dev server 500s on the first request that touches the new column (happened 2026-06-22 with slice P.1's `notes` column). Run `alembic current` against both URLs as the final check — same head revision in both, or you're not done. See Step 2 above for the explicit commands.
- **No mocking Firebase auth.** Use the existing `dev:` session-cookie pattern (`dev:{token}:{user_id}`) for backend tests; the `authed_page` fixture for frontend tests.
- **No skipping tests.** If a test can't run in the current environment, say so — don't `@pytest.mark.skip` it silently.
- **Don't `pytest -k` away failing tests** to make your branch "green." The whole suite must pass.
