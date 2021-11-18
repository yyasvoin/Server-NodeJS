import express from 'express';
import JWT from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import jwtverify from '../lib/middleware/jwtverify.js';
import * as db from './dbHandler.js';

const router = express.Router();

//---------------------------------------------------------------------
// Validation Check middleware
//---------------------------------------------------------------------
const validationCheck = (request, response, next) => {
	let errors = [];
	const entry = request.body;
	const requiredProps = ['name', 'email', 'phoneNumber', 'content'];
	requiredProps.forEach((property) => {
		if (!entry.hasOwnProperty(property)) {
			errors.push(property);
		}
	});
	if (errors.length > 0) {
        console.log(errors);
		return response
			.status(400)
			.json({ message: 'validation error', invalid: errors });
	}

	next();
};
//router.use (validationCheck)

//---------------------------------------------------------------------
// Route to _create_ an entry when the user submits their contact form
//---------------------------------------------------------------------
router.post('/entries', validationCheck, async (request, response, next) => {
	const newContact = { id: uuidv4(), ...request.body };
	try {
		await db.entries_file_add(newContact);
		return response.status(201).send(newContact);
	} catch (err) {
		console.error('are we here?', err);
		return next(err);
	}
});
//---------------------------------------------------------------------
// custom middleware exploring the actual extraction of token
//---------------------------------------------------------------------
router.use(jwtverify);
//---------------------------------------------------------------------
// Route to _get_ a listing of all submissions when given a valid JWT
//---------------------------------------------------------------------
router.get('/entries', async (request, response) => {
	const entriesDb = await db.entries_file_getAll();

	return response.json(entriesDb);
});

//---------------------------------------------------------------------
// Route to _get_ a specific submission when given an ID alongside a valid JWT
//---------------------------------------------------------------------
router.get('/entries/:id', async (request, response) => {
	const id = request.params.id;
	const entriesDb = await db.entries_file_getAll();
	const foundUser = entriesDb.find((u) => u.id == id);

	if (foundUser) {
		return response.status(200).json(foundUser);
	} else {
		return response.status(400).json({ message: `entry ${id} not found` });
	}
});

export default router;
