import Field from "./Field"

const Filter = (props) =>
{
	return (
		<div>
			filter shown with: <Field value={props.value} handler={props.handler} />
		</div>
	)
}

export default Filter