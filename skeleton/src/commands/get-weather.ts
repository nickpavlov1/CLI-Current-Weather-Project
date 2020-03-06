import fetch from 'node-fetch'
import { ConsolePrinter } from '../core/console-printer.service';
import { FormatterService } from '../core/formatter.service';
import { ICommand } from '../types/command';
import { ColorType } from '../common/colors';
import { CommandParameters } from '../types/command-parameters/command-parameters';
import { ExecutionResult } from '../types/execution-result';
import { Injectable } from '../tools/decorators/injectable';
import { TemperatureSetter } from '../common/methods/temperature-setter';
import { Capitalize } from '../common/methods/capitalize';
import { CURRENT_WEATHER_URL, API_KEY } from '../common/api-urls';


@Injectable()
export class GetWeatherCommand implements ICommand{

    constructor(
    public readonly consolePrinter: ConsolePrinter,
    public readonly formatter: FormatterService,
    public readonly tempSet: TemperatureSetter,
    public readonly capitalize: Capitalize,
    ) {}
    public async execute({city = 'sofia', fahrenheit = false, wind = false, humidity = false}: CommandParameters): Promise<ExecutionResult> {
        try {
            this.validateParams(city);
            const result: number = await this.getCityWeather(city);
            const resultDegreesConversion: number = this.tempSet.setTemperature(result, fahrenheit);
            this.consolePrinter.print(this.printCurrentTempInfo(city, resultDegreesConversion, fahrenheit));

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
    private async getCityWeather(city: string): Promise<number> {
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
    private async getWindSpeed(city: string): Promise<number> {
        try {
            const cityWeather = await fetch(`${CURRENT_WEATHER_URL}${city}${API_KEY}`);
            const responseWind: number = (await cityWeather.json()).wind.speed;
            return responseWind;
        } catch (error) {
            throw new Error(error);
        }
    }
    private async getHumidityPercentage(city: string): Promise<number> {
        try {
            const cityWeather = await fetch(`${CURRENT_WEATHER_URL}${city}${API_KEY}`);
            const responseHumidity: number = (await cityWeather.json()).main.humidity;
            return responseHumidity;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    private printCurrentTempInfo(city: string, temp: number, fahrenheit: boolean): string {   
        if (fahrenheit === true)   {
            return `
                The current temperature
                in ${this.capitalize.capitalizeCityName(city)} is ${temp.toFixed(1)} F°`;
        } else {
            return `
                The current temperature
                in ${this.capitalize.capitalizeCityName(city)} is ${temp.toFixed(1)} C°`;
        }
    }
}
