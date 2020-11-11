import { getDestinationPath, mergeJSON, moveFile, moveFilesInDir, replaceText } from '../../helper.js';

export function run(templateData) {
	mergeJSON(
		`${__dirname}/templates/configured/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);

	replaceText(`${__dirname}/templates/configured/_element.test.js`, templateData);
	moveFile(
		`${__dirname}/templates/configured/_element.test.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.test.js`
	);

	moveFile(
		`${__dirname}/templates/configured/.eslintrc.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/.eslintrc.json`
	);

	moveFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
