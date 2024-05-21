import { City } from "./City";
import { WeatherApiResponse } from "./WeatherApiResponse";

export interface WeatherData {
  weatherApiResponse: WeatherApiResponse;
  city: City;
}
