import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async (city) => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('API token is not set. Use -t option to set it.');
	}

	const { data } = await axios.get(BASE_URL, {
		params: {
			q: city,
			appid: token,
			units: 'metric',
			lang: 'ru'
		}
	});

	// Object with weather data, not a string
	console.log(data);

	return data;
	
	// Alternative using https module (you need to wrap the whole function in a Promise and handle resolve/reject in end/error events)
	// res is a string with the response data, you need to parse it with JSON.parse(res) in the 'end' event

	// const url = new URL(BASE_URL);
	// url.searchParams.append('q', city);
	// url.searchParams.append('appid', token);
	// url.searchParams.append('units', 'metric');
	// url.searchParams.append('lang', 'ru');

	// https.get(url, (response) => {
	// 	let res = '';

	// 	response.on('data', (chunk) => {
	// 		res += chunk;
	// 	});

	// 	response.on('end', () => {
	// 		console.log(res);
	// 	});
	// });
};

export { getWeather };