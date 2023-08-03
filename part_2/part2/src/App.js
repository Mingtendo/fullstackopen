const App = (props) =>
{
	const {notes} = props

	console.log('props value is', props)

	// Items in a list must have a unique ID, or key attribute.
	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notes.map((note) => 
					<li key={note.id}>
						{note.content}
					</li>
				)}
			</ul>
		</div>
	)
}

export default App
