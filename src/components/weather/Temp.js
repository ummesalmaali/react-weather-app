import React, { useState } from "react";
import "./style.css";
import WeatherCard from "./WeatherCard";

export default function Temp() {
  const [searchValue, setSearchValue] = useState("chittagong");
  const [tempInfo, setTempInfo] = useState("");

  const getWeatherInfo = async () => {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weatherMood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunrise, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        speed,
        country,
        sunrise,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getWeatherInfo();
  // }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search"
            id="search"
            autoFocus
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      {/* Our weather card */}
      <WeatherCard tempInfo={tempInfo} />
    </>
  );
}
