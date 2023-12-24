const Person = ({data, deleteEntry}) =>
{
	return (
		<li>
			{data.name} &nbsp; 
			{data.number} &nbsp;
			<button onClick={deleteEntry}>delete</button>
		</li>
	)
}

export default Person