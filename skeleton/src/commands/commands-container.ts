import { HelpCommand } from './help';
import { GetWeatherCommand } from './get-weather';
import { Injectable } from '../tools/decorators/injectable';

@Injectable()
export class CommandContainer {

  constructor(
    public readonly help: HelpCommand,
    public readonly today: GetWeatherCommand,
  ) { }

}
