


(venv) mac:lightemr work$ claude --dangerously-skip-permissions


btw we're in this branch..
(venv) mac:lightemr work$ git checkout claude/type-safe-alpine-HKGda
D       xstart.md
branch 'claude/type-safe-alpine-HKGda' set up to track 'origin/claude/type-safe-alpine-HKGda'.
Switched to a new branch 'claude/type-safe-alpine-HKGda'
Okay build it as per this plan. 
/Users/work/python-local/lightemr/.claude/commands/type-safe-alpine.md
 Do not stop or ask for input. If you hit an error, fix it and keep going. if you finish one phase keep going, commit after each phase but dont stop until everything is done.
 when we're down testing, merge back to main

 okay build it Do not stop or ask for input. If you hit an error, fix it and keep going. if you finish one phase keep going,




Read CLAUDE.md. Check git log and the current project files. Continue building Phase 1 from where it left off. Do not stop or ask for input.

==


Here's the full playbook:

**Right now — don't interrupt anything.** Let it finish whatever it's doing. When it completes its current task or hits a rate limit, that's when you make changes.

**Scenario 1: It finishes the current task successfully**

Type into the prompt:

```
/model claude-sonnet-4-6
```

/model claude-opus-4-6

Then:

```
Read CLAUDE.md. Check git log and the current project files. Continue building from where you left off. Do not stop or ask for input. If you hit an error, fix it and keep going. if you finish one phase keep going, commit after each phase but dont stop until everything is done.
```

**Scenario 2: It hits a rate limit mid-task**

You'll see a message like "rate limit exceeded" or "usage limit reached." Wait for the cooldown (usually resets on a rolling window — check the message for timing). Then:

```bash
claude --continue --dangerously-skip-permissions
```

This resumes the exact same conversation with full history. Then type:

```
/model claude-sonnet-4-6
```

Then:

```
Continue where you left off. Do not stop or ask for input.
```

**Scenario 3: You want to switch models right now without waiting**

Hit `Escape` to make sure the prompt is focused, then type:

```
Stop. Switch to Sonnet 4.6 for the rest of this build.
/model claude-sonnet-4-6
Continue building Phase 1 from where you left off. Check what files exist and what's been committed. Do not stop or ask for input.
```

**Scenario 4: Something goes wrong and you need a fresh start**

```
/exit
```

Then in terminal:

```bash
cd ~/python-local/lightemr
claude --dangerously-skip-permissions
```

Then:

```
/model claude-sonnet-4-6
Read CLAUDE.md. Check git log and the current files. Continue building Phase 1 from where it left off. Do not stop or ask for input. If you hit an error, fix it and keep going.
```

**Scenario 5: You come back hours later and it's just sitting there idle**

```bash
cd ~/python-local/lightemr
claude --dangerously-skip-permissions
```

```
/model claude-sonnet-4-6
Read CLAUDE.md. Run git log --oneline and check what files exist. Tell me what's been completed and what remains for Phase 1. Then continue building. Do not stop or ask for input.
```

**The cheat sheet version:**

| Situation | Command |
|---|---|
| Switch model | `/model claude-sonnet-4-6` |
| Resume last session | `claude --continue` |
| Skip all permission prompts | `claude --dangerously-skip-permissions` |
| Both | `claude --continue --dangerously-skip-permissions` |
| Check what's done | "Run git log --oneline and list all files" |
| Keep going | "Continue Phase 1, don't stop or ask for input" |
| Nuclear restart | `/exit` then `claude --dangerously-skip-permissions` |

The key thing: **nothing is ever lost.** Your code is on disk, your commits are in git. Any new session can look at what exists and pick up from there. The worst case is a few minutes of redundant work while it re-orients.