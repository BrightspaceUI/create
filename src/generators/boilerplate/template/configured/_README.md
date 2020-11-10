# <%= name %>

[![NPM version](https://img.shields.io/npm/v/<%= packageName %>.svg)](https://www.npmjs.org/package/<%= packageName %>)
[![Dependabot badge](https://flat.badgen.net/dependabot/<%= githubOrg %>/<%= shortName %>?icon=dependabot)](https://app.dependabot.com/)
[![Build status](https://travis-ci.com/<%= packageName %>.svg?branch=master)](https://travis-ci.com/<%= packageName %>)

<%= labsChecklist %><%= description %>

## Installation

To install from NPM:

```shell
npm install <%= packageName %>
```

## Usage

```html
<script type="module">
    import '<%= packageName %>/<%= hyphenatedName %>.js';
</script>
<<%= tagName %>>My element</<%= tagName %>>
```

**Properties:**

| Property | Type | Description |
|--|--|--|
| | | |

**Accessibility:**

To make your usage of `<%= tagName %>` accessible, use the following properties when applicable:

| Attribute | Description |
|--|--|
| | |

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Running the demos

To start an [es-dev-server](https://open-wc.org/developing/es-dev-server.html) that hosts the demo page and tests:

```shell
npm start
```

### Linting

```shell
# eslint and lit-analyzer
npm run lint

# eslint only
npm run lint:eslint

# lit-analyzer only
npm run lint:lit
```

### Testing

```shell
# lint, unit test and visual-diff test
npm test

# lint only
npm run lint

# unit tests only
npm run test:headless

# debug or run a subset of local unit tests
# then navigate to `http://localhost:9876/debug.html`
npm run test:headless:watch
```

### Visual Diff Testing

This repo uses the [@brightspace-ui/visual-diff utility](https://github.com/BrightspaceUI/visual-diff/) to compare current snapshots against a set of golden snapshots stored in source control.

```shell
# run visual-diff tests
npm run test:diff

# subset of visual-diff tests:
npm run test:diff -- -g some-pattern

# update visual-diff goldens
npm run test:diff:golden
```

Golden snapshots in source control must be updated by Travis CI. To trigger an update, press the "Regenerate Goldens" button in the pull request `visual-difference` test run.

## Versioning, Releasing & Deploying

All version changes should obey [semantic versioning](https://semver.org/) rules.

Include either `[increment major]`, `[increment minor]` or `[increment patch]` in your merge commit message to automatically increment the `package.json` version
