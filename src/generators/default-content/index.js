import { getDestinationPath, moveFile, moveFilesInDir, replaceText } from '../../helper.js';

export function run(templateData) {
	replaceText(`${__dirname}/templates/configured/_package.json`, templateData);
	moveFile(
		`${__dirname}/templates/configured/_package.json`,
		`${getDestinationPath(templateData.tagName)}/package.json`
	);

	const replacementsREADME = templateData;
	replacementsREADME.labsChecklist = templateData.org === 'labs' ? `> Note: this is a ["labs" component](https://github.com/BrightspaceUI/guide/wiki/Component-Tiers). While functional, these tasks are prerequisites to promotion to BrightspaceUI "official" status:
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
> - [ ] README documentation
` : '';
	replacementsREADME.description = `\n${templateData.description}`;
	replaceText(`${__dirname}/templates/configured/_README.md`, replacementsREADME);
	moveFile(
		`${__dirname}/templates/configured/_README.md`,
		`${getDestinationPath(templateData.tagName)}/README.md`
	);

	replaceText(`${__dirname}/templates/configured/_CODEOWNERS`, { codeowners: templateData.codeowners });
	moveFile(
		`${__dirname}/templates/configured/_CODEOWNERS`,
		`${getDestinationPath(templateData.tagName)}/CODEOWNERS`
	);

	replaceText(`${__dirname}/templates/configured/LICENSE`, { year: new Date().getFullYear().toString() });
	moveFile(
		`${__dirname}/templates/configured/LICENSE`,
		`${getDestinationPath(templateData.tagName)}/LICENSE`
	);

	moveFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.tagName));
}
