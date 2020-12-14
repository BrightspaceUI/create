import { copyFile, copyFilesInDir, getDestinationPath, replaceText } from '../../helper.js';

const staticLocalization = `\n\tstatic async getLocalizeResources(langs) {
		const langResources = {
			'en': { 'hello': 'Hello' },
			'fr': { 'hello': 'Bonjour' }
		};

		for (let i = 0; i < langs.length; i++) {
			if (langResources[langs[i]]) {
				return {
					language: langs[i],
					resources: langResources[langs[i]]
				};
			}
		}

		return null;
	}\n`;

export function run(templateData) {
	const replacements = {
		localizeDemo: '${this.localize(\'hello\')}'
	};
	if (templateData.localizationType === 'static') {
		replacements.extends = 'LocalizeMixin(LitElement)';
		replacements.localizeMixin = 'import { LocalizeMixin } from \'@brightspace-ui/core/mixins/localize-mixin.js\';\n';
		replacements.localizeResources = staticLocalization;
	} else {
		replacements.extends = 'LocalizeElement(LitElement)';
		replacements.localizeMixin = 'import { LocalizeElement } from \'./locales/localize-element.js\';\n';
		replacements.localizeResources = '';

		copyFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
	}
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.js`, replacements);

	if (templateData.localizationType === 'serge') {
		replaceText(`${__dirname}/templates/configured/_element.serge.json`, templateData);
		copyFile(
			`${__dirname}/templates/configured/_element.serge.json`,
			`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.serge.json`
		);
	}
}