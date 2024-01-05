const CountryMany = (props) =>
{
    return (
        <li>
            {props.name}
        </li>
    )
}

const CountryDetails = (props) =>
{
    return (
        <>
            <h3>{props.country.name}</h3>
        </>
    )
}

const DisplayCountries = (props) =>
{
    if (props.countries.length > 10)
    {
        console.log("More than 10 countries, be more specific")
        /*
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
        */
    } 
    else if ((1 < props.countries.length) && props.countries.length <= 10)
    {
        // If we have 2-10 countries, display only the countries' names. The names are already
        // filtered and given to us as a property.
        console.log("Displaying all matching")
        /*
        return (
            <ul>
                {props.countries.map((c) =>
                    {
                        <CountryMany name={c.name} />
                    })
                }
            </ul>
        )
        */
    }
    else if (props.countries.length === 1)
    {
        console.log("Displaying all basic info")
        /*
        return (
            <CountryDetails country={props.countries[0]} />
        )
        */
    }
    else
    {
        console.log("No matching countries")
    }
}

export default DisplayCountries