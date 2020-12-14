import { copyFile, copyFilesInDir, getDestinationPath, mergeText, replaceText } from '../../helper.js';

export function run(templateData) {
	mergeText(
		`${__dirname}/templates/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);
	mergeText(
		`${__dirname}/templates/_gitignore`,
		`${getDestinationPath(templateData.hyphenatedName)}/.gitignore`
	);

	copyFile(
		`${__dirname}/templates/_element.visual-diff.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.visual-diff.js`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.visual-diff.js`, templateData);

	copyFile(
		`${__dirname}/templates/_element.visual-diff.html`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.visual-diff.html`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.visual-diff.html`, templateData);

	copyFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
