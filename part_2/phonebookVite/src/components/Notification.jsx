const Notification = ({message}) =>
{
	if (message  === null)
	{
		console.log(`notifMessage has value null; no notification needed.`)
		return null
	}

	let notifStyle =
	{
		color: 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}

	const messageToDeclare = String(message)
	if (messageToDeclare.includes("was already deleted"))
	{
		notifStyle.color = 'red'
	}

	return (
		<div style={notifStyle}>
			{message}
		</div>
	)
}

export default Notification