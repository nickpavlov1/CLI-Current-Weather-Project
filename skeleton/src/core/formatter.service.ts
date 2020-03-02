import { ColorType } from '../common/colors';
import chalk from 'chalk';
import { IFormatter } from '../types/core/formatter';

export class FormatterService implements IFormatter {

  public format(printable: any, textColor: ColorType = ColorType.White): string {
    return chalk.hex(textColor)(printable);
  }

}