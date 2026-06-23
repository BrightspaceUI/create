import { copyFile, getDestinationPath, mergeJSON, mergeText, replaceText, sortJSONMembers } from '../../helper.js';

export function run(templateData) {
	mergeJSON(
		`${import.meta.dirname}/templates/configured/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);
	mergeText(
		`${import.meta.dirname}/templates/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);
	mergeText(
		`${import.meta.dirname}/templates/_gitignore`,
		`${getDestinationPath(templateData.hyphenatedName)}/.gitignore`
	);

	copyFile(
		`${import.meta.dirname}/templates/_element.vdiff.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.vdiff.js`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.vdiff.js`, templateData);

	if (templateData.testReporting) {
		mergeJSON(
			`${import.meta.dirname}/templates/configured/_d2l-test-reporting.config.json`,
			`${getDestinationPath(templateData.hyphenatedName)}/d2l-test-reporting.config.json`
		);
		copyFile(
			`${import.meta.dirname}/templates/static/.github/workflows/vdiff-test-reporting.yml`,
			`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/vdiff.yml`
		);
	} else {
		copyFile(
			`${import.meta.dirname}/templates/static/.github/workflows/vdiff.yml`,
			`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/vdiff.yml`
		);
	}

	sortJSONMembers(`${getDestinationPath(templateData.hyphenatedName)}/package.json`, ['dependencies', 'devDependencies']);
}
