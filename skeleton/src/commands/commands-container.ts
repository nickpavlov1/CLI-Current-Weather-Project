import { HelpCommand } from './help';
import { GetWeatherCommand } from './get-weather';

export class CommandContainer {

  constructor(
    public readonly help: HelpCommand,
    public readonly getWeather: GetWeatherCommand
  ) { }

}
