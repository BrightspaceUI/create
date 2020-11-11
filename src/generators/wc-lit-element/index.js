import { getDestinationPath, mergeJSON, moveFile, moveFilesInDir, replaceText } from '../../helper.js';

export function run(templateData) {
	mergeJSON(
		`${__dirname}/templates/configured/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);

	replaceText(`${__dirname}/templates/configured/_element.js`, templateData);
	moveFile(
		`${__dirname}/templates/configured/_element.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.js`
	);

	moveFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
