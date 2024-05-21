import axios, { AxiosResponse } from "axios";
import { GeocodingApiResponse } from "../types/GeocodingApiResponse";
import { Location } from "../types";
import { Coordinates } from "../types";
import { WeatherApiResponse } from "../types/WeatherApiResponse";
import { City } from "../types";

export const getWeatherData = async ({
  latitude,
  longitude,
}: Coordinates): Promise<WeatherApiResponse> => {
  try {
    const response: AxiosResponse<WeatherApiResponse> = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=e7b6dbf4460a6c8b3a0b1a15aac96505`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getDirectGeocoding = async (cityName: string): Promise<City[]> => {
  try {
    const response: AxiosResponse<GeocodingApiResponse> = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=e7b6dbf4460a6c8b3a0b1a15aac96505`
    );
    const locations: City[] = response.data.map((location: Location) => ({
      lat: location.lat,
      lon: location.lon,
      name: location.name,
      country: location.country,
    }));

    return locations;
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};
