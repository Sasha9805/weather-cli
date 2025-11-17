#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
	if (!token.length) {
		printError('Token value is not provided');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
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
		saveToken(args.t);
	}

	// Fetch and display weather
};

initCLI();