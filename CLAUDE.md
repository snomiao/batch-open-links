# CLAUDE.md

## Version Bumping

Always bump the version when making functional changes. Version must be updated in all of these files:
- `batch-open-links.user.js` (`@version` in the UserScript header)
- `package.json` (`"version"` field)

Use semver: patch for fixes, minor for features, major for breaking changes.
