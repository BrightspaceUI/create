import fs from 'fs';
import path from 'path';

export function getDestinationPath(tagName) {
	return path.join(process.cwd(), tagName);
}

export function mergeJSON(filePathNewJSON, filePathOriginalJSON) {
	const newContent = fs.readFileSync(filePathNewJSON);
	const originalContent = fs.readFileSync(filePathOriginalJSON);

	const newContentJSON = JSON.parse(newContent);
	const originalContentJSON = JSON.parse(originalContent);

	Object.keys(originalContentJSON).forEach(key => {
		if (newContentJSON[key]) {
			let changes = false;
			Object.keys(newContentJSON[key]).forEach(subkey => {
				originalContentJSON[key][subkey] = newContentJSON[key][subkey];
				changes = true;
			});
			if (changes) {
				const ordered = {};
				Object.keys(originalContentJSON[key]).sort().forEach(subkey => {
					ordered[subkey] = originalContentJSON[key][subkey];
				});
				originalContentJSON[key] = ordered;
			}
		}
	});

	Object.keys(newContentJSON).forEach(key => {
		if (!originalContentJSON[key]) {
			originalContentJSON[key] = newContentJSON[key];
		}
	});

	fs.writeFileSync(filePathOriginalJSON, JSON.stringify(originalContentJSON, null, 2));
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
