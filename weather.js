#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
	try {
		await saveKeyValue('token', token);
		printSuccess('Token saved successfully');
	} catch (err) {
		printError(err.message);
	}
};


const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		printHelp();
	}

	if (args.s) {
		// Set city
	}

	if (args.t) {
		// Set token
		saveToken(args.t);
	}

	// Fetch and display weather
};

initCLI();