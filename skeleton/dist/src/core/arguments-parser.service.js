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
        /* your code here */
        // use in case working with files, this will parse the correct filepath
        // if (args.filename) {
        //   this._arguments.filename = join(process.cwd(), args.filename);
        // }
    }
    get arguments() {
        return this._arguments;
    }
    get command() {
        return this._command;
    }
}
exports.ArgumentsParser = ArgumentsParser;