import { copyFile, getDestinationPath, mergeText } from '../../helper.js';

export function run(templateData) {
	mergeText(
		`${__dirname}/templates/configured/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);

	copyFile(
		`${__dirname}/templates/configured/release.yml`,
		`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/release.yml`
	);
}
