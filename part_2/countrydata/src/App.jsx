import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import ServerService from './services/server'

const App = () => 
{
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState('')
    const [allCountries, setAllCountries] = useState([])
    const [searchedCountries, setSearchedCountries] = useState([])

    

    const hook = () =>
    {
        console.log('hook')
        ServerService
            .getAll()
            .then(countryData =>
            {
                const countriesRawData = Array(countryData)
                setAllCountries(countriesRawData.map((c) =>
                {
                    const Country =
                    {
                        name: c.name.common,
                        capitals: c.capitals,
                        area: c.area,
                        languages: c.languages,
                        flag: c.flags.png
                    }
                }))
            })
    }

    const handleSearch = (event) =>
    {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    const queryCountries = (name) =>
    {
        const matchingCountries = searchedCountries
    }

  return (
    <div>
        <h2>Find Countries</h2>

        <SearchBar searchtext={search} handler={handleSearch} />
        
        
    </div>
  )
}

export default App
