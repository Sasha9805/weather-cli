import chalk from 'chalk';
import dedent from 'dedent';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR '), error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS '), message);
};

const printHelp = () => {
	console.log(dedent`
		${chalk.bgCyan(' HELP ')}
		No parameters - display weather
		-s [CITY] to set city
		-t [API_KEY] to set API key
		-h to display help
	`);
};

export { printError, printSuccess, printHelp };