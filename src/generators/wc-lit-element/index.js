import { copyFile, copyFilesInDir, getDestinationPath, mergeJSON, replaceText } from '../../helper.js';

export function run(templateData) {
	mergeJSON(
		`${__dirname}/templates/configured/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);

	const templateDataElement = templateData;
	if (!templateData.localization) {
		templateDataElement.extends = 'LitElement';
		templateDataElement.localizeDemo = 'Hello';
		templateDataElement.localizeMixin = '';
		templateDataElement.localizeResources = '';
	}
	replaceText(`${__dirname}/templates/configured/_element.js`, templateDataElement);
	copyFile(
		`${__dirname}/templates/configured/_element.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.js`
	);

	copyFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}