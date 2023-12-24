import Person from "./Person"

const PersonsList = (props) =>
{
	return (
		<ul>
			{props.data.filter((person) => 
				{
					return person.name.toLowerCase().includes(props.query.toLowerCase()) === true
				}).map((person) =>
				<Person 
					key={person.id} 
					data={person} 
					deleteEntry={() => props.deleteFunc(person.id)}
				/>
			)}
		</ul>
	)
}

export default PersonsList