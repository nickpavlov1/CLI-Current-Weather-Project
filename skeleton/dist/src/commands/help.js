"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_printer_service_1 = require("./../core/console-printer.service");
class HelpCommand {
    constructor(printer = new console_printer_service_1.ConsolePrinter()) {
        this.printer = printer;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            this.printer.print(`
      Your cli documentation here...
      `);
            return { errors: 0, message: undefined };
        });
    }
}
exports.HelpCommand = HelpCommand;
