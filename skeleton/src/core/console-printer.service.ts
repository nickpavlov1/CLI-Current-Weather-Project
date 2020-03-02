import { IPrinter } from './../types/core/printer';

export class ConsolePrinter implements IPrinter {

  constructor() { }

  public print(...texts: string[]) {
    console.log(...texts);
  }

}