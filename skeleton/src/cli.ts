import { CommandParameters } from './types/command-parameters/command-parameters';
import { ICommand } from './types/command';
import { ArgumentsParser } from './core/arguments-parser.service';
import { CommandContainer } from './commands/commands-container';
import { ConsolePrinter } from './core/console-printer.service';
import { HelpCommand } from './commands/help';
import { GetWeatherCommand } from './commands/get-weather';

export class CLI {

  constructor(
    private readonly parser: ArgumentsParser,
    private readonly printer: ConsolePrinter,
    private readonly commandContainer: CommandContainer,
  ) { }
  public async main() {
    const command = this.parser.command as keyof CommandContainer;
    const args: CommandParameters = this.parser.arguments;

    if (this.commandContainer[command] && typeof (this.commandContainer[command] as ICommand).execute === 'function') {
      const executionResult = await (this.commandContainer[command] as ICommand).execute(args);

      if (executionResult.errors) {
        this.printer.print(executionResult.message);
      }
    }

  }
}