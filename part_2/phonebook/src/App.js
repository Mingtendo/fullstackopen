import { useState } from "react"

const Filter = (props) =>
{
	return (
		<div>
			filter shown with <input value={props.value} onChange={props.handler} />
		</div>
	)
}

const Person = ({data}) =>
{
	return (
		<li>{data.name} {data.number}</li>
	)
}

const App = () =>
{
	const [persons, setPersons] = useState([
		{ 
			name: 'Arto Hellas', number: '040-1234567',id: 1
		},
		{
			name: 'Ada Lovelace', number: '39-44-5323523', id: 2
		},
		{
			name: 'Dan Abramov', number: '12-43-234345', id: 3
		},
		{
			name: 'Mary Poppendieck', number: '39-23-6423122', id: 4
		}
	])

	const [newName, setNewName] = useState('')
	const [newNumb, setNewNumb] = useState('')
	const [idCount, setIDCount] = useState(5)
	const [search, setSearch] = useState('')

	const addName = (event) =>
	{
		event.preventDefault()
		console.log('button clicked, adding name', event.target)

		const personObject = 
		{
			name: newName,
			number: newNumb,
			id: idCount
		}

		// Checks if the person is in the array. If they aren't, add them. 
		if (persons.findIndex((person) => person.name === personObject.name) === -1)
		{
			setPersons(persons.concat(personObject))
			setNewName('')
			setNewNumb('')
			setIDCount(idCount+1)
		}
		// If they are, send an alert that they are already in the phonebook.
		else
		{
			alert(`${newName} is already added to the phonebook`)
		}
		
	}

	const handleNameChange = (event) =>
	{
		console.log(event.target.value)
		setNewName(event.target.value)
	}

	const handleNumbChange = (event) =>
	{
		console.log(event.target.value)
		setNewNumb(event.target.value)
	}

	const handleSearch = (event) =>
	{
		console.log(event.target.value)
		setSearch(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={search} handler={handleSearch} />
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumb} onChange={handleNumbChange} />
				</div>
				<div>newName: {newName}</div>
				<div>newNumb: {newNumb}</div>
				<div>id: {idCount}</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.filter((person) => 
					{
						return person.name.toLowerCase().includes(search.toLowerCase()) === true
				 	}).map((person) =>
					{
						return <Person key={person.id} data={person} />
					}
				)}
			</ul>
		</div>
	)
}

export default App
