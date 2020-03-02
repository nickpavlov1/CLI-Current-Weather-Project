"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class FilePrinter {
    constructor() { }
    print(items, filename) {
        try {
            fs_1.default.writeFileSync(filename, items.map(String).join('\n'), 'utf8');
        }
        catch (error) {
            throw new Error(`There was a problem writing the output to ${filename}.`);
        }
    }
}
exports.FilePrinter = FilePrinter;
