import React, { useState } from 'react';
import axios from 'axios';
import { GoSearch as Search } from 'react-icons/go';

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=82198d3cc31ecd48b391a62a7e280daa`;

  const pressEnterHandler = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation('');
  };

  return (
    <div className="app">
      <div className="searchContainer">
        <div className="search">
          <input
            type="text"
            value={location}
            onKeyDown={pressEnterHandler}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter City"
          />
          <button onClick={searchLocation}>
            <Search className="svg" />
          </button>
        </div>
      </div>

      {data.name && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>
                {data.name}, {data.sys.country}
              </p>
            </div>
            <div className="temp">
              {data.main && <h1>{data.main.temp.toFixed()}°F</h1>}
            </div>
            <div className="description">
              {data.weather && <p>{data.weather[0].main}</p>}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {data.main && (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              )}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main && <p className="bold">{data.main.humidity}%</p>}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind && (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              )}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
