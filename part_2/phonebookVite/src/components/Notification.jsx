const Notification = ({message}) =>
{
	if (message  === null)
	{
		console.log(`Nothing to print`)
		return null
	}

	/*
	const messageToDeclare = String(message)
	if (messageToDeclare.startsWith("Added", 0) || messageToDeclare.startsWith("Changed"))
	{
		const addedStyle = 
		{
			color: 'green',
			background: 'lightgrey',
			fontSize: 20,
			borderStyle: 'solid',
			borderRadius: 5,
			padding: 10,
			marginBottom: 10
		}

		return (
			<div style={addedStyle}>
				{message}
			</div>
		)
	}
	*/

	const addedStyle = 
	{
		color: 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}

	return (
		<div style={addedStyle}>
			{message}
		</div>
	)

}

export default Notification