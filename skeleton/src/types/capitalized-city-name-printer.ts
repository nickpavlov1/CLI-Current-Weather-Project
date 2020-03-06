export interface ICapitalizedPrinter {
    capitalizeCityName(city: string): string;
    printTemperatureInfo(city: string, temp: number, fahrenheit: boolean): string;
}