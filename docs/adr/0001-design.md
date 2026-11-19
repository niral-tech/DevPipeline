# ADR 0001 — DevPipeline CI/CD Design

Status: Accepted

## Context

DevPipeline needs a build-and-release pipeline that a small team can trust and
operate without its original author. The forces at play: changes must be checked
before they reach `main`; the site must ship without manual steps; the pipeline
itself must stay maintainable as it grows; dependencies and code must be kept
safe; and releases must be versioned consistently. We are constrained to
free-tier, cross-platform GitHub features (GitHub-hosted runners, Pages, Actions).

## Decision

Build a single pipeline on GitHub Actions with these components:

- **CI** — lint, test, and build on every push and pull request, with a Jest
  **coverage threshold** enforced.
- **A two-version build matrix** on the test job (Node 22 and 24 — the two
  currently supported LTS lines).
- **Continuous Deployment** to GitHub Pages from a workflow, after CI succeeds.
- **Reuse** — a reusable workflow plus a `setup-project` composite action, so
  setup is written once.
- **Defence** — CodeQL code scanning as a required check, and Dependabot with
  **grouped** updates for npm and github-actions.
- **Automated releases** — Conventional Commits + semantic-release, versioning
  and publishing Releases with no human choosing the number.
- **A tag-and-Release-only release**, deliberately not committing a `CHANGELOG.md`
  back to `main` (see Alternatives).

## Alternatives Considered

- **Branch-based Pages publishing** (Lesson 13). Rejected once a build step was
  involved: it cannot build, so the live site would drift from source or require
  committing built output.
- **Ungrouped Dependabot updates.** Rejected: one PR per package created so much
  noise that updates were ignored — worse than none.
- **Manual versioning / hand-written release notes.** Rejected: error-prone and
  inconsistent; machine-readable commits make it automatic and correct.
- **Continuous Delivery (a human approval gate before release).** Considered;
  we chose Continuous Deployment because the automated checks are trusted to
  gate releases. A team with higher-stakes releases might choose Delivery.
- **Committing a generated `CHANGELOG.md`** via `@semantic-release/changelog`
  and `@semantic-release/git`. Rejected: `main` is protected and requires a pull
  request, so the release job's push is refused (`GH006`). Making it work means
  granting an automated identity — `github-actions[bot]` via a ruleset bypass, or
  a PAT — permission to write to `main` without review. We judged that a poor
  trade for a file that duplicates the Release notes GitHub already renders.
  Revisit if a consumer ever needs the changelog in-tree.
- **Pinning to floating major tags** (`@v7`) instead of commit SHAs. Rejected:
  a tag is a pointer its owner can move, so the code that runs in CI could change
  without any change to this repository. Accepted cost: pins go stale, which is
  why Dependabot's `github-actions` ecosystem is enabled.

## Consequences

- **Easier:** every change is checked, the site always matches source, releases
  are consistent and automatic, and a new contributor inherits documented reasoning.
- **Harder / trade-offs:** the pipeline has more moving parts to understand;
  Continuous Deployment puts full weight on the checks, so weak tests ship bugs
  fast; pinned action SHAs must be updated deliberately.
- **Follow-ups:** keep the runbook current (see `docs/runbook.md`); revisit this
  ADR if the deployment target moves beyond Pages; and re-check the Node matrix
  against the Node.js release schedule at least once a year — nothing in this
  repository will warn us when an LTS line reaches end of life.
