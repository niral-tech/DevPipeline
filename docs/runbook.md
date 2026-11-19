# DevPipeline Operational Runbook

Procedures a colleague must be able to perform **without the original author**.
Every procedure ends with a **verification** step — the task is not done until
you have confirmed it worked.

> Replace bracketed placeholders (`<...>`) with this repository's real values.

## 1. Trigger a manual deployment

Use when you need to deploy outside the automatic post-CI flow (e.g. re-deploy
a fix urgently).

1. Open the repo → **Actions** → the **Deploy to Pages** workflow.
2. Click **Run workflow**, select `main`, and confirm. (`deploy.yml` declares a
   `workflow_dispatch` trigger for exactly this purpose.)
3. Wait for the run to finish green.

If **Run workflow** is not offered, the workflow file on the default branch has no
`workflow_dispatch:` trigger — add one, or re-run the most recent successful
**Deploy** run instead.

**Verify:** open the live site at `https://niral-tech.github.io/DevPipeline/` and confirm the expected change
is visible (check the version line / a known string). A green badge is not proof.

## 2. Roll back a release

Use when a release is broken and you must return to the last known-good version.

1. Identify the last good release under **Releases** and note its tag (e.g. `v1.0.0`).
2. Find the commit that tag points to: `git rev-list -n 1 <tag>`.
3. Re-deploy that commit: in **Actions → Deploy to Pages**, open the run for that commit
   (match the commit message and short hash) and choose **Re-run all jobs**.
   Do not use **Run workflow** on `main` for this: it redeploys the current (bad) code.
4. Correct `main` so future releases are right: `git switch -c revert/<name>`, then
   `git revert <bad-commit> --no-commit` and
   `git commit -m "fix: revert <what you reverted>"`. Open a PR with the same conventional
   title and merge it. The `fix:` title makes the release tool cut a corrective patch release.

**Verify:** open the live site and confirm it shows the known-good version;
confirm the **Releases** page reflects the intended current release.

## 3. Rotate a secret

Use when a credential is compromised or on a scheduled rotation.

1. Generate the new credential value from its source system.
2. Repo → **Settings → Secrets and variables → Actions** → open the secret
   (e.g. `<SECRET_NAME>`) → **Update** with the new value. (You cannot read the
   old value back — you can only overwrite it.)
3. Revoke the old credential at its source once the new one is in place.

**Verify:** trigger a workflow run that uses the secret and confirm it succeeds
and that the secret still appears **masked** (`***`) in the log.

## 4. Add a new workflow

Use when extending the pipeline.

1. Create `.github/workflows/<name>.yml`.
2. Start with `permissions: contents: read`; add only what provably fails without it.
3. Pin every third-party action to a commit SHA with a version comment.
4. Open a PR so CI (and required checks) run against it before merge.

**Verify:** the new workflow runs green on the PR, and required checks still pass.

---

_Found a gap while following this runbook? Fix the step and commit the
correction — a tested-and-corrected runbook is the deliverable._
