import { getDestinationPath, mergeJSON, moveFile, moveFilesInDir, replaceText } from '../../helper.js';

export function run(templateData) {
	mergeJSON(
		`${__dirname}/templates/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);

	replaceText(`${__dirname}/templates/index.html`, templateData);
	moveFile(
		`${__dirname}/templates/index.html`,
		`${getDestinationPath(templateData.hyphenatedName)}/demo/index.html`
	);
}
