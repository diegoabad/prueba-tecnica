import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";

function App(): JSX.Element {
  const [cityWeather, setCityWeather] = useState<string>("");

  useEffect(() => {
    const ciudadGuardada = localStorage.getItem("ultimaCiudad");
    if (ciudadGuardada) {
      setCityWeather(ciudadGuardada);
    }
  }, []);

  return (
    <div className="contenedor">
      <Header setCityWeather={setCityWeather} />
      <Main cityWeather={cityWeather} />
    </div>
  );
}

export default App;
