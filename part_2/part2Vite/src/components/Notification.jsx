const Notification = ({message}) =>
{
	// If value of message pro is null, nothing is rendered.
	if (message === null) 
	{
		return null
	}

	// If there is a message, render inside a div element.
	return (
		<div className="error">
			{message}
		</div>
	)
}

// Don't forget to export the component!
export default Notification