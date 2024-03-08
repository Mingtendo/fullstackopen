import axios from "axios"

const api_key = import.meta.env.VITE_OPEN_API_WEATHER_KEY

const baseURL = "https://api.openweathermap.org/data/2.5/weather"

const getWeatherAt = (latitude, longitude) =>
{
    // console.log(`API Key: ${api_key}`)
    const request = axios.get(`${baseURL}/?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
    return request.then((response) => response.data)
}

export default {getWeatherAt}