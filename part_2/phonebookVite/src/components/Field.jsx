const Field = (props) =>
{
	return (
		<input value={props.value} onChange={props.handler} />
	)
}

export default Field