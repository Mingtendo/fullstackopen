import axios from "axios"

const api_key = import.meta.env.OPEN_WEATHER_API_KEY

const baseURL = "https://api.openweathermap.org/data/2.5/weather"

const getWeatherAt = (latitude, longitude) =>
{
    const request = axios.get(`${baseURL}/?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
    return request.then((response) => response.data)
}

export default {getWeatherAt}