import { copyFile, copyFilesInDir, getDestinationPath, replaceText } from '../../helper.js';

export function run(templateData) {

	const replacements = {
		extends: 'LocalizeMixin(LitElement)',
		localizeDemo: '${this.localize(\'hello\')}',
		localizeMixin: 'import { LocalizeMixin } from \'@brightspace-ui/core/mixins/localize/localize-mixin.js\';\n',
		localizeResources: `\n\tstatic get localizeConfig() {
		return {
			importFunc: async lang => (await import(\`./lang/\${lang}.js\`)).default,
			osloCollection: '@d2l\\\\${templateData.hyphenatedName}\\\\${templateData.hyphenatedName}'
		};
	}\n`
	};

	copyFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.js`, replacements);

	copyFile(
		`${__dirname}/templates/configured/_element.serge.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.serge.json`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/${templateData.hyphenatedName}.serge.json`, templateData);

}
