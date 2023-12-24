import { useEffect, useState } from "react"
import serverService from './services/phonebook'	// Can name the import whatever you want.
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import PersonsList from "./components/PersonsList"
import Notification from "./components/Notification"


const App = () =>
{
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumb, setNewNumb] = useState('')
	const [idCount, setIDCount] = useState(persons.length)
	const [search, setSearch] = useState('')
	const [notifMessage, setnotifMessage] = useState(null)

	const hook = () =>
	{
		console.log('effect')
		serverService
			.getAll()
			.then(allPeople =>
			{
				console.log('promise fulfilled')
				setPersons(allPeople)
				setIDCount(persons.length+1)
				//console.log(`idCount after setPersons: ${idCount}`)
			})
	}

	//console.log(`idCount before hook: ${idCount}`)
	useEffect(hook, [idCount]) // idCount's value will be one more than persons' length.

	const addName = (event) =>
	{
		event.preventDefault()
		console.log('button clicked, adding name', event.target)

		let personObject = 
		{
			name: newName,
			number: newNumb,
			id: idCount
		}

		const existingPersonIndex = persons.findIndex((person) => person.name === personObject.name)

		// Checks if the person is in the array. If they aren't, add them. 
		if (existingPersonIndex === -1)
		{
			serverService
				.create(personObject)
				.then(returnedPerson => 
				{
					setPersons(persons.concat(returnedPerson))
					setnotifMessage(`Added ${personObject.name}`)
					setTimeout(() =>
					{
						setnotifMessage(null)
					}, 5000)
				})
			setNewName('')
			setNewNumb('')
			setIDCount(idCount+1)
		}
		// If they are, send an alert that they are already in the phonebook.
		else
		{
			if (window.confirm(`${newName} is already added to the phonebook. Do you want to change their number?`))
			{
				const existingPerson = persons[existingPersonIndex]
				personObject.id = existingPerson.id

				serverService
					.update(personObject.id, personObject)
					.then((returnedPerson) =>
					{
						setPersons(persons.map(p => p.id !== personObject.id ? p : returnedPerson))
						setnotifMessage(`Updated ${existingPerson.name}`)
						setTimeout(() =>
						{
							setnotifMessage(null)
						}, 5000)
					})
					.catch((error) =>
					{
						alert(`The person '${personObject.name}' was already deleted from the server.`)
						setPersons(persons.filter(p => p.id !== personObject.id))
					})
			}
		}
		
	}

	const deleteName = (id) =>
	{
		const personToDelete = persons.find(n => n.id === id)

		// Tells server to delete person with specific ID.
		if (window.confirm(`Are you sure you want to delete ${personToDelete.name}?`))
		{
			serverService
				.deleteEntry(id)
				.then((response) =>
				{
					console.log(`Response after deletion: ${response}`)
					const remainingPeople = persons.filter(p => p.id != id)
					setPersons(remainingPeople)
					setIDCount(remainingPeople.length)
				})
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

			<Notification message={notifMessage} />
			
			<Filter value={search} handler={handleSearch} />

			<PersonForm submitFunc={addName} varName={newName} varNumb={newNumb} varIDCount={idCount}
			nameChangeFunc={handleNameChange} numbChangeFunc={handleNumbChange} />

			<h2>Numbers</h2>
			
			<PersonsList data={persons} query={search} deleteFunc={deleteName}/>
		</div>
	)
}

export default App
