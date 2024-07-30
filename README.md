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
* [GitHub Release and publish to NPM*](#semantic-release)

### Optional

* Localization
* [Visual diff testing*](#visual-diff-testing)
* [Test reporting*](#test-reporting)

\* Some additional setup required (see below)

## Additional Setup

### Visual Diff Testing

Visual diff results are published to a bucket in S3 and need special tokens to do so. To set these up, follow the instructions in the [vdiff GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/vdiff).

### Semantic Release

In order for the release workflow to automatically update the version, the repo needs to be configured with a `D2L_RELEASE_TOKEN`.

Learn more in the [action docs](https://github.com/BrightspaceUI/actions/blob/main/docs/release-token.md).

### Test Reporting

In order test reports to be submitted, the repo needs to be configured with `AWS_*` tokens with the correct permissions.

Learn more in the [action docs](https://github.com/Brightspace/test-reporting-action?tab=readme-ov-file#set-up).


## Developing and Contributing

TODO:
* [ ] GitHub Actions integration for verify-translations

Pull requests welcome!

### Versioning and Releasing

This repo is configured to use `semantic-release`. Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`.

To learn how to create major releases and release from maintenance branches, refer to the [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/semantic-release) documentation.
