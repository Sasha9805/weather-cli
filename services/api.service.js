import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async (city) => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
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

	return data;
};

export { getWeather };