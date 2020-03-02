import { ConsolePrinter } from './../core/console-printer.service';
import { ICommand } from './../types/command';
import { ExecutionResult } from '../types/execution-result';

export class HelpCommand implements ICommand {

  constructor(
    private readonly printer: ConsolePrinter = new ConsolePrinter(),
  ) { }

  public async execute(): Promise<ExecutionResult> {
    this.printer.print(
      `
      Your cli documentation here...
      `
    );

    return { errors: 0, message: undefined };
  }

}
