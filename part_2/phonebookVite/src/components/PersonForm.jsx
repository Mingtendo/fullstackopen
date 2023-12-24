import Field from "./Field"

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

export default PersonForm