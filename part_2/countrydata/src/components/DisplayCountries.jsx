const CountryMany = (props) =>
{
    return (
        <div>
            {props.name} <br />
        </div>
    )
}

const CountryDetails = (props) =>
{
    return (
        <>
        <h3>{props.country.name}</h3>
        <div>
            capital: {props.country.capitals} <br />
            area: {props.country.area} <br />
        </div>
        <div>
            languages: <br />
            <ul>
                {
                    props.country.languages.map((lan) =>
                    {
                        return <li key={lan}>{lan}</li>
                    })
                }
            </ul>
        </div>
        </>
        
    )
}

// Decides what to render when fed a list of countries.
const DisplayCountries = (props) =>
{
    console.log(`length of searched countries: ${props.countries.length}`)
    if (props.countries.length > 10)
    {
        console.log("More than 10 countries, be more specific")
        
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
       
    } 
    else if (1 < props.countries.length && props.countries.length <= 10)
    {
        // If we have 2-10 countries, display only the countries' names. The names are already
        // filtered and given to us as a property.
        console.log("Displaying all matching")
        
        return (
            <ul>
                {
                    props.countries.map((c) =>
                    {
                       return <CountryMany key={c.name} name={c.name} />
                    })
                }
            </ul>
        )
       
    }
    else if (props.countries.length === 1)
    {
        console.log("Displaying all basic info")
        console.log(`Sole country: ${props.countries[0]}, ${typeof props.countries[0].languages}`)
        
        return (
            <CountryDetails country={props.countries[0]} />
        )
       
    }
    else
    {
        console.log("No matching countries")
    }
}

export default DisplayCountries