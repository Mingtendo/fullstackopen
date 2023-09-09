import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'

const notes =
[
	{
		id: 1,
		content: 'HTML is easy',
		important: true
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript',
		important: false
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		important: true
	}
]

// Shows how promises work.
const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

axios
	.get('http://localhost:3001/notes')
	.then(response =>
	{
		const notes = response.data
		console.log('uhhh notes promise', notes)
	})


ReactDOM.createRoot(document.getElementById('root')).render(
	<App notes={notes} />
)

const result = notes.map(note => note.id)
console.log("output of result", result)