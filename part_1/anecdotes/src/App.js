import {useState} from 'react'

const App = () =>
{
	const anecdotes =
	[
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log() is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well."
	]

	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
	const [mostVoted, setMostVoted] = useState(0)

	const newQuote = () => () =>
	{
		setSelected(Math.floor(Math.random()*anecdotes.length))
		fetchMax()
	}

	const fetchMax = () =>
	{
		let max = 0
		let maxIndex = 0

		for (let i = 0; i < votes.length; i++)
		{
			if (votes[i] > max)
			{
				max = votes[i]
				maxIndex = i
			}
		}
		console.log("New most upvoted quote is: "+maxIndex)
		setMostVoted(maxIndex)
	}

	const vote = (quote) => () =>
	{
		const copy = [...votes]
		const newCount = copy[quote]+1
		copy[quote] += 1
		console.log("Votes for quote "+quote+" increased by one: "+ newCount)
		setVotes(copy)
		fetchMax()
	}

	return (
		<div>
			<h1>Anecdote of the Day</h1>
			{anecdotes[selected]}
			<br/>
			has {votes[selected]} votes
			<br/>
			<button onClick={vote(selected)}>vote</button>
			<button onClick={newQuote()}>next anecdote</button>
			<br/>

			<h1>Anecdote with most votes</h1>
			{anecdotes[mostVoted]}
			<br/>
			has {votes[mostVoted]} votes
		</div>
	)
}

export default App;
