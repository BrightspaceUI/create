#!/usr/bin/env node

/* eslint-disable no-console */
import prompts from 'prompts';
import { run as setupDefaultContent } from './generators/default-content';

async function getOptions() {
	const questions = [
		{
			type: 'select',
			name: 'creationType',
			message: 'What would you like to create?',
			choices: [
				{ title: 'Web Component', value: 'wc' }
			]
		},
		{
			type: 'select',
			name: 'techType',
			message: 'What type of component would you like to create?',
			choices: [
				{ title: 'LitElement', value: 'lit' }
			]
		},
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
			message: 'Who is/are the codeowner(s)? (e.g., @johnsmith)'
		},
		{
			type: 'select',
			name: 'publish',
			message: 'Would you like to publish this component to NPM?',
			choices: [
				{ title: 'No', value: 'false' },
				{ title: 'Yes', value: 'true' }
			]
		},
		{
			type: 'select',
			name: 'type',
			message: 'Would you like to add localization?',
			choices: [
				{ title: 'No', value: 'false' },
				{ title: 'Static', value: 'static' },
				{ title: 'Dynamic', value: 'dynamic' },
				{ title: 'Serge (dynamic)', value: 'serge' }
			]
		}
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
	options.className = options.hyphenatedName.replace(/-([a-z])/g, (g) => { return g[1].toUpperCase(); });
	options.tagName = `d2l-${options.org === 'labs' ? 'labs-' : ''}${options.hyphenatedName}`;

	options.githubOrg = options.org === 'official' ? 'BrightspaceUI' : 'BrightspaceUILabs';
	options.orgName = options.org === 'official' ? '@brightspace-ui' : '@brightspace-ui-labs';
	options.packageName = `${options.orgName}/${options.hyphenatedName}`;

	setupDefaultContent(options);

}

(async() => {
	try {
		await executeGenerator();
	} catch (err) {
		console.log(err);
	}
})();
