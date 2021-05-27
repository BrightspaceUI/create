import { copyFile, copyFilesInDir, getDestinationPath, replaceText } from '../../helper.js';

export function run(templateData) {

	const replacementsPackage = templateData;
	replacementsPackage.locales = '';
	if (templateData.localization) {
		if (templateData.localizationType === 'serge') {
			replacementsPackage.locales += `,\n"${templateData.hyphenatedName}.serge.json"`;
		}
		if (templateData.localizationType !== 'static') {
			replacementsPackage.locales += ',\n"/lang"';
		}
	}
	copyFile(
		`${__dirname}/templates/configured/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/package.json`, replacementsPackage);

	const replacementsREADME = templateData;
	replacementsREADME.labsChecklist = templateData.org === 'labs' ? `\n> Note: this is a ["labs" component](https://github.com/BrightspaceUI/guide/wiki/Component-Tiers). While functional, these tasks are prerequisites to promotion to BrightspaceUI "official" status:
>
> - [ ] [Design organization buy-in](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#working-with-design)
> - [ ] [design.d2l entry](http://design.d2l/)
> - [ ] [Architectural sign-off](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#web-component-architecture)
> - [ ] [Continuous integration](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-continuously-with-travis-ci)
> - [ ] [Cross-browser testing](https://github.com/BrightspaceUI/guide/wiki/Testing#cross-browser-testing-with-sauce-labs)
> - [ ] [Unit tests](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-with-polymer-test) (if applicable)
> - [ ] [Accessibility tests](https://github.com/BrightspaceUI/guide/wiki/Testing#automated-accessibility-testing-with-axe)
> - [ ] [Visual diff tests](https://github.com/BrightspaceUI/visual-diff)
> - [ ] [Localization](https://github.com/BrightspaceUI/guide/wiki/Localization) with Serge (if applicable)
> - [ ] Demo page
> - [ ] README documentation\n` : '';

	if (templateData.description) replacementsREADME.description = `\n${templateData.description}\n`;
	copyFile(
		`${__dirname}/templates/configured/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/README.md`, replacementsREADME);

	if (templateData.codeowners) {
		copyFile(
			`${__dirname}/templates/configured/_CODEOWNERS`,
			`${getDestinationPath(templateData.hyphenatedName)}/CODEOWNERS`
		);
		replaceText(`${getDestinationPath(templateData.hyphenatedName)}/CODEOWNERS`, { codeowners: templateData.codeowners });
	}

	copyFile(
		`${__dirname}/templates/configured/LICENSE`,
		`${getDestinationPath(templateData.hyphenatedName)}/LICENSE`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/LICENSE`, { year: new Date().getFullYear().toString() });

	copyFile(
		`${__dirname}/templates/configured/_gitignore`,
		`${getDestinationPath(templateData.hyphenatedName)}/.gitignore`
	);

	copyFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
