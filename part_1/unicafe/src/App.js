import { useState } from "react";

const Header = (props) =>
(
	<h1>{props.text}</h1>
)

const Button = (props) =>
(
	<button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => 
{
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	)
}

const Statistics = (props) =>
{
	if (props.all === 0)
	{
		return (
			<div>no feedback given</div>
		)
	}
	return (
		<table>
			<tbody>
				<StatisticLine text={"good"} value={props.good}/>
				<StatisticLine text={"neutral"} value={props.neutral}/>
				<StatisticLine text={"bad"} value={props.bad}/>
				<StatisticLine text={"all"} value={props.all}/>
				<StatisticLine text={"average"} value={props.average}/>
				<StatisticLine text={"positive"} value={props.positive+"%"}/>
			</tbody>
		</table>
	)
}

// Complete up to Exercise 1.11, the end of the Unicafe assignment. Note: 1.11 was optional at time of completion.

/*
Typical source of an error "Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist." 
is Chrome extensions. Try going to chrome://extensions/ and try disabling them one by one and refreshing React app page; 
the error should eventually disappear.
*/
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
			<Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
		</div>
	)
}

export default App;
