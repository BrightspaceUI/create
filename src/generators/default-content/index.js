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
	replacementsREADME.labsChecklist = templateData.org === 'labs' ? `\n> Note: this is a ["labs" component](https://daylight.d2l.dev/developing/getting-started/component-tiers/). While functional, these tasks are prerequisites to promotion to BrightspaceUI "official" status:
>
> - [ ] [Design organization buy-in](https://daylight.d2l.dev/developing/creating-component/before-building/#working-with-design)
> - [ ] [Architectural sign-off](https://daylight.d2l.dev/developing/creating-component/before-building/#web-component-architecture)
> - [ ] [Continuous integration](https://daylight.d2l.dev/developing/testing/tools/#continuous-integration)
> - [ ] [Cross-browser testing](https://daylight.d2l.dev/developing/testing/cross-browser/)
> - [ ] [Unit tests](https://daylight.d2l.dev/developing/testing/tools/) (if applicable)
> - [ ] [Accessibility tests](https://daylight.d2l.dev/developing/testing/accessibility/)
> - [ ] [Visual diff tests](https://daylight.d2l.dev/developing/testing/visual-difference/)
> - [ ] Localization with Serge (if applicable)
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
			`${getDestinationPath(templateData.hyphenatedName)}/.github/CODEOWNERS`
		);
		replaceText(`${getDestinationPath(templateData.hyphenatedName)}/.github/CODEOWNERS`, { codeowners: templateData.codeowners });
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
