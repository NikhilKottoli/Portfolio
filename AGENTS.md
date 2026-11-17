<!-- Auto-loaded by OpenCode every session. Mirrored from /home/azureuser/InstaBox/INSTRUCTIONS.md; keep the two in sync. -->

# InstaBox Multi-Project Instructions

**All work happens inside InstaBox.** The local folder `/home/azureuser/InstaBox` contains only this file and `ssh.txt` — no project code.

## Project Structure

Each project lives in its own folder on the **host machine** (`/home/azureuser/InstaBox/<project-name>/`) and is synced/cloned into InstaBox at `~/<project-name>/`.

```
/home/azureuser/InstaBox/
├── INSTRUCTIONS.md    # this file
├── ssh.txt            # SSH connection string
├── Portfolio/         # project folder on host (synced to InstaBox ~/Portfolio)
└── <other-project>/   # future projects
```

## Before starting any work:

1. **SSH into InstaBox:**
   ```bash
   ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p 2222 ibssh_5xnt4x3zjgfxiqhfx6rgdz6eam@ssh.instabox.sh
   ```

2. **Navigate to the project:**
   ```bash
   cd Portfolio   # or whatever project folder
   ```

3. **Do all work there** — edits, builds, tests, commits, everything.

## Adding a new project:

1. Create folder on host: `mkdir /home/azureuser/InstaBox/<project-name>`
2. Clone repo in InstaBox: `cd ~ && gh repo clone <owner>/<repo> <project-name>`
3. Work inside InstaBox at `~/<project-name>/`

## Current projects:

| Project | InstaBox Path | Host Folder | Type |
|---------|---------------|-------------|------|
| Portfolio | `~/Portfolio` | `/home/azureuser/InstaBox/Portfolio/` | Next.js + TS |

## Quick commands (inside project folder):
```bash
# Start dev server
npm run dev

# Build
npm run build

# Lint/typecheck
npm run lint
```

## Notes:
- GitHub CLI (`gh`) is authenticated in InstaBox
- Auto-suspend: 30 min idle (free plan default)
- Use `instabox auto-suspend <name> 0` to disable for a project
