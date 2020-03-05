import { ConsolePrinter } from './../core/console-printer.service';
import { ICommand } from './../types/command';
import { ExecutionResult } from '../types/execution-result';
import { Injectable } from '../tools/decorators/injectable';

@Injectable()
export class HelpCommand implements ICommand {

  constructor(
    private readonly printer: ConsolePrinter = new ConsolePrinter(),
  ) { }

  public async execute(): Promise<ExecutionResult> {
    this.printer.print(
      `
      Usage: getweather <command>

      where <command> is one of:
        help, today

      getweather help                 prints this manual

      getweather today                generates current weather information for the given city
        arguments:
          --city=<string>             providing a city to check the current weather
          --f (or --fahrenheit)       if passed converts the temperature to Fahrenheit
          --w (or --wind)             if passed provides information for the wind speed at the given location.
          --h (or --humidity)         if passed provides information for the level of humidity at the given location.
        example:
          getweather today --city=berlin --f --w --h 
      `
    );

    return { errors: 0, message: undefined };
  }

}
