import { ITemperatureSetter } from "../../types/temperature-setter";

export class TemperatureSetter implements ITemperatureSetter {
    public toCelsius(temp: number): number {
        const tempToCelsius = temp - 273.15;
        return tempToCelsius;
    }
    public toFahrenheit(temp: number): number {
        const tempToFahrenheit = ((temp - 273.15) * 1.8) + 32;
        return tempToFahrenheit;
    }
    public setTemperature(temp: number, fahrenheit: boolean): number {
        if (fahrenheit === true) {
            const cityWeatherFahrenheit: number = this.toFahrenheit(temp);
            return cityWeatherFahrenheit;
        } else {
            const cityWeatherCelsius: number = this.toCelsius(temp);
            return cityWeatherCelsius;
        }
    }
}