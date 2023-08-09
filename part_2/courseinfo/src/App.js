const Header = ({ header }) => 
{
	console.log('header data', header)
	return (
		<h1>{header}</h1>
	)
}

const Part = ({ part }) => 
{
	console.log('this part has data: ', part)
	return (
		<p>
    		{part.name} {part.exercises}
  		</p>
	)
}

const Total = ({content}) =>
{
	const total = content.reduce((sum, cont) =>
	{
		console.log('sum: ', sum)
		return cont.exercises + sum
	}, 0)

	return (
		<p>
			total of {total} exercises
		</p>
	)
}

const Content = ({content}) =>
{
	return (
		<div>
			{content.map((note) =>
				<Part key={note.id} part={note}/>
			)}
		</div>
	)
}

const Course = ({course}) => 
{
	console.log('data in parts as given to Course component', course)
	return (
		<div>
			<Header header={course.name}/>
			<Content content={course.parts} />
			<Total content={course.parts} />
		</div>
		
	)
}

const App = () => 
{
  	const course = 
	{
		id: 1,
		name: 'Half Stack application development',
		parts:
		[
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3
			},
			{
				name: 'Array fundamentals',
				exercises: 69,
				id: 4
			}
		]
	}
	

  	return <Course course={course} />
}

export default App