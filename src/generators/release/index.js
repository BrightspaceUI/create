import { getDestinationPath, mergeText, moveFilesInDir } from '../../helper.js';

export function run(templateData) {
	mergeText(
		`${__dirname}/templates/configured/_README.md`,
		`${getDestinationPath(templateData.hyphenatedName)}/README.md`
	);

	moveFilesInDir(`${__dirname}/templates/static`, getDestinationPath(templateData.hyphenatedName));
}
