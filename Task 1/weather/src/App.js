import { useEffect, useState } from 'react';
import summer from './assets/summer.avif'
import winter from './assets/winter.avif'
import Description from './components/Description';
import { getFormattedWeatherData } from './WeatherService';

function App() {

  const [city, setCity] = useState("Vadodara");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(summer);

  useEffect(() => {
    const fetchweatherData = async() => {
      const data = await getFormattedWeatherData(city,units)
      setWeather(data);
      // for background 
      const threshold = units === "metric" ? 20 : 60;
      if(data.temp <= threshold) setBg(winter);
      else setBg(summer);
    };


    fetchweatherData();
  },[units, city]);

  const handleUnitsClick = (e) =>{
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if(e.keyCode === 13){    //13 is key code for enter
      setCity(e.currentTarget.value)
      e.currentTarget.blur();
    }
  }

  return (
      <div className="app" style={{backgroundImage: `url(${bg})`}}>
        <div className="overlay">
        {
          weather && (

          <div className="container">
            <div className="section section__inputs">
                <input onKeyDown={enterKeyPressed} type="text" name='city' placeholder='Enter City...' />
                <button onClick={(e) => handleUnitsClick(e)}>F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed(1)} °${units === "metric" ? "C" : "F"}`}</h1>
              </div>
            </div>
            {/* bottom  */}
            <Description weather = {weather} units={units}/>
          </div>
          )
        }
        </div>
      </div>
  );
}

export default App;
