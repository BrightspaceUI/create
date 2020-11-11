import { getDestinationPath, mergeJSON, mergeText, moveFile, replaceText } from '../../helper.js';

export function run(templateData) {
	mergeJSON(
		`${__dirname}/templates/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);
	mergeText(
		`${__dirname}/templates/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);

	replaceText(`${__dirname}/templates/index.html`, templateData);
	moveFile(
		`${__dirname}/templates/index.html`,
		`${getDestinationPath(templateData.hyphenatedName)}/demo/index.html`
	);
}
