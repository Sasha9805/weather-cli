#!/usr/bin/env node
import { getArgs } from './helpers/args.js';

const initCLI = () => {
	const args = getArgs(process.argv);
	console.log(args);
	if (args.h) {
		// Display help
	}

	if (args.s) {
		// Set city
	}

	if (args.t) {
		// Set token
	}

	// Fetch and display weather
};

initCLI();