import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getWeatherData, getDirectGeocoding } from "./weatherService";

const mock = new MockAdapter(axios);
const VITE_OPENWEATHERMAP_URL = "http://api.openweathermap.org";
const VITE_OPENWEATHERMAP_API_KEY = "testKey";

describe("weatherService", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("getWeatherData", () => {
    it("should fetch weather data", async () => {
      const latitude = 1;
      const longitude = 2;
      const mockResponse = {
        /* Mock response data */
      };

      mock
        .onGet(`${VITE_OPENWEATHERMAP_URL}/data/3.0/onecall`)
        .reply(200, mockResponse);

      const result = await getWeatherData({ latitude, longitude });
      expect(result).toEqual(mockResponse);
    });

    it("should handle error", async () => {
      mock.onGet(`${VITE_OPENWEATHERMAP_URL}/data/3.0/onecall`).reply(500);

      await expect(
        getWeatherData({ latitude: 1, longitude: 2 })
      ).rejects.toThrow("Request failed with status code 500");
    });
  });

  describe("getDirectGeocoding", () => {
    it("should fetch location data", async () => {
      const cityName = "Buenos Aires";
      const mockResponse = [];

      mock
        .onGet(`${VITE_OPENWEATHERMAP_URL}/geo/1.0/direct`)
        .reply(200, mockResponse);

      const result = await getDirectGeocoding(cityName);
      expect(result).toEqual(mockResponse);
    });

    it("should handle error", async () => {
      mock.onGet(`${VITE_OPENWEATHERMAP_URL}/geo/1.0/direct`).reply(500);

      await expect(getDirectGeocoding("Test City")).rejects.toThrow(
        "Request failed with status code 500"
      );
    });
  });
});
