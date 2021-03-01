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
const dynamicLocalization = `\n\tstatic get localizeConfig() {
		return {
			importFunc: async lang => (await import(\`./lang/\${lang}.js\`)).default
		};
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
		replacements.extends = 'LocalizeDynamicMixin(LitElement)';
		replacements.localizeMixin = 'import { LocalizeDynamicMixin } from \'@brightspace-ui/core/mixins/localize-dynamic-mixin.js\';\n';
		replacements.localizeResources = dynamicLocalization;

		copyFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
	}
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.js`, replacements);

	if (templateData.localizationType === 'serge') {
		copyFile(
			`${__dirname}/templates/configured/_element.serge.json`,
			`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.serge.json`
		);
		replaceText(`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.serge.json`, templateData);
	}
}
