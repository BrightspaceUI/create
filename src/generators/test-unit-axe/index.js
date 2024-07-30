import { copyFile, getDestinationPath, mergeJSON, mergeText, replaceText, sortJSONMembers } from '../../helper.js';

export function run(templateData) {
	mergeJSON(
		`${__dirname}/templates/configured/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);
	mergeText(
		`${__dirname}/templates/configured/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);
	copyFile(
		`${__dirname}/templates/configured/_element.test.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.test.js`
	);
	copyFile(
		`${__dirname}/templates/configured/_element.axe.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.axe.js`
	);

	if (templateData.testReporting) {
		mergeJSON(
			`${__dirname}/templates/configured/_d2l-test-reporting.config.json`,
			`${getDestinationPath(templateData.hyphenatedName)}/d2l-test-reporting.config.json`
		);
		copyFile(
			`${__dirname}/templates/static/.github/workflows/ci-test-reporting.yml`,
			`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/ci.yml`
		);
	} else {
		copyFile(
			`${__dirname}/templates/static/.github/workflows/ci.yml`,
			`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/ci.yml`
		);
	}

	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.test.js`, templateData);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.axe.js`, templateData);
	sortJSONMembers(`${getDestinationPath(templateData.hyphenatedName)}/package.json`, ['dependencies', 'devDependencies']);
}
