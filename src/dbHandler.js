import { promises as fs } from 'fs';
import path from 'path';

const users_file = path.resolve(process.env.USERS_FILE_LOCATION);
const entries_file = path.resolve(process.env.ENTRIES_FILE_LOCATION);

// Write inside users file
const users_file_write = async (data) => {
	await fs.writeFile(users_file, JSON.stringify(data, null, 2));
};
// Write inside entries file
const entries_file_write = async (data) => {
	await fs.writeFile(entries_file, JSON.stringify(data, null, 2));
};

// Add function for entries file.
const entries_file_add = async (data) => {
	try {
		let content = await entries_file_getAll();
		content.push(data);
		await entries_file_write(content);
		console.log('file written');
	} catch (err) {
		console.error(err);
	}
};
// Add function for users file.
const users_file_add = async (data) => {
	try {
		let content = await users_file_getAll();
		content.push(data);
		await users_file_write(content);
		console.log('file written');
	} catch (err) {
		console.error(err);
	}
};
// getALL for entries.json
const entries_file_getAll = async () => {
	try {
		let content = await fs.readFile(entries_file);
		return JSON.parse(content);
	} catch (err) {
		await entries_file_write([]);
		let content = await fs.readFile(entries_file);
		return JSON.parse(content);
	}
};
// getALL for users.json
const users_file_getAll = async () => {
	try {
		let content = await fs.readFile(users_file);
		return JSON.parse(content);
	} catch (err) {
		await users_file_write([]);
		let content = await fs.readFile(users_file);
		return JSON.parse(content);
	}
};

export {
	entries_file_add,
	entries_file_getAll,
	users_file_add,
	users_file_getAll,
};
