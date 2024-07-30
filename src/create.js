#!/usr/bin/env node

/* eslint-disable no-console */
import prompts from 'prompts';
import { run as setupDefaultContent } from './generators/default-content/index.js';
import { run as setupDemo } from './generators/demo/index.js';
import { run as setupElement } from './generators/wc-lit-element/index.js';
import { run as setupLocalization } from './generators/localization/index.js';
import { run as setupRelease } from './generators/release/index.js';
import { run as setupStaticSite } from './generators/static-site/index.js';
import { run as setupTestReporting } from './generators/test-reporting/index.js';
import { run as setupTestUnitAxe } from './generators/test-unit-axe/index.js';
import { run as setupTestVDiff } from './generators/test-vdiff/index.js';

const generatorTypes = {
	component: 'component',
	staticSite: 'staticSite',
	bsiApp: 'bsiApp'
};

const projectTypes = {
	component: 'component',
	app: 'app'
};

const applicationTypes = {
	bsi: 'bsi',
	staticSite: 'staticSite'
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
				{ title: 'Static Site', value: applicationTypes.staticSite }
			]
		}
	], {
		onCancel: () => {
			process.exit();
		},
	});

	switch (applicationType) {
		case applicationTypes.staticSite:
			return generatorTypes.staticSite;
		case applicationTypes.bsi:
			return generatorTypes.bsiApp;
		default:
			break;
	}
}

async function getComponentOptions() {
	let templateData = await prompts([
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
		{
			type: 'select',
			name: 'testReporting',
			message: 'Would you like test reporting set up?',
			choices: [
				{ title: 'Yes', value: true },
				{ title: 'No', value: false }
			]
		}
	], {
		onCancel: () => {
			process.exit();
		},
	});

	if (templateData.testReporting) {
		const testReportingTemplateData = await prompts([
			{
				type: 'text',
				name: 'testReportingTool',
				message: 'What is your components tool based on the taxonomy in https://expanse.desire2learn.com/pages/source/source.html'
			}, {
				type: 'text',
				name: 'testReportingExperience',
				message: 'What is your components experience based on the taxonomy in https://expanse.desire2learn.com/pages/source/source.html'
			},
		], {
			onCancel: () => {
				process.exit();
			},
		});

		templateData = {
			...templateData,
			...testReportingTemplateData
		};
	}

	return templateData;
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
	if (options.testReporting) setupTestReporting(options);
	setupTestUnitAxe(options);
	if (options.vdiff) setupTestVDiff(options);
	setupDemo(options);
	if (options.localization) setupLocalization(options);
	setupRelease(options);
}

async function executeStaticSiteGenerator() {
	const {
		hyphenatedNameRaw,
		description,
		codeowners,
		hostingTarget
	} = await prompts([
		{
			type: 'text',
			name: 'hyphenatedNameRaw',
			message: 'What would you like to name your app? Use hyphenation instead of camelcase.'
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
		{
			type: 'select',
			name: 'hostingTarget',
			message: 'Where would you like to host your app?',
			choices: [
				{ title: 'd2l.dev', value: 'd2ldev' },
				{ title: 'S3 Bucket', value: 's3' },
				{ title: 'Other', value: 'other' }
			]
		}
	], {
		onCancel: () => {
			process.exit();
		},
	});

	const hyphenatedName = hyphenatedNameRaw.toLowerCase();

	let roleToAssume, awsRegion, bucketPath, d2ldevSubdomain;
	if (hostingTarget === 'd2ldev') {
		const { subdomain } = await prompts([
			{
				type: 'text',
				name: 'subdomain',
				message: 'What is the d2l.dev subdomain you want to publish this app to?'
			},
		], {
			onCancel: () => {
				process.exit();
			},
		});

		roleToAssume = `"arn:aws:iam::022062736489:role/r+Brightspace+${hyphenatedName}+repo"`;
		awsRegion = 'ca-central-1';
		bucketPath = `s3://d2l.dev/${subdomain}/main`;
		d2ldevSubdomain = subdomain;
	} else if (hostingTarget === 's3') {
		const { role, region, path } = await prompts([
			{
				type: 'text',
				name: 'role',
				message: 'What is the AWS ARN of the role you wish to authenticate as? (e.g. arn:aws:iam::123456789012:role/r+my+role)'
			},
			{
				type: 'text',
				name: 'region',
				message: 'What AWS region do you want to authenticate into? (e.g. us-east-1)'
			},
			{
				type: 'text',
				name: 'path',
				message: 'What is the S3 bucket path you wish to publish to? (e.g. s3://my-bucket/my-path)'
			}
		], {
			onCancel: () => {
				process.exit();
			},
		});
		roleToAssume = `"${role}"`;
		awsRegion = region;
		bucketPath = path;
	}

	const templateData = {
		hyphenatedName,
		className: getClassName(hyphenatedName),
		tagName: `d2l-${hyphenatedName}`,
		repoName: hyphenatedName,
		description,
		codeowners,
		hostingTarget,
		roleToAssume,
		awsRegion,
		bucketPath,
		d2ldevSubdomain
	};

	setupStaticSite(templateData);

	console.log('\nTemplate setup complete!\n');

	if (hostingTarget === 'd2ldev') {
		console.log('Note: Make sure you have set up the appropriate permissions in github.com/Brightspace/repo-settings so that your repo can publish to d2l.dev.');
		console.log('For details on how to do this, please review the d2l.dev setup guide (https://desire2learn.atlassian.net/wiki/x/H4A70).\n');
	} else if (hostingTarget === 's3') {
		console.log('Note: Make sure you have set up the appropriate permissions in github.com/Brightspace/repo-settings so that your repo can publish to the S3 bucket you specified.\n');
	} else {
		console.log('Note: Since you did not specify a publishing target, the generated .github/workflows/publish.yml file doesn\'t include an actual publishing step.');
		console.log('In order to publish your site, you\'ll have to add your own publishing step.\n');
	}
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
		case generatorTypes.staticSite:
			await executeStaticSiteGenerator();
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
