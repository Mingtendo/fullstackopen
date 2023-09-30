import axios from "axios"
const baseURL = "http://localhost:3001/notes"


// Promises are assigned to a request variable. Then, only the response data is returned to App, since that's
// the only thing that is needed for our app.
const getAll = () =>
{
	const request = axios.get(baseURL)
	const nonExisting =
	{
		id: 10000,
		content: 'This note is not saved to server',
		important: true
	}
	return request.then((response) => response.data.concat(nonExisting))

	// Same as the one-liner.
	// return request.then((response) =>
	// {
	// 	return response.data
	// })
}

const create = (newObject) =>
{
	const request = axios.post(baseURL, newObject)
	return request.then((response) => response.data)
}

const update = (id, newObject) =>
{
	const request = axios.put(`${baseURL}/${id}`, newObject)
	return request.then((response) => response.data)
}

export default {getAll, create, update}