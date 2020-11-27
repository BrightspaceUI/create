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

**Note that this will soon be in a Github action**

To do visual diff testing, the `GITHUB_RELEASE_TOKEN`, `VISUAL_DIFF_S3_ID`, and `VISUAL_DIFF_S3_SECRET` need to be encrypted into the .travis.yml file.

To learn more about how to set this up, see the [Running in CI](https://github.com/BrightspaceUI/visual-diff#running-in-ci) section of the visual-diff readme.

To use the Visual Difference Bot to run visual diff testing, see [here](https://github.com/BrightspaceUI/visual-difference-bot/blob/master/README.md/#utilizing-the-deployed-bot-for-your-existing-brightspace-repo).

## Developing and Contributing

Pull requests welcome!
