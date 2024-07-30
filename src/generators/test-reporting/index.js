import { copyFile, getDestinationPath, mergeText, replaceText } from '../../helper.js';

export function run(templateData) {
	templateData = {
		...templateData,
		testReportingTool: templateData.testReportingTool?.trim() || 'Unknown',
		testReportingExperience: templateData.testReportingExperience?.trim() || 'Unknown'
	};

	mergeText(
		`${__dirname}/templates/configured/_gitignore`,
		`${getDestinationPath(templateData.hyphenatedName)}/.gitignore`
	);
	copyFile(
		`${__dirname}/templates/configured/_d2l-test-reporting.config.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/d2l-test-reporting.config.json`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/d2l-test-reporting.config.json`, templateData);
}
