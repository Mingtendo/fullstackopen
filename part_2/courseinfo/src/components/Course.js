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

export default Course