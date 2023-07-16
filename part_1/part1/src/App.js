import {useState} from 'react';

// React component that returns a button element.
const Button = ({handleClick, text}) =>
(
	<button onClick={handleClick}>
		{text}
	</button>
)

const History = (props) =>
{
	if (props.allClicks.length === 0)
	{
		return (
			<div>
				the app is used by pressing the buttons
			</div>
		)
	}

	return (
		<div>
			button press history: {props.allClicks.join(' ')}
			<br />
			total: {props.totals}
		</div>
	)
}

const App = (props) =>
{
	// Event Handling Revisited
	const [value, setValue] = useState(10)

	const setToValue = (newValue) => () =>
	{
		console.log('value now', newValue)
		setValue(newValue)
	}

	// // All below this line are a group
	// // Same as commented out stuff underneath.
	// const hello = (who) => () =>
	// {
	// 	console.log('hello', who)
	// }

	// // const hello = (who) => 
	// // {
	// // 	const handler = () => 
	// // 	{
	// // 		console.log('hello', who)
	// // 	}
	// // 	return handler
	// // }
	// // All above this line are a group

	return (
		<div>
			{value}
			<button onClick={setToValue(1000)}>thousand</button>
			<button onClick={setToValue(0)}>reset</button>
			<button onClick={setToValue(value+1)}>increment</button>
			<button onClick={setToValue(value*value)}>double</button>
		</div>
	)
	
	// // All below this line are a group
	// const handleClick = () => 
	// {
	// 	console.log('clicked the button')
	// 	setValue(0)
	// }

	// // A function returning a function. Doing function calls in elements requires a parenthesis; i.e. onClick={hello()}
	// const hello = () =>
	// {
	// 	const handler = () => console.log('hello world')
	// 	return handler
	// }

	// // These two buttons do the exact same thing, because hello() returns a function.
	// return (
	// 	<div>
	// 		{value}
	// 		<button onClick={hello()}>reset to zero</button>
	// 		<button onClick={() => console.log('hello world')}>also resets</button>
	// 	</div>
	// )
	// // All above this line are a group

	// // ##################################

	// // Rules of Hooks - Never do any of these
	// const App = () => {
	// 	// these are ok
	// 	const [age, setAge] = useState(0)
	// 	const [name, setName] = useState('Juha Tauriainen')
	  
	// 	if ( age > 10 ) {
	// 	  // this does not work!
	// 	  const [foobar, setFoobar] = useState(null)
	// 	}
	  
	// 	for ( let i = 0; i < age; i++ ) {
	// 	  // also this is not good
	// 	  const [rightWay, setRightWay] = useState(false)
	// 	}
	  
	// 	const notGood = () => {
	// 	  // and this is also illegal
	// 	  const [x, setX] = useState(-1000)
	// 	}
	  
	// 	return (
	// 	  //...
	// 	)
	//   }
	
	// // ##################################

	// // Complex handling of state -> Debugging React applications
	// const [left, setLeft] = useState(0)
	// const [right, setRight] = useState(0)
	// const [allClicks, setAll] = useState([])
	// const [total, setTotal] = useState(0)

	// const handleLeftClick = () =>
	// {
	// 	// Returns new copy of array with 'L' added to it.
	// 	setAll(allClicks.concat('L'))
	// 	// Needed because the state is updated asynchronously. It is updated at some point before the view is rendered, but we
	// 	// don't know when.
	// 	const updatedLeft = left+1
	// 	setLeft(left+1)
	// 	setTotal(updatedLeft+right)
	// }

	// const handleRightClick = () =>
	// {
	// 	setAll(allClicks.concat('R'))
	// 	const updatedRight = right+1
	// 	setRight(right+1)
	// 	setTotal(left+updatedRight)
	// }

	// // Use this keyword to pause code execution in the browser's console.
	// // debugger

	// return (
	// 	<div>
	// 		{left}
	// 		<Button handleClick={handleLeftClick} text='left' />
	// 		<Button handleClick={handleRightClick} text='right' />
	// 		{right}
	// 		<History allClicks={allClicks} totals={total}/>
	// 	</div>
	// )
}

export default App;
