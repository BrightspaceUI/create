import { copyFile, copyFilesInDir, getDestinationPath, mergeJSON, mergeText, replaceText } from '../../helper.js';

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
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.test.js`, templateData);

	copyFile(
		`${__dirname}/templates/configured/_web-test-runner.sauce.config.mjs`,
		`${getDestinationPath(templateData.hyphenatedName)}/web-test-runner.sauce.config.mjs`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/web-test-runner.sauce.config.mjs`, templateData);

	copyFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
