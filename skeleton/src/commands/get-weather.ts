import fetch from 'node-fetch';
import { ConsolePrinter } from '../core/console-printer.service';
import { FormatterService } from '../core/formatter.service';
import { ICommand } from '../types/command';
import { CURRENT_WEATHER_URL, API_KEY } from '../common/api-urls';
import { ColorType } from '../common/colors';
import { CommandParameters } from '../types/command-parameters/command-parameters';
import { ExecutionResult } from '../types/execution-result';
import { Injectable } from '../tools/decorators/injectable';
import { IGetWeatherCommand } from '../types/getweather-command';
import { ITemperatureSetter } from '../types/temperature-setter';
import { ICapitalizedPrinter } from '../types/capitalized-city-name-printer';

@Injectable()
export class GetWeatherCommand implements ICommand, IGetWeatherCommand, ITemperatureSetter, ICapitalizedPrinter {

    constructor(
    public readonly consolePrinter: ConsolePrinter,
    public readonly formatter: FormatterService,
    ) {}
    public async execute({city = 'sofia', fahrenheit = false, wind = false, humidity = false}: CommandParameters): Promise<ExecutionResult> {
        try {
            this.validateParams(city);
            const result: number = await this.getCityWeather(city);
            if (fahrenheit === true) {
                const resultDegreesConversion: number = this.setTemperature(result, fahrenheit);
                this.consolePrinter.print(this.printTemperatureInfo(city, resultDegreesConversion) + ' F°');
            } else {
                const resultDegreesConversion: number = this.setTemperature(result, fahrenheit);
                this.consolePrinter.print(this.printTemperatureInfo(city, resultDegreesConversion) + ' C°');
            }
            if (wind === true) {
                const currentWindSpeed = await this.getWindSpeed(city);
                this.consolePrinter.print(`
                Wind speed: ${currentWindSpeed} km/h`);
            }
            if (humidity === true) {
                const currentHumidityPercentage = await this.getHumidityPercentage(city);
                this.consolePrinter.print(`
                Humidity percentage: ${currentHumidityPercentage}%`);
            }
            return { errors: 0, message: undefined };
        } catch (error) {
            return {
                errors: 1,
                message: this.formatter.format(error.message, ColorType.Red),
                };
            }
    }
    public validateParams(city: string) {
        if (!city) {
            throw new Error(`Provide proper input!`);
        }
    }
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
    public toCelsius(temp: number): number {
        const tempToCelsius = temp - 273.15;
        return tempToCelsius;
    }
    public toFahrenheit(temp: number): number {
        const tempToFahrenheit = ((temp - 273.15) * 1.8) + 32;
        return tempToFahrenheit;
    }
    public setTemperature(temp: number, fahrenheit: boolean): number {
        if (fahrenheit === true) {
            const cityWeatherFahrenheit: number = this.toFahrenheit(temp);
            return cityWeatherFahrenheit;
        } else {
            const cityWeatherCelsius: number = this.toCelsius(temp);
            return cityWeatherCelsius;
        }
    }
    public capitalizeCityName(city: string): string {
        const cityCapitalized: string = city.charAt(0).toUpperCase() + city.slice(1);
        return cityCapitalized;
    }
    public printTemperatureInfo(city: string, temp: number): string {      
        return `
                The current temperature
                in ${this.capitalizeCityName(city)} is ${temp.toFixed(1)}`;
    }
}
