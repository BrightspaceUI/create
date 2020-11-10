import fs from 'fs';
import path from 'path';

export function destinationPath(destination, tagName) {
	return path.join(path.join(process.cwd(), tagName), destination);
}

export function moveFile(source, destination) {
	fs.renameSync(source, destination);
}

export function replaceText(source, replacements) {
	const fileContent = fs.readFileSync(source, 'utf8');
	Object.keys(replacements).forEach(key => {
		fileContent.replace(new RegExp(`<%= ${key} %>`), replacements[key]);
	});

	fs.writeFileSync(source, fileContent, 'utf8');
}
