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

const getForecast = async () => {
	try {
		const weather = await getWeather(process.env.CITY);
		console.log(weather);
	} catch (err) {
		if (err?.response?.status === 404) {
			printError('City not found');
		} else if (err?.response?.status === 401) {
			printError('Invalid API token');
		} else {
			// Not an axios error
			printError(err.message);
		}
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

	getForecast();
};

initCLI();