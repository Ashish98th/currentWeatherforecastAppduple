import { useState } from 'react';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [inputCity, setInputCity] = useState('');
  const [data, setData] = useState([]);

  const API_KEY = '9fbd5ab5e0d66ff4d78216405925bcaa';

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${cityName}`;
    axios.get(apiURL).then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log('err', err);
    });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getWeatherDetails(inputCity);
  };

  return (
    <div id='container' className='col-md-12'>
      <div className='weatherBg'>
        <h1 className='heading'>Weather App</h1>
        <form className='d-grid gap-3 col-4 mt-4'>
          <input type='text' className='form-control'
                 value={inputCity}
                 onChange={handleChangeInput} />
          <button className='btn btn-primary' type='submit'
                  onClick={handleSearch}
          >Search
          </button>
        </form>
      </div>

      {Object.keys(data).length > 0 &&
        <div className='col-md-12 text-center mt-5'>
          <div className='shadow rounded weatherResultBox'>
            <h5 className='weatherCity'>{data.location.name}</h5>
            <img className='weatherIcon' src={data.current.weather_icons} alt='Icon' />

            <h2 className='weatherTemp'>{data.current.temperature}°C</h2>
            <h5 className='localTime'>Time: {data.location.localtime}</h5>
            <h5 className='humidity'>Humidity: {data.current.humidity}</h5>
          </div>
        </div>
      }
    </div>
  );
}

export default App;