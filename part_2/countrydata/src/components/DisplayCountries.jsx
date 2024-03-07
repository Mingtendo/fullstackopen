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
            <h4>languages: </h4>
            <ul>
                {
                    props.country.languages.map((lan) =>
                    {
                        return <li key={lan}>{lan}</li>
                    })
                }
            </ul>
        </div>
        <img src={props.country.flag} />
        <div>
            <h4>Weather in {props.country.name}</h4>
        </div>
        </>
    )
}

const CountryMany = ({name, showButton, details}) =>
{
    const displayView = !details.display ? 'show' : 'hide'

    if (details.display)
    {
        return (
            <div>
                {name} <button onClick={showButton}>{displayView}</button> <br />
                <CountryDetails country={details} />
            </div>
            
        )
    }
    // Default return just the name
    return (
        <div>
            {name} <button onClick={showButton}>{displayView}</button> <br />
        </div>
    )
}

// Decides what to render when fed a list of countries.
// The names of extracted parameters have to match those that were passed in.
const DisplayCountries = ({countries, showButtonFunc}) =>
{
    console.log(`length of searched countries: ${countries.length}`)
    if (countries.length > 10)
    {
        console.log("More than 10 countries, be more specific")
        
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
       
    } 
    else if (1 < countries.length && countries.length <= 10)
    {
        // If we have 2-10 countries, display only the countries' names. The names are already
        // filtered and given to us as a property.
        console.log("Displaying all matching")
        
        return (
            <ul>
                {
                    countries.map((c) =>
                    {
                        console.log(c)
                        return <CountryMany key={c.id} name={c.name} showButton={() => showButtonFunc(c.id)} details={c} />
                    })
                }
            </ul>
        )
       
    }
    else if (countries.length === 1)
    {
        console.log("Displaying all basic info")
        // console.log(`Sole country: ${countries[0]}, ${typeof countries[0].languages}`)
        
        return (
            <CountryDetails country={countries[0]} />
        )
       
    }
    else
    {
        console.log("No matching countries")
    }
}

export default DisplayCountries