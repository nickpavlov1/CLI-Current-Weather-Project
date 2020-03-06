import { IArgumentsParser } from './../types/core/arguments-parser';
import { CommandParameters } from './../types/command-parameters/command-parameters';
import minimist from 'minimist';

export class ArgumentsParser implements IArgumentsParser {

  private readonly _arguments: CommandParameters;
  private readonly _command: string;

  constructor() {
    const args = minimist(process.argv.slice(2));

    // get the command name
    this._command = args._[0];

    // initialize the parsed _arguments object
    this._arguments = {};

    // parse and validate individual _arguments
    if (args.city) {
      this._arguments.city = args.city;
    }
    if (args.f || args.fahrenheit) {
      this._arguments.fahrenheit = true;
    }
    if (args.w || args.wind) {
      this._arguments.wind = true;
    }
    if (args.h || args.humidity) {
        this._arguments.humidity = true;
    }
  }

  public get arguments(): CommandParameters {
    return this._arguments;
  }

  public get command(): string {
    return this._command;
  }
}
