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
const api_urls_1 = require("../common/api-urls");
class GetWeatherCommand /*implements ICommand*/ {
    constructor(consolePrinter, filePrinter, formatter) {
        this.consolePrinter = consolePrinter;
        this.filePrinter = filePrinter;
        this.formatter = formatter;
    }
    execute({ city = 'Sofia', day = , wind = false, humidity = false }) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    validateParams(city, day) {
        if (!city) {
            throw new RangeError(`Can't find the city with the provided city name - ${city}`);
        }
        if (!day) {
            throw new RangeError(`Please provide a proper day of the week!`);
        }
    }
    getCityWeather(city, day) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityWeather = yield fetch(`${api_urls_1.CURRENT_WEATHER_URL}${city}${api_urls_1.API_KEY}`);
            const result = yield cityWeather.json();
            const inputCityWeather = result.main.temp;
            return inputCityWeather;
        });
    }
}
exports.GetWeatherCommand = GetWeatherCommand;
