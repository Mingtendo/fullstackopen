import { useEffect, useState } from "react"
import axios, { all } from 'axios'
import serverService from './services/phonebook'	// Can name the import whatever you want.

const Field = (props) =>
{
	return (
		<input value={props.value} onChange={props.handler} />
	)
}

const Filter = (props) =>
{
	return (
		<div>
			filter shown with: <Field value={props.value} handler={props.handler} />
		</div>
	)
}

const PersonForm = (props) =>
{
	return (
		<form onSubmit={props.submitFunc}>
			<div>
				name: <Field value={props.varName} handler={props.nameChangeFunc} />
			</div>
			<div>
				number: <Field value={props.varNumb} handler={props.numbChangeFunc} />
			</div>
			<div>newName: {props.varName}</div>
			<div>newNumb: {props.varNumb}</div>
			<div>id: {props.varIDCount}</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

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

const App = () =>
{
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumb, setNewNumb] = useState('')
	const [idCount, setIDCount] = useState(persons.length)
	const [search, setSearch] = useState('')

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

		const personObject = 
		{
			name: newName,
			number: newNumb,
			id: idCount
		}

		// Checks if the person is in the array. If they aren't, add them. 
		if (persons.findIndex((person) => person.name === personObject.name) === -1)
		{
			serverService
				.create(personObject)
				.then(returnedPerson => 
				{
					setPersons(persons.concat(returnedPerson))
				})
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
			
			<Filter value={search} handler={handleSearch} />

			<PersonForm submitFunc={addName} varName={newName} varNumb={newNumb} varIDCount={idCount}
			nameChangeFunc={handleNameChange} numbChangeFunc={handleNumbChange} />

			<h2>Numbers</h2>
			
			<PersonsList data={persons} query={search} deleteFunc={deleteName}/>
		</div>
	)
}

export default App
