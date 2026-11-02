# Contributing to DevPipeline

Thanks for contributing! Please follow this process.

## Workflow
1. Create a short-lived branch off `main`.
2. Make small, focused commits.
3. Open a pull request into `main` with a clear body (problem, solution, verification).
4. Get an approving review and resolve all conversations.
5. Squash-merge, then delete the branch.

## Branch naming
- `feature/<short-description>` for new work
- `fix/<short-description>` for bug fixes
- `docs/<short-description>` for documentation

## Commit messages
- Imperative subject under ~50 characters (e.g. "Add coverage threshold").
- A blank line, then a body that explains **why**, not what.

## Before you open a PR
- The branch builds and tests pass locally.
- The PR links any issue it resolves (e.g. `Closes #12`).
