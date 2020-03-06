import fetch from 'node-fetch';
import { ICurrentForecast } from "../../../types/getweather-command";
import { CURRENT_WEATHER_URL, API_KEY } from "../../api-urls";

export class CurrentForecast implements ICurrentForecast {
    public async getCityWeather(city: string): Promise<number> {
        try {
            const cityWeather = await fetch(`${CURRENT_WEATHER_URL}${city}${API_KEY}`);
            const responseTemp = await cityWeather.json();
            if (responseTemp.cod === '404') {
                throw new Error('No information for the provided city.')
            } else {
                return responseTemp.main.temp;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    public async getWindSpeed(city: string): Promise<number> {
        try {
            const cityWeather = await fetch(`${CURRENT_WEATHER_URL}${city}${API_KEY}`);
            const responseWind: number = (await cityWeather.json()).wind.speed;
            return responseWind;
        } catch (error) {
            throw new Error(error);
        }
    }
    public async getHumidityPercentage(city: string): Promise<number> {
        try {
            const cityWeather = await fetch(`${CURRENT_WEATHER_URL}${city}${API_KEY}`);
            const responseHumidity: number = (await cityWeather.json()).main.humidity;
            return responseHumidity;
        } catch (error) {
            throw new Error(error);
        }
    }
    
}