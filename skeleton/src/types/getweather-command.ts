export interface IGetWeatherCommand {
    getCityWeather(city: string): Promise<number>;
    toCelsius(temp: number): number;
    toFahrenheit(temp: number): number;
    setTemperature(temp: number, fahrenheit: boolean): number;
    capitalizeCityName(city: string): string;
    printTemperatureInfo(city: string, temp: number, fahrenheit: boolean): string;
}
