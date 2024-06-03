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
import { run as setupD2ldev } from './generators/d2ldev/index.js';

const generatorTypes = {
	component: 'component',
	d2ldevSite: 'd2ldevSite',
	bsiApp: 'bsiApp'
};

const projectTypes = {
	component: 'component',
	app: 'app'
};

const applicationTypes = {
	bsi: 'bsi',
	d2ldev: 'd2ldev'
};

function getClassName(hyphenatedName) {
	const hyphenRemoved = hyphenatedName.replace(/-([a-z])/g, (g) => { return g[1].toUpperCase(); });
	return hyphenRemoved.charAt(0).toUpperCase() + hyphenRemoved.slice(1);
}

async function getGeneratorType() {
	const { projectType } = await prompts([
		{
			type: 'select',
			name: 'projectType',
			message: 'What type of project is this?',
			choices: [
				{ title: 'Component', value: projectTypes.component },
				{ title: 'Application', value: projectTypes.app }
			]
		}
	], {
		onCancel: () => {
			process.exit();
		},
	});

	if (projectType === projectTypes.component) return generatorTypes.component;

	const { applicationType } = await prompts([
		{
			type: 'select',
			name: 'applicationType',
			message: 'What type of application is this?',
			choices: [
				{ title: 'BSI', value: applicationTypes.bsi },
				{ title: 'd2l.dev', value: applicationTypes.d2ldev }
			]
		}
	], {
		onCancel: () => {
			process.exit();
		},
	});

	switch (applicationType) {
		case applicationTypes.d2ldev:
			return generatorTypes.d2ldevSite;
		case applicationTypes.bsi:
			return generatorTypes.bsiApp;
		default:
			break;
	}
}

async function getComponentOptions() {
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

async function executeComponentGenerator() {

	const options = await getComponentOptions();

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

async function executeD2ldevSiteGenerator() {
	const questions = [
		{
			type: 'text',
			name: 'hyphenatedName',
			message: 'What would you like to name your app? Use hyphenation instead of camelcase.'
		},
		{
			type: 'select',
			name: 'githubOrg',
			message: 'Which GitHub org will the repo be in?',
			choices: [
				{ title: 'Brightspace', value: 'Brightspace' },
				{ title: 'BrightspaceUI', value: 'BrightspaceUI' }
			]
		},
		{
			type: 'text',
			name: 'subdomain',
			message: 'What is the d2l.dev subdomain you want to publish this app to?'
		},
		{
			type: 'text',
			name: 'description',
			message: 'What is the app description?'
		},
		{
			type: 'text',
			name: 'codeowners',
			message: 'What is/are the GitHub username(s) of the codeowner(s)? (e.g., @janesmith, @johnsmith)'
		},
	];
	const options = await prompts(questions, {
		onCancel: () => {
			process.exit();
		},
	});

	const hyphenatedName = options.hyphenatedName.toLowerCase();
	const templateData = {
		hyphenatedName,
		className: getClassName(options.hyphenatedName),
		tagName: `d2l-${hyphenatedName}`,
		githubOrg: options.githubOrg,
		repoName: hyphenatedName,
		subdomain: options.subdomain,
		description: options.description,
		codeowners: options.codeowners
	};

	setupD2ldev(templateData);
}

async function executeBsiAppGenerator() {
	console.log('Sorry, the BSI Application template is not yet available.');
	console.log('In the meantime, please create a Component project type and modify it to work as a BSI App.');
}

async function executeGenerator() {
	const generatorType = await getGeneratorType();

	switch (generatorType) {
		case generatorTypes.component:
			await executeComponentGenerator();
			break;
		case generatorTypes.d2ldevSite:
			await executeD2ldevSiteGenerator();
			break;
		case generatorTypes.bsiApp:
			await executeBsiAppGenerator();
			break;
		default:
			break;
	}
}

(async() => {
	try {
		await executeGenerator();
	} catch (err) {
		console.log(err);
	}
})();
