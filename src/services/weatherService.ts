import axios, { AxiosResponse } from "axios";
import { GeocodingApiResponse } from "../types/GeocodingApiResponse";
import { Location } from "../types";
import { Coordinates } from "../types";
import { WeatherApiResponse } from "../types/WeatherApiResponse";
import { City } from "../types";
const { VITE_OPENWEATHERMAP_URL, VITE_OPENWEATHERMAP_API_KEY } = import.meta
  .env;

export const getWeatherData = async ({
  latitude,
  longitude,
}: Coordinates): Promise<WeatherApiResponse> => {
  try {
    const response: AxiosResponse<WeatherApiResponse> = await axios.get(
      `${VITE_OPENWEATHERMAP_URL}/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${VITE_OPENWEATHERMAP_API_KEY}`
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
      `${VITE_OPENWEATHERMAP_URL}/geo/1.0/direct`,
      {
        params: {
          q: cityName,
          limit: 1,
          appid: VITE_OPENWEATHERMAP_API_KEY,
        },
      }
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
