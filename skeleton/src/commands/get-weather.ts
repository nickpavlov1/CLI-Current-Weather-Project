import { ConsolePrinter } from '../core/console-printer.service';
import { FilePrinter } from '../core/file-printer.service';
import { FormatterService } from '../core/formatter.service';
import { ICommand } from '../types/command';
import { monitorEventLoopDelay } from 'perf_hooks';
import { CURRENT_WEATHER_URL, API_KEY } from '../common/api-urls';
import { ColorType } from '../common/colors';
import { CommandParameters } from '../types/command-parameters/command-parameters';
import { ExecutionResult } from '../types/execution-result';
import { Injectable } from '../tools/decorators/injectable';

@Injectable()
export class GetWeatherCommand implements ICommand {

    constructor(
    public readonly consolePrinter: ConsolePrinter,
    public readonly filePrinter: FilePrinter,

    public readonly formatter: FormatterService,
    ) {}
    public async execute({city = 'sofia', fahrenheit = false, wind = false, humidity = false}: CommandParameters): Promise<ExecutionResult> {
        try {
        this.validateParams(city);
        const result: number = await this.getCityWeather(city);
        const resultDegreesConversion: string = this.isItFahrenheit(city, result, fahrenheit);
        if (resultDegreesConversion) {
            this.consolePrinter.print(this.formatter.format(resultDegreesConversion, ColorType.Green));
        }
        return { errors: 0, message: undefined };
    } catch (error) {
        return {
            errors: 1,
            message: this.formatter.format(error.message, ColorType.Red),
        };
    }
    }
    private validateParams(city: string) {
        if (!city) {
        throw new RangeError(`Can't find the city with the provided city name - ${city}`);
        }
        // if (!day) {
        // throw new RangeError(`Please provide a proper day of the week!`);
        // }
    }
    private async getCityWeather(city: string = 'sofia'): Promise<number> {
        try {
        const cityWeather = await fetch(`${CURRENT_WEATHER_URL}${city}${API_KEY}`);
        const responseTemp: number = (await cityWeather.json()).main.temp;
        return responseTemp;
        } catch (error) {
            throw new Error(`Promise was NOT implemented.`);
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
    private isItFahrenheit(city: string, temp: number, fahrenheit: boolean): string {
        if (fahrenheit === true) {
            const cityWeatherFahrenheit = this.toFahrenheit(temp);
            return `The current temperature
                    in ${city} is
                    ${cityWeatherFahrenheit.toFixed(1)} F°`;
        } else {
            const cityWeatherCelsius = this.toCelsius(temp);
            return `The current temperature
                    in ${city} is
                    ${cityWeatherCelsius.toFixed(1)} C°`;
        }
    }

}
