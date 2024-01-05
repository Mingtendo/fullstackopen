const SearchBar = (props) =>
{
    return (
        <input value={props.searchtext} onChange={props.handler} />
    )
}

export default SearchBar