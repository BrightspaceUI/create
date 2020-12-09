import { getDestinationPath, mergeJSON, mergeText, moveFile, replaceText } from '../../helper.js';

export function run(templateData) {
	mergeText(
		`${__dirname}/templates/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);
	mergeText(
		`${__dirname}/templates/.gitignore`,
		`${getDestinationPath(templateData.hyphenatedName)}/.gitignore`
	);
	mergeText(
		`${__dirname}/templates/ci.yml`,
		`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/ci.yml`
	);

	replaceText(`${__dirname}/templates/_element.visual-diff.js`, templateData);
	moveFile(
		`${__dirname}/templates/_element.visual-diff.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.visual-diff.js`
	);

	replaceText(`${__dirname}/templates/_element.visual-diff.html`, templateData);
	moveFile(
		`${__dirname}/templates/_element.visual-diff.html`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.visual-diff.html`
	);
}
