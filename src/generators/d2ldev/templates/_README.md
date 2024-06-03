# <%= hyphenatedName %>

## Developing and Contributing

* Clone the repo
* Run `npx d2l-npm-login` to support private npm packages (note: this requires your Okta credentials)
* Run `npm install` to install dependencies
* Run `npm start` to run the local web-dev-server

## Releasing

After merging your code changes to the `main` branch, the `Publish` Github action will run and publish your changes to [<%= subdomain %>.d2l.dev](https://<%= subdomain %>.d2l.dev/).
