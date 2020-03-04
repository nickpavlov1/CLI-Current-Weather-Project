"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_printer_service_1 = require("../core/console-printer.service");
const formatter_service_1 = require("../core/formatter.service");
const api_urls_1 = require("../common/api-urls");
const colors_1 = require("../common/colors");
const injectable_1 = require("../tools/decorators/injectable");
const node_fetch_1 = __importDefault(require("node-fetch"));
let GetWeatherCommand = class GetWeatherCommand {
    constructor(consolePrinter, formatter) {
        this.consolePrinter = consolePrinter;
        this.formatter = formatter;
    }
    execute({ city = 'sofia', fahrenheit = false, wind = false, humidity = false }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateParams(city);
                const result = yield this.getCityWeather(city);
                if (fahrenheit === true) {
                    const resultDegreesConversion = this.setTemperature(result, fahrenheit);
                    this.consolePrinter.print(this.printTemperatureInfo(city, resultDegreesConversion) + ' F°');
                }
                else if (fahrenheit === false) {
                    const resultDegreesConversion = this.setTemperature(result, fahrenheit);
                    this.consolePrinter.print(this.printTemperatureInfo(city, resultDegreesConversion) + ' C°');
                }
                if (wind === true) {
                    const currentWindSpeed = yield this.getWindSpeed(city);
                    this.consolePrinter.print(`
            Wind speed: ${currentWindSpeed} km/h`);
                }
                if (humidity === true) {
                    const currentHumidityPercentage = yield this.getHumidityPercentage(city);
                    this.consolePrinter.print(`
            Humidity percentage: ${currentHumidityPercentage}%`);
                }
                return { errors: 0, message: undefined };
            }
            catch (error) {
                return {
                    errors: 1,
                    message: this.formatter.format(error.message, colors_1.ColorType.Red),
                };
            }
        });
    }
    validateParams(city) {
        if (!city) {
            throw new RangeError(`Can't find the city with the provided city name - ${city}`);
        }
    }
    getCityWeather(city = 'sofia') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cityWeather = yield node_fetch_1.default(`${api_urls_1.CURRENT_WEATHER_URL}${city}${api_urls_1.API_KEY}`);
                const responseTemp = (yield cityWeather.json()).main.temp;
                return responseTemp;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    toCelsius(temp) {
        const tempToCelsius = temp - 273.15;
        return tempToCelsius;
    }
    toFahrenheit(temp) {
        const tempToFahrenheit = ((temp - 273.15) * 1.8) + 32;
        return tempToFahrenheit;
    }
    setTemperature(temp, fahrenheit) {
        if (fahrenheit === true) {
            const cityWeatherFahrenheit = this.toFahrenheit(temp);
            return cityWeatherFahrenheit;
        }
        else {
            const cityWeatherCelsius = this.toCelsius(temp);
            return cityWeatherCelsius;
        }
    }
    capitalizeCityName(city) {
        const cityCapitalized = city.charAt(0).toUpperCase() + city.slice(1);
        return cityCapitalized;
    }
    printTemperatureInfo(city, temp) {
        return `
            The current temperature
            in ${this.capitalizeCityName(city)} is ${temp.toFixed(1)}`;
    }
    getWindSpeed(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityWeather = yield node_fetch_1.default(`${api_urls_1.CURRENT_WEATHER_URL}${city}${api_urls_1.API_KEY}`);
            const responseWind = (yield cityWeather.json()).wind.speed;
            return responseWind;
        });
    }
    getHumidityPercentage(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityWeather = yield node_fetch_1.default(`${api_urls_1.CURRENT_WEATHER_URL}${city}${api_urls_1.API_KEY}`);
            const responseHumidity = (yield cityWeather.json()).main.humidity;
            return responseHumidity;
        });
    }
};
GetWeatherCommand = __decorate([
    injectable_1.Injectable(),
    __metadata("design:paramtypes", [console_printer_service_1.ConsolePrinter,
        formatter_service_1.FormatterService])
], GetWeatherCommand);
exports.GetWeatherCommand = GetWeatherCommand;
