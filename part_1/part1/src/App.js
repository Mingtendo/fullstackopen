
// Component Hello. Components are defined as JS functions.
const Hello = ({name, age}) =>
{
	const bornYear = () => new Date().getFullYear() - age;

	console.log({name}, {age});
	return (
		<div>
			<p>Hello {name}, you are {age} years old</p>
			<p>So you were probably born in {bornYear()}</p>
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

	const name = 'Peter';
	const age = 10;

	return (
		<div>
			<h1>Greetings</h1>
			<Hello name="Maya" age={26+10} />
			<Hello name={name} age={age} />
		</div>
	)
}

export default App;
