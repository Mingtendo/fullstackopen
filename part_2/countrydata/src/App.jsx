import React, {useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import DisplayCountries from './components/DisplayCountries.jsx'
import ServerService from './services/server'

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
                const countriesRawData = countryData
                console.log(countriesRawData)
                const countriesNecessaryData = countriesRawData.map((c, index) =>
                {
                    // console.dir(c)
                    // console.log(c.name.common)
                    // console.log(c.capital)
                    // console.log(c.languages)

                    let spoken = []
                    
                    if (c.languages !== undefined)
                    {
                        // How to get values of something that looks like a dict.
                        // Remember, .map only works on arrays.
                        spoken = Object.keys(c.languages).map((key) => c.languages[key])
                    }

                    console.log(`${c.name.common} has id ${index}`)
                    console.log(`index has type ${typeof index}`)

                    const Country =
                    {
                        id: Number(index),
                        name: String(c.name.common),
                        capitals: String(c.capital),
                        area: Number(c.area),
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
        
        setSearchedCountries(matchingCountries)
    }

    const toggleShowCountry = (id) =>
    {
        const country = searchedCountries.find(c => c.id === id)
        const changedCountry = {...country, display: !country.display}

        // TODO: integrate this somehow to display the country.
    }

  return (
    <div>
        <h2>Find Countries</h2>

        <SearchBar searchtext={search} handler={handleSearch} />
        
        <DisplayCountries countries={searchedCountries} />
    </div>
  )
}

export default App
