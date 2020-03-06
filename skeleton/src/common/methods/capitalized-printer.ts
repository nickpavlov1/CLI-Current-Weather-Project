import { ICapitalizedPrinter } from "../../types/capitalized-city-name-printer";

export class CapitalizedPrinter implements ICapitalizedPrinter {
    public capitalizeCityName(city: string): string {
        const cityCapitalized: string = city.charAt(0).toUpperCase() + city.slice(1);
        return cityCapitalized;
    }
    public printTemperatureInfo(city: string, temp: number, fahrenheit: boolean): string {   
        if (fahrenheit === true)   {
            return `
                The current temperature
                in ${this.capitalizeCityName(city)} is ${temp.toFixed(1)} F°`;
        } else {
            return `
                The current temperature
                in ${this.capitalizeCityName(city)} is ${temp.toFixed(1)} C°`;
        }
    }
}