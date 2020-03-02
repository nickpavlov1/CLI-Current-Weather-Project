import { ConsolePrinter } from '../core/console-printer.service';
import { FilePrinter } from '../core/file-printer.service';
import { FormatterService } from '../core/formatter.service';
import { ICommand } from '../types/command';
import { IGetWeatherCommandParameters } from '../types/command-parameters/get-weather-command-parameters';
import { monitorEventLoopDelay } from 'perf_hooks';
import { CURRENT_WEATHER_URL, API_KEY } from '../common/api-urls';

export class GetWeatherCommand /*implements ICommand*/ {

    constructor(
    private readonly consolePrinter: ConsolePrinter,
    private readonly filePrinter: FilePrinter,

    private readonly formatter: FormatterService,
    ) {}
    public async execute({city = 'Sofia', fahrenheit = false, wind = false, humidity = false}: IGetWeatherCommandParameters) {

    }
    private validateParams(city: string) {
        if (!city) {
        throw new RangeError(`Can't find the city with the provided city name - ${city}`);
        }
        // if (!day) {
        // throw new RangeError(`Please provide a proper day of the week!`);
        // }
    }
    private async getCityWeather(city: string, fahrenheit: boolean = false): Promise<string> {
        const cityWeather = await fetch(`${CURRENT_WEATHER_URL}${city}${API_KEY}`);
        const result = await cityWeather.json();
        const inputCityWeather: number = result.main.temp;
        if (fahrenheit === true) {
            const cityWeatherFahrenheit = this.toFahrenheit(inputCityWeather);
            return `The current temperature
                    in ${city} is
                    ${cityWeatherFahrenheit.toFixed(1)} F°`;
        } else {
            const cityWeatherCelsius = this.toCelsius(inputCityWeather);
            return `The current temperature
                    in ${city} is
                    ${cityWeatherCelsius.toFixed(1)} C°`;
        }
    }
    private toCelsius(temp: number): number {
        const tempToCelsius = temp - 273.15;
        return tempToCelsius;
    }
    private toFahrenheit(temp: number): number {
        const tempToFahrenheit = ((temp - 273.15) * 1.8) + 32;
        return tempToFahrenheit;
    }

}
