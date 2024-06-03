import path from 'path';
import { copyAndProcessDir, getDestinationPath, replaceTextPlugin, movePlugin } from '../../helper.js';

export function run(templateData) {
	const templateRoot = path.join(__dirname, 'templates');
	const destinationRoot = getDestinationPath(templateData.hyphenatedName);

	const elementFile = `${templateData.hyphenatedName}.js`;
	copyAndProcessDir(templateRoot, destinationRoot, [
		movePlugin({
			'_package.json': 'package.json',
			'_gitignore': '.gitignore',
			'_CODEOWNERS': 'CODEOWNERS',
			'_README.md': 'README.md',
			'src/components/_element.js': `src/components/${elementFile}`
		}),
		replaceTextPlugin({
			'_package.json': templateData,
			'_CODEOWNERS': templateData,
			'_README.md': templateData,
			'.github/workflows/publish.yml': templateData,
			'src/index.html': templateData,
			'src/index.js': {
				...templateData,
				elementFile
			},
			'src/components/_element.js': templateData,
		})
	]);
}
