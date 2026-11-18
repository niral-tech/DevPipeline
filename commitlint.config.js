// commitlint enforces the Conventional Commits standard on every commit message.
// A Git hook manager (husky) runs it on the commit-msg hook, so a non-conforming
// message is rejected locally BEFORE the commit is even created — never mind pushed.
//
// Remember: a local hook is ADVISORY, not a control. It can be bypassed
// (git commit --no-verify) or simply not installed. The real control is a
// server-side required check.
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
