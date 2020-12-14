import { copyFile, getDestinationPath, mergeText, replaceText } from '../../helper.js';

export function run(templateData) {
	mergeText(
		`${__dirname}/templates/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);
	mergeText(
		`${__dirname}/templates/.gitignore`,
		`${getDestinationPath(templateData.hyphenatedName)}/.gitignore`
	);
	copyFile(
		`${__dirname}/templates/visual-diff.yml`,
		`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/visual-diff.yml`
	);

	replaceText(`${__dirname}/templates/_element.visual-diff.js`, templateData);
	copyFile(
		`${__dirname}/templates/_element.visual-diff.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.visual-diff.js`
	);

	replaceText(`${__dirname}/templates/_element.visual-diff.html`, templateData);
	copyFile(
		`${__dirname}/templates/_element.visual-diff.html`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.visual-diff.html`
	);
}
