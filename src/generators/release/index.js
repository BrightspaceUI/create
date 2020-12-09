import { getDestinationPath, mergeText, moveFile } from '../../helper.js';

export function run(templateData) {
	mergeText(
		`${__dirname}/templates/configured/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);

	moveFile(
		`${__dirname}/templates/configured/release.yml`,
		`${getDestinationPath(templateData.hyphenatedName)}/.github/workflows/release.yml`
	);
}
