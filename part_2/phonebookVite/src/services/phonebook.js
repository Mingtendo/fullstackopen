import axios from "axios"
const baseURL = "http://localhost:3001/persons"		// Matches the name of the array in db.json.

const getAll = () =>
{
	const request = axios.get(baseURL)
	return request.then((response) => response.data)
}

const create = (newObject) =>
{
	const request = axios.post(baseURL, newObject)
	return request.then((response) => response.data)
}

const deleteEntry = (id) =>
{
	const request = axios.delete(`${baseURL}/${id}`)
	request.then((response) => console.log(`Here is the response: ${response.data}`))
	return
}

export default {getAll, create, deleteEntry}