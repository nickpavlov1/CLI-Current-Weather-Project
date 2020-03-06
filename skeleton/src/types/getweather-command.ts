export interface ICurrentForecast {
    getCityWeather(city: string): Promise<number>;
    getWindSpeed(city: string): Promise<number>;
    getHumidityPercentage(city: string): Promise<number>;
}
