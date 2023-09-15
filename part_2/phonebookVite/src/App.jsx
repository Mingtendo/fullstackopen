import { useEffect, useState } from "react"
import axios from 'axios'

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

const Person = ({data}) =>
{
	return (
		<li>{data.name} {data.number}</li>
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
				{
					return <Person key={person.id} data={person} />
			}
			)}
		</ul>
	)
}

const App = () =>
{
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumb, setNewNumb] = useState('')
	const [idCount, setIDCount] = useState(5)
	const [search, setSearch] = useState('')

	const hook = () =>
	{
		console.log('effect')
		axios
			.get('http://localhost:3001/persons')
			.then(response =>
			{
				console.log('promise fulfilled')
				setPersons(response.data)
			})
	}

	useEffect(hook, [])

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

			<PersonForm submitFunc={addName} varName={newName} varNumb={newNumb} varIDCount={idCount}
			nameChangeFunc={handleNameChange} numbChangeFunc={handleNumbChange} />

			<h2>Numbers</h2>
			
			<PersonsList data={persons} query={search}/>
		</div>
	)
}

export default App
