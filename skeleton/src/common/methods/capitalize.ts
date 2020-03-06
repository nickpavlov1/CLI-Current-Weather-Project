import { ICapitalize } from "../../types/capitalized-city-name-printer";

export class Capitalize implements ICapitalize {
    public capitalizeCityName(city: string): string {
        const cityCapitalized: string = city.charAt(0).toUpperCase() + city.slice(1);
        return cityCapitalized;
    }
    }
