import React, { useState } from 'react'
import './weather.css'

const api = {
    key:'69fcd5d9feb231447975fa83c11472a6',
    base:'https://api.openweathermap.org/data/2.5/'
}

const Weather = () => {

    const [query,setQuery] = useState('');
    const [weather,setWeather] = useState({});

    const search = (evt) => {
        if (evt.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result)
                    setQuery('')
                    console.log(weather)
                })
                .catch((error) => console.error('Error fetching data:', error)); // Added error handling
        }
    }

    const dateBuilder = (d)=>{
        const months = [
            "January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
        const days = ["Sunday",  "Monday",  "Tuesday",  "Wednesday",  "Thursday",  "Friday",  "Saturday"]
        const month = months[d.getMonth()]
        const day = days[d.getDay()]
        const date = d.getDate()
        const year = d.getFullYear()

        return `${day}, ${date} ${month} ${year}`
    }
  return (
    <div className= {(typeof weather.main!="undefined")?((weather.main.temp>16)?'appw':'app'):'app'}>
        <div className="search-box">
            <input type='text' placeholder='Search...' className='search-bar' value={query} onChange={evt => setQuery(evt.target.value)}
            onKeyPress={search} />
        </div>
        {(typeof weather.main != "undefined")?
        (
        <div className='main'>
         <div className="location-box">
            <div className="location">
                {weather.name},{weather.sys.country}
            </div>
            <div className="date">
                {dateBuilder(new Date())}
            </div>
          </div>
        <div className="temp">
            {Math.round(weather.main.temp)}°C
        </div>
        <div className="weather">
                {weather.weather[0].main}
        </div>
        </div>
        ):' '
        }
       
    </div>
  )
}

export default Weather
