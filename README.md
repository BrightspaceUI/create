# @brightspace-ui/create

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui/create.svg)](https://www.npmjs.org/package/@brightspace-ui/create)

Initializer for Brightspace web components.

## Usage

Run the following command from the directory where the new component directory should be created (e.g., if desired end location is Documents/button, run from Documents). GitHub repo creation should be done separately and the steps there can be followed to add this new component to source control.

```
npm init @brightspace-ui
```

## Features

### Default

* Project boilerplate including: README, .editorconfig, .gitignore, package.json, CODEOWNERS and LICENSE (Apache-2.0)
* Lit component scaffold
* Demo
* Linting (JavaScript, Style, Lit)
* Unit tests with cross-browser testing
* Continuous Integration using GitHub Actions
* Dependabot
* Publish to NPM

### Optional

* Localization
* Visual diff testing*

\* Some additional setup required (see below)

## Additional Setup

### Visual Diff Testing

Visual diff results are published to a bucket in S3 and need special tokens to do so. To set these up, follow the instructions in the [visual-diff GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/visual-diff).

### Semantic Release

In order for the release workflow to automatically update the version, you need to add `brightspace-bot` as an admin using the following steps:
Settings -> Manage access -> Invite teams or people -> Add brightspace-bot

Learn more in the [action docs](https://github.com/BrightspaceUI/actions/blob/main/docs/branch-protection.md).

## Developing and Contributing

TODO:
* [ ] GitHub Actions integration for verify-translations

Pull requests welcome!

### Versioning and Releasing

This repo is configured to use `semantic-release`. Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`.

To learn how to create major releases and release from maintenance branches, refer to the [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/semantic-release) documentation.
