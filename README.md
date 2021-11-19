# @brightspace-ui/create

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui/create.svg)](https://www.npmjs.org/package/@brightspace-ui/create)

Initializer for Brightspace web components.

## Usage

Run the following command from the directory where the new component directory should be created (e.g., if desired end location is Documents/button, run from Documents). Github repo creation should be done separately and the steps there can be followed to add this new component to source control.

```
npm init @brightspace-ui
```

## Features

### Default

* Project boilerplate including: README, .editorconfig, .gitignore, package.json, CODEOWNERS and LICENSE (Apache-2.0)
* LitElement component scaffold
* Demo
* Linting (JavaScript, Style, Lit)
* Unit tests with SauceLabs cross-browser testing
* Continuous Integration using GitHub Actions
* Dependabot
* Publish to NPM

### Optional

* Localization (static or dynamic with optional Serge config)
* Visual diff testing*

\* Some additional setup required (see below)

## Additional Setup

### Visual Diff Testing

Visual diff results are published to a bucket in S3 and need special tokens to do so. To set these up, follow the instructions in the [visual-diff GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/visual-diff).

### Semantic Release

In order for the release workflow to automatically update the version, you need to add brightspace-bot as an admin using the following steps:
Settings -> Manage access -> Invite teams or people -> Add brightspace-bot

Learn more in the [action docs](https://github.com/BrightspaceUI/actions/blob/master/docs/branch-protection.md).

## Developing and Contributing

TODO:
* [ ] GitHub Actions integration for verify-translations
* [ ] Switch to @web/dev-server
* [ ] Switch to @web testing stuff

Pull requests welcome!

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`. Read on for more details...

The [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)
* Deploy a new package to NPM

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)
