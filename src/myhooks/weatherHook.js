import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY;

function useWeather(name) {
    const [country, setCountry] = useState({})
    useEffect(() => {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${name}&aqi=no`)
        .then(response => {
          const data = response.data
          setCountry(data)
        });
        return function cleanup() {
          setCountry({})
        };
      }, [name])
    
    return [
        country,
        setCountry
    ]
}

export default useWeather