import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Header.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, ChangeEvent, FormEvent } from "react";

interface HeaderProps {
  setCityWeather: (city: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ setCityWeather }) => {
  const [city, setCity] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCityWeather(city);
  };

  return (
    <div className={style.header}>
      <h1>Weather App</h1>
      <form className={style.buscador} onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Ingrese una ciudad..."
          value={city}
        />
        <button
          className={style.search}
          type="submit"
          disabled={city.trim() === ""}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
};
