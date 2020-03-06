import { ConsolePrinter } from '../core/console-printer.service';
import { FormatterService } from '../core/formatter.service';
import { ICommand } from '../types/command';
import { ColorType } from '../common/colors';
import { CommandParameters } from '../types/command-parameters/command-parameters';
import { ExecutionResult } from '../types/execution-result';
import { Injectable } from '../tools/decorators/injectable';
import { TemperatureSetter } from '../common/methods/temperature-setter';
import { CapitalizedPrinter } from '../common/methods/capitalized-printer';
import { CurrentForecast } from '../common/methods/api/get-forecast';

@Injectable()
export class GetWeatherCommand implements ICommand {

    constructor(
    public readonly consolePrinter: ConsolePrinter,
    public readonly formatter: FormatterService,
    public readonly tempSetter: TemperatureSetter,
    public readonly capitalizePrinter: CapitalizedPrinter,
    public readonly currentForecast: CurrentForecast
    ) {}
    public async execute({city = 'sofia', fahrenheit = false, wind = false, humidity = false}: CommandParameters): Promise<ExecutionResult> {
        try {
            this.validateParams(city);
            const result: number = await this.currentForecast.getCityWeather(city);
            const resultDegreesConversion: number = this.tempSetter.setTemperature(result, fahrenheit);
            this.consolePrinter.print(this.capitalizePrinter.printTemperatureInfo(city, resultDegreesConversion, fahrenheit));

            if (wind === true) {
                const currentWindSpeed = await this.currentForecast.getWindSpeed(city);
                this.consolePrinter.print(`
                Wind speed: ${currentWindSpeed} km/h`);
            }

            if (humidity === true) {
                const currentHumidityPercentage = await this.currentForecast.getHumidityPercentage(city);
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
}
