import { useEffect, useState } from "react";
import style from "./Main.module.css";
import { WeatherData } from "../../types/WeatherData";
import {
  getDirectGeocoding,
  getWeatherData,
} from "../../services/weatherService";
import { PrincipalCardWeather } from "../PrincipalCardWeather/PrincipalCardWeather";

interface MainProps {
  cityWeather: string;
}

export const Main: React.FC<MainProps> = ({ cityWeather }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (cityWeather) {
      getDirectGeocoding(cityWeather)
        .then((locations) => {
          console.log(locations);
          if (locations.length > 0) {
            const { lat, lon } = locations[0];
            getWeatherData({ latitude: lat, longitude: lon }).then(
              (weatherApiResponse) => {
                setWeatherData({ weatherApiResponse, city: locations[0] });
                localStorage.setItem("ultimaCiudad", cityWeather);
              }
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos meteorológicos:", error);
          setWeatherData(null);
        });
    }
  }, [cityWeather]);

  return (
    <div className={style.main}>
      <PrincipalCardWeather weatherData={weatherData} />
    </div>
  );
};
