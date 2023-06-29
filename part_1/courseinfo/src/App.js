const Header = (head) =>
{
	console.log("printing Header", head);
	return (
		<h1>{head.course.name}</h1>
	)
}

const Part = (props) =>
{
	console.log("props: ", props);
	return(
		<p>{props.name} {props.ex}</p>
	)
}

const Content = (parts) =>
{
	console.log("Content parts", parts);
	return (
		<div>
			<Part name={parts.course.parts[0].name} ex={parts.course.parts[0].exercises}/>
			<Part name={parts.course.parts[1].name} ex={parts.course.parts[1].exercises}/>
			<Part name={parts.course.parts[2].name} ex={parts.course.parts[2].exercises}/>
		</div>
	)
}

const Total = (value) =>
{
	console.log(value);
	return (
		<p>{value.course.parts[0].exercises+value.course.parts[1].exercises+value.course.parts[2].exercises}</p>
	)
}

const App = () =>
{
	const course = 
	{
		name: 'Half Stack Application Development',
		parts: 
		[
			{
				name: 'Fundamentals of React',
				exercises: 10
			},	
			{
				name: 'Using Props to Pass Data',
				exercises: 7
			},
			{
				name: 'State of a Component',
				exercises: 14
			}
		]
	};


	return (
		<div>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</div>
	)
}

export default App;
