import {useState, useEffect} from 'react'
import Note from "./components/Note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"
import noteService from "./services/notes"

const App = () =>
{
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	// Fetches data from server upon startup, and every time something is re-rendered thereafter (component update, etc)
	// Uses functions exported from './services/notes'
	const hook = () =>
	{
		console.log('getting all info')
		noteService
			.getAll()
			.then(initialNotes => 
			{
				setNotes(initialNotes)
			})
	}

	// Calls the hook and any potential arguments needed to be used in the hook on refresh/component update.
	useEffect(hook, [])
	console.log(`rendered ${notes.length} notes: ${notes}`)

	// Event handler which toggles importance of a specific note by ID.
	const toggleImportanceOf = (id) =>
	{
		const note = notes.find(n => n.id === id)					// Find note with same ID in list.
		const changedNote = {...note, important: !note.important}	// Unpackage the note, and flip boolean.
		console.log(`importance of ${id} needs to be toggled`)

		// Update the note in the server and reflect changes on client.
		// If we try to update a deleted note, filter it out and reflect change on client.
		noteService
			.update(id, changedNote)
			.then(returnedNote =>
			{
				setNotes(notes.map(note => note.id !== id ? note : returnedNote))
			})
			.catch((error) =>
			{
				setErrorMessage(`Note '${note.content}' was already removed from server`)
				// After 5 seconds, set error message to nothing.
				setTimeout(() =>
				{
					setErrorMessage(null)
				}, 5000)
				setNotes(notes.filter(n => n.id !== id))
			})
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

		noteService
			.create(noteObject)
			.then(returnedNote =>
			{
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
	}

	// Changes the value of newNote, which is the value in the input bar everytime something is removed or added
	const handleNoteChange = (event) =>
	{
		console.log(`typed: ${event.target.value}`)
        console.log(`newNote value: ${newNote}`)
		setNewNote(event.target.value)
	}

	// Variable which stores boolean of whether to show all notes or just notes marked 'Important'.
	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important === true)

	// Items in a list must have a unique ID, or key attribute.
	return (
		<div>
			<h1>Notes</h1>
			
			<Notification message={errorMessage} />
			
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

			<Footer />
		</div>
	)
}

export default App
