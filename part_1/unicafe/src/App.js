import { useState } from "react";

const Header = (props) =>
(
	<h1>{props.text}</h1>
)

const Button = (props) =>
(
	<button onClick={props.handleClick}>{props.text}</button>
)

const Display = props => <div>{props.text} {props.value}</div>

const App = () =>
{
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)
	const [average, setAverage] = useState(0)
	const [positive, setPositive] = useState(0)

	const incrementAll = (newValue) =>
	{
		console.log("all has new value: ", newValue)
		setAll(newValue)
	}

	const changeAvg = (feedback) =>
	{
		let calcNew = average
		if (feedback === "good")
		{
			calcNew = good+1-bad
		}
		else if (feedback === "bad")
		{
			calcNew = good-bad-1
		}
		else
		{
			calcNew = good-bad
		}
		console.log("new avg satisfaction: ", calcNew/(all+1))
		setAverage(calcNew/(all+1))
	}

	const changePos = (feedback) =>
	{
		// Syntax is condition ? valIfTrue : valIfFalse
		let calcNew = feedback === "good" ? good+1 : good
		console.log("new positive remarks: ", calcNew/(all+1)*100)
		setPositive(calcNew/(all+1)*100)
	}

	const incrementGood = (newValue) => () =>
	{
		console.log("good has new value: ", newValue)
		incrementAll(all+1)
		changeAvg("good")
		changePos("good")
		setGood(newValue)
	}

	const incrementNeut = (newValue) => () =>
	{
		console.log("neutral has new value: ", newValue)
		incrementAll(all+1)
		changeAvg("neutral")
		changePos("neutral")
		setNeutral(newValue)
	}

	const incrementBad = (newValue) => () =>
	{
		console.log("bad has new value: ", newValue)
		incrementAll(all+1)
		changeAvg("bad")
		changePos("bad")
		setBad(newValue)
	}

	return (
		<div>
			<Header text="give feedback"/>
			<Button handleClick={incrementGood(good+1)} text="good"/>
			<Button handleClick={incrementNeut(neutral+1)} text="neutral"/>
			<Button handleClick={incrementBad(bad+1)} text="bad"/>

			<Header text="statistics"/>
			<Display text="good" value={good}/>
			<Display text="neutral" value={neutral}/>
			<Display text="bad" value={bad}/>
			<Display text="all" value={all}/>
			<Display text="average" value={average}/>
			<Display text="positive" value={positive}/>
		</div>
	)
}

export default App;
