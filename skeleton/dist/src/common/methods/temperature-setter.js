"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemperatureSetter {
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
}
exports.TemperatureSetter = TemperatureSetter;
