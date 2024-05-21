import React from "react";
import { WeatherData } from "../../types/WeatherData";
import style from "./PrincialCardWeather.module.css";
import { DailyWeather } from "../../types/WeatherApiResponse";

interface PrincipalCardWeatherProps {
  weatherData: WeatherData | null;
}

export const PrincipalCardWeather: React.FC<PrincipalCardWeatherProps> = ({
  weatherData,
}) => {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const kelvinToCelsius = (temp: number): number => {
    return temp - 273.15;
  };

  return (
    <div className={style.card}>
      {!weatherData ? (
        <p>Choose a city, please...</p>
      ) : (
        <div>
          <div className={style.currentWeather}>
            <h2>
              {weatherData.city.name}, {weatherData.city.country}
            </h2>
            <div className={style.weatherInfo}>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weatherApiResponse.current.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                <p>
                  {
                    weatherData.weatherApiResponse.current.weather[0]
                      .description
                  }
                </p>
              </div>
              <div>
                <p>
                  Temp:{" "}
                  {kelvinToCelsius(
                    weatherData.weatherApiResponse.current.temp
                  ).toFixed(2)}
                  ºC
                </p>
                <p>
                  Feels like:{" "}
                  {kelvinToCelsius(
                    weatherData.weatherApiResponse.current.feels_like
                  ).toFixed(2)}
                  ºC
                </p>
                <p>
                  Max Temp:{" "}
                  {kelvinToCelsius(
                    weatherData.weatherApiResponse.daily[0].temp.max
                  ).toFixed(2)}
                  ºC
                </p>
                <p>
                  Min Temp:{" "}
                  {kelvinToCelsius(
                    weatherData.weatherApiResponse.daily[0].temp.min
                  ).toFixed(2)}
                  ºC
                </p>
              </div>
            </div>
          </div>
          <div className={style.nextDays}>
            <h3>Next 3 days:</h3>
            {weatherData.weatherApiResponse.daily
              .slice(1, 4)
              .map((day: DailyWeather, index: number) => (
                <div key={index} className={style.day}>
                  <p className={style.nextDays}>{formatDate(day.dt)}</p>
                  <div className={style.nextDays__day}>
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      alt="Weather Icon"
                    />
                    <p>Max: {kelvinToCelsius(day.temp.max).toFixed(2)}ºC</p>
                    <p>Min: {kelvinToCelsius(day.temp.min).toFixed(2)}ºC</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrincipalCardWeather;
