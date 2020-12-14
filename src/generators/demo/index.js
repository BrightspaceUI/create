import { copyFile, getDestinationPath, mergeJSON, mergeText, replaceText } from '../../helper.js';

export function run(templateData) {
	mergeJSON(
		`${__dirname}/templates/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);
	mergeText(
		`${__dirname}/templates/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);

	copyFile(
		`${__dirname}/templates/index.html`,
		`${getDestinationPath(templateData.hyphenatedName)}/demo/index.html`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/demo/index.html`, templateData);
}
