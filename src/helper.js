import fs from 'fs';
import path from 'path';

export function getDestinationPath(tagName) {
	return path.join(process.cwd(), tagName);
}

export function moveFile(source, destination) {
	const toPathDir = path.dirname(destination);
	if (!fs.existsSync(toPathDir)) {
		fs.mkdirSync(toPathDir, { recursive: true });
	}
	fs.renameSync(source, destination);
}

export function moveFilesInDir(sourceDir, destinationDir) {
	fs.readdir(sourceDir, (err, files) => {
		files.forEach(file => {
			fs.renameSync(`${sourceDir}/${file}`, `${destinationDir}/${file}`);
		});
	});
}

export function replaceText(source, replacements) {
	const fileContent = fs.readFileSync(source, 'utf8');
	let result = fileContent;
	Object.keys(replacements).forEach(key => {
		result = result.replace(new RegExp(`<%= ${key} %>`, 'g'), replacements[key]);
	});

	fs.writeFileSync(source, result, 'utf8');
}
