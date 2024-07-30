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
	copyFile(
		`${__dirname}/templates/configured/_element.axe.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.axe.js`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.test.js`, templateData);
	copyFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
