import {useState} from 'react';
// Component Hello. Components are defined as JS functions.
// const Hello = ({name, age}) =>
// {
// 	const bornYear = () => new Date().getFullYear() - age

// 	console.log({name}, {age})
// 	return (
// 		<div>
// 			<p>Hello {name}, you are {age} years old</p>
// 			<p>So you were probably born in {bornYear()}</p>
// 		</div>
// 	)
// }

// const Footer = () =>
// {
// 	return (
// 		<div>
// 			greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
// 		</div>
// 	)
// }

const Display = ({counter}) => <div>{counter}</div>
	

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = (props) =>
{
	const [counter, setCounter] = useState(0)
	console.log('Rendering with counter value', counter)

	const increaseByOne = () => 
	{
		console.log('Increasing, value before', counter) 
		setCounter(counter+1)
	}

	const decreaseByOne = () => 
	{
		console.log('Decreasing, value before', counter)
		setCounter(counter-1)
	}

	const setToZero = () => 
	{
		console.log('Resetting to zero, value before', counter)
		setCounter(0)
	}

	return (
		<div>
			<Display counter={counter} />
			<Button handleClick={increaseByOne} text='Plus' />
			<Button handleClick={decreaseByOne} text='Minus' />
			<Button handleClick={setToZero} text='Reset' />
		</div>
	)
}

export default App;
