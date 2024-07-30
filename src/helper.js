import deepMerge from 'deepmerge';
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
	const mergedContentJSON = deepMerge(originalContentJSON, newContentJSON);

	fs.writeFileSync(filePathOriginalJSON, JSON.stringify(mergedContentJSON, null, 2));
}

export function mergeText(filePathNewText, filePathOriginalText) {
	const newContent = fs.readFileSync(filePathNewText);
	const originalContent = fs.readFileSync(filePathOriginalText);

	const result = `${originalContent}${newContent}`;

	fs.writeFileSync(filePathOriginalText, result);
}

export function copyFile(source, destination) {
	const toPathDir = path.dirname(destination);
	if (!fs.existsSync(toPathDir)) {
		fs.mkdirSync(toPathDir, { recursive: true });
	}
	fs.copyFileSync(source, destination);
}

export function copyFilesInDir(sourceDir, destinationDir) {
	const files = fs.readdirSync(sourceDir);
	files.forEach((file) => {
		const curSource = path.join(sourceDir, file);
		if (fs.lstatSync(curSource).isDirectory()) {
			const targetFolder = path.join(destinationDir, path.basename(curSource));
			if (!fs.existsSync(targetFolder)) {
				fs.mkdirSync(targetFolder);
			}
			copyFilesInDir(curSource, targetFolder);
		} else {
			copyFile(curSource, path.join(destinationDir, file));
		}
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

export const sortJSONMembers = (source, members) => {
	const fileContent = fs.readFileSync(source, 'utf8');
	const result = JSON.parse(fileContent);

	members.forEach(member => {
		if (!result[member]) {
			return;
		}
		const ordered = {};
		Object.keys(result[member]).sort().forEach(key => {
			ordered[key] = result[member][key];
		});
		result[member] = ordered;
	});

	fs.writeFileSync(source, JSON.stringify(result, null, 2));
};

function copyAndProcessFile(sourceRoot, destinationRoot, relativePath, fileName, plugins = []) {
	const context = {
		sourceRoot,
		destinationRoot,
		relativePath,
		fileName
	};
	const source = path.join(sourceRoot, relativePath, fileName);
	const destination = path.join(destinationRoot, relativePath, fileName);

	const onPostCopyFns = [];
	const processedDestinaton = plugins.reduce((destination, plugin) => {
		const { newDestination = destination, onPostCopy } = plugin(source, destination, context);
		if (typeof onPostCopy === 'function') {
			onPostCopyFns.push(onPostCopy);
		}
		return newDestination;
	}, destination);

	const toPathDir = path.dirname(processedDestinaton);
	if (!fs.existsSync(toPathDir)) {
		fs.mkdirSync(toPathDir, { recursive: true });
	}
	fs.copyFileSync(source, processedDestinaton);

	onPostCopyFns.forEach((onPostCopy) => onPostCopy(source, processedDestinaton, context));
}

export function copyAndProcessDir(sourceDir, destinationDir, plugins = [], context = {}) {
	const {
		sourceRoot = sourceDir,
		destinationRoot = destinationDir,
		relativePath = ''
	} = context;

	const files = fs.readdirSync(sourceDir);
	files.forEach((file) => {
		const curSource = path.join(sourceDir, file);
		if (fs.lstatSync(curSource).isDirectory()) {
			const targetFolder = path.join(destinationDir, path.basename(curSource));
			if (!fs.existsSync(targetFolder)) {
				fs.mkdirSync(targetFolder, { recursive: true });
			}
			copyAndProcessDir(
				curSource,
				targetFolder,
				plugins,
				{
					sourceRoot,
					destinationRoot,
					relativePath: path.join(relativePath, file)
				}
			);
		} else {
			copyAndProcessFile(sourceRoot, destinationRoot, relativePath, file, plugins);
		}
	});
}

export function movePlugin(moveMappings = {}) {
	const normalizedMoveMappings = Object.entries(moveMappings).reduce((acc, [key, value]) => {
		acc[path.normalize(key)] = path.normalize(value);
		return acc;
	}, {});

	return (source, destination, context) => {
		const { destinationRoot, relativePath, fileName } = context;
		const newRelativeDestination = normalizedMoveMappings[path.join(relativePath, fileName)];
		return {
			newDestination: newRelativeDestination ? path.join(destinationRoot, newRelativeDestination) : destination
		};
	};
}

export function replaceTextPlugin(perFileReplacements = {}) {
	const normalizedPerFileReplacements = Object.entries(perFileReplacements).reduce((acc, [key, value]) => {
		acc[path.normalize(key)] = value;
		return acc;
	}, {});

	return () => {
		return {
			onPostCopy: (source, destination, context) => {
				const { relativePath, fileName } = context;
				const replacements = normalizedPerFileReplacements[path.join(relativePath, fileName)];
				if (replacements) {
					replaceText(destination, replacements);
				}
			}
		};
	};
}
