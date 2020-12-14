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

	replaceText(`${__dirname}/templates/configured/_element.test.js`, templateData);
	copyFile(
		`${__dirname}/templates/configured/_element.test.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.test.js`
	);

	copyFile(
		`${__dirname}/templates/configured/.eslintrc.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/.eslintrc.json`
	);

	copyFile(
		`${__dirname}/templates/configured/ci.yml`,
		`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/ci.yml`
	);

	copyFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
