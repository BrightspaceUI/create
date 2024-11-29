import { copyFile, getDestinationPath, mergeJSON, replaceText, sortJSONMembers } from '../../helper.js';

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
	copyFile(
		`${__dirname}/templates/configured/_element.js`,
		`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.js`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.js`, templateDataElement);

	sortJSONMembers(`${getDestinationPath(templateData.hyphenatedName)}/package.json`, ['dependencies', 'devDependencies']);
}
