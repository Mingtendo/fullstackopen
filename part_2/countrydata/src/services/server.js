import axios from 'axios'

const baseURL = "https://studies.cs.helsinki.fi/restcountries/"

const getAll = () =>
{
    const request = axios.get(`${baseURL}/api/all`)
    return request.then((response) => response.data)
}

const searchByName = (countryName) =>
{
    const request = axios.get(`${baseURL}/api/name/${countryName}`)
    return request.then((response) => response.data)
}

export default {getAll, searchByName}