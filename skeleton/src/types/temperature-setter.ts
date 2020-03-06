export interface ITemperatureSetter {
    toCelsius(temp: number): number;
    toFahrenheit(temp: number): number;
    setTemperature(temp: number, fahrenheit: boolean): number;

}