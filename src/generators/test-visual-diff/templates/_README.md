
### Visual Diff Testing

This repo uses the [@brightspace-ui/visual-diff utility](https://github.com/BrightspaceUI/visual-diff/) to compare current snapshots against a set of golden snapshots stored in source control.

The golden snapshots in source control must be updated by GitHub Actions.  If your PR's code changes result in visual differences, a draft PR with the new goldens will be automatically opened for you against your branch.

If you'd like to run the tests locally to help troubleshoot or develop new tests, you can use these commands:

```shell
# install dependencies locally
npm install mocha puppeteer @brightspace-ui/visual-diff --no-save
# run visual-diff tests
npx mocha './test/**/*.visual-diff.js' -t 10000
# subset of visual-diff tests:
npx mocha './test/**/*.visual-diff.js' -t 10000 -g some-pattern
# update visual-diff goldens
npx mocha './test/**/*.visual-diff.js' -t 10000 --golden
```
