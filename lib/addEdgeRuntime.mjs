import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

function addRuntime(dir) {
	let modified = false;
	const files = fs.readdirSync(dir);
	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			modified = addRuntime(filePath) || modified;
		} else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
			const content = fs.readFileSync(filePath, 'utf8');
			const runtimeDeclaration = "export const runtime = 'edge';";
			if (!content.includes(runtimeDeclaration)) {
				const newContent = runtimeDeclaration + '\n' + content;
				fs.writeFileSync(filePath, newContent, 'utf8');
				console.log(`Modified file: ${filePath}`);
				modified = true;
			}
		}
	}
	return modified;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const modified = addRuntime(path.join(__dirname, '../app/'));
if (!modified) {
	console.log('No code files needed modification.');
}
