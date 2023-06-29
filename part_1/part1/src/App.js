
// Component Hello. Components are defined as JS functions.
const Hello = (props) =>
{
	console.log(props)
	return (
		<div>
			<p>Hello {props.name}, you are {props.age} years old</p>
		</div>
	)
}

const Footer = () =>
{
	return (
		<div>
			greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
		</div>
	)
}

const App = () =>
{

	const friends = 
	[
		{name: 'Peter', age: 4},
		{name: 'Maya', age: 10}
	]

	return (
		<div>
			<p>{friends[0].name} {friends[0].age}</p>
			<p>{friends[1].name} {friends[1].age}</p>
		</div>
	)
}

export default App;
