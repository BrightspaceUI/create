import { copyFilesInDir, getDestinationPath, mergeText } from '../../helper.js';

export function run(templateData) {
	mergeText(
		`${import.meta.dirname}/templates/configured/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);

	copyFilesInDir(`${import.meta.dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
