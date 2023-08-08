import Note from "./components/Note"

const App = ({notes}) =>
{

	console.log('notes value is', notes)

	// Items in a list must have a unique ID, or key attribute.
	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notes.map((note) => 
					<Note key={note.id} note={note} />
				)}
			</ul>
		</div>
	)
}

export default App
