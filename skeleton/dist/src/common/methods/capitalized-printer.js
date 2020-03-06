"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CapitalizedPrinter {
    capitalizeCityName(city) {
        const cityCapitalized = city.charAt(0).toUpperCase() + city.slice(1);
        return cityCapitalized;
    }
    printTemperatureInfo(city, temp, fahrenheit) {
        if (fahrenheit === true) {
            return `
                The current temperature
                in ${this.capitalizeCityName(city)} is ${temp.toFixed(1)} F°`;
        }
        else {
            return `
                The current temperature
                in ${this.capitalizeCityName(city)} is ${temp.toFixed(1)} C°`;
        }
    }
}
exports.CapitalizedPrinter = CapitalizedPrinter;
