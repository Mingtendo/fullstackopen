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
                // console.log(`latitude: ${c.latlng[0]}`)
                // console.log(`longitude: ${c.latlng[1]}`)

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
        queryCountries(typedIn)           // So that we don't lag behind by using search's state.
        console.log(`searchedCountries after awaiting for queryCountries: ${searchedCountries}`)       // Will always be one behind, as this will be executed synchronously.
        console.dir(searchedCountries)
        // await fetchWeather()
    }

    // Fetch the weather for the country
    // TODO: Fetch the data only when the user clicks on show.
    // TODO: Fetch the data automatically when there is only one country to display.
    const fetchWeather = (country) =>
    {
        weatherservice
        .getWeatherAt(country.latitude, country.longitude)
        .then((data) => 
        {
            const incomingData = data
            // console.log(`incomingData: ${incomingData}`)
            // Fetching the minimum weather data to be displayed.
            const filteredWeatherData = 
            {
                temp: Number(incomingData.main.temp),
                wind: Number(incomingData.wind.speed),
                cond: String(incomingData.weather[0].description)
            }

            // console.log(`temp: ${filteredWeatherData.temp}`)

            const countryWeatherUpdated = {...country, weather: filteredWeatherData}
            console.log(countryWeatherUpdated)
            // return countryWeatherUpdated
            const updated = searchedCountries.map(c => c.id !== country.id ? c : countryWeatherUpdated)
            console.log("updated ------------------")
            console.dir(updated)
            setSearchedCountries(updated)
        })
    }
    
    // Look for all countries that contain the string that was entered.
    const queryCountries = (query) =>
    {
        let newQuery = String(query)
        const queryLength = newQuery.length
        // console.log(`last character in query is: ${newQuery[queryLength-1]}`)

        let matchingCountries = []
        // Looking for exact match.
        if (newQuery[queryLength-1] === '\\')
        {
            newQuery = String(query).slice(0, queryLength-1)
            matchingCountries = allCountries.filter((c) =>
            {
                return String(c.name).toLowerCase() === newQuery
            })
            fetchWeather(matchingCountries[0])
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
            if (matchingCountries.length === 1)
            {
                // Must fetch weather data before display
                console.log(`there is only one country: ${matchingCountries[0].name}`)
                fetchWeather(matchingCountries[0])
            }
            else
            {
                // Store the countries' data.
                setSearchedCountries(matchingCountries)
            }
        }
    }

    const toggleShowCountry = (id) =>
    {
        const country = searchedCountries.find(c => c.id === id)
        console.log(`${country.name} toggled`)
        const changedCountry = {...country, display: !country.display}
        // Change the display status of the country
        // Because we only change the status in the searchedCountries array, when we search for it
        // again it should not be displayed by default.

        // setSearchedCountries(searchedCountries.map(c => c.id !== id ? c : changedCountry))
        fetchWeather(changedCountry)
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
