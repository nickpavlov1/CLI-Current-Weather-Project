import { ColorType } from '../../common/colors';

export interface IFormatter {
  format(printable: any, textColor: ColorType): string
}
