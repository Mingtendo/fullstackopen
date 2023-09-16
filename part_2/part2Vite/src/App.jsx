import {useState, useEffect} from 'react'
import axios from 'axios'
import Note from "./components/Note"

const App = () =>
{
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)

	// Fetches data from server upon startup, and every time something is re-rendered thereafter (component update, etc)
	const hook = () =>
	{
		console.log('effect')
		axios
			.get('http://localhost:3001/notes')
			.then(response => 
			{
				console.log('promise fulfilled')
				setNotes(response.data)
			})
	}

	useEffect(hook, [])
	console.log('render', notes.length, 'notes')

	const toggleImportanceOf = (id) =>
	{
		console.log(`importance of ${id} needs to be toggled`)
	}

	// Adds a note to the server, then fetches the list of notes from the server
	const addNote = (event) => 
	{
		event.preventDefault()
		console.log('button clicked', event.target)

		// ID removed, as it's better for the server to handle this.
		const noteObject = 
		{
			content: newNote,
			important: Math.random() < 0.5
		}

		axios
			.post('http://localhost:3001/notes', noteObject)
			.then(response =>
			{
				console.log(response)
				setNotes(notes.concat(response.data))
				setNewNote('')
			})
	}

	// Changes the value of newNote, which is the value in the input bar everytime something is removed or added
	const handleNoteChange = (event) =>
	{
		console.log(event.target.value)
		setNewNote(event.target.value)
	}

	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important === true)

	// Items in a list must have a unique ID, or key attribute.
	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => 
					<Note 
						key={note.id} 
						note={note} 
						toggleImportance = {() => toggleImportanceOf(note.id)}
					/>
				)}
			</ul>
			<form onSubmit={addNote}>
				<input 
					value={newNote}
					onChange={handleNoteChange}
				/>
				<button type='submit'>save</button>
			</form>
		</div>
	)
}

export default App
