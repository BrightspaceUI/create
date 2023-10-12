import { copyFile, copyFilesInDir, getDestinationPath, mergeJSON, mergeText, replaceText } from '../../helper.js';

export function run(templateData) {
	mergeJSON(
		`${__dirname}/templates/configured/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);
	mergeText(
		`${__dirname}/templates/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);
	mergeText(
		`${__dirname}/templates/_gitignore`,
		`${getDestinationPath(templateData.hyphenatedName)}/.gitignore`
	);

	copyFile(
		`${__dirname}/templates/_element.vdiff.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.vdiff.js`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/test/${templateData.hyphenatedName}.vdiff.js`, templateData);

	copyFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
