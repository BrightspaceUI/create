#!/usr/bin/env node

/* eslint-disable no-console */
import prompts from 'prompts';
import { run as setupDefaultContent } from './generators/default-content/index.js';
import { run as setupDemo } from './generators/demo/index.js';
import { run as setupElement } from './generators/wc-lit-element/index.js';
import { run as setupLocalization } from './generators/localization/index.js';
import { run as setupRelease } from './generators/release/index.js';
import { run as setupTestUnit } from './generators/test-unit/index.js';
import { run as setupTestVdiff } from './generators/test-vdiff/index.js';

function getClassName(hyphenatedName) {
	const hyphenRemoved = hyphenatedName.replace(/-([a-z])/g, (g) => { return g[1].toUpperCase(); });
	return hyphenRemoved.charAt(0).toUpperCase() + hyphenRemoved.slice(1);
}

async function getOptions() {
	const questions = [
		{
			type: 'text',
			name: 'hyphenatedName',
			message: 'What would you like to name your component? Use hyphenation instead of camelcase. Do not include the d2l prefix.'
		},
		{
			type: 'select',
			name: 'org',
			message: 'Is this a labs or official component?',
			choices: [
				{ title: 'labs', value: 'labs' },
				{ title: 'official', value: 'official' }
			]
		},
		{
			type: 'text',
			name: 'description',
			message: 'What is the component description?'
		},
		{
			type: 'text',
			name: 'codeowners',
			message: 'What is/are the GitHub username(s) of the codeowner(s)? (e.g., @janesmith, @johnsmith)'
		},
		{
			type: 'select',
			name: 'vdiff',
			message: 'Would you like vdiff tests set up?',
			choices: [
				{ title: 'Yes', value: true },
				{ title: 'No', value: false }
			]
		},
		{
			type: 'select',
			name: 'localization',
			message: 'Would you like localization set up?',
			choices: [
				{ title: 'Yes', value: true },
				{ title: 'No', value: false }
			]
		},
	];
	return await prompts(questions, {
		onCancel: () => {
			process.exit();
		},
	});
}

async function executeGenerator() {

	const options = await getOptions();

	/**
	 * hyphenatedName = my-element
	 * className = MyElement
	 * tagName = d2l-my-element
	 */
	options.hyphenatedName = options.hyphenatedName.toLowerCase();
	options.className = getClassName(options.hyphenatedName);
	options.tagName = `d2l-${options.org === 'labs' ? 'labs-' : ''}${options.hyphenatedName}`;

	options.githubOrg = options.org === 'official' ? 'BrightspaceUI' : 'BrightspaceUILabs';
	options.orgName = options.org === 'official' ? '@brightspace-ui' : '@brightspace-ui-labs';
	options.packageName = `${options.orgName}/${options.hyphenatedName}`;

	setupDefaultContent(options);
	setupElement(options);
	setupTestUnit(options);
	if (options.vdiff) setupTestVdiff(options);
	setupDemo(options);
	if (options.localization) setupLocalization(options);
	setupRelease(options);

}

(async() => {
	try {
		await executeGenerator();
	} catch (err) {
		console.log(err);
	}
})();
