import React, {useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import DisplayCountries from './components/DisplayCountries.jsx'
import ServerService from './services/server'
import weatherservice from './services/weatherservice.js'

const App = () => 
{
    const [search, setSearch] = useState("")
    const [allCountries, setAllCountries] = useState([])
    const [searchedCountries, setSearchedCountries] = useState([])

    const hook = () =>
    {
        console.log('hook')
        ServerService
            .getAll()
            .then((countryData) =>
            {
                // Make something into an Array type.
                const countriesRawData = Array.from(countryData)
                console.log(countriesRawData)
                // .map(element, index in array)
                const countriesNecessaryData = countriesRawData.map((c, index) =>
                {
                    // console.dir(c)   // View contents of an object
                    // console.log(c.name.common)
                    // console.log(c.capital)
                    // console.log(`latitude: ${c.latlng[0]}`)
                    // console.log(`longitude: ${c.latlng[1]}`)
                    // console.log(c.languages)

                    let spoken = []
                    
                    if (c.languages !== undefined)
                    {
                        // How to get values of something that looks like a dict.
                        // Remember, .map only works on arrays.
                        spoken = Object.keys(c.languages).map((key) => c.languages[key])
                    }

                    // console.log(`${c.name.common} has id ${index}`)
                    // console.log(`index has type ${typeof index}`)

                    const Country =
                    {
                        id: Number(index),
                        name: String(c.name.common),
                        capitals: String(c.capital),
                        area: Number(c.area),
                        latitude: Number(c.latlng[0]),
                        longitude: Number(c.latlng[1]),
                        languages: spoken,
                        flag: c.flags.png,
                        display: false
                    }

                    return Country
                })
                setAllCountries(countriesNecessaryData)
            })
    }

    // console.log(`search's value after: ${search}`)
    useEffect(hook, [])

    const handleSearch = (event) =>
    {
        const typedIn = String(event.target.value)
        // console.log(`Typed: ${event.target.value}`)
        // console.log(`search: ${search}`)
        setSearch(typedIn)
        // console.log(searchedCountries)
        queryCountries(typedIn)  // So that we don't lag behind by using search's state.
    }

    // Fetch the weather for the country
    const fetchWeather = (id) =>
    {
        const countryToGrab = allCountries.find(c => c.id === id)
        console.log(`${countryToGrab.name}'s lat & lng: ${countryToGrab.latitude} & ${countryToGrab.longitude}`)
        
        // Sadly, you cannot extract data from a promise without using async/await. So it must
        // be used in a callback function and then stored in a state.
        const stupidPromise = weatherservice
            .getWeatherAt(countryToGrab.latitude, countryToGrab.longitude)
            .then((data) => 
            {
                const incomingData = data
                // console.log(`incomingData: ${incomingData}`)
                // Fetching the minimum weather data to be displayed.
                const filteredWeatherData = 
                {
                    temp: Number(incomingData.main.temp)-273.15,
                    wind: Number(incomingData.wind.speed),
                    cond: String(incomingData.weather[0].description)
                }

                // console.log(`temp: ${filteredWeatherData.temp}`)
                // console.log(`wind: ${filteredWeatherData.wind}`)
                // console.log(`cond: ${filteredWeatherData.cond}`)

                const countryWeatherUpdated = {...countryToGrab, weather: filteredWeatherData}
                console.log(countryWeatherUpdated)
                // return countryWeatherUpdated
                setSearchedCountries(searchedCountries.concat(countryWeatherUpdated))
            })
    }
    
    // Look for all countries that contain the string that was entered.
    const queryCountries = (query) =>
    {
        let newQuery = String(query)
        const queryLength = newQuery.length
        // console.log(`last character in query is: ${newQuery[queryLength-1]}`)

        let matchingCountries = []
        if (newQuery[queryLength-1] === '\\')
        {
            newQuery = String(query).slice(0, queryLength-1)
            matchingCountries = allCountries.filter((c) =>
            {
                return String(c.name).toLowerCase() === newQuery
            })
        }
        else
        {
            // console.log(`search's value when querying: ${search}`)

            // Using filter is what's needed. Array.map() creates a new array
            // based on the return value of the callback function.
            matchingCountries = allCountries.filter((c) => 
            {
                return String(c.name).toLowerCase().includes(newQuery.toLowerCase())
            })
        }

        // Get the weather report for each country.

        matchingCountries.map((c) => 
        {
            // console.log(`${c.name} has id: ${c.id}`)
            fetchWeather(c.id)
            // const d = fetchWeather(c.id)
            // console.log(`fetched weather for ${c.name}: ${d}`)
            // console.dir(d)
            // return d
        })

        // Don't set matchingCountries into state of searchedCountries because of the stupid-way that
        // promises work. So allegedly, the country's weather should be set in searchedCountries.
    }

    const toggleShowCountry = (id) =>
    {
        const country = searchedCountries.find(c => c.id === id)
        console.log(`${country.name} toggled`)
        const changedCountry = {...country, display: !country.display}
        // Change the display status of the country
        // Because we only change the status in the searchedCountries array, when we search for it
        // again it should not be displayed by default.
        setSearchedCountries(searchedCountries.map(c => c.id !== id ? c : changedCountry))
    }

    return (
        <div>
            <h2>Find Countries</h2>

            <SearchBar searchtext={search} handler={handleSearch} />
        
            <DisplayCountries countries={searchedCountries} showButtonFunc={toggleShowCountry} />
        </div>
    )
}

export default App
