import { useState } from "react"

const Person = ({name}) =>
{
	return (
		<li>{name.name}</li>
	)
}

const App = () =>
{
	const [persons, setPersons] = useState([
		{name: 'Arto Hellas'}
	])
	const [newName, setNewName] = useState('')

	const addName = (event) =>
	{
		event.preventDefault()
		console.log('button clicked, adding name', event.target)

		const personObject = 
		{
			name: newName
		}

		// Checks if the person is in the array. If they aren't, add them. 
		if (persons.findIndex((person) => person.name === personObject.name) === -1)
		{
			setPersons(persons.concat(personObject))
			setNewName('')
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

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange}/>
				</div>
				<div>debug: {newName}</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) =>
					<Person key={person.name} name={person} />
				)}
			</ul>
		</div>
	)
}

export default App
