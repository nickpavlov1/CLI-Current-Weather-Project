export interface ITemperatureConverter {
    toCelsius(temp: number): number;
    toFahrenheit(temp: number): number;
}