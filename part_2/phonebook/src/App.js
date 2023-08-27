import { useState } from "react"

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
			name: 'Arto Hellas',
			number: '040-1234567'
		}
	])

	const [newName, setNewName] = useState('')
	const [newNumb, setNewNumb] = useState('')

	const addName = (event) =>
	{
		event.preventDefault()
		console.log('button clicked, adding name', event.target)

		const personObject = 
		{
			name: newName,
			number: newNumb
		}

		// Checks if the person is in the array. If they aren't, add them. 
		if (persons.findIndex((person) => person.name === personObject.name) === -1)
		{
			setPersons(persons.concat(personObject))
			setNewName('')
			setNewNumb('')
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

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange}/>
				</div>
				<div>
					number: <input value={newNumb} onChange={handleNumbChange} />
				</div>
				<div>newName: {newName}</div>
				<div>newNumb: {newNumb}</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) =>
					<Person key={person.name} data={person} />
				)}
			</ul>
		</div>
	)
}

export default App
