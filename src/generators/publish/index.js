import { getDestinationPath, mergeJSON, replaceText } from '../../helper.js';

export function run(templateData) {
	const npmVersion = `\n[![NPM version](https://img.shields.io/npm/v/${templateData.packageName}.svg)](https://www.npmjs.org/package/${templateData.packageName})`;
	const npmInstallation = `\n## Installation

To install from NPM:

\`\`\`shell
npm install ${templateData.packageName}
\`\`\`\n`;

	const replacementsREADME = {
		publishNpmVersion: npmVersion,
		publishNpmInstallation: npmInstallation
	};
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/README.md`, replacementsREADME);

	const replacementsPackage = {
		hyphenatedName: templateData.hyphenatedName,
		locales: templateData.localization && templateData.localizationType !== 'static' ? ',\n"/locales"' : ''
	};
	replaceText(`${__dirname}/templates/_package.json`, replacementsPackage);
	mergeJSON(
		`${__dirname}/templates/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);
}
