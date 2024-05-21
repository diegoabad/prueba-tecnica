import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getWeatherData, getDirectGeocoding } from "../services/weatherService";

const mock = new MockAdapter(axios);

describe("weatherService", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("getWeatherData", () => {
    it("should fetch weather data and ensure current is an object", async () => {
      const latitude = 1;
      const longitude = 2;
      const mockResponse = {
        lat: latitude,
        lon: longitude,
        timezone: "UTC",
        timezone_offset: 3600,
        current: {},
        minutely: [],
        hourly: [],
        daily: [],
      };

      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=e7b6dbf4460a6c8b3a0b1a15aac96505`;
      mock.onGet(url).reply(200, mockResponse);

      const result = await getWeatherData({ latitude, longitude });
      expect(result.current).toBeDefined();
      expect(typeof result.current).toBe("object");
      expect(result.current).not.toBeNull();
    });

    it("should handle error", async () => {
      const latitude = 1;
      const longitude = 2;
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=e7b6dbf4460a6c8b3a0b1a15aac96505`;

      mock.onGet(url).reply(404);

      await expect(getWeatherData({ latitude, longitude })).rejects.toThrow(
        "Request failed with status code 404"
      );
    });
  });

  describe("getDirectGeocoding", () => {
    it("should fetch geocoding data", async () => {
      const cityName = "roma";
      const mockResponse = [
        [
          {
            lat: -34.6075682,
            lon: -58.4370894,
            name: "Buenos Aires",
            country: "AR",
          },
        ],
      ];

      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=e7b6dbf4460a6c8b3a0b1a15aac96505`;
      console.log("URL", url);
      mock.onGet(url).reply(200, mockResponse);

      const result = await getDirectGeocoding(cityName);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBeInstanceOf(Object);
    });

    it("should handle error", async () => {
      const cityName = "UnknownCity";
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=e7b6dbf4460a6c8b3a0b1a15aac96505`;

      mock.onGet(url).reply(404);

      await expect(getDirectGeocoding(cityName)).rejects.toThrow(
        "Request failed with status code 404"
      );
    });
  });
});
