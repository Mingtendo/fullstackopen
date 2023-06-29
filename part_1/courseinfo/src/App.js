const Header = (head) =>
{
	console.log("printing Header");
	return (
		<h1>{head.course}</h1>
	)
}

const Part = (props) =>
{
	console.log(props);
	return(
		<p>{props.name} {props.ex}</p>
	)
}

const Content = (parts) =>
{
	console.log(parts);
	return (
		<div>
			<Part name={parts.contents[0].name} ex={parts.contents[0].exercises}/>
			<Part name={parts.contents[1].name} ex={parts.contents[1].exercises}/>
			<Part name={parts.contents[2].name} ex={parts.contents[2].exercises}/>
		</div>
	)
}

const Total = (value) =>
{
	console.log(value);
	return (
		<p>{value.num}</p>
	)
}

const App = () =>
{
	const course = 'Half Stack application development';
	const part1 = 'Fundamentals of React';
	const exercises1 = 10;
	const part2 = 'Using props to pass data';
	const exercises2 = 7;
	const part3 = 'State of a component';
	const exercises3 = 14;

	const contents = 
	[
		{name: part1, exercises: exercises1},
		{name: part2, exercises: exercises2},
		{name: part3, exercises: exercises3}
	];

	return (
		<div>
			<Header course={course} />
			<Content contents={contents} />
			<Total num={exercises1+exercises2+exercises3} />
		</div>
	)
}

export default App;
