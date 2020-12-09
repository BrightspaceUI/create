# @brightspace-ui/create

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
* Publish to NPM

### Optional

* Localization (static or dynamic with optional Serge config)
* Visual diff testing*

\* Some additional setup required (see below)

## Additional Setup

### Visual Diff Testing

Visual diff results are published to a bucket in S3 and need special tokens to do so. To set these up, follow the instructions in the [visuald-iff GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/visual-diff).

## Developing and Contributing

TODO:
* [ ] Dependabot
* [x] GitHub Actions integration for visual-diff
* [ ] GitHub Actions integration for verify-translations
* [ ] Switch to @web/dev-server
* [ ] Switch to @web testing stuff

Pull requests welcome!
