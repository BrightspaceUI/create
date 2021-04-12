/* eslint-env node */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

const customLaunchers = {
	chrome: {
		base: 'SauceLabs',
		browserName: 'chrome',
		platform: 'macOS 11.00',
	},
	firefox: {
		base: 'SauceLabs',
		browserName: 'firefox',
		platform: 'macOS 11.00'
	},
	safari: {
		base: 'SauceLabs',
		browserName: 'safari',
		platform: 'macOS 11.00'
	},
	edge: {
		base: 'SauceLabs',
		browserName: 'microsoftedge',
		platform: 'Windows 10'
	}
};

module.exports = config => {
	const defaultConfig = createDefaultConfig(config);
	defaultConfig.browsers = []; // remove ChromeHeadless
	config.set(
		merge(defaultConfig, {
			files: [
				// runs all files ending with .test in the test folder,
				// can be overwritten by passing a --grep flag. examples:
				//
				// npm run test -- --grep test/foo/bar.test.js
				// npm run test -- --grep test/bar/*
				'node_modules/@brightspace-ui/core/tools/resize-observer-test-error-handler.js',
				{ pattern: config.grep ? config.grep : 'test/*.test.js', type: 'module' },
			],
			// see the karma-esm docs for all options
			esm: {
				// if you are using 'bare module imports' you will need this option
				nodeResolve: true,
			},
			sauceLabs: {
				testName: 'Unit Tests'
			},
			customLaunchers: customLaunchers,
			browsers: Object.keys(customLaunchers),
			reporters: ['saucelabs'],
			singleRun: true
		}),
	);
	return config;
};
