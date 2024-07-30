import { copyFile, getDestinationPath, mergeJSON, mergeText, replaceText, sortJSONMembers } from '../../helper.js';

export function run(templateData) {
	mergeJSON(
		`${__dirname}/templates/configured/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);
	mergeText(
		`${__dirname}/templates/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);
	mergeText(
		`${__dirname}/templates/_gitignore`,
		`${getDestinationPath(templateData.hyphenatedName)}/.gitignore`
	);

	copyFile(
		`${__dirname}/templates/_element.vdiff.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.vdiff.js`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.vdiff.js`, templateData);

	if (templateData.testReporting) {
		mergeJSON(
			`${__dirname}/templates/configured/_d2l-test-reporting.config.json`,
			`${getDestinationPath(templateData.hyphenatedName)}/d2l-test-reporting.config.json`
		);
		copyFile(
			`${__dirname}/templates/static/.github/workflows/vdiff-test-reporting.yml`,
			`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/vdiff.yml`
		);
	} else {
		copyFile(
			`${__dirname}/templates/static/.github/workflows/vdiff.yml`,
			`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/vdiff.yml`
		);
	}

	sortJSONMembers(`${getDestinationPath(templateData.hyphenatedName)}/package.json`, ['dependencies', 'devDependencies']);
}
