import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";
import notFound from "./assets/notFound.png";
import cold from "./assets/cold.jpeg"
import warm from "./assets/warm.jpg"

function App() {
  const [search, setSearch] = useState("mumbai");
  const [uriData, setData] = useState(null);
  const [error, setError] = useState(false);
  const api = "https://api.weatherapi.com/v1/current.json?key=2e98b5acac2f48a68b592431242102&q=";

  useEffect(() => {
    if (search === '') {
      // setData(uriData)
      return;}

    fetch(api + search)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 400) {
          throw new Error("error 400");
        }
      })
      .then(data => {
        setData(data);
        setError(false);
      })
      .catch(e => {
        
        setError(true); 
      });
  }, [search]);

  if (uriData == null) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='main'>
      <div className='app'>
        <div className="search">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search / City' />
        </div>
        <div className="detail">
          {error ? (
            <img src={notFound} className='mainImg' alt="Not Found" />
          ) : (
            <>
              <div className="celcius">
                <div className="name">
                  <h1>{uriData.current.feelslike_c}°C</h1>
                </div>
                <div className="icon">
                  <img src={uriData.current.condition.icon} alt="Weather Icon" />
                  <p>{uriData.current.condition.text}</p>
                  <h2>{uriData.location.name}</h2>
                </div>
              </div>
              <div className="time">
                {uriData.location.localtime}
              </div>
              <div className="condition">
                <div>
                  <img src={humidity} alt="Humidity Icon" />
                  <span>
                    <h2>{uriData.current.humidity}%</h2>
                    <h2>Humidity</h2>
                  </span>
                </div>
                <div>
                  <img src={wind} alt="Wind Speed Icon" />
                  <span>
                    <h2>{uriData.current.wind_kph} kmph</h2>
                    <h2>Speed</h2>
                  </span>
                </div>
              </div>
              <div className='bgImg'>
                <img src={parseInt(uriData.current.feelslike_c) > 20 ? warm :cold} alt="" />
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  );
}

export default App;
