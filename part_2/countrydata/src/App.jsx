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
                //console.log(countriesRawData)
                const countriesNecessaryData = countriesRawData.map((c) =>
                {
                    //console.dir(c)
                    //console.log(c.name.common)
                    //console.log(c.capital)
                    const Country =
                    {
                        name: c.name.common,
                        capitals: c.capital,
                        area: c.area,
                        languages: c.languages,
                        flag: c.flags.png
                    }

                    return Country
                })
                setAllCountries(countriesNecessaryData)
            })
    }

    console.log(`search's value after: ${search}`)
    useEffect(hook, [])

    const handleSearch = (event) =>
    {
        console.log(`Typed: ${event.target.value}`)
        console.log(`search: ${search}`)
        setSearch(event.target.value)
        console.log(searchedCountries)
        queryCountries()
    }
    
    // Look for all countries that contain the string that was entered.
    const queryCountries = () =>
    {
        console.log(`search's value when querying: ${search}`)
        // Using filter is what's needed. Array.map() creates a new array
        // based on the return value of the callback function.
        const matchingCountries = allCountries.filter((c) => 
        {
            //console.log(c)
            return c.name.toLowerCase().includes(search.toLowerCase())
        })
        setSearchedCountries(matchingCountries)
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