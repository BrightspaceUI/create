import { copyFile, copyFilesInDir, getDestinationPath, replaceText } from '../../helper.js';

export function run(templateData) {

	const replacementsPackage = templateData;
	replacementsPackage.locales = '';
	if (templateData.localization) {
		replacementsPackage.locales += `,\n"${templateData.hyphenatedName}.serge.json"`;
	}
	copyFile(
		`${import.meta.dirname}/templates/configured/_package.json`,
		`${getDestinationPath(templateData.hyphenatedName)}/package.json`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/package.json`, replacementsPackage);

	const replacementsREADME = templateData;

	if (templateData.description) replacementsREADME.description = `\n${templateData.description}\n`;
	copyFile(
		`${import.meta.dirname}/templates/configured/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/README.md`, replacementsREADME);

	if (templateData.codeowners) {
		copyFile(
			`${import.meta.dirname}/templates/configured/_CODEOWNERS`,
			`${getDestinationPath(templateData.hyphenatedName)}/.github/CODEOWNERS`
		);
		replaceText(`${getDestinationPath(templateData.hyphenatedName)}/.github/CODEOWNERS`, { codeowners: templateData.codeowners });
	}

	copyFile(
		`${import.meta.dirname}/templates/configured/LICENSE`,
		`${getDestinationPath(templateData.hyphenatedName)}/LICENSE`
	);
	replaceText(`${getDestinationPath(templateData.hyphenatedName)}/LICENSE`, { year: new Date().getFullYear().toString() });

	copyFile(
		`${import.meta.dirname}/templates/configured/_gitignore`,
		`${getDestinationPath(templateData.hyphenatedName)}/.gitignore`
	);

	copyFile(
		`${import.meta.dirname}/templates/configured/_npmrc`,
		`${getDestinationPath(templateData.hyphenatedName)}/.npmrc`
	);

	copyFilesInDir(`${import.meta.dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
