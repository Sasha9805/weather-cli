#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

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

const saveCity = async (city) => {
	if (!city.length) {
		printError('City is not provided');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City saved successfully');
	} catch (err) {
		printError(err.message);
	}
};

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city);
		const icon = getIcon(weather.weather[0].icon);
		printWeather(weather, icon);
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
		return printHelp();
	}

	if (args.s) {
		return saveCity(args.s);
	}

	if (args.t) {
		return saveToken(args.t);
	}

	return getForecast();
};

initCLI();