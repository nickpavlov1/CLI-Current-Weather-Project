"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("../common/colors");
const chalk_1 = __importDefault(require("chalk"));
class FormatterService {
    format(printable, textColor = colors_1.ColorType.White) {
        return chalk_1.default.hex(textColor)(printable);
    }
}
exports.FormatterService = FormatterService;
