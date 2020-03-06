"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
class ArgumentsParser {
    constructor() {
        const args = minimist_1.default(process.argv.slice(2));
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
    get arguments() {
        return this._arguments;
    }
    get command() {
        return this._command;
    }
}
exports.ArgumentsParser = ArgumentsParser;
